import { DEFAULT_CATEGORIES, PRESET_TOOLS } from './presetTools';
import { Category, PresetTool } from '../types';

interface PresetConfig {
  categories: { id: string; name: string; sortOrder: number }[];
  tools: {
    id: string;
    name: string;
    url: string;
    icon: string;
    description: string;
    categoryId: string;
  }[];
}

/**
 * 从外部 preset-tools.json 文件加载预设配置
 * 这是主数据源，确保优先使用
 */
export async function loadPresetConfig(): Promise<{ categories: Category[]; tools: PresetTool[] }> {
  try {
    const response = await fetch('./preset-tools.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const config: PresetConfig = await response.json();

    // 转换为内部类型
    const categories: Category[] = config.categories.map((cat, index) => ({
      id: cat.id,
      name: cat.name,
      isDefault: true,
      sortOrder: cat.sortOrder || index + 1,
      createdAt: 0,
    }));

    const tools: PresetTool[] = config.tools.map((tool) => ({
      id: tool.id,
      name: tool.name,
      url: tool.url,
      icon: tool.icon,
      description: tool.description,
      categoryId: tool.categoryId,
      isOffline: false,
    }));

    console.log(`✅ 成功加载预设配置 - ${categories.length} 个分类，${tools.length} 个工具`);

    return { categories, tools };
  } catch (error) {
    console.warn('⚠️ 无法加载外部预设配置，使用默认预设数据');
    console.error(error);
    return { categories: DEFAULT_CATEGORIES, tools: PRESET_TOOLS };
  }
}

/**
 * 获取默认预设配置（备用方案）
 */
export function getDefaultPresetConfig(): { categories: Category[]; tools: PresetTool[] } {
  console.log(`ℹ️ 使用内置预设配置 - ${DEFAULT_CATEGORIES.length} 个分类，${PRESET_TOOLS.length} 个工具`);
  return { categories: DEFAULT_CATEGORIES, tools: PRESET_TOOLS };
}
