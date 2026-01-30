# MCP 工具查看器

<div align="center">

一个用于连接和查看 MCP（Model Context Protocol）服务器工具信息的可视化 Web 应用

通过简洁直观的界面，快速探索 MCP 服务器提供的所有可用工具及其详细参数

[在线体验](https://mcp-viewer-info.vercel.app/) · [更新日志](./CHANGELOG.md)

</div>

---

## ✨ 项目特点

- 🔗 **快速连接** - 输入 MCP 服务器地址即可连接
- 📊 **可视化展示** - 以卡片形式展示所有可用工具
- 📝 **详细信息** - 查看每个工具的描述、参数类型、必填项等完整信息
- 🎨 **现代化界面** - 基于 Tailwind CSS 和 Radix UI 的精美设计
- ⚡ **实时反馈** - 连接状态和错误提示的即时显示
- 🌐 **双模式连接** - 支持浏览器直连和代理模式，灵活应对不同场景

## 🌐 在线体验

**线上地址**：[https://mcp-viewer-info.vercel.app/](https://mcp-viewer-info.vercel.app/)

无需安装，直接访问即可使用！

## 🚀 快速开始

### 方案 1：使用示例服务器（推荐新手）

最快体验 MCP Viewer 的方式，5 分钟搞定：

```bash
# 1. 启动示例 MCP 服务器
cd examples
npm install
npm start
# 服务器将在 http://localhost:8000 启动

# 2. 启动 MCP Viewer（新开一个终端窗口）
cd ..
pnpm install
pnpm dev
# 应用将在 http://localhost:3000 启动
```

**连接测试：**
1. 浏览器访问 `http://localhost:3000`
2. 输入服务器地址：`http://localhost:8000`
3. 点击"连接"按钮
4. 查看工具列表

### 方案 2：连接已有的 MCP 服务器

#### ✅ 服务器已配置 CORS

直接使用，无需任何额外配置：

1. 访问 [https://mcp-viewer-info.vercel.app](https://mcp-viewer-info.vercel.app)
2. 输入你的 MCP 服务器地址
3. 使用**直连模式**（默认）
4. 点击"连接"

#### ⚠️ 服务器未配置 CORS

选择以下方案之一：

**方案 A：配置 CORS（推荐用于生产环境）**

在你的 MCP 服务器中添加 CORS 支持：

```javascript
// Express 示例
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'https://mcp-viewer-info.vercel.app']
}));
```

**更多资源：**
- 📖 详细配置指南：[CORS-SETUP.md](./CORS-SETUP.md)
- 💡 完整示例代码：[examples/mcp-server-with-cors.js](./examples/mcp-server-with-cors.js)

**方案 B：使用代理模式（适合快速测试）**

1. 本地运行 MCP Viewer：`pnpm dev`
2. 访问 `http://localhost:3000`
3. 启用"使用代理模式"开关
4. 输入服务器地址并连接

> ⚠️ **注意**：代理模式仅在本地运行时可用，部署到 Vercel 后无法使用

### 方案 3：从 Vercel 访问本地服务器

如果你的 MCP 服务器在本地，但想从 Vercel 部署的应用访问，可以使用 ngrok 暴露本地服务：

```bash
# 安装 ngrok
brew install ngrok  # macOS
# 或访问 https://ngrok.com 下载

# 暴露本地端口
ngrok http 8000
# 将显示类似：Forwarding https://abc123.ngrok.io -> http://localhost:8000
```

然后在 [https://mcp-viewer-info.vercel.app](https://mcp-viewer-info.vercel.app) 使用生成的 HTTPS 地址（如 `https://abc123.ngrok.io`）连接。

## 📦 本地开发

### 系统要求

- Node.js 20+
- pnpm

### 安装依赖

```bash
# 克隆项目
git clone <your-repo-url>
cd mcp-viewer

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

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

### 基本流程

1. **启动应用** - 运行开发服务器或访问在线版本
2. **输入服务器地址** - 在输入框中输入 MCP 服务器的 URL
3. **选择连接模式** - 根据情况选择直连或代理模式
4. **连接服务器** - 点击"连接"按钮
5. **浏览工具** - 查看所有可用工具及其详细信息

### 连接模式对比

| 特性 | 直连模式 | 代理模式 |
|------|---------|---------|
| 连接速度 | ⚡ 快 | 🐢 较慢 |
| Vercel 部署后可用 | ✅ 是 | ❌ 否 |
| 需要配置 CORS | ✅ 是 | ❌ 否 |
| 适用场景 | 生产环境 | 快速测试 |

#### 直连模式（推荐）

- ✅ 浏览器直接连接 MCP 服务器
- ✅ 速度快，延迟低
- ✅ 部署到 Vercel 后仍可使用
- ⚠️ 需要 MCP 服务器配置 CORS

#### 代理模式

- ✅ 无需配置 CORS
- ✅ 适合快速测试
- ⚠️ 仅在本地运行时可用
- ⚠️ 部署到 Vercel 后无法访问内网地址

### 工具卡片说明

每个工具卡片显示：
- **工具名称** - 工具的唯一标识
- **工具描述** - 工具的功能说明
- **输入参数** - 参数名称、类型和描述
- **必填标识** - 标记哪些参数是必需的

## 🏗️ 项目结构

```
mcp-viewer/
├── app/                          # Next.js App Router
│   ├── api/mcp/route.ts         # MCP 服务器连接 API（代理模式）
│   ├── page.tsx                 # 主页面（包含直连逻辑）
│   └── layout.tsx               # 根布局
├── components/                   # React 组件
│   ├── ServerInput.tsx          # 服务器地址输入组件
│   ├── ToolCard.tsx             # 工具卡片组件
│   └── ui/                      # UI 基础组件（Radix UI）
├── types/                        # TypeScript 类型定义
│   └── mcp.ts                   # MCP 相关类型
├── lib/                          # 工具函数和共享逻辑
├── examples/                     # 示例代码和文档
│   ├── mcp-server-with-cors.js # 带 CORS 的 MCP 服务器示例
│   ├── package.json             # 示例服务器依赖
│   └── README.md                # 示例说明文档
├── public/                       # 静态资源
├── CHANGELOG.md                  # 更新日志
└── README.md                     # 本文件
```

## 🔌 API 文档

### POST /api/mcp

连接到 MCP 服务器并获取工具列表（代理模式使用）。

**请求：**

```json
{
  "serverUrl": "http://localhost:8000"
}
```

**响应：**

```json
{
  "tools": [
    {
      "name": "tool_name",
      "description": "工具描述",
      "inputSchema": {
        "type": "object",
        "properties": {
          "param1": {
            "type": "string",
            "description": "参数描述"
          }
        },
        "required": ["param1"]
      }
    }
  ]
}
```

**错误响应：**

```json
{
  "error": "错误信息"
}
```

## 🔧 部署指南

### 部署到 Vercel

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 点击部署
4. 部署完成后，即可使用**直连模式**访问任何支持 CORS 的 MCP 服务器

### 部署到其他平台

项目是标准的 Next.js 应用，可以部署到任何支持 Node.js 的平台：

- Netlify
- Railway
- Render
- AWS / GCP / Azure

### 环境变量

项目无需配置环境变量即可运行。

## 🛠️ 技术栈

| 类别 | 技术 | 版本 |
|-----|------|------|
| 框架 | Next.js | 16 |
| UI 库 | React | 19 |
| 语言 | TypeScript | 最新 |
| 样式 | Tailwind CSS | 4 |
| 组件 | Radix UI | 最新 |
| 图标 | Lucide React | 最新 |
| 协议 | @modelcontextprotocol/sdk | 最新 |
| 包管理 | pnpm | 最新 |

## ❓ 常见问题

### ❌ 连接失败：CORS 错误

**症状：**
```
Access to fetch at 'http://...' from origin 'http://...' has been blocked by CORS policy
```

**原因：** 服务器未配置 CORS

**解决方案：**
1. **临时方案**：启用"使用代理模式"（仅本地）
2. **推荐方案**：在服务器端配置 CORS（参考 [CORS-SETUP.md](./CORS-SETUP.md)）

### ❌ 连接失败：404 Not Found

**症状：**
```
404 Not Found
```

**原因：** MCP 服务器端点路径不正确

**解决方案：**
- 尝试添加 `/sse` 后缀（如 `http://localhost:8000/sse`）
- 检查你的 MCP 服务器文档确认正确的端点路径
- 查看服务器日志确认服务是否正常运行

### ❌ Vercel 部署后无法连接本地服务器

**症状：**
```
Failed to fetch
```

**原因：** Vercel 服务器无法访问你的本地内网地址

**解决方案：**
1. **使用 ngrok** 暴露本地服务到公网（参考上文"方案 3"）
2. **部署 MCP 服务器** 将 MCP 服务器也部署到公网

### ❌ 连接成功但没有显示工具

**可能原因：**
- MCP 服务器没有注册任何工具
- 服务器返回格式不正确

**解决方案：**
1. 检查浏览器控制台（F12）查看详细错误
2. 检查服务器响应格式是否符合 MCP 协议规范
3. 使用示例服务器测试是否是客户端问题

### ❌ 代理模式在 Vercel 上不可用

**原因：** Vercel 的 Serverless 函数无法访问内网地址

**解决方案：**
- 使用**直连模式**并配置 CORS
- 或使用 ngrok 暴露本地服务

### 🔍 调试技巧

1. **检查浏览器控制台**
   - 按 `F12` 打开开发者工具
   - 查看 Console 和 Network 标签

2. **检查服务器日志**
   - 查看 MCP 服务器的控制台输出
   - 确认请求是否到达服务器

3. **测试连接**
   - 使用示例服务器排除客户端问题
   - 使用 `curl` 测试服务器端点：
     ```bash
     curl http://localhost:8000
     ```

4. **查看详细文档**
   - [CORS 配置详细指南](./CORS-SETUP.md)
   - [示例服务器代码](./examples/mcp-server-with-cors.js)
   - [MCP 协议规范](https://github.com/modelcontextprotocol/specification)

### 需要更多帮助？

如果上述方案都无法解决问题：
1. 提交 Issue 到 GitHub（附上错误信息和复现步骤）
2. 查看 [MCP 官方文档](https://modelcontextprotocol.io)
3. 加入 MCP 社区讨论

## 🤝 贡献指南

欢迎贡献代码、报告问题和提出建议！

### 如何贡献

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m '添加某个功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

### 报告问题

提交 Issue 时，请包含：
- 问题描述
- 复现步骤
- 预期行为
- 实际行为
- 环境信息（浏览器、Node.js 版本等）
- 错误截图或日志

## 📝 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解项目的更新历史。

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

---

<div align="center">

**[⬆ 返回顶部](#mcp-工具查看器)**

Made with ❤️ by MCP Community

</div>
