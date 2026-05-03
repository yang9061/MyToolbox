import { useState, useEffect } from 'react';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { Input } from './Input';
import { useApp } from '../context/AppContext';
import { Edit2, Trash2, GripVertical, AlertTriangle } from 'lucide-react';

export function CategoryDialog() {
  const { currentDialog, setCurrentDialog, categories, addCategory, updateCategory, deleteCategory, reorderCategories, getToolsCountInCategory } = useApp();
  const isOpen = currentDialog === 'category';

  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const [dragOverPosition, setDragOverPosition] = useState<'top' | 'bottom' | null>(null);
  
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
  const [deleteWithTools, setDeleteWithTools] = useState(false);

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
    setDeletingCategoryId(null);
    setDeleteWithTools(false);
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
    if (id === 'cat-other') return;
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

  const handleDeleteClick = (id: string) => {
    setDeletingCategoryId(id);
  };

  const handleCancelDelete = () => {
    setDeletingCategoryId(null);
    setDeleteWithTools(false);
  };

  const handleConfirmDelete = async () => {
    if (deletingCategoryId) {
      await deleteCategory(deletingCategoryId, deleteWithTools);
    }
    setDeletingCategoryId(null);
    setDeleteWithTools(false);
  };

  const deletingCategory = deletingCategoryId ? categories.find((c) => c.id === deletingCategoryId) : null;
  const toolsCount = deletingCategoryId ? getToolsCountInCategory(deletingCategoryId) : 0;

  const sortedCategories = [...categories].sort((a, b) => {
    if (a.id === 'cat-other') return 1;
    if (b.id === 'cat-other') return -1;
    return a.sortOrder - b.sortOrder;
  });

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
          {sortedCategories.map((category) => {
            const currentIndex = sortedCategories.findIndex((c) => c.id === category.id);
            const isDragging = draggedIndex === currentIndex;
            const isDropTarget = dropTargetIndex === currentIndex;
            const isOtherCategory = category.id === 'cat-other';

            const handleDragStart = (e: React.DragEvent) => {
              if (isOtherCategory) return;
              setDraggedIndex(currentIndex);
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', category.id);
            };

            const handleDragOver = (e: React.DragEvent) => {
              if (isOtherCategory) return;
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
              if (isOtherCategory || draggedIndex === null || draggedIndex === currentIndex) {
                resetDragState();
                return;
              }
              
              const draggedCategory = sortedCategories[draggedIndex];
              if (draggedCategory.id === 'cat-other') {
                resetDragState();
                return;
              }
              
              let targetIndex = currentIndex;
              
              if (dragOverPosition === 'top' && currentIndex > draggedIndex) {
                targetIndex = currentIndex - 1;
              } else if (dragOverPosition === 'bottom' && currentIndex < draggedIndex) {
                targetIndex = currentIndex + 1;
              }
              
              await reorderCategories(draggedCategory.id, targetIndex);
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
                {isDropTarget && dragOverPosition === 'top' && !isDragging && !isOtherCategory && (
                  <div className="h-1 bg-primary rounded-full mx-2 mb-0.5 transition-all duration-200" />
                )}
                <div
                  draggable={!isOtherCategory && editingId !== category.id}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                  className={`group flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ease-out ${
                    isDragging
                      ? 'opacity-40 scale-95 bg-gray-100 dark:bg-gray-800 border-dashed border-gray-300 dark:border-gray-600'
                      : isDropTarget && !isOtherCategory
                      ? dragOverPosition === 'top'
                        ? 'border-t-2 border-t-primary border-x border-b border-border dark:border-x-gray-600 dark:border-b-gray-600 mt-1'
                        : 'border-b-2 border-b-primary border-x border-t border-border dark:border-x-gray-600 dark:border-t-gray-600 mb-1'
                      : 'bg-card-bg border-border dark:border-gray-600 hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  } ${!isOtherCategory && editingId !== category.id ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
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
                        {!isOtherCategory && (
                          <span className="text-gray-400 hover:text-primary transition-colors cursor-grab active:cursor-grabbing" title="拖动调整顺序">
                            <GripVertical size={16} />
                          </span>
                        )}
                        <span className={`text-sm ${isOtherCategory ? 'text-gray-500 dark:text-gray-400' : 'text-text-primary'}`}>
                          {category.name}
                          {isOtherCategory && <span className="ml-2 text-xs text-gray-400">(默认)</span>}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {!isOtherCategory && (
                          <button
                            onClick={() => handleStartEdit(category.id, category.name)}
                            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                            aria-label="编辑"
                            title="编辑分类"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                        {category.id !== 'cat-other' && (
                          <button
                            onClick={() => handleDeleteClick(category.id)}
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
                {isDropTarget && dragOverPosition === 'bottom' && !isDragging && !isOtherCategory && (
                  <div className="h-1 bg-primary rounded-full mx-2 mt-0.5 transition-all duration-200" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {deletingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-full bg-error/20">
                <AlertTriangle size={24} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  确认删除分类
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  确定要删除「{deletingCategory.name}」分类吗？
                </p>
              </div>
            </div>

            {toolsCount > 0 && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  该分类下有 <span className="font-semibold text-primary">{toolsCount}</span> 个工具
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deleteOption"
                      checked={!deleteWithTools}
                      onChange={() => setDeleteWithTools(false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      仅删除分类，工具自动移至「其它」分类
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deleteOption"
                      checked={deleteWithTools}
                      onChange={() => setDeleteWithTools(true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm text-error">
                      删除分类及分类下所有工具（不可恢复）
                    </span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="secondary" onClick={handleCancelDelete}>
                取消
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                确认删除
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}