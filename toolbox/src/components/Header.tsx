import { useState, useEffect } from 'react';
import { Plus, Download, Upload, Wrench, Settings } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { useApp } from '../context/AppContext';

export function Header() {
  const { setCurrentDialog } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('专属工具箱');

  useEffect(() => {
    const saved = localStorage.getItem('appTitle');
    if (saved) {
      setTitle(saved);
    }
  }, []);

  const handleSaveTitle = () => {
    localStorage.setItem('appTitle', title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      const saved = localStorage.getItem('appTitle');
      if (saved) {
        setTitle(saved);
      } else {
        setTitle('专属工具箱');
      }
    }
  };

  const handleBlur = () => {
    handleSaveTitle();
  };

  return (
    <header className="sticky top-0 z-40 border-b transition-colors duration-300 dark:bg-gray-900/35 dark:border-gray-700 bg-white/35 backdrop-blur-md border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Wrench size={24} className="text-white" />
            </div>
            <div className="hidden sm:block">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  className="text-xl font-bold bg-transparent border-b-2 border-primary px-1 py-0.5 outline-none transition-colors duration-300 dark:text-white text-gray-900 max-w-40"
                  autoFocus
                />
              ) : (
                <h1
                  className="text-xl font-bold transition-colors duration-300 dark:text-white text-gray-900 cursor-pointer hover:text-primary"
                  title="双击修改名称"
                  onDoubleClick={() => setIsEditing(true)}
                >
                  {title}
                </h1>
              )}
            </div>
          </div>

          <div className="flex-1 flex justify-center max-w-2xl">
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
