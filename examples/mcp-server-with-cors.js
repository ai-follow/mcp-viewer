/**
 * MCP 服务器 CORS 配置示例
 * 
 * 这是一个简单的 Express + SSE 服务器示例，展示如何配置 CORS
 * 以支持 MCP Viewer 的浏览器直连模式
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// ============== CORS 配置 ==============

// 方式 1: 允许所有来源（仅用于开发测试）
// app.use(cors());

// 方式 2: 只允许特定来源（推荐用于生产）
app.use(cors({
  origin: [
    'http://localhost:3000',           // 本地开发
    'https://mcp-viewer-info.vercel.app' // 线上部署
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 处理预检请求
app.options('*', cors());

// ============== SSE 端点 ==============

app.get('/sse', (req, res) => {
  console.log('收到 SSE 连接请求');

  // 设置 SSE 响应头
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 额外的 CORS 头（如果 cors 中间件不够）
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // 发送初始化消息
  res.write('data: {"jsonrpc":"2.0","method":"initialize"}\n\n');

  // 模拟 MCP 协议响应
  const tools = [
    {
      name: 'example_tool',
      description: '这是一个示例工具',
      inputSchema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: '要发送的消息'
          }
        },
        required: ['message']
      }
    }
  ];

  // 响应 tools/list 请求
  setTimeout(() => {
    res.write(`data: ${JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      result: { tools }
    })}\n\n`);
  }, 100);

  // 保持连接
  const keepAlive = setInterval(() => {
    res.write(': keepalive\n\n');
  }, 15000);

  // 客户端断开连接时清理
  req.on('close', () => {
    console.log('客户端断开连接');
    clearInterval(keepAlive);
    res.end();
  });
});

// ============== 健康检查端点 ==============

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============== 启动服务器 ==============

app.listen(PORT, () => {
  console.log(`\n🚀 MCP 服务器已启动！`);
  console.log(`📡 SSE 端点: http://localhost:${PORT}/sse`);
  console.log(`💚 健康检查: http://localhost:${PORT}/health`);
  console.log(`\n✅ CORS 已配置，允许以下来源访问：`);
  console.log(`   - http://localhost:3000`);
  console.log(`   - https://mcp-viewer-info.vercel.app`);
  console.log(`\n📖 使用方法：`);
  console.log(`   在 MCP Viewer 中输入: http://localhost:${PORT}`);
  console.log(`   或: http://localhost:${PORT}/sse\n`);
});

// ============== 错误处理 ==============

process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('未处理的 Promise 拒绝:', err);
});
