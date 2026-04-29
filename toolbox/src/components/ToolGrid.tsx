import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ToolCard } from './ToolCard';

export function ToolGrid() {
  const { filteredTools, searchKeyword, isLoading, selectedCategoryId } = useApp();
  const tools = filteredTools();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="transition-colors duration-300 dark:text-gray-400 text-gray-600">加载中...</div>
      </div>
    );
  }

  if (tools.length === 0) {
    const categoryLabel = selectedCategoryId === 'favorites'
      ? '我的收藏'
      : selectedCategoryId
      ? '该分类'
      : '';

    const message = searchKeyword
      ? '未找到匹配的工具'
      : categoryLabel
      ? `${categoryLabel}下还没有工具`
      : '暂无工具';

    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Search size={48} className="transition-colors duration-300 dark:text-gray-400/50 text-gray-500/50 mb-4" />
        <div className="transition-colors duration-300 dark:text-gray-400 text-gray-600">{message}</div>
        {searchKeyword && (
          <div className="text-xs transition-colors duration-300 dark:text-gray-400 text-gray-600 mt-2">
            尝试其他关键字搜索
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
