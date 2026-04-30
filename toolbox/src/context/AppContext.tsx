import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Tool, Category, DialogType } from '../types';
import { db, initializeDatabase } from '../db/database';
import { v4 as uuidv4 } from 'uuid';
import { useAutoBackup } from '../hooks/useAutoBackup';

interface AppState {
  tools: Tool[];
  categories: Category[];
  selectedCategoryId: string | null;
  searchKeyword: string;
  isLoading: boolean;
  currentDialog: DialogType;
  editingTool: Tool | null;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'warning' | 'info';
  isDarkMode: boolean;
  isAutoBackupEnabled: boolean;
  backupPath: string | null;
  lastBackupTime: number | null;
}

interface AppContextType extends AppState {
  loadData: () => Promise<void>;
  addTool: (tool: Omit<Tool, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTool: (id: string, tool: Partial<Tool>) => Promise<void>;
  deleteTool: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  updateCategory: (id: string, name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  reorderCategories: (id: string, newIndex: number) => Promise<void>;
  setSelectedCategoryId: (id: string | null) => void;
  setSearchKeyword: (keyword: string) => void;
  setCurrentDialog: (dialog: DialogType) => void;
  setEditingTool: (tool: Tool | null) => void;
  showToast: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
  exportData: (type: 'all' | 'online') => Promise<void>;
  importData: (data: { tools: Tool[]; categories: Category[] }) => Promise<{ imported: number; skipped: number }>;
  filteredTools: () => Tool[];
  toggleTheme: () => void;
  enableAutoBackup: () => Promise<boolean>;
  disableAutoBackup: () => void;
  restoreFromBackup: () => Promise<{ tools: Tool[]; categories: Category[] } | null>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentDialog, setCurrentDialog] = useState<DialogType>(null);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const { backupState, enableAutoBackup, disableAutoBackup, restoreFromBackup } = useAutoBackup(tools, categories);
  const [isAutoBackupEnabled, setIsAutoBackupEnabled] = useState(false);
  const [backupPath, setBackupPath] = useState<string | null>(null);
  const [lastBackupTime, setLastBackupTime] = useState<number | null>(null);

  useEffect(() => {
    setIsAutoBackupEnabled(backupState.isEnabled);
    setBackupPath(backupState.backupPath);
    setLastBackupTime(backupState.lastBackupTime);
  }, [backupState]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      await initializeDatabase();
      const loadedTools = await db.tools.toArray();
      const loadedCategories = await db.categories.orderBy('sortOrder').toArray();
      setTools(loadedTools);
      setCategories(loadedCategories);
    } catch (error) {
      console.error('Failed to load data:', error);
      showToast('数据加载失败', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToastMessage(message);
    setToastType(type);
  };

  const addTool = async (tool: Omit<Tool, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = Date.now();
    const newTool: Tool = {
      ...tool,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    await db.tools.add(newTool);
    setTools((prev) => [...prev, newTool]);
    showToast('工具添加成功', 'success');
  };

  const updateTool = async (id: string, updates: Partial<Tool>) => {
    const updatedData = { ...updates, updatedAt: Date.now() };
    await db.tools.update(id, updatedData);
    setTools((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t)));
    showToast('工具更新成功', 'success');
  };

  const deleteTool = async (id: string) => {
    await db.tools.delete(id);
    setTools((prev) => prev.filter((t) => t.id !== id));
    showToast('工具已删除', 'success');
  };

  const toggleFavorite = async (id: string) => {
    const tool = tools.find((t) => t.id === id);
    if (tool) {
      const newFavorite = !tool.isFavorite;
      await db.tools.update(id, { isFavorite: newFavorite, updatedAt: Date.now() });
      setTools((prev) => prev.map((t) => (t.id === id ? { ...t, isFavorite: newFavorite } : t)));
      showToast(newFavorite ? '已添加到收藏' : '已取消收藏', 'success');
    }
  };

  const addCategory = async (name: string) => {
    const existingCategory = categories.find(
      (c) => c.name.toLowerCase() === name.toLowerCase() && !c.isDefault
    );
    if (existingCategory) {
      showToast('分类名称已存在', 'warning');
      return;
    }
    const newCategory: Category = {
      id: uuidv4(),
      name,
      isDefault: false,
      sortOrder: categories.length + 1,
      createdAt: Date.now(),
    };
    await db.categories.add(newCategory);
    setCategories((prev) => [...prev, newCategory]);
    showToast('分类创建成功', 'success');
  };

  const updateCategory = async (id: string, name: string) => {
    const existingCategory = categories.find(
      (c) => c.id !== id && c.name.toLowerCase() === name.toLowerCase() && !c.isDefault
    );
    if (existingCategory) {
      showToast('分类名称已存在', 'warning');
      return;
    }
    await db.categories.update(id, { name });
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
    showToast('分类更新成功', 'success');
  };

  const deleteCategory = async (id: string) => {
    const category = categories.find((c) => c.id === id);
    if (!category || category.isDefault) {
      showToast('默认分类不能删除', 'warning');
      return;
    }
    const uncategorizedId = 'cat-other';
    await db.tools.where('categoryId').equals(id).modify({ categoryId: uncategorizedId });
    setTools((prev) => prev.map((t) => (t.categoryId === id ? { ...t, categoryId: uncategorizedId } : t)));
    await db.categories.delete(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    if (selectedCategoryId === id) {
      setSelectedCategoryId(null);
    }
    showToast('分类已删除', 'success');
  };

  const reorderCategories = async (id: string, newIndex: number) => {
    const category = categories.find((c) => c.id === id);
    if (!category) {
      return;
    }

    const sortedCategories = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
    const currentIndex = sortedCategories.findIndex((c) => c.id === id);
    
    if (currentIndex === -1 || newIndex < 0 || newIndex >= sortedCategories.length) {
      return;
    }

    sortedCategories.splice(currentIndex, 1);
    sortedCategories.splice(newIndex, 0, category);

    sortedCategories.forEach((c, index) => {
      c.sortOrder = index + 1;
    });
    
    for (const cat of sortedCategories) {
      await db.categories.update(cat.id, { sortOrder: cat.sortOrder });
    }
    
    setCategories(sortedCategories);
    showToast('分类顺序已更新', 'success');
  };

  const filteredTools = useCallback(() => {
    let result = tools;

    if (selectedCategoryId === 'favorites') {
      result = result.filter((t) => t.isFavorite);
    } else if (selectedCategoryId) {
      result = result.filter((t) => t.categoryId === selectedCategoryId);
    }

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(keyword) ||
          t.description.toLowerCase().includes(keyword)
      );
    }

    return result;
  }, [tools, selectedCategoryId, searchKeyword]);

  const exportData = async (type: 'all' | 'online') => {
    const toolsToExport = type === 'all' ? tools : tools.filter((t) => !t.isOffline);
    const exportData = {
      version: 'v1',
      exportedAt: Date.now(),
      tools: toolsToExport,
      categories: categories.filter((c) => c.isDefault || toolsToExport.some((t) => t.categoryId === c.id)),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolbox-export-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('数据导出成功', 'success');
  };

  const importData = async (data: { tools: Tool[]; categories: Category[] }) => {
    let imported = 0;
    let skipped = 0;

    const existingCategories = await db.categories.toArray();
    const existingCategoryNames = new Set(existingCategories.map((c) => c.name.toLowerCase()));

    for (const category of data.categories) {
      if (!existingCategoryNames.has(category.name.toLowerCase())) {
        if (!category.isDefault) {
          await db.categories.add({ ...category, id: uuidv4(), createdAt: Date.now() });
        }
      }
    }

    const updatedCategories = await db.categories.toArray();
    const categoryIdMap = new Map<string, string>();
    data.categories.forEach((c) => {
      const existing = updatedCategories.find((uc) => uc.name.toLowerCase() === c.name.toLowerCase());
      if (existing) {
        categoryIdMap.set(c.id, existing.id);
      }
    });

    const existingTools = await db.tools.toArray();
    const existingToolKeys = new Set(
      existingTools.map((t) => `${t.url}-${t.name}`.toLowerCase())
    );

    for (const tool of data.tools) {
      const toolKey = `${tool.url}-${tool.name}`.toLowerCase();
      const newCategoryId = categoryIdMap.get(tool.categoryId) || tool.categoryId;

      if (existingToolKeys.has(toolKey)) {
        skipped++;
        continue;
      }

      const newTool: Tool = {
        ...tool,
        id: uuidv4(),
        categoryId: newCategoryId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await db.tools.add(newTool);
      imported++;
    }

    await loadData();
    return { imported, skipped };
  };

  const toggleTheme = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        tools,
        categories,
        selectedCategoryId,
        searchKeyword,
        isLoading,
        currentDialog,
        editingTool,
        toastMessage,
        toastType,
        isDarkMode,
        loadData,
        addTool,
        updateTool,
        deleteTool,
        toggleFavorite,
        addCategory,
        updateCategory,
        deleteCategory,
        reorderCategories,
        setSelectedCategoryId,
        setSearchKeyword,
        setCurrentDialog,
        setEditingTool,
        showToast,
        exportData,
        importData,
        filteredTools,
        toggleTheme,
        isAutoBackupEnabled,
        backupPath,
        lastBackupTime,
        enableAutoBackup,
        disableAutoBackup,
        restoreFromBackup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
