import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  LayoutGrid,
  Star,
  PenTool,
  GitBranch,
  Network,
  FileText,
  CheckSquare,
  BarChart3,
  Users,
  Wand2,
  Code,
  Sparkles,
  Image,
  Search,
  TrendingUp,
  Repeat,
  Zap,
  Globe,
  Code2,
  Github,
  Archive,
  Wrench,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
  onWidthChange?: (width: number) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'cat-prototype': <PenTool size={18} />,
  'cat-flowchart': <GitBranch size={18} />,
  'cat-mindmap': <Network size={18} />,
  'cat-doc': <FileText size={18} />,
  'cat-project': <CheckSquare size={18} />,
  'cat-data': <BarChart3 size={18} />,
  'cat-research': <Users size={18} />,
  'cat-ai-design': <Wand2 size={18} />,
  'cat-ai-code': <Code size={18} />,
  'cat-ai-content': <Sparkles size={18} />,
  'cat-design': <Image size={18} />,
  'cat-competitor': <Search size={18} />,
  'cat-growth': <TrendingUp size={18} />,
  'cat-format-conversion': <Repeat size={18} />,
  'cat-efficiency': <Zap size={18} />,
  'cat-community': <Globe size={18} />,
  'cat-dev': <Code2 size={18} />,
  'cat-github-skills': <Github size={18} />,
  'cat-other': <Archive size={18} />,
};

export function Sidebar({ onCollapseChange, onWidthChange }: SidebarProps) {
  const { categories, selectedCategoryId, setSelectedCategoryId, setCurrentDialog } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(() => {
    const saved = localStorage.getItem('appTitle');
    return saved && saved !== '个人专属工具箱' ? saved : '个人工具箱';
  });
  const [sidebarWidth, setSidebarWidth] = useState(224);
  const [isDragging, setIsDragging] = useState(false);
  const minWidth = 64;
  const maxWidth = 320;

  const handleCollapseChange = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (newState) {
      setSidebarWidth(minWidth);
    } else {
      setSidebarWidth(224);
    }
    onCollapseChange?.(newState);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newWidth = e.clientX;
      const clampedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
      setSidebarWidth(clampedWidth);
      setIsCollapsed(clampedWidth <= minWidth);
      onWidthChange?.(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minWidth, maxWidth, onWidthChange]);

  useEffect(() => {
    onWidthChange?.(sidebarWidth);
  }, [sidebarWidth, onWidthChange]);

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
      setTitle(saved || '个人工具箱');
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    return categoryIcons[categoryId] || <GitBranch size={18} />;
  };

  return (
    <aside
      className="fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40"
      style={{ width: `${sidebarWidth}px` }}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={handleCollapseChange}
            className="-ml-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors z-10"
            title={isCollapsed ? '展开' : '收起'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          {sidebarWidth > minWidth && (
            <div className="flex items-center gap-3 flex-1 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Wrench size={18} className="text-white" />
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSaveTitle}
                  className="text-lg font-bold bg-transparent border-b-2 border-primary px-1 py-0.5 outline-none transition-colors duration-300 dark:text-white text-gray-900 flex-1"
                  autoFocus
                />
              ) : (
                <span
                  className="text-lg font-bold text-gray-900 dark:text-white cursor-pointer hover:text-primary truncate flex-1"
                  title="双击修改名称"
                  onDoubleClick={() => setIsEditing(true)}
                >
                  {title}
                </span>
              )}
            </div>
          )}
        </div>

        <nav className={`flex-1 py-4 overflow-y-auto ${isCollapsed ? 'overflow-x-hidden' : ''}`}>
          <div className={`space-y-1 ${isCollapsed ? 'px-1' : 'px-2'}`}>
            <NavItem
              icon={<LayoutGrid size={18} />}
              label="全部"
              isActive={selectedCategoryId === null}
              onClick={() => setSelectedCategoryId(null)}
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={<Star size={18} />}
              label="我的收藏"
              isActive={selectedCategoryId === 'favorites'}
              onClick={() => setSelectedCategoryId('favorites')}
              isCollapsed={isCollapsed}
            />

            {[...categories].sort((a, b) => {
              if (a.id === 'cat-other') return 1;
              if (b.id === 'cat-other') return -1;
              return a.sortOrder - b.sortOrder;
            }).map((category) => (
              <NavItem
                key={category.id}
                icon={getCategoryIcon(category.id)}
                label={category.name}
                isActive={selectedCategoryId === category.id}
                onClick={() => setSelectedCategoryId(category.id)}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </nav>

        <div className="h-[50px] p-2 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setCurrentDialog('category')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? '添加分类' : ''}
          >
            <Plus size={18} />
            {!isCollapsed && <span className="text-sm font-medium">添加分类</span>}
          </button>
        </div>

        <div
          className={`absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ${
            isDragging ? 'bg-gray-400 dark:bg-gray-500' : ''
          }`}
          onMouseDown={handleMouseDown}
          title="拖动调整宽度"
        />
      </div>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  isActive,
  onClick,
  isCollapsed,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center py-2.5 rounded-lg transition-all duration-200 relative group ${
        isActive
          ? 'bg-primary text-white'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      } ${isCollapsed ? 'justify-center px-1' : 'gap-3 px-3'}`}
      title={isCollapsed ? label : ''}
    >
      <span className={`transition-colors ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'}`}>
        {icon}
      </span>
      {!isCollapsed && <span className="text-sm font-medium truncate">{label}</span>}
      
      {isCollapsed && (
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
          {label}
        </span>
      )}
    </button>
  );
}