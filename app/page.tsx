"use client";

import { useState } from "react";
import { ServerInput } from "@/components/ServerInput";
import { ToolCard } from "@/components/ToolCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MCPTool, ConnectionStatus } from "@/types/mcp";
import { AlertCircle, Sparkles, Server } from "lucide-react";

export default function Home() {
  const [tools, setTools] = useState<MCPTool[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [error, setError] = useState<string>("");

  const handleConnect = async (serverUrl: string) => {
    setStatus("connecting");
    setError("");
    setTools([]);

    try {
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serverUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "连接失败");
      }

      setTools(data.tools || []);
      setStatus("connected");
    } catch (err) {
      setError(err instanceof Error ? err.message : "连接 MCP 服务器失败");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            MCP 工具查看器
          </h1>
          <p className="text-muted-foreground text-lg">
            连接到 MCP 服务器，探索可用的工具和功能
          </p>
        </div>

        {/* 服务器输入 */}
        <div className="mb-8">
          <ServerInput onConnect={handleConnect} status={status} />
        </div>

        {/* 错误提示 */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>连接错误</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 加载状态 */}
        {status === "connecting" && (
          <div className="space-y-4">
            <div className="text-center text-muted-foreground mb-4">
              正在加载工具列表...
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 工具列表 */}
        {status === "connected" && tools.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                可用工具
                <span className="ml-3 text-sm font-normal text-muted-foreground">
                  共 {tools.length} 个工具
                </span>
              </h2>
              <p className="text-muted-foreground">
                以下是该 MCP 服务器提供的所有工具及其详细信息
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* 无工具提示 */}
        {status === "connected" && tools.length === 0 && (
          <Alert className="border-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>未找到工具</AlertTitle>
            <AlertDescription>
              该 MCP 服务器没有返回任何可用工具。
            </AlertDescription>
          </Alert>
        )}

        {/* 欢迎提示 */}
        {status === "idle" && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
              <Server className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">开始探索</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              输入 MCP 服务器地址，即可查看该服务器提供的所有工具和功能
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
