# 预设工具名单

本文档定义专属工具箱的预设工具列表，作为首次使用时加载示例数据的来源。

## 数据格式

```typescript
interface PresetTool {
  id: string;           // 预设工具唯一标识（UUID）
  name: string;         // 工具名称
  url: string;          // 工具URL（仅在线工具）
  icon: string;         // 工具图标URL
  description: string;  // 工具描述
  categoryId: string;   // 所属分类ID（对应 DEFAULT_CATEGORIES）
  isOffline: boolean;   // 是否为离线工具
  offlineFileName?: string; // 离线工具包文件名（仅离线工具）
}
```

## 预设分类

| 分类ID | 分类名称 | 排序 |
|--------|----------|------|
| cat-dev | 开发工具 | 1 |
| cat-design | 设计工具 | 2 |
| cat-productivity | 效率工具 | 3 |
| cat-media | 媒体工具 | 4 |
| cat-doc | 文档工具 | 5 |
| cat-other | 其他工具 | 99 |

## 预设工具列表

### 开发工具（cat-dev）

| 工具名称 | 工具URL | 图标URL | 描述 |
|----------|---------|---------|------|
| GitHub | https://github.com | https://github.githubassets.com/favicons/favicon.svg | 代码托管与协作开发平台 |
| Stack Overflow | https://stackoverflow.com | https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico | 程序员问答社区 |
| MDN Web Docs | https://developer.mozilla.org | https://developer.mozilla.org/favicon.ico | Web 开发技术文档 |
| npm | https://www.npmjs.com | https://www.npmjs.com/favicon.ico | Node.js 包管理器 |
| CodePen | https://codepen.io | https://cpwebassets.codepen.io/favicon.ico | 前端代码在线编辑与预览 |

### 设计工具（cat-design）

| 工具名称 | 工具URL | 图标URL | 描述 |
|----------|---------|---------|------|
| Figma | https://figma.com | https://static.figma.com/app/icon/1/favicon.ico | 协作界面设计工具 |
| Coolors | https://coolors.co | https://coolors.co/favicon.ico | 在线配色方案生成器 |
| Unsplash | https://unsplash.com | https://unsplash.com/favicon.ico | 免费高清图片素材库 |

### 效率工具（cat-productivity）

| 工具名称 | 工具URL | 图标URL | 描述 |
|----------|---------|---------|------|
| Notion | https://www.notion.so | https://www.notion.so/images/favicon.ico | 协作文档与知识管理 |
| Todoist | https://todoist.com | https://todoist.com/favicon.ico | 任务管理与待办事项 |
| Toggl Track | https://toggl.com/track | https://toggl.com/favicon.ico | 时间追踪工具 |

### 媒体工具（cat-media）

| 工具名称 | 工具URL | 图标URL | 描述 |
|----------|---------|---------|------|
| YouTube | https://www.youtube.com | https://www.youtube.com/s/desktop/favicon.ico | 在线视频平台 |
| Canva | https://www.canva.com | https://www.canva.com/favicon.ico | 在线图形设计工具 |

### 文档工具（cat-doc）

| 工具名称 | 工具URL | 图标URL | 描述 |
|----------|---------|---------|------|
| Google Docs | https://docs.google.com | https://ssl.gstatic.com/docs/documents/ic_favicon1.ico | 在线文档处理 |
| Grammarly | https://www.grammarly.com | https://www.grammarly.com/favicon.ico | 英文写作辅助 |

### 其他工具（cat-other）

| 工具名称 | 工具URL | 图标URL | 描述 |
|----------|---------|---------|------|
| Google Translate | https://translate.google.com | https://ssl.gstatic.com/translate/favicon.ico | 在线翻译工具 |
| Wolfram Alpha | https://www.wolframalpha.com | https://www.wolframalpha.com/favicon.ico | 计算知识引擎 |

## 版本历史

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| v1.0 | 2026-04-18 | 初始版本，包含基础预设工具名单 |
