# 更新日志

## [未发布] - 2026-01-30

### ✨ 新增功能

- **双模式连接支持**：新增浏览器直连模式和代理模式
  - 直连模式：浏览器直接连接 MCP 服务器，速度更快，支持 Vercel 部署后使用
  - 代理模式：通过后端代理连接，无需 CORS 配置，适合本地开发
  
- **连接模式切换器**：UI 中新增开关，可随时切换连接模式

### 📝 文档更新

- 新增 `CORS-SETUP.md`：详细的 CORS 配置指南
  - 支持多种后端框架（Express, FastAPI, Nginx）
  - 包含安全配置建议
  - 常见问题解答

- 新增 `examples/` 目录：完整的 MCP 服务器示例
  - `mcp-server-with-cors.js`：配置好 CORS 的示例服务器
  - 包含详细注释和使用说明
  - 支持一键启动测试

- 更新 `README.md`：
  - 新增连接模式说明
  - 新增部署指南
  - 新增使用 ngrok 暴露本地服务的说明

### 🐛 问题修复

- 修复 Vercel 部署后无法访问本地内网服务器的问题
- 修复 CORS 跨域访问错误
- 更新 Tailwind CSS 类名以符合 v4 语法

### 🎨 改进

- 优化错误提示信息，更清晰地说明 CORS 相关问题
- 改进 UI，新增连接模式状态指示器

## 技术细节

### 架构变更

**之前**：所有连接都通过后端 API 路由（`/api/mcp`）代理
- ✅ 无需配置 CORS
- ❌ Vercel 部署后无法访问内网地址
- ❌ 增加延迟

**现在**：支持两种连接方式
1. **浏览器直连**（默认）
   - 前端直接使用 `@modelcontextprotocol/sdk` 连接
   - ✅ 速度更快
   - ✅ 支持 Vercel 部署后使用
   - ⚠️ 需要服务器配置 CORS

2. **服务器代理**（可选）
   - 保留原有的 API 路由方式
   - ✅ 无需 CORS
   - ⚠️ 仅本地运行时可用

### 代码变更

- `app/page.tsx`：
  - 新增 `handleConnectDirect` 方法（浏览器直连）
  - 新增 `handleConnectViaProxy` 方法（代理连接）
  - 新增 `useProxy` 状态管理

- `components/ServerInput.tsx`：
  - 新增连接模式切换器 UI
  - 新增模式状态指示器

### 使用场景

| 场景 | 推荐模式 | 原因 |
|------|---------|------|
| 本地开发 + 本地 MCP 服务器 | 任意 | 两种模式都可用 |
| Vercel 部署 + 公网 MCP 服务器 | 直连模式 | 速度快，代理模式无法访问 |
| Vercel 部署 + 内网 MCP 服务器 | 直连模式 + ngrok | 使用 ngrok 暴露内网服务 |
| 快速测试（不想配置 CORS） | 代理模式 | 本地运行，无需配置 |

## 迁移指南

### 对现有用户

如果你已经在使用 MCP Viewer：

1. **无需任何更改**：默认使用直连模式，如果服务器已配置 CORS，将正常工作
2. **遇到 CORS 错误**：启用"使用代理模式"选项，或参考 `CORS-SETUP.md` 配置服务器
3. **部署到 Vercel**：
   - 方案 A：为 MCP 服务器配置 CORS（推荐）
   - 方案 B：使用 ngrok 暴露本地服务器

### 对 MCP 服务器开发者

如果你开发 MCP 服务器，建议添加 CORS 支持：

```javascript
// Express 示例
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'https://mcp-viewer-info.vercel.app']
}));
```

详细配置请参考 `CORS-SETUP.md` 或 `examples/mcp-server-with-cors.js`。
