import { Plus, Download, Upload, Settings } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { useApp } from '../context/AppContext';

export function Header() {
  const { setCurrentDialog } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b transition-colors duration-300 dark:bg-gray-900/35 dark:border-gray-700 bg-white/35 backdrop-blur-md border-gray-200">
      <div className="h-[64px] flex items-center justify-between max-w-7xl mx-auto px-4">
          <div className="max-w-md">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <button
              onClick={() => setCurrentDialog('export')}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm transition-colors duration-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 hover:text-gray-900 hover:bg-gray-100 rounded text-gray-600"
              title="导出数据"
            >
              <Download size={18} />
              <span>导出</span>
            </button>
            <button
              onClick={() => setCurrentDialog('import')}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm transition-colors duration-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 hover:text-gray-900 hover:bg-gray-100 rounded text-gray-600"
              title="导入数据"
            >
              <Upload size={18} />
              <span>导入</span>
            </button>
            <button
              onClick={() => setCurrentDialog('settings')}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm transition-colors duration-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 hover:text-gray-900 hover:bg-gray-100 rounded text-gray-600"
              title="设置"
            >
              <Settings size={18} />
              <span>设置</span>
            </button>
            <button
              onClick={() => setCurrentDialog('add')}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">添加工具</span>
            </button>
          </div>

          <div className="flex sm:hidden items-center gap-2 mt-3">
          <button
            onClick={() => setCurrentDialog('export')}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm transition-colors duration-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 hover:text-gray-900 hover:bg-gray-100 rounded text-gray-600"
          >
            <Download size={16} />
            <span>导出</span>
          </button>
          <button
            onClick={() => setCurrentDialog('import')}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm transition-colors duration-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 hover:text-gray-900 hover:bg-gray-100 rounded text-gray-600"
          >
            <Upload size={16} />
            <span>导入</span>
          </button>
        </div>
      </div>
    </header>
  );
}
