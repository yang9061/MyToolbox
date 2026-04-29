import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function CategoryTabs() {
  const { categories, selectedCategoryId, setSelectedCategoryId, setCurrentDialog } = useApp();

  return (
    <div className="flex flex-wrap gap-2 pb-2">
      <button
        onClick={() => setSelectedCategoryId(null)}
        className={`shrink-0 h-8 px-4 rounded-full text-sm font-medium transition-colors duration-300 ${
          selectedCategoryId === null
            ? 'bg-primary text-white'
            : 'dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
        }`}
      >
        全部
      </button>
      <button
        onClick={() => setSelectedCategoryId('favorites')}
        className={`shrink-0 h-8 px-4 rounded-full text-sm font-medium transition-colors duration-300 ${
          selectedCategoryId === 'favorites'
            ? 'bg-primary text-white'
            : 'dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
        }`}
      >
        我的收藏
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategoryId(category.id)}
          className={`shrink-0 h-8 px-4 rounded-full text-sm font-medium transition-colors duration-300 ${
            selectedCategoryId === category.id
              ? 'bg-primary text-white'
              : 'dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
          }`}
        >
          {category.name}
        </button>
      ))}
      <button
        onClick={() => setCurrentDialog('category')}
        className="shrink-0 h-8 w-8 flex items-center justify-center rounded-full transition-colors duration-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-primary dark:hover:text-white bg-gray-100 text-gray-600 hover:bg-primary hover:text-white"
        aria-label="添加分类"
        title="添加分类"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
