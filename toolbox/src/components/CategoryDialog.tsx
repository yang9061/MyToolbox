import { useState, useEffect } from 'react';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { Input } from './Input';
import { useApp } from '../context/AppContext';
import { Edit2, Trash2, GripVertical } from 'lucide-react';

export function CategoryDialog() {
  const { currentDialog, setCurrentDialog, categories, addCategory, updateCategory, deleteCategory, reorderCategories } = useApp();
  const isOpen = currentDialog === 'category';

  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const [dragOverPosition, setDragOverPosition] = useState<'top' | 'bottom' | null>(null);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setNewCategoryName('');
    setEditingId(null);
    setEditingName('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    setCurrentDialog(null);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategoryName.trim()) {
      setError('分类名称不能为空');
      return;
    }

    if (newCategoryName.length > 20) {
      setError('分类名称最长20字符');
      return;
    }

    await addCategory(newCategoryName.trim());
    setNewCategoryName('');
  };

  const handleStartEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleSaveEdit = async () => {
    if (!editingName.trim()) {
      setError('分类名称不能为空');
      return;
    }

    if (editingName.length > 20) {
      setError('分类名称最长20字符');
      return;
    }

    if (editingId) {
      await updateCategory(editingId, editingName.trim());
    }
    handleCancelEdit();
  };

  const handleDelete = (id: string) => {
    const category = categories.find((c) => c.id === id);
    if (category?.isDefault) {
      return;
    }
    deleteCategory(id);
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="分类管理" maxWidth="max-w-md">
      <div className="space-y-6">
        <form onSubmit={handleAdd} className="flex gap-2">
          <div className="flex-1">
            <Input
              value={newCategoryName}
              onChange={(e) => {
                setNewCategoryName(e.target.value);
                setError('');
              }}
              placeholder="输入新分类名称"
              maxLength={20}
              error={error}
            />
          </div>
          <Button type="submit">添加</Button>
        </form>

        <div className="space-y-1 max-h-64 overflow-y-auto">
          {categories.map((category) => {
            const sortedCategories = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
            const currentIndex = sortedCategories.findIndex((c) => c.id === category.id);
            const isDragging = draggedIndex === currentIndex;
            const isDropTarget = dropTargetIndex === currentIndex;

            const handleDragStart = (e: React.DragEvent) => {
              setDraggedIndex(currentIndex);
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', category.id);
            };

            const handleDragOver = (e: React.DragEvent) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
              
              const rect = e.currentTarget.getBoundingClientRect();
              const y = e.clientY - rect.top;
              const halfHeight = rect.height / 2;
              
              setDropTargetIndex(currentIndex);
              setDragOverPosition(y < halfHeight ? 'top' : 'bottom');
            };

            const handleDrop = async (e: React.DragEvent) => {
              e.preventDefault();
              if (draggedIndex !== null && draggedIndex !== currentIndex) {
                const draggedCategory = sortedCategories[draggedIndex];
                let targetIndex = currentIndex;
                
                if (dragOverPosition === 'top' && currentIndex > draggedIndex) {
                  targetIndex = currentIndex - 1;
                } else if (dragOverPosition === 'bottom' && currentIndex < draggedIndex) {
                  targetIndex = currentIndex + 1;
                }
                
                await reorderCategories(draggedCategory.id, targetIndex);
              }
              resetDragState();
            };

            const handleDragEnd = () => {
              resetDragState();
            };

            const resetDragState = () => {
              setDraggedIndex(null);
              setDropTargetIndex(null);
              setDragOverPosition(null);
            };

            return (
              <div key={category.id}>
                {isDropTarget && dragOverPosition === 'top' && !isDragging && (
                  <div className="h-1 bg-primary rounded-full mx-2 mb-0.5 transition-all duration-200" />
                )}
                <div
                  draggable={editingId !== category.id}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                  className={`group flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ease-out ${
                    isDragging
                      ? 'opacity-40 scale-95 bg-gray-100 dark:bg-gray-800 border-dashed border-gray-300 dark:border-gray-600'
                      : isDropTarget
                      ? dragOverPosition === 'top'
                        ? 'border-t-2 border-t-primary border-x border-b border-border dark:border-x-gray-600 dark:border-b-gray-600 mt-1'
                        : 'border-b-2 border-b-primary border-x border-t border-border dark:border-x-gray-600 dark:border-t-gray-600 mb-1'
                      : 'bg-card-bg border-border dark:border-gray-600 hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  } ${editingId !== category.id ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                >
                  {editingId === category.id ? (
                    <div className="flex-1 flex gap-2">
                      <Input
                        value={editingName}
                        onChange={(e) => {
                          setEditingName(e.target.value);
                          setError('');
                        }}
                        className="flex-1"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="p-1.5 rounded hover:bg-primary hover:text-white bg-primary/20 text-primary transition-colors"
                        aria-label="保存"
                        title="保存分类"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        aria-label="取消"
                        title="取消编辑"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 hover:text-primary transition-colors cursor-grab active:cursor-grabbing" title="拖动调整顺序">
                          <GripVertical size={16} />
                        </span>
                        <span className="text-sm text-text-primary">{category.name}</span>
                        {category.isDefault && (
                          <span className="text-xs px-2 py-0.5 rounded bg-accent/20 text-accent">
                            默认
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleStartEdit(category.id, category.name)}
                          className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                          aria-label="编辑"
                          title="编辑分类"
                        >
                          <Edit2 size={14} />
                        </button>
                        {!category.isDefault && (
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-error dark:hover:text-error transition-colors"
                            aria-label="删除"
                            title="删除分类"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
                {isDropTarget && dragOverPosition === 'bottom' && !isDragging && (
                  <div className="h-1 bg-primary rounded-full mx-2 mt-0.5 transition-all duration-200" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
}
