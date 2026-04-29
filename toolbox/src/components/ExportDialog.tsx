import { useState } from 'react';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { useApp } from '../context/AppContext';

export function ExportDialog() {
  const { currentDialog, setCurrentDialog, exportData } = useApp();
  const isOpen = currentDialog === 'export';
  const [isExporting, setIsExporting] = useState(false);

  const handleClose = () => {
    setCurrentDialog(null);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportData('all');
      handleClose();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="导出数据" maxWidth="max-w-sm">
      <div className="space-y-4">
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-900 dark:text-white">导出全部工具</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">包含所有在线工具</div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? '导出中...' : '导出'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
