import { useApp } from '../context/AppContext';

export function Footer() {
  const { tools, filteredTools, selectedCategoryId, searchKeyword } = useApp();
  const displayedTools = filteredTools();
  const totalCount = tools.length;
  const currentCount = displayedTools.length;

  const categoryLabel = selectedCategoryId === 'favorites'
    ? '我的收藏'
    : selectedCategoryId
    ? ''
    : '';

  return (
    <footer className="sticky bottom-0 z-30 border-t transition-colors duration-300 dark:bg-gray-900/35 dark:border-gray-700 bg-white/35 backdrop-blur-md border-gray-200">
      <div className="h-[50px] max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between text-xs transition-colors duration-300 dark:text-gray-400 text-gray-600">
          <div>
            {categoryLabel && (
              <span>
                {categoryLabel}：{currentCount} 个工具
              </span>
            )}
            {!categoryLabel && searchKeyword && (
              <span>
                搜索结果：{currentCount} 个工具
              </span>
            )}
            {!categoryLabel && !searchKeyword && (
              <span>
                共 {currentCount} 个工具
              </span>
            )}
          </div>
          <div>
            总计 {totalCount} 个工具
          </div>
        </div>
      </div>
    </footer>
  );
}
