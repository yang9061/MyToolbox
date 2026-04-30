import Dexie, { Table } from 'dexie';
import { Tool, Category } from '../types';
import { loadPresetConfig } from '../data/presetLoader';

class ToolboxDatabase extends Dexie {
  tools!: Table<Tool, string>;
  categories!: Table<Category, string>;

  constructor() {
    super('ToolboxDB');

    this.version(1).stores({
      tools: 'id, name, categoryId, isFavorite, isOffline, createdAt',
      categories: 'id, name, sortOrder, createdAt',
    });

    this.version(2)
      .stores({
        tools: 'id, name, categoryId, isFavorite, isOffline, createdAt',
        categories: 'id, name, isDefault, sortOrder, createdAt',
      })
      .upgrade(async (tx) => {
        await tx.table('categories').clear();
        await tx.table('tools').clear();
      });

    this.version(3)
      .stores({
        tools: 'id, name, categoryId, isFavorite, isOffline, createdAt',
        categories: 'id, name, isDefault, sortOrder, createdAt',
      })
      .upgrade(async (tx) => {
        await tx.table('tools').delete('preset-feishu-cloud-doc');
        await tx.table('tools').delete('preset-feishu-task');
      });
  }

  async initializeDefaultData(): Promise<void> {
    const { categories: presetCategories, tools: presetTools } = await loadPresetConfig();

    const existingCategories = await this.categories.toArray();
    const existingCategoryIds = new Set(existingCategories.map(c => c.id));
    const presetCategoryIds = new Set(presetCategories.map(c => c.id));
    
    for (const category of presetCategories) {
      if (!existingCategoryIds.has(category.id)) {
        await this.categories.add(category);
      }
    }

    for (const existing of existingCategories) {
      if (existing.isDefault && !presetCategoryIds.has(existing.id)) {
        await this.categories.delete(existing.id);
      }
    }

    const now = Date.now();
    for (const presetTool of presetTools) {
      const existingTool = await this.tools.get(presetTool.id);
      if (!existingTool) {
        await this.tools.add({
          ...presetTool,
          isFavorite: false,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
  }
}

export const db = new ToolboxDatabase();

export async function initializeDatabase(): Promise<void> {
  try {
    await db.initializeDefaultData();
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}
