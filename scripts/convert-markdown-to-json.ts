import * as fs from 'fs';
import * as path from 'path';

interface Category {
  id: string;
  name: string;
  sortOrder: number;
}

interface Tool {
  id: string;
  name: string;
  url: string;
  icon: string;
  description: string;
  categoryId: string;
}

interface PresetConfig {
  categories: Category[];
  tools: Tool[];
}

// 分类 ID 映射
const categoryIdMap: { [key: string]: string } = {
  '原型设计与交互': 'cat-prototype',
  '流程图与架构设计': 'cat-flowchart',
  '思维导图与脑暴': 'cat-mindmap',
  '文档协作与知识管理': 'cat-doc',
  '项目管理与任务追踪': 'cat-project',
  '数据分析与可视化': 'cat-data',
  '用户研究与需求分析': 'cat-research',
  'AI UI/UX设计': 'cat-ai-design',
  'AI编程与代码生成': 'cat-ai-code',
  'AI内容生成': 'cat-ai-content',
  '设计与视觉素材': 'cat-design',
  '竞品分析与市场情报': 'cat-competitor',
  '产品运营与增长': 'cat-growth',
  '格式转换': 'cat-format-conversion',
  '效率工具': 'cat-efficiency',
  'PM社区': 'cat-community',
  '开发相关': 'cat-dev',
  'GitHub PM 相关 Skills 与项目': 'cat-github-skills'
};

// 生成工具 ID
function generateToolId(name: string): string {
  return 'preset-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// 解析 Markdown
function parseMarkdown(content: string): PresetConfig {
  const categories: Category[] = [];
  const tools: Tool[] = [];
  const lines = content.split('\n');

  let currentCategory: Category | null = null;
  let inToolTable = false;
  let toolTableHeaderSkipped = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 检测分类标题
    const categoryMatch = line.match(/^##\s+(\d+)\.\s+(.*)$/);
    if (categoryMatch) {
      inToolTable = false;
      toolTableHeaderSkipped = false;
      
      const sortOrder = parseInt(categoryMatch[1], 10);
      const categoryName = categoryMatch[2];
      const categoryId = categoryIdMap[categoryName] || `cat-${categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      
      currentCategory = {
        id: categoryId,
        name: categoryName,
        sortOrder
      };
      categories.push(currentCategory);
      continue;
    }

    // 检测工具表格开始
    if (line.startsWith('| ID') && (line.includes('工具名称') || line.includes('Skills名称'))) {
      inToolTable = true;
      toolTableHeaderSkipped = false;
      continue;
    }

    // 跳过表格分隔线
    if (inToolTable && line.startsWith('|----')) {
      toolTableHeaderSkipped = true;
      continue;
    }

    // 解析工具行
    if (inToolTable && toolTableHeaderSkipped && line.startsWith('|') && line.includes('http')) {
      const columns = line.split('|').map(col => col.trim()).filter(col => col);
      if (columns.length >= 4) {
        let name: string;
        let url: string;
        let icon: string;
        let description: string;

        // 处理不同的表格格式
        if (line.includes('Skills名称')) {
          // GitHub Skills 表格
          name = columns[1];
          url = columns[2];
          icon = columns[3];
          description = columns[4];
        } else {
          // 普通工具表格
          name = columns[1];
          url = columns[2];
          icon = columns[3];
          description = columns[4];
        }

        if (currentCategory) {
          tools.push({
            id: generateToolId(name),
            name,
            url,
            icon,
            description,
            categoryId: currentCategory.id
          });
        }
      }
    }
  }

  return { categories, tools };
}

// 主函数
function main() {
  const markdownPath = path.resolve(__dirname, '../memory-bank/PM工具清单 .md');
  const outputPath = path.resolve(__dirname, '../toolbox/public/preset-tools.json');

  try {
    const content = fs.readFileSync(markdownPath, 'utf-8');
    const config = parseMarkdown(content);

    // 输出 JSON
    fs.writeFileSync(outputPath, JSON.stringify(config, null, 2), 'utf-8');
    
    console.log(`✅ 成功转换！`);
    console.log(`  - 分类数量: ${config.categories.length}`);
    console.log(`  - 工具数量: ${config.tools.length}`);
    console.log(`  - 输出文件: ${outputPath}`);
  } catch (error) {
    console.error('❌ 转换失败:', error);
  }
}

main();
