# MCP 服务器示例

这个目录包含一个简单的 MCP 服务器示例，展示如何配置 CORS 以支持 MCP Viewer 的浏览器直连模式。

## 快速开始

### 1. 安装依赖

```bash
cd examples
npm install
```

### 2. 启动服务器

```bash
npm start
```

服务器将在 `http://localhost:8000` 启动。

### 3. 测试连接

有两种方式测试：

#### 方式 A: 使用本地 MCP Viewer

```bash
# 在项目根目录
cd ..
pnpm dev
```

然后：
1. 打开 http://localhost:3000
2. 输入服务器地址：`http://localhost:8000`
3. 选择**直连模式**或**代理模式**
4. 点击连接

#### 方式 B: 使用线上 MCP Viewer

1. 访问 https://mcp-viewer-info.vercel.app
2. 输入服务器地址：`http://localhost:8000`
3. 必须选择**直连模式**（代理模式在线上不可用）
4. 点击连接

## 文件说明

### mcp-server-with-cors.js

这是一个完整的示例服务器，包含：

- ✅ CORS 配置
- ✅ SSE 端点实现
- ✅ 预检请求处理
- ✅ 健康检查端点
- ✅ 错误处理

### 关键配置

```javascript
// CORS 配置
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mcp-viewer-info.vercel.app'
  ],
  credentials: true
}));

// SSE 响应头
res.setHeader('Content-Type', 'text/event-stream');
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('Connection', 'keep-alive');
```

## 常见问题

### Q: 为什么本地测试正常，但线上访问失败？

A: 可能的原因：
1. **内网地址无法从公网访问**：如果服务器在 `localhost` 或 `192.168.x.x`，线上应用无法访问
   - 解决：使用 ngrok 等工具暴露到公网
2. **CORS 配置未包含线上域名**：检查 `origin` 配置是否包含 `https://mcp-viewer-info.vercel.app`
3. **HTTP vs HTTPS 混合内容**：现代浏览器可能阻止 HTTPS 网站访问 HTTP 服务
   - 解决：使用 HTTPS（如 ngrok 提供的 HTTPS 地址）

### Q: 如何暴露本地服务到公网？

使用 ngrok：

```bash
# 安装 ngrok
brew install ngrok  # macOS
# 或从 https://ngrok.com 下载

# 暴露本地端口
ngrok http 8000
```

然后使用 ngrok 提供的 HTTPS 地址（如 `https://abc123.ngrok.io`）。

### Q: 可以禁用 CORS 吗？

可以允许所有来源：

```javascript
app.use(cors());  // 允许所有来源
```

但这只建议在开发测试时使用。生产环境应该限制允许的来源。

## 扩展阅读

- [CORS 详细配置指南](../CORS-SETUP.md)
- [MCP 协议文档](https://github.com/modelcontextprotocol/sdk)
- [Express CORS 中间件](https://expressjs.com/en/resources/middleware/cors.html)
