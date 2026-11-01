
# 🌿 SkinCare Hub

> 科学护肤指南 —— 收录脸、头皮、身体等部位的皮肤问题解决方案

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)

**在线体验：** https://zilo1002.github.io/Skincare-hub/

---

## 📖 项目简介

SkinCare Hub 是一个综合型护肤知识平台，帮助用户了解自己的肤质类型，查询各类皮肤问题的科学修复方案，并推荐高性价比的护肤品。

**收录内容：**
- 🩺 **62 个皮肤问题** —— 覆盖脸、头皮、身体、手足、头发 6 大区域
- 🔬 **16 种 Baumann 肤质分类** —— 基于皮肤科医学理论
- 💄 **护肤品推荐** —— 国货 + 开价品牌，标注成分/价格/评分，每周更新

---

## ✨ 核心功能

### 1. 皮肤问题数据库
按部位浏览或搜索皮肤问题，查看病因、症状与多种解决方案（家庭疗法 / 天然成分 / 产品推荐 / 医学治疗），每种方案标注 **成本等级**（💰 / 💰💰 / 💰💰💰）与 **效果等级**。

### 2. Baumann 16 型肤质测试
通过问卷确定用户的 4 个维度特征（油性/干性、敏感/耐受、色素/非色素、皱纹/紧致），得出 16 型肤质代码（如 DSPW），并给出专属护理建议。

### 3. 个性化产品推荐
根据肤质自动筛选适合的护肤品，支持按品牌 / 品类 / 价格区间筛选，附核心成分与用户评分。

### 4. 用户收藏与云端同步
注册登录后收藏问题与肤质，数据通过 Supabase 实时同步，支持多设备访问。

---

## 🛠 技术栈

| 分类 | 技术 |
|------|------|
| 前端框架 | React 18 + TypeScript |
| 构建工具 | Vite 6 |
| 样式方案 | Tailwind CSS 3 |
| 后端服务 | Supabase（PostgreSQL + Auth + RLS） |
| 图标库 | lucide-react |
| 部署 | Vite 静态构建 |

---

## 🚀 本地运行

### 1. 克隆并安装

```bash
git clone https://github.com/zilo1002/Skincare-hub.git
cd skincare-hub
pnpm install
```

### 2. 配置环境变量

复制环境变量模板：

```bash
cp .env.example .env
```

然后编辑 `.env` 填入你的 Supabase 凭据：

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> 凭据获取路径：Supabase Dashboard → Project Settings → API

### 3. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:5173

### 4. 构建

```bash
pnpm build
```

---

## 🗄 数据库说明

### 数据表

| 表名 | 用途 |
|------|------|
| `user_favorites` | 用户收藏的皮肤问题 |
| `user_favorite_skin_types` | 用户收藏的肤质类型 |
| `user_custom_skin_types` | 用户自定义肤质 |
| `user_profiles` | 用户档案与肤质测试结果 |
| `products` | 护肤品数据 |
| `product_categories` | 产品分类 |
| `product_sync_log` | 数据同步日志 |

### 行级安全策略（RLS）

项目为所有用户数据表启用了 RLS，确保用户只能访问自己的数据。配置脚本见 `../supabase-rls-setup.sql`。

### 数据库保活

Supabase 免费层在连续 7 天无活动后会暂停项目，本项目通过 `pg_cron` 定时任务保活：

```sql
-- 每 7 分钟执行一次，保持数据库活跃
SELECT cron.schedule('db-keep-alive', '*/7 * * * *', 'SELECT 1');
```

---

## 📁 项目结构

```
skincare-hub/
├── src/
│   ├── App.tsx              # 主应用与页面组件
│   ├── App.css              # 全局样式与响应式适配
│   ├── components/
│   │   ├── AuthModal.tsx    # 登录/注册弹窗
│   │   └── ErrorBoundary.tsx# 错误边界
│   ├── data/
│   │   ├── skinData.ts      # 皮肤问题 / 肤质 / 成分数据
│   │   └── products.ts      # 护肤品数据
│   └── lib/
│       ├── supabase.ts      # Supabase 客户端
│       ├── AuthContext.tsx  # 认证上下文
│       └── userDataService.ts # 用户数据服务
├── .github/workflows/deploy.yml  # CI/CD 配置
└── .env.example
```

---

## 📄 许可证

本项目仅供学习交流使用。网站内容仅供参考，不能替代专业医疗建议。

---

## 🤝 开发说明

本项目在开发过程中使用了 AI 辅助工具（AI Agent）参与代码编写、UI 迭代与文档整理。核心架构设计、数据库表结构与 RLS 策略、安全配置、响应式适配方案均由项目作者主导确定并验证。
