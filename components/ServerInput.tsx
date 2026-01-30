"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Server, CheckCircle2, XCircle, Shield, Zap } from "lucide-react";
import { ConnectionStatus } from "@/types/mcp";

interface ServerInputProps {
  onConnect: (serverUrl: string) => Promise<void>;
  status: ConnectionStatus;
  useProxy: boolean;
  onProxyChange: (useProxy: boolean) => void;
}

export function ServerInput({ onConnect, status, useProxy, onProxyChange }: ServerInputProps) {
  const [serverUrl, setServerUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (serverUrl.trim()) {
      await onConnect(serverUrl.trim());
    }
  };

  const isLoading = status === "connecting";
  const isConnected = status === "connected";

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Server className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>MCP 服务器查看器</CardTitle>
            <CardDescription>输入 MCP 服务器地址来查看可用工具</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="例如: http://localhost:3000/mcp"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !serverUrl.trim()}
              size="lg"
              className="min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  连接中
                </>
              ) : (
                "连接"
              )}
            </Button>
          </div>

          {/* 连接模式切换 */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <button
              type="button"
              onClick={() => onProxyChange(!useProxy)}
              className="flex items-center gap-2 text-sm"
            >
              <div className={`w-11 h-6 rounded-full transition-colors ${useProxy ? 'bg-primary' : 'bg-gray-300'} relative cursor-pointer`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${useProxy ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="font-medium">使用代理模式</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {useProxy ? (
                <>
                  <Shield className="h-4 w-4" />
                  <span>通过服务器代理连接（解决 CORS）</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  <span>浏览器直连（更快，需要 CORS 支持）</span>
                </>
              )}
            </div>
          </div>

          {/* 状态指示器 */}
          {status !== "idle" && (
            <div className="flex items-center gap-2">
              {isConnected && (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <Badge variant="default" className="bg-green-600">
                    已连接
                  </Badge>
                </>
              )}
              {status === "error" && (
                <>
                  <XCircle className="h-4 w-4 text-destructive" />
                  <Badge variant="destructive">连接失败</Badge>
                </>
              )}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
