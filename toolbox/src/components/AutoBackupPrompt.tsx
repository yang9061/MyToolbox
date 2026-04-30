import { Dialog } from './Dialog';
import { Button } from './Button';
import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';

export function AutoBackupPrompt() {
  const { 
    showToast, 
    enableAutoBackup,
    isAutoBackupEnabled,
  } = useApp();
  const [isEnabling, setIsEnabling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleShowPrompt = () => {
      if (isAutoBackupEnabled) {
        return;
      }

      const isDismissed = localStorage.getItem('autoBackupPromptDismissed') === 'true';
      if (!isDismissed) {
        setIsOpen(true);
      }
    };

    setTimeout(handleShowPrompt, 500);
  }, [isAutoBackupEnabled]);

  const handleEnable = async () => {
    if (!window.showSaveFilePicker) {
      showToast('您的浏览器不支持此功能，请使用现代浏览器', 'warning');
      setIsOpen(false);
      return;
    }

    setIsEnabling(true);
    try {
      const success = await enableAutoBackup();
      if (success) {
        showToast('自动备份已启用，数据会自动保存到本地文件', 'success');
      } else {
        showToast('启用失败', 'error');
      }
    } catch (error) {
      console.error('Failed to enable auto backup:', error);
      showToast('启用失败', 'error');
    } finally {
      setIsEnabling(false);
      setIsOpen(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('autoBackupPromptDismissed', 'true');
    setIsOpen(false);
  };

  const handleClose = () => {
    handleSkip();
  };

  if (isAutoBackupEnabled) {
    return null;
  }

  const isDismissed = localStorage.getItem('autoBackupPromptDismissed') === 'true';
  if (isDismissed) {
    return null;
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="数据安全提醒"
      maxWidth="max-w-md"
      showCloseButton={false}
    >
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            为了防止数据丢失，建议启用自动备份功能。开启后，您的工具数据会自动保存到本地文件中，即使清空浏览器缓存也不会丢失。
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            开启自动备份后：
          </h4>
          <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <li>• 添加、删除、修改工具时自动保存</li>
            <li>• 数据保存在您选择的本地文件夹中</li>
            <li>• 清空浏览器缓存后可从备份恢复</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            如果不开启：
          </h4>
          <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <li>• 数据仅保存在浏览器缓存中</li>
            <li>• 清空缓存后数据会恢复到初始状态</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button variant="secondary" onClick={handleSkip}>
          暂不开启
        </Button>
        <Button onClick={handleEnable} loading={isEnabling}>
          立即开启
        </Button>
      </div>
    </Dialog>
  );
}
