# PM工具清单

> 产品经理日常工作必备的在线工具导航，包含原型设计、流程图、数据分析、AI工具等17大分类。

## 文档信息

| 版本 | 日期 | 更新内容 | 作者 |
|------|------|----------|------|
| 1.0.0 | 2025-01-20 | 初始版本，涵盖14个分类 | PM Assistant |
| 1.1 | 2026-04-30 | 补充格式转换、效率工具、PM社区、开发相关4个分类；GitHub Skills改为统一表格格式 | PM Assistant |

---

## 接口定义

```typescript
interface PMTool {
  id: number;                    // 工具唯一标识
  name: string;                 // 工具名称
  url: string;                  // 官网链接
  icon: string;                 // 图标URL
  description: string;          // 工具描述（50-100字）
  categoryId: number;            // 分类ID
}
```

---

## 分类总览

| ID | 分类名称 | 工具数量 |
|----|----------|----------|
| 1 | [原型设计与交互](#1-原型设计与交互) | 7 |
| 2 | [流程图与架构设计](#2-流程图与架构设计) | 9 |
| 3 | [思维导图与脑暴](#3-思维导图与脑暴) | 8 |
| 4 | [文档协作与知识管理](#4-文档协作与知识管理) | 9 |
| 5 | [项目管理与任务追踪](#5-项目管理与任务追踪) | 10 |
| 6 | [数据分析与可视化](#6-数据分析与可视化) | 9 |
| 7 | [用户研究与需求分析](#7-用户研究与需求分析) | 6 |
| 8 | [AI UI/UX设计](#8-ai-uiux设计) | 8 |
| 9 | [AI编程与代码生成](#9-ai编程与代码生成) | 9 |
| 10 | [AI内容生成](#10-ai内容生成) | 10 |
| 11 | [设计与视觉素材](#11-设计与视觉素材) | 10 |
| 12 | [竞品分析与市场情报](#12-竞品分析与市场情报) | 6 |
| 13 | [产品运营与增长](#13-产品运营与增长) | 5 |
| 14 | [格式转换](#14-格式转换) | 5 |
| 15 | [效率工具](#15-效率工具) | 7 |
| 16 | [PM社区](#16-pm社区) | 9 |
| 17 | [开发相关](#17-开发相关) | 7 |
| 18 | [GitHub PM 相关 Skills 与项目](#18-github-pm-相关-skills-与项目) | 16 |

**总计：151个工具**

---

## 1. 原型设计与交互

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 101 | 墨刀 | https://modao.cc/ | https://modao.cc/favicon.ico | 国内领先的在线原型设计工具，支持团队协作、交互原型、高保真设计，提供丰富的组件库和模板 |
| 102 | MasterGo | https://mastergo.com/ | https://mastergo.com/favicon.ico | 面向团队的专业UI/UX设计工具，支持在线协作、组件库、设计系统，适合中大型团队使用 |
| 103 | 摹客RP | https://mockplus.cn/ | https://mockplus.cn/favicon.ico | 专注移动端原型设计，支持快速交互、原型演示、团队协作，提供多种设备预览 |
| 104 | Figma | https://figma.com/ | https://figma.com/favicon.ico | 全球最流行的在线协作设计工具，支持实时协作、设计系统、原型交互，被Adobe收购 |
| 107 | Axure RP | https://www.axure.com/ | https://www.axure.com/favicon.ico | 专业级原型设计工具，支持高保真原型、条件逻辑、动态面板，适合复杂交互设计 |
| 108 | Balsamiq | https://balsamiq.com/ | https://balsamiq.com/favicon.ico | 快速低保真原型工具，以手绘风格著称，适合快速验证想法和概念验证 |
| 110 | Proto.io | https://proto.io/ | https://proto.io/favicon.ico | 在线原型设计平台，无需编码即可创建高保真交互原型，支持真实设备预览 |

---

## 2. 流程图与架构设计

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 201 | draw.io | https://www.drawio.com/index.html | https://www.drawio.com/assets/images/favicon.ico | 免费开源的在线流程图工具，支持多种图表类型，无需注册即可使用，可本地部署 |
| 202 | Mermaid | https://mermaid.nodejs.cn/intro/ | https://mermaid.nodejs.cn/favicon.ico | 基于文本描述的图表生成工具，支持流程图、时序图、甘特图等，通过代码绘制图表 |
| 203 | ProcessOn | https://www.processon.com/ | https://www.processon.com/favicon.ico | 国内领先的在线协作绘图工具，支持流程图、思维导图、原型图，提供丰富模板库 |
| 204 | Lucidchart | https://lucidchart.com/ | https://lucidchart.com/favicon.ico | 专业在线图表工具，支持流程图、架构图、网络拓扑图，与Google Workspace深度集成 |
| 205 | Creately | https://creately.com/ | https://creately.com/favicon.ico | 在线协作图表工具，支持实时协作、预设模板库，适合团队头脑风暴和流程梳理 |
| 206 | Gliffy | https://www.gliffy.com/ | https://www.gliffy.com/favicon.ico | Atlassian旗下的在线图表工具，支持Jira和Confluence集成，适合技术团队使用 |
| 207 | Visual Paradigm | https://www.visual-paradigm.com/ | https://www.visual-paradigm.com/favicon.ico | 专业UML建模工具，支持系统架构设计、数据库设计、代码生成 |
| 208 | PlantUML | https://plantuml.com/ | https://plantuml.com/favicon.ico | 开源图表生成工具，通过文本描述生成UML图，支持多种输出格式 |
| 210 | Cacoo | https://cacoo.com/ | https://cacoo.com/favicon.ico | 在线协作图表工具，支持实时多人编辑，提供丰富的图表模板和图标库 |

---

## 3. 思维导图与脑暴

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|----------|
| 301 | XMind | https://xmind.cn/ | https://xmind.cn/favicon.ico | 全球领先的思维导图和头脑风暴工具，支持多种结构模式，适合知识整理和创意发散 |
| 302 | Boardmix | https://boardmix.cn/ | https://boardmix.cn/favicon.ico | 博思白板，一站式协作工具，支持思维导图、流程图、看板、白板协作 |
| 303 | GitMind | https://gitmind.cn/ | https://gitmind.cn/favicon.ico | 免费在线思维导图工具，支持AI辅助生成、多人协作、多种导出格式 |
| 305 | MindMeister | https://www.mindmeister.com/ | https://www.mindmeister.com/favicon.ico | 全球流行的在线思维导图工具，支持实时协作、演示模式、与Google Drive同步 |
| 306 | Coggle | https://coggle.it/ | https://coggle.it/favicon.ico | 简洁美观的在线思维导图工具，支持添加图片和链接，生成可分享的思维导图 |
| 307 | Miro | https://miro.com/ | https://miro.com/favicon.ico | 在线白板协作平台，支持思维导图、看板、用户旅程图等，适合远程团队协作 |
| 308 | Whimsical | https://whimsical.com/ | https://whimsical.com/favicon.ico | 专注于设计工作流的协作工具，支持思维导图、流程图、线框图 |

---

## 4. 文档协作与知识管理

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 401 | Notion | https://notion.so/ | https://www.notion.so/favicon.ico | 全能型笔记和知识管理工具，支持文档、数据库、看板、Wiki，适合团队知识沉淀 |
| 402 | 语雀 | https://yuque.com/ | https://yuque.com/favicon.ico | 阿里出品的知识库工具，支持文档、画板、表格，提供丰富的知识创作和分享功能 |
| 403 | 飞书文档 | https://feishu.cn/product/doc | https://feishu.cn/favicon.ico | 飞书办公套件中的在线文档工具，支持实时协作、评论、@提及 |
| 404 | 腾讯文档 | https://docs.qq.com/ | https://docs.qq.com/favicon.ico | 腾讯出品的在线协作文档工具，支持多人实时编辑、Office格式兼容 |
| 405 | Confluence | https://www.atlassian.com/software/confluence | https://www.atlassian.com/favicon.ico | Atlassian企业级知识管理和协作平台，支持丰富的插件和模板 |
| 406 | Obsidian | https://obsidian.md/ | https://obsidian.md/favicon.ico | 本地优先的知识管理工具，支持双链笔记、图谱视图、丰富的插件生态 |
| 407 | Logseq | https://logseq.com/ | https://logseq.com/favicon.ico | 开源双链笔记工具，支持大纲和日历视图，本地存储，数据可控 |
| 408 | 印象笔记 | https://www.yinxiang.com/ | https://www.yinxiang.com/favicon.ico | 老牌笔记应用，支持多端同步、剪藏网页、OCR识别、知识管理 |
| 410 | 我来 wolai | https://www.wolai.com/ | https://www.wolai.com/favicon.ico | 国产协作文档工具，支持双向链接、数据库、模板，适合团队知识管理 |

---

## 5. 项目管理与任务追踪

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 501 | Jira | https://www.atlassian.com/software/jira | https://www.atlassian.com/favicon.ico | Atlassian企业级项目管理工具，支持敏捷看板、Scrum、路线图，适合复杂项目管理 |
| 502 | Tower | https://tower.im/ | https://tower.im/favicon.ico | 国产团队协作工具，支持项目管理、任务追踪、文档协作，专为国内团队优化 |
| 503 | Teambition | https://www.teambition.com/ | https://www.teambition.com/favicon.ico | 阿里旗下项目管理工具，支持看板、文档、日历，项目管理一站式解决方案 |
| 504 | Trello | https://trello.com/ | https://trello.com/favicon.ico | 看板式任务管理工具，简洁易用，支持Power-Up扩展，适合敏捷团队 |
| 506 | Monday.com | https://monday.com/ | https://monday.com/favicon.ico | 可视化工作平台，支持自定义工作流、自动化、仪表盘，适合多种团队 |
| 507 | Asana | https://asana.com/ | https://asana.com/favicon.ico | 团队工作管理平台，支持目标追踪、项目看板、时间线视图 |
| 508 | Linear | https://linear.app/ | https://linear.app/favicon.ico | 现代团队项目管理工具，专注速度和用户体验，支持GitHub深度集成 |
| 509 | ClickUp | https://clickup.com/ | https://clickup.com/favicon.ico | 全能型工作管理平台，支持文档、目标、看板，一站式解决团队协作需求 |
| 510 | 禅道 | https://www.zentao.net/ | https://www.zentao.net/favicon.ico | 国产开源项目管理软件，支持敏捷、瀑布多种管理模式，适合研发团队 |

---

## 6. 数据分析与可视化

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 601 | 神策数据 | https://www.sensorsdata.cn/ | https://www.sensorsdata.cn/favicon.ico | 国内领先的用户行为分析平台，支持埋点管理、漏斗分析、用户画像 |
| 602 | GrowingIO | https://www.growingio.com/ | https://www.growingio.com/favicon.ico | 无埋点用户行为分析工具，支持实时分析、转化漏斗、留存分析 |
| 603 | DataEase | https://dataease.io/ | https://dataease.io/favicon.ico | 开源数据可视化分析工具，支持快速连接数据源、制作仪表盘，适合自助分析 |
| 604 | Metabase | https://www.metabase.com/ | https://www.metabase.com/favicon.ico | 开源BI工具，支持自然语言查询、数据可视化、自助分析，部署简单 |
| 605 | Power BI | https://powerbi.microsoft.com/ | https://powerbi.microsoft.com/favicon.ico | 微软商业智能工具，支持数据建模、可视化报表、企业级部署 |
| 606 | Tableau | https://www.tableau.com/ | https://www.tableau.com/favicon.ico | 专业数据可视化工具，支持丰富图表类型、数据连接、故事讲述 |
| 607 | 阿里云Quick BI | https://quickbi.alibaba.com/ | https://www.aliyun.com/favicon.ico | 阿里云BI分析工具，支持多数据源连接、可视化搭建、数据门户 |
| 608 | 网易有数 | https://youdata.163.com/ | https://www.163.com/favicon.ico | 网易自助式BI平台，支持报表制作、数据预警、权限管理 |
| 609 | FineBI | https://www.finebi.com/ | https://www.finebi.com/favicon.ico | 帆软出品的企业级BI工具，支持自助分析和可视化，国产替代选择 |

---

## 7. 用户研究与需求分析

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 701 | 问卷星 | https://www.wjx.cn/ | https://www.wjx.cn/favicon.ico | 国内领先的在线问卷调查平台，支持多种题型、逻辑设置、数据分析 |
| 702 | 腾讯问卷 | https://wj.qq.com/ | https://wj.qq.com/favicon.ico | 腾讯出品的免费问卷工具，支持多种题型、模板库、数据导出 |
| 703 | 麦克风 | https://www.micromaker.com/ | https://www.micromaker.com/favicon.ico | 用户研究协作平台，支持用户访谈管理、洞察库、需求池管理 |
| 705 | Maze | https://maze.com/ | https://maze.com/favicon.ico | 在线用户调研平台，支持原型测试、问卷调查、A/B测试 |
| 706 | Hotjar | https://www.hotjar.com/ | https://www.hotjar.com/favicon.ico | 用户行为分析工具，支持热力图、录制回放、问卷收集 |
| 707 | 埋点风暴 | https://www.mogotalk.com/ | https://www.mogotalk.com/favicon.ico | 埋点管理平台，支持埋点设计、版本管理、数据验证 |
| 708 | UserZoom | https://www.userzoom.com/ | https://www.userzoom.com/favicon.ico | 企业级用户研究平台，支持多种调研方法、定性定量分析 |

---

## 8. AI UI/UX设计

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 801 | Galileo AI | https://stitch.design/ | https://stitch.design/favicon.ico | Google旗下AI UI设计工具（原Galileo AI），支持从文本生成高质量UI设计稿 |
| 802 | Locofy | https://www.locofy.ai/ | https://www.locofy.ai/favicon.ico | AI设计转代码工具，支持将Figma设计自动转换为React/Vue代码 |
| 803 | Uizard | https://uizard.io/ | https://uizard.io/favicon.ico | AI原型设计工具，支持手绘草图转界面、文本生成UI设计 |
| 804 | Relume | https://www.relume.io/ | https://www.relume.io/favicon.ico | AI组件库和设计系统工具，支持快速生成网站设计系统 |
| 805 | Framer AI | https://www.framer.com/ | https://www.framer.com/favicon.ico | AI网站设计工具，支持从文本生成完整网站，支持实时编辑 |
| 806 | Builder.io | https://www.builder.io/ | https://www.builder.io/favicon.ico | 拖拽式AI网站构建器，支持视觉开发、代码生成、组件库 |
| 807 | Khroma | https://www.khroma.co/ | https://www.khroma.co/favicon.ico | AI配色工具，通过训练生成符合品牌风格的配色方案 |
| 808 | Colormind | http://colormind.io/ | http://colormind.io/favicon.ico | AI配色生成器，从图片、电影或艺术作品中提取配色灵感 |

---

## 9. AI编程与代码生成

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 901 | Cursor | https://cursor.com/ | https://cursor.com/favicon.ico | AI代码编辑器，支持智能补全、代码生成、聊天助手，基于GPT-4优化 |
| 902 | v0.dev | https://v0.dev/ | https://v0.dev/favicon.ico | Vercel旗下AI代码生成工具，支持React组件、Next.js应用生成 |
| 903 | bolt.new | https://bolt.new/ | https://bolt.new/favicon.ico | StackBlitz AI开发环境，支持全栈应用开发、AI代码生成和调试 |
| 904 | Windsurf | https://windsurf.com/ | https://windsurf.com/favicon.ico | Codeium旗下AI编程工具，支持多文件编辑、上下文理解 |
| 905 | Durable | https://durable.co/ | https://durable.co/favicon.ico | AI网站生成工具，输入描述即可生成完整网站，支持自定义编辑 |
| 906 | Lovable | https://lovable.dev/ | https://lovable.dev/favicon.ico | AI应用构建平台，支持对话式开发，生成全栈应用代码 |
| 907 | GitHub Copilot | https://github.com/features/copilot | https://github.com/favicon.ico | GitHub AI编程助手，集成在VS Code等编辑器，提供代码补全和生成 |
| 908 | Claude Code | https://claude.ai/code | https://claude.ai/favicon.ico | Anthropic命令行工具，支持代码编辑、任务执行、Git操作 |
| 909 | Replit Agent | https://replit.com/ | https://replit.com/favicon.ico | Replit AI编程助手，支持对话式开发、自动调试、应用部署 |

---

## 10. AI内容生成

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 1001 | Gamma | https://gamma.app/ | https://gamma.app/favicon.ico | AI演示文稿工具，支持一键生成PPT，提供丰富的模板和主题 |
| 1002 | Beautiful.ai | https://www.beautiful.ai/ | https://www.beautiful.ai/favicon.ico | 智能PPT制作工具，自动优化布局和设计，支持多种导出格式 |
| 1003 | Copy.ai | https://www.copy.ai/ | https://www.copy.ai/favicon.ico | AI文案生成工具，支持广告文案、社交内容、产品描述等 |
| 1004 | Jasper | https://www.jasper.ai/ | https://www.jasper.ai/favicon.ico | 企业级AI内容平台，支持多语言内容创作、品牌风格定制 |
| 1005 | 文心一言 | https://yiyan.baidu.com/ | https://yiyan.baidu.com/favicon.ico | 百度大语言模型，支持中文对话、内容创作、知识问答 |
| 1006 | 通义千问 | https://tongyi.aliyun.com/ | https://tongyi.aliyun.com/favicon.ico | 阿里云大模型，支持长文本理解、多模态、内容创作 |
| 1007 | Kimi | https://kimi.moonshot.cn/ | https://kimi.moonshot.cn/favicon.ico | 月之暗面AI助手，支持超长上下文、文件解析、联网搜索 |
| 1008 | 秘塔写作猫 | https://xiezuocat.com/ | https://xiezuocat.com/favicon.ico | AI写作辅助工具，支持文章润色、语法检查、智能改写 |
| 1009 | 字语智能 | https://www.ziyu.cn/ | https://www.ziyu.cn/favicon.ico | 国产AI办公平台，支持文档创作、摘要生成、多语言翻译 |
| 1010 | 讯飞写作 | https://turboc.xfyun.cn/ | https://www.iflytek.com/favicon.ico | 科大讯飞AI写作工具，支持多场景内容创作、语音输入 |

---

## 11. 设计与视觉素材

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 1201 | Midjourney | https://www.midjourney.com/ | https://www.midjourney.com/favicon.ico | AI图像生成工具，支持高质量艺术风格图片创作，在Discord中使用 |
| 1202 | DALL-E | https://openai.com/dall-e-3 | https://openai.com/favicon.ico | OpenAI图像生成模型，支持根据文本描述生成逼真图片 |
| 1203 | Stable Diffusion | https://stability.ai/ | https://stability.ai/favicon.ico | 开源AI图像生成模型，支持本地部署和自定义训练 |
| 1204 | Canva | https://www.canva.com/ | https://www.canva.com/favicon.ico | 在线设计平台，支持海报、社交媒体、演示文稿等模板 |
| 1205 | 创客贴 | https://www.chuangkit.com/ | https://www.chuangkit.com/favicon.ico | 国产在线设计工具，提供丰富模板，支持海报、名片等设计 |
| 1206 | 稿定设计 | https://www.gaoding.com/ | https://www.gaoding.com/favicon.ico | 在线视觉设计平台，支持图片编辑、电商设计、PPT模板 |
| 1207 | 站酷 | https://www.zcool.com.cn/ | https://www.zcool.com.cn/favicon.ico | 国内设计师社区，提供设计素材、灵感参考、设计作品展示 |
| 1208 | Behance | https://www.behance.net/ | https://www.behance.net/favicon.ico | Adobe旗下设计师作品展示平台，全球最大创意社区之一 |
| 1209 | Unsplash | https://unsplash.com/ | https://unsplash.com/favicon.ico | 免费高清图片素材库，可商用无需授权 |
| 1210 | Pexels | https://www.pexels.com/ | https://www.pexels.com/favicon.ico | 免费图片和视频素材库，支持搜索和下载 |

---

## 12. 竞品分析与市场情报

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 1301 | SimilarWeb | https://www.similarweb.com/ | https://www.similarweb.com/favicon.ico | 网站流量和竞争分析工具，支持网站排名、流量来源、受众分析 |
| 1302 | Sensor Tower | https://sensortower.com/ | https://sensortower.com/favicon.ico | 移动应用市场情报平台，支持ASO分析、竞品监控、市场趋势 |
| 1303 | App Annie | https://www.data.ai/ | https://www.data.ai/favicon.ico | 移动数据和分析平台（现Data.ai），支持应用排名、用户留存分析 |
| 1304 | 蝉大师 | https://www.chandashi.com/ | https://www.chandashi.com/favicon.ico | 国内ASO优化工具，支持App Store关键词排名、竞品分析 |
| 1305 | 七麦数据 | https://www.qimai.cn/ | https://www.qimai.cn/favicon.ico | 移动应用数据分析平台，支持ASO优化、竞品对比、投资并购 |
| 1308 | 艾瑞咨询 | https://www.iresearch.cn/ | https://www.iresearch.cn/favicon.ico | 互联网行业研究机构，提供市场报告、行业洞察 |

---

## 13. 产品运营与增长

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 1401 | Mixpanel | https://mixpanel.com/ | https://mixpanel.com/favicon.ico | 用户行为分析平台，支持事件追踪、漏斗分析、A/B测试 |
| 1402 | Amplitude | https://amplitude.com/ | https://amplitude.com/favicon.ico | 产品分析平台，支持用户分析、行为漏斗、产品迭代优化 |
| 1403 | 友盟+ | https://www.umeng.com/ | https://www.umeng.com/favicon.ico | 阿里移动统计平台，支持App统计、消息推送、社会化分享 |
| 1404 | TalkingData | https://www.talkingdata.com/ | https://www.talkingdata.com/favicon.ico | 第三方数据平台，支持移动统计、广告监测、智慧营销 |
| 1407 | Braze | https://www.braze.com/ | https://www.braze.com/favicon.ico | 客户 engagement 平台，支持全渠道营销自动化、用户分群 |

---

## 14. 格式转换

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 1501 | Smallpdf | https://smallpdf.com/ | https://smallpdf.com/favicon.ico | 简洁易用的在线PDF工具平台，支持PDF转Word、PDF压缩、合并、拆分等30多种功能 |
| 1502 | iLovePDF | https://www.ilovepdf.com/ | https://www.ilovepdf.com/img/favicon.ico | 完全免费的在线PDF工具，支持合并、拆分、压缩、转换、编辑、签名等功能 |
| 1503 | CloudConvert | https://cloudconvert.com/ | https://cloudconvert.com/favicon.ico | 支持200多种文件格式转换的在线工具，涵盖文档、图片、音视频、电子书等 |
| 1504 | Zamzar | https://www.zamzar.com/ | https://www.zamzar.com/favicon.ico | 老牌在线文件转换工具，支持1200多种格式，转换完成后邮件通知 |
| 1507 | 迅捷PDF | https://www.xunjiepdf.com/ | https://www.xunjiepdf.com/favicon.ico | 国产PDF在线处理工具，支持PDF转换、编辑、OCR识别、语音识别 |

---

## 15. 效率工具

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 1601 | Snipaste | https://www.snipaste.com/ | https://www.snipaste.com/favicon.ico | 强大的截图和贴图工具，支持截图标注、取色、截图钉在桌面作为参考 |
| 1602 | Eagle | https://eagle.cool/ | https://eagle.cool/favicon.ico | 设计师素材管理工具，支持图片收藏、整理、标签分类、快速搜索 |
| 1604 | uTools | https://u.tools/ | https://u.tools/favicon.ico | 新一代效率工具平台，支持全局搜索、插件扩展、剪切板管理 |
| 1606 | 方片收集 | https://fangpian.cc/ | https://fangpian.cc/favicon.ico | 碎片化信息收集工具，支持浏览器插件、快捷键收集文字、图片、链接 |
| 1607 | 简悦 | https://simplesc.cc/ | https://simplesc.cc/favicon.ico | 沉浸式阅读工具，支持网页标注、稍后阅读、导出为Markdown |
| 1608 | Web Clipper | https://webclipper.github.io/ | https://webclipper.github.io/favicon.ico | 开源网页剪藏工具，支持将网页内容保存到Notion、Obsidian等笔记 |
| 1610 | Billfish | https://www.billfish.cn/ | https://www.billfish.cn/favicon.ico | 国产免费素材管理工具，支持图片、视频、音频分类管理、标签标注 |

---

## 16. PM社区

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 1701 | 人人都是产品经理 | https://www.woshipm.com/ | https://www.woshipm.com/favicon.ico | 国内最大产品经理社区，提供行业资讯、经验分享、职场干货 |
| 1703 | 少数派 | https://sspai.com/ | https://sspai.com/favicon.ico | 高质量数字生活社区，分享效率工具、数码科技、实用技巧 |
| 1704 | 知乎产品话题 | https://www.zhihu.com/topic/19609897/hot | https://www.zhihu.com/favicon.ico | 知乎产品经理话题，汇聚产品讨论、经验问答、行业观点 |
| 1705 | Mind the Product | https://www.mindtheproduct.com/ | https://www.mindtheproduct.com/favicon.ico | 全球知名产品管理社区，提供产品会议、博客、Newsletter |
| 1706 | Product Hunt | https://www.producthunt.com/ | https://www.producthunt.com/favicon.ico | 全球最大新产品发布平台，每天推荐新产品、工具和创意 |
| 1707 | Hacker News | https://news.ycombinator.com/ | https://news.ycombinator.com/favicon.ico | YC旗下科技新闻社区，关注创业、技术、产品动态 |
| 1708 | 36氪 | https://36kr.com/ | https://36kr.com/favicon.ico | 科技创新创业媒体，提供深度报道、行业分析、投融资资讯 |
| 1709 | 虎嗅 | https://www.huxiu.com/ | https://www.huxiu.com/favicon.ico | 商业科技资讯平台，关注互联网、商业创新、人物观点 |
| 1710 | 钛媒体 | https://www.tmtpost.com/ | https://www.tmtpost.com/favicon.ico | 科技财经新媒体，提供TMT行业深度报道、趋势分析 |

---

## 17. 开发相关

| ID | 工具名称 | 官网 | 图标 | 描述 |
|----|----------|------|------|------|
| 1801 | GitHub | https://github.com/ | https://github.com/favicon.ico | 全球最大代码托管平台，支持项目管理、CICD、AI编程、开发者社区 |
| 1802 | Postman | https://www.postman.com/ | https://www.postman.com/favicon.ico | API开发和测试平台，支持API设计、调试、文档生成、自动化测试 |
| 1803 | Apifox | https://www.apifox.cn/ | https://www.apifox.cn/favicon.ico | 国产API协作平台，集成API文档、调试、Mock、测试一体 |
| 1804 | Swagger | https://swagger.io/ | https://swagger.io/favicon.ico | OpenAPI规范和API文档工具，支持API设计、文档生成、客户端生成 |
| 1805 | JSON Crack | https://jsoncrack.com/ | https://jsoncrack.com/favicon.ico | JSON可视化工具，将JSON数据转换为交互式图表，支持实时编辑 |
| 1806 | Regex101 | https://regex101.com/ | https://regex101.com/favicon.ico | 正则表达式测试工具，支持多种语言、实时匹配、详细解释 |
| 1807 | Can I Use | https://caniuse.com/ | https://caniuse.com/favicon.ico | Web兼容性查询工具，查看CSS、JS特性在不同浏览器的支持情况 |

---

## 18. GitHub PM 相关 Skills 与项目

| ID | Skills名称 | 访问地址 | 图标 | 描述 |
|----|------------|----------|------|------|
| 1801 | brainstorming | https://github.com/iliaal/ai-skills/blob/master/skills/brainstorming/SKILL.md | https://github.com/favicon.ico | AI预实现头脑风暴工具，用于在实施前探索意图、设计方案和关键决策 |
| 1802 | write-a-prd | https://github.com/awesome-copilot/prd | https://github.com/favicon.ico | PRD技能库，设计全面的生产级产品需求文档，弥合业务愿景与技术实现 |
| 1803 | pm-skills | https://github.com/product-on-purpose/pm-skills | https://github.com/favicon.ico | PM技能集合，包含PRD模板、指令和质量检查清单 |
| 1804 | Product-Manager-Skills | https://github.com/deanpeters/Product-Manager-Skills | https://github.com/favicon.ico | PM技能路线图和资源集合 |
| 1805 | oh-my-pm | https://github.com/kelegele/oh-my-pm | https://github.com/favicon.ico | 产品经理知识库和工具集 |
| 1806 | awesome-copilot | https://github.com/github/awesome-copilot | https://github.com/favicon.ico | GitHub Copilot相关资源和工具集合 |
| 1807 | awesome-ai-rules | https://github.com/Lay4U/awesome-ai-rules | https://github.com/favicon.ico | AI编码助手规则集合，支持Cursor、Claude Code、Copilot、Windsurf等 |
| 1808 | cursor-rules | https://github.com/cursor-rules/cursor-rules | https://github.com/favicon.ico | Cursor IDE规则集集合 |
| 1809 | cursor-prd-task-rules | https://github.com/pepeladeira/cursor-prd-task-rules | https://github.com/favicon.ico | Cursor PRD和任务规则集，自动化从PRD创建到功能实现的流程 |
| 1810 | cursor-project-master | https://github.com/heyzgj/cursor-project-master | https://github.com/favicon.ico | Cursor全栈构建器，通过PRD自动生成、测试和部署完整应用 |
| 1811 | Windsurf-rules | https://github.com/windsurf-ai/Windsurf-rules | https://github.com/favicon.ico | Windsurf代码规范和最佳实践 |
| 1812 | anthropic-cookbook | https://github.com/anthropics/anthropic-cookbook | https://github.com/favicon.ico | Claude API使用示例和最佳实践 |
| 1813 | clauded-skills | https://github.com/alirezarezvani/claude-skills | https://github.com/favicon.ico | Claude Code技能集合 |
| 1814 | AgentToolkit | https://github.com/Minegolfer/AgentToolkit | https://github.com/favicon.ico | AI Agent资源和工具集合，支持25+IDE集成 |
| 1815 | ai-coding-rules | https://github.com/Luxvil/ai-coding-rules | https://github.com/favicon.ico | AI编码助手规则，提升项目可靠性和可预测性 |
| 1816 | json-schema-rules | https://github.com/orgs/json-schema-rules | https://github.com/favicon.ico | JSON Schema驱动的AI行为和治理规则 |

---

## 版本历史

| 版本 | 日期 | 更新内容 | 作者 |
|------|------|----------|------|
| 1.0.0 | 2025-01-20 | 初始版本，涵盖14个分类，共133个工具 | PM Assistant |
| 1.1 | 2026-04-30 | 补充格式转换、效率工具、PM社区、开发相关4个分类；GitHub Skills改为统一表格格式 | PM Assistant |

---

## 贡献指南

欢迎提交Issue或Pull Request来补充或修正工具信息。

### 提交规范

1. 工具必须是在线可访问的（除非标注离线）
2. 每个分类建议保持8-15个工具
3. 描述控制在50-100字
4. 尽量使用官方favicon作为图标

---

*最后更新：2026-04-30*
