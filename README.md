# MCP 工具查看器

一个用于连接和查看 MCP（Model Context Protocol）服务器工具信息的可视化 Web 应用。通过简洁直观的界面，快速探索 MCP 服务器提供的所有可用工具及其详细参数。

## 🌐 在线体验

**线上地址**: [https://mcp-viewer-info.vercel.app/](https://mcp-viewer-info.vercel.app/)

## ✨ 项目特点

- 🔗 **快速连接**：输入 MCP 服务器地址即可连接
- 📊 **可视化展示**：以卡片形式展示所有可用工具
- 📝 **详细信息**：查看每个工具的描述、参数类型、必填项等完整信息
- 🎨 **现代化界面**：基于 Tailwind CSS 和 Radix UI 的精美设计
- ⚡ **实时反馈**：连接状态和错误提示的即时显示

## 🛠️ 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI 库**: [React 19](https://react.dev/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/)
- **组件库**: [Radix UI](https://www.radix-ui.com/)
- **图标**: [Lucide React](https://lucide.dev/)
- **MCP 协议**: [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk)
- **包管理**: pnpm

## 📦 安装

确保您已安装 Node.js 20+ 和 pnpm。

```bash
# 克隆项目
git clone <your-repo-url>
cd mcp-viewer

# 安装依赖
pnpm install
```

## 🚀 使用

### 开发模式

```bash
pnpm dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
# 构建
pnpm build

# 启动生产服务器
pnpm start
```

### 代码检查

```bash
pnpm lint
```

## 📖 使用说明

1. **启动应用**：运行开发服务器后，在浏览器中打开应用
2. **输入服务器地址**：在输入框中输入 MCP 服务器的 URL 地址
3. **连接服务器**：点击"连接"按钮，应用将尝试连接到指定的 MCP 服务器
4. **查看工具列表**：连接成功后，页面将展示该服务器提供的所有工具
5. **浏览工具详情**：每个工具卡片显示：
   - 工具名称
   - 工具描述
   - 输入参数及其类型
   - 必填参数标识

## 🏗️ 项目结构

```
mcp-viewer/
├── app/                    # Next.js App Router
│   ├── api/mcp/           # MCP 服务器连接 API
│   ├── page.tsx           # 主页面
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── ServerInput.tsx    # 服务器地址输入组件
│   ├── ToolCard.tsx       # 工具卡片组件
│   └── ui/                # UI 基础组件
├── types/                 # TypeScript 类型定义
│   └── mcp.ts            # MCP 相关类型
├── lib/                   # 工具函数
└── public/               # 静态资源
```

## 🔌 API 路由

### POST /api/mcp

连接到 MCP 服务器并获取工具列表。

**请求体**:
```json
{
  "serverUrl": "http://localhost:3000/mcp"
}
```

**响应**:
```json
{
  "tools": [
    {
      "name": "tool_name",
      "description": "工具描述",
      "inputSchema": {
        "type": "object",
        "properties": { ... },
        "required": [ ... ]
      }
    }
  ]
}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License