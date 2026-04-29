import { useState, useRef } from 'react';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { useApp } from '../context/AppContext';
import { Upload, AlertCircle } from 'lucide-react';
import { ExportData } from '../types';

export function ImportDialog() {
  const { currentDialog, setCurrentDialog, importData } = useApp();
  const isOpen = currentDialog === 'import';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<ExportData | null>(null);
  const [error, setError] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewData(null);
    setError('');
    setCurrentDialog(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.json')) {
        setError('请选择JSON格式的文件');
        setSelectedFile(null);
        setPreviewData(null);
        return;
      }

      setSelectedFile(file);
      setError('');

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string) as ExportData;

          if (!data.version || !data.tools || !data.categories) {
            setError('文件格式不正确');
            setPreviewData(null);
            return;
          }

          setPreviewData(data);
        } catch {
          setError('文件内容损坏，无法导入');
          setPreviewData(null);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImport = async () => {
    if (!previewData) return;

    setIsImporting(true);
    try {
      await importData(previewData);
      handleClose();
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="导入数据" maxWidth="max-w-md">
      <div className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!previewData ? (
          <label
            className={`flex flex-col items-center justify-center gap-3 p-8 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
              error
                ? 'border-error bg-error/5'
                : 'border-border hover:border-accent hover:bg-accent/5'
            }`}
          >
            <Upload size={32} className={error ? 'text-error' : 'text-text-secondary'} />
            <div className="text-center">
              <div className="text-sm font-medium text-text-primary">
                点击选择JSON文件
              </div>
              <div className="text-xs text-text-secondary mt-1">
                支持从工具箱导出的备份文件
              </div>
            </div>
            <input
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="sr-only"
            />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-card-bg rounded-lg border border-border">
              <div className="text-sm font-medium text-text-primary mb-3">
                导入预览
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">工具数量</span>
                  <span className="text-text-primary">{previewData.tools.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">分类数量</span>
                  <span className="text-text-primary">{previewData.categories.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">导出时间</span>
                  <span className="text-text-primary">
                    {new Date(previewData.exportedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-info/10 rounded-lg border border-info/30">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-info mt-0.5" />
                <div className="text-xs text-info">
                  导入时将跳过已存在的工具（根据URL和名称判断）
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-sm text-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button
            onClick={handleImport}
            disabled={!previewData || isImporting}
          >
            {isImporting ? '导入中...' : '确认导入'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
