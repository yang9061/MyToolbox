import Dexie, { Table } from 'dexie';
import { Tool, Category } from '../types';
import { DEFAULT_CATEGORIES, PRESET_TOOLS } from '../data/presetTools';

class ToolboxDatabase extends Dexie {
  tools!: Table<Tool, string>;
  categories!: Table<Category, string>;

  constructor() {
    super('ToolboxDB');

    this.version(1).stores({
      tools: 'id, name, categoryId, isFavorite, isOffline, createdAt',
      categories: 'id, name, sortOrder, createdAt',
    });
  }

  async initializeDefaultData(): Promise<void> {
    const categoryCount = await this.categories.count();
    if (categoryCount === 0) {
      await this.categories.bulkAdd(DEFAULT_CATEGORIES);
    }

    const now = Date.now();
    for (const presetTool of PRESET_TOOLS) {
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
