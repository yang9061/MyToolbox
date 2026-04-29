import { useState, useEffect } from 'react';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { useApp } from '../context/AppContext';

interface ToolDialogProps {
  isEdit?: boolean;
}

export function ToolDialog({ isEdit = false }: ToolDialogProps) {
  const { currentDialog, setCurrentDialog, editingTool, addTool, updateTool, categories } = useApp();
  const isOpen = currentDialog === (isEdit ? 'edit' : 'add');

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('');
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && editingTool) {
      setName(editingTool.name);
      setUrl(editingTool.url);
      setIcon(editingTool.icon);
      setIconPreview(editingTool.icon);
      setDescription(editingTool.description);
      setCategoryId(editingTool.categoryId);
    } else {
      resetForm();
    }
  }, [isEdit, editingTool, isOpen]);

  const resetForm = () => {
    setName('');
    setUrl('');
    setIcon('');
    setIconPreview(null);
    setDescription('');
    setCategoryId(categories[0]?.id || '');
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    setCurrentDialog(null);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = '工具名称不能为空';
    } else if (name.length > 50) {
      newErrors.name = '工具名称最长50字符';
    }

    if (!isEdit && !url.trim()) {
      newErrors.url = '工具URL不能为空';
    } else if (url.trim() && !isValidUrl(url)) {
      newErrors.url = '请输入有效的URL地址';
    }

    if (description.length > 200) {
      newErrors.description = '描述最长200字符';
    }

    if (!categoryId) {
      newErrors.categoryId = '请选择分类';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleIconChange = (file: File | null) => {
    if (file) {
      if (file.size > 100 * 1024) {
        setErrors((prev) => ({ ...prev, icon: '图标文件过大，请选择小于100KB的图片' }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setIcon(result);
        setIconPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetFavicon = async () => {
    if (!url || !isValidUrl(url)) {
      setErrors((prev) => ({ ...prev, url: '请先输入有效的URL地址' }));
      return;
    }

    try {
      const domain = new URL(url).hostname;
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
      
      const response = await fetch(faviconUrl);
      if (response.ok) {
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setIcon(result);
          setIconPreview(result);
          setErrors((prev) => ({ ...prev, icon: '' }));
        };
        reader.readAsDataURL(blob);
      } else {
        setErrors((prev) => ({ ...prev, icon: '无法获取网站图标' }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, icon: '获取图标失败' }));
    }
  };

  const handlePasteIcon = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      
      for (const item of clipboardItems) {
        if (item.types.includes('image/png') || item.types.includes('image/jpeg') || item.types.includes('image/webp')) {
          const blob = await item.getType(item.types.find(t => t.startsWith('image/'))!);
          
          if (blob.size > 100 * 1024) {
            setErrors((prev) => ({ ...prev, icon: '图标文件过大，请选择小于100KB的图片' }));
            return;
          }
          
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            setIcon(result);
            setIconPreview(result);
            setErrors((prev) => ({ ...prev, icon: '' }));
          };
          reader.readAsDataURL(blob);
          return;
        }
      }
      
      setErrors((prev) => ({ ...prev, icon: '剪贴板中没有图片' }));
    } catch (error) {
      console.error('Failed to paste image:', error);
      setErrors((prev) => ({ ...prev, icon: '粘贴失败，请重试' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const toolData = {
      name: name.trim(),
      url: url.trim(),
      icon: icon || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" /%3E%3Cpath d="M9 9h6M9 12h6M9 15h4" /%3E%3C/svg%3E',
      description: description.trim(),
      categoryId,
      isFavorite: editingTool?.isFavorite || false,
      isOffline: false,
    };

    if (isEdit && editingTool) {
      await updateTool(editingTool.id, toolData);
    } else {
      await addTool(toolData);
    }

    handleClose();
  };

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? '编辑工具' : '添加工具'}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="工具名称"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入工具名称"
          maxLength={50}
          error={errors.name}
        />

        {!isEdit && (
          <Input
            label="工具URL"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            error={errors.url}
          />
        )}

        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            图标
          </label>
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 flex items-center justify-center border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-800">
              {iconPreview ? (
                <img
                  src={iconPreview}
                  alt="图标预览"
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center text-gray-400 dark:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                {!isEdit && (
                  <Button
                    type="button"
                    onClick={handleGetFavicon}
                  >
                    自动获取
                  </Button>
                )}
                <Button
                  type="button"
                  variant="secondary"
                >
                  <label className="flex items-center justify-center gap-2 cursor-pointer w-full h-full">
                    上传图标
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleIconChange(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handlePasteIcon}
                >
                  粘贴图标
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                自动获取将从网站获取图标，或手动上传，或从剪贴板粘贴
              </p>
              {errors.icon && (
                <p className="text-xs text-error">{errors.icon}</p>
              )}
            </div>
          </div>
        </div>

        <Textarea
          label="描述（可选）"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="输入工具描述"
          rows={3}
          maxLength={200}
          error={errors.description}
        />

        <Select
          label="分类"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          options={categoryOptions}
          error={errors.categoryId}
          selectClassName="focus:bg-white dark:focus:bg-gray-600"
        />

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button type="submit">
            {isEdit ? '保存' : '添加'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
