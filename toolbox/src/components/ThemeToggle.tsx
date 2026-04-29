import { Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useApp();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors dark:hover:bg-gray-800 hover:bg-gray-100"
      aria-label={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
      title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
    >
      {isDarkMode ? (
        <Sun size={20} className="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-900" />
      ) : (
        <Moon size={20} className="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-900" />
      )}
    </button>
  );
}
