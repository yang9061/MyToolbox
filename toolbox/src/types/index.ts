export interface Tool {
  id: string;
  name: string;
  url: string;
  icon: string;
  description: string;
  categoryId: string;
  isFavorite: boolean;
  isOffline: boolean;
  offlineFileName?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Category {
  id: string;
  name: string;
  isDefault: boolean;
  sortOrder: number;
  createdAt: number;
}

export interface ExportData {
  version: string;
  exportedAt: number;
  tools: Tool[];
  categories: Category[];
}

export interface PresetTool {
  id: string;
  name: string;
  url: string;
  icon: string;
  description: string;
  categoryId: string;
  isOffline: boolean;
  offlineFileName?: string;
}

export type DialogType = 'add' | 'edit' | 'category' | 'export' | 'import' | 'confirm' | null;

export interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
