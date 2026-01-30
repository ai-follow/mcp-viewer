// MCP 工具参数定义
export interface MCPToolParameter {
  type: string;
  description?: string;
  enum?: string[];
  items?: {
    type: string;
  };
  properties?: Record<string, MCPToolParameter>;
  required?: string[];
  [key: string]: any;
}

// MCP 工具定义
export interface MCPTool {
  name: string;
  description?: string;
  inputSchema: {
    type: string;
    properties?: Record<string, MCPToolParameter>;
    required?: string[];
  };
}

// MCP 服务器响应
export interface MCPServerResponse {
  tools: MCPTool[];
}

// 连接状态
export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'error';

// 错误响应
export interface MCPError {
  message: string;
  code?: string;
}
