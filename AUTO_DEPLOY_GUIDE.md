
# 自动部署设置指南

## 当前配置

已创建 `.github/workflows/deploy.yml`，功能：
- ✅ 自动安装依赖
- ✅ 自动类型检查
- ✅ 自动构建项目
- ⚠️ 构建产物保存7天供下载

---

## 部署方式选择

### 方案一：手动部署（推荐，最简单）

构建完成后：
1. 在 GitHub Actions 下载 `dist` artifacts
2. 使用 MiniMax 平台手动上传部署

### 方案二：部署到 Netlify（免费，自动）

**优点**：完全免费，自动部署到CDN
**缺点**：需要更换部署平台

```bash
# 1. 注册 Netlify: https://netlify.com
# 2. 在 GitHub Secrets 添加:
#    - NETLIFY_AUTH_TOKEN
#    - NETLIFY_SITE_ID
# 3. 取消 deploy.yml 中 Netlify 部分注释
```

### 方案三：部署到 Vercel（免费，自动）

```bash
# 1. 注册 Vercel: https://vercel.com
# 2. 在 GitHub Secrets 添加:
#    - VERCEL_TOKEN
# 3. 取消 deploy.yml 中 Vercel 部分注释
```

---

## 详细步骤（Netlify 为例）

### 1. 创建 Netlify 账号
访问 https://netlify.com → Sign Up → 用 GitHub 账号登录

### 2. 获取 Netlify API Token
1. Netlify → User settings → OAuth
2. 点击 "Personal access tokens"
3. 点击 "Create new token"
4. 复制 token

### 3. 获取 Netlify Site ID
1. Netlify → Sites
2. 点击 "Add new site" → Import from GitHub
3. 选择你的仓库
4. 复制 Site ID（在 Site settings 里）

### 4. 配置 GitHub Secrets
1. GitHub 仓库 → Settings → Secrets and variables → Actions
2. 点击 "New repository secret"
3. 添加：
   - `NETLIFY_AUTH_TOKEN` = 你的 Netlify token
   - `NETLIFY_SITE_ID` = 你的 Site ID

### 5. 修改 deploy.yml
取消 Netlify 部署部分的注释

### 6. 测试
```bash
git add .
git commit -m "enable auto deploy"
git push
```

访问 GitHub Actions 查看部署状态 ✅

---

## 工作流程图

```
git push
    ↓
GitHub Actions 自动执行
    ↓
1. 安装依赖
2. 类型检查
3. 构建项目
    ↓
自动部署到 Netlify
    ↓
🌐 网站自动更新
```

---

## 常见问题

**Q: 为什么不用 MiniMax 自动部署？**
A: MiniMax 的部署 API 需要内部认证，GitHub Actions 无法直接调用。

**Q: Netlify 域名是什么？**
A: 格式为 `xxx.netlify.app`，也可以绑定自定义域名。

**Q: 部署需要付费吗？**
A: Netlify 免费版足够个人项目使用，每月100GB流量。

---

## 你的项目地址

- GitHub 仓库: `https://github.com/你的用户名/skincare-hub`
- 网站地址: `https://xxx.netlify.app`（或你绑定的域名）