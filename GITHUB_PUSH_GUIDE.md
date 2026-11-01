
# 推送到 GitHub 操作指南

本项目已在本目录初始化独立 git 仓库，当前状态：

- 分支：`main`
- 提交：`5d8571d feat: SkinCare Hub 科学护肤指南网站初始版本`
- 已跟踪文件：37 个
- 远端：未配置（需你手动添加）

---

## 第一步：在 GitHub 创建空仓库

1. 打开 https://github.com/new
2. **Repository name**：`skincare-hub`
3. **Visibility**：建议选 `Private`（若作品集要展示可改 `Public`）
4. ⚠️ **不要勾选**以下四项，保持仓库为空：
   - Add a README file
   - Add .gitignore
   - Choose a license
   - Create a new branch on the push
5. 点击 **Create repository**

> 仓库必须为空，否则 push 会因历史冲突失败。若误勾选了，删掉仓库重建即可。

---

## 第二步：本地添加远端并推送

在项目目录下执行：

```bash
cd skincare-hub

# 1) 添加远端（把 <你的用户名> 换成实际值）
git remote add origin https://github.com/<你的用户名>/skincare-hub.git

# 2) 确认远端地址
git remote -v

# 3) 推送主分支并建立跟踪
git push -u origin main
```

推送时 GitHub 会要求认证：

- **推荐**：用 Personal Access Token（PAT）代替密码
  - 打开 https://github.com/settings/tokens → Generate new token (classic)
  - 勾选 `repo` 权限 → 生成后复制（只显示一次）
  - 用户名填 GitHub 用户名，密码位置粘贴 Token
- 或先配置 SSH key（https://github.com/settings/keys），之后用 `git@github.com:...` 作为远端地址，免密推送

---

## 第三步（可选）：换用 SSH 地址

```bash
git remote set-url origin git@github.com:<你的用户名>/skincare-hub.git
git push -u origin main
```

---

## 推送后自检清单

| 检查项 | 命令 / 位置 | 期望结果 |
|--------|-------------|----------|
| 凭据未泄露 | 仓库文件列表中不应出现 `.env` | 只有 `.env.example` |
| 依赖未入库 | 仓库中无 `node_modules/`、无 `dist/` | 已由 `.gitignore` 排除 |
| README 正常 | 仓库首页展示项目文档 | 含功能、技术栈、数据库说明 |
| 协作功能存在 | 仓库 Actions 标签页可见 `deploy.yml` | 工作流已识别 |

---

## 仓库内已包含的关键文件

| 文件 | 作用 |
|------|------|
| `README.md` | 项目文档（简介 / 功能 / 技术栈 / 本地运行 / 数据库） |
| `.env.example` | 环境变量模板，新成员复制为 `.env` 填写凭据 |
| `.github/workflows/deploy.yml` | GitHub Actions 自动构建与部署工作流 |
| `supabase-rls-setup.sql` | 7 张表的 RLS 行级安全策略脚本 |
| `verify-cron.sql` | pg_cron 保活任务校验脚本 |
| `AUTO_DEPLOY_GUIDE.md` | 三种部署方案（手动 / Netlify / Vercel）步骤 |
| `PROJECT_DOC.md`、`项目数据.md` | 项目说明与数据说明文档 |

---

## 换设备/换人接手时

```bash
git clone https://github.com/<你的用户名>/skincare-hub.git
cd skincare-hub
pnpm install
cp .env.example .env    # 填入 Supabase URL 与 anon key
pnpm dev
```

> 注意：Supabase 凭据不随仓库分发，新环境必须自行申请或由项目所有者提供。

---

## 常见问题

**推送被拒 `remote: Please make sure you have the correct access rights`**
→ 认证失败。用 PAT 替代密码，或改用 SSH 地址。

**推送被拒 `rejected ... non-fast-forward`**
→ 远端仓库不是空的。在 GitHub 上新建一个空仓库，或用 `git push -u origin main --force`（会覆盖远端历史，谨慎）。

**推送成功但 CI 报 `pnpm-lock.yaml` 冲突**
→ CI 使用 `pnpm install --frozen-lockfile`，需保证 lockfile 与 `package.json` 同步。在本地跑一次 `pnpm install` 后再提交 lockfile。

**想隐藏某些文件但已经提交过**
→ `git rm --cached <文件>` 然后提交。
