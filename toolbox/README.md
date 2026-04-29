# Toolbox - 工具箱

一个用于管理和收藏常用工具的Web应用。

## 功能特性

- 📦 工具管理 - 添加、编辑、删除工具
- 🏷️ 分类管理 - 自定义工具分类，支持拖拽排序
- ❤️ 收藏功能 - 快速访问常用工具
- 🔍 搜索功能 - 快速定位工具
- ☀️ 明暗主题 - 支持深色/浅色模式
- 📤 数据导入导出 - 备份和迁移数据

## 技术栈

- React 19
- Vite 6
- TypeScript
- Tailwind CSS 3
- Dexie.js (IndexedDB)
- Lucide React

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 生产构建

```bash
npm run build
```

构建产物输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 部署到 GitHub Pages

### 步骤

1. **创建 GitHub 仓库**
   - 在 GitHub 上创建一个新仓库
   - 获取仓库的 HTTPS 或 SSH URL

2. **初始化 Git 仓库**

   ```bash
   # 初始化 git
   git init
   
   # 添加远程仓库
   git remote add origin <your-repo-url>
   
   # 添加文件
   git add .
   
   # 提交
   git commit -m "Initial commit"
   
   # 推送到 main 分支
   git push -u origin main
   ```

3. **启用 GitHub Pages**

   - 访问仓库的 **Settings** → **Pages**
   - 在 **Source** 部分选择 `gh-pages` 分支
   - 点击 **Save**

4. **等待自动部署**

   每次推送到 `main` 分支时，GitHub Actions 会自动构建并部署。

## 部署到其他平台

### Netlify

1. 访问 [Netlify](https://www.netlify.com/)
2. 点击 **New site from Git**
3. 选择你的 GitHub 仓库
4. 配置构建命令：`npm run build`
5. 配置发布目录：`dist`
6. 点击 **Deploy site**

### Vercel

1. 访问 [Vercel](https://vercel.com/)
2. 点击 **Add New** → **Project**
3. 导入你的 GitHub 仓库
4. Vercel 会自动检测项目配置
5. 点击 **Deploy**

### Cloudflare Pages

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 点击 **Create a project**
3. 连接你的 GitHub 仓库
4. 配置构建命令：`npm run build`
5. 配置发布目录：`dist`
6. 点击 **Save and Deploy**

## 项目结构

```
src/
├── components/          # React 组件
│   ├── Button.tsx       # 按钮组件
│   ├── Dialog.tsx       # 对话框组件
│   ├── Footer.tsx       # 页脚组件
│   ├── Header.tsx       # 头部组件
│   ├── Input.tsx        # 输入框组件
│   ├── Select.tsx       # 选择框组件
│   └── Toast.tsx        # Toast 提示组件
├── context/             # React Context
│   └── AppContext.tsx   # 应用状态管理
├── db/                  # 数据库相关
│   └── database.ts      # Dexie 数据库配置
├── data/                # 预设数据
│   └── presetTools.ts   # 预设工具数据
├── types/               # TypeScript 类型定义
│   └── index.ts         # 类型声明
├── App.tsx              # 主应用组件
├── main.tsx             # 应用入口
└── index.css            # 全局样式
```

## 许可证

MIT