import { Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState, useEffect, useRef } from 'react';

export function SearchBar() {
  const { searchKeyword, setSearchKeyword } = useApp();
  const [localKeyword, setLocalKeyword] = useState(searchKeyword);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    debounceRef.current = window.setTimeout(() => {
      setSearchKeyword(localKeyword);
    }, 200);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [localKeyword, setSearchKeyword]);

  const handleClear = () => {
    setLocalKeyword('');
    setSearchKeyword('');
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={localKeyword}
        onChange={(e) => setLocalKeyword(e.target.value)}
        placeholder="输入关键字搜索工具"
        maxLength={50}
        className="w-full h-10 pl-10 pr-10 transition-colors duration-300 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-500 dark:text-white bg-white placeholder-gray-500 focus:ring-1 focus:ring-primary rounded-full text-sm text-gray-900 focus:outline-none"
      />
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 dark:text-gray-400 text-gray-500"
      />
      {localKeyword && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors duration-300 dark:hover:bg-gray-700/30 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200/30 text-gray-500 hover:text-gray-900"
          aria-label="清空搜索"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
