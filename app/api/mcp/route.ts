import { NextRequest, NextResponse } from "next/server";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

// 添加 CORS 头
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  let client: Client | null = null;
  let transport: SSEClientTransport | null = null;

  try {
    const { serverUrl } = await request.json();

    if (!serverUrl) {
      return NextResponse.json(
        { error: "服务器地址不能为空" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 验证 URL 格式
    let url: URL;
    try {
      url = new URL(serverUrl);
    } catch (urlError) {
      return NextResponse.json(
        { error: "无效的 URL 格式" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 如果 URL 没有指定端点，尝试添加 /sse
    if (!url.pathname || url.pathname === "/") {
      url.pathname = "/sse";
    }

    console.log("正在连接到 MCP 服务器:", url.toString());

    // 创建 SSE 传输层
    transport = new SSEClientTransport(url);

    // 创建 MCP 客户端
    client = new Client(
      {
        name: "mcp-viewer",
        version: "1.0.0",
      },
      {
        capabilities: {},
      }
    );

    // 连接到服务器
    await client.connect(transport);

    console.log("成功连接到 MCP 服务器");

    // 获取工具列表
    const toolsResponse = await client.listTools();

    console.log("获取到工具列表:", toolsResponse.tools?.length || 0, "个工具");

    // 关闭连接
    await client.close();

    return NextResponse.json(
      {
        tools: toolsResponse.tools || [],
      },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("MCP 连接错误:", error);

    // 确保连接被关闭
    if (client) {
      try {
        await client.close();
      } catch (closeError) {
        console.error("关闭连接时出错:", closeError);
      }
    }

    // 提供更详细的错误信息
    let errorMessage = "连接 MCP 服务器失败";

    if (error.code === 400) {
      errorMessage = "服务器返回 400 错误。请确保：\n1. URL 格式正确（如 http://localhost:3001 或 http://localhost:3001/sse）\n2. MCP 服务器正在运行\n3. 服务器支持 SSE 连接";
    } else if (error.code === 404) {
      errorMessage = "未找到 MCP 服务器端点。请尝试在 URL 后添加 /sse（如 http://localhost:3001/sse）";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
