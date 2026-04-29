import { Star, ExternalLink, Edit2, Trash2 } from 'lucide-react';
import { Tool } from '../types';
import { useApp } from '../context/AppContext';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { toggleFavorite, setEditingTool, setCurrentDialog, setEditingTool: setEdit } = useApp();

  const handleClick = () => {
    if (tool.url) {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(tool.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEdit(tool);
    setCurrentDialog('edit');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTool(tool);
    setCurrentDialog('confirm');
  };

  return (
    <div
      className="group relative rounded-lg p-4 cursor-pointer transition-all duration-200 shadow-lg dark:shadow-gray-700/20 shadow-gray-200/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-gray-700/40 bg-white border-gray-200"
      onClick={handleClick}
    >
      <button
        onClick={handleFavorite}
        className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
          tool.isFavorite
            ? 'text-warning bg-warning/20'
            : 'dark:opacity-0 dark:text-gray-400 dark:group-hover:opacity-100 dark:hover:text-warning opacity-0 text-gray-500 group-hover:opacity-100 hover:text-warning'
        }`}
        aria-label={tool.isFavorite ? '取消收藏' : '添加收藏'}
        title={tool.isFavorite ? '取消收藏' : '添加收藏'}
      >
        <Star size={16} fill={tool.isFavorite ? 'currentColor' : 'none'} />
      </button>

      <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEdit}
          className="p-1.5 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label="编辑"
          title="编辑工具"
        >
          <Edit2 size={14} />
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 rounded-full bg-error/20 text-error hover:bg-error hover:text-white transition-colors"
          aria-label="删除"
          title="删除工具"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 mb-3 rounded-lg overflow-hidden flex items-center justify-center dark:bg-gray-900 bg-gray-100">
          <img
            src={tool.icon}
            alt={tool.name}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" /%3E%3Cpath d="M9 9h6M9 12h6M9 15h4" /%3E%3C/svg%3E';
            }}
          />
        </div>
        <h3 className="text-sm font-medium transition-colors duration-300 dark:text-white text-gray-900 mb-1 line-clamp-1" title={tool.name}>
          {tool.name}
        </h3>
        <p className="text-xs transition-colors duration-300 dark:text-gray-400 text-gray-600 line-clamp-2 h-8" title={tool.description}>
          {tool.description}
        </p>
        {tool.url && (
          <div className="mt-2 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={12} />
            <span>新窗口打开</span>
          </div>
        )}
      </div>
    </div>
  );
}
