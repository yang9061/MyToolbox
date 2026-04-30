import { Dialog } from './Dialog';
import { Button } from './Button';
import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';

export function SettingsDialog() {
  const { 
    currentDialog, 
    setCurrentDialog, 
    showToast, 
    tools,
    categories,
    isAutoBackupEnabled,
    backupPath,
    lastBackupTime,
    enableAutoBackup,
    disableAutoBackup,
  } = useApp();
  const isOpen = currentDialog === 'settings';
  const [isEnablingAutoBackup, setIsEnablingAutoBackup] = useState(false);
  const [browserSupported, setBrowserSupported] = useState(false);

  useEffect(() => {
    setBrowserSupported(!!window.showSaveFilePicker);
  }, []);

  const handleClose = () => {
    setCurrentDialog(null);
  };

  const handleEnableAutoBackup = async () => {
    if (!browserSupported) {
      showToast('您的浏览器不支持自动备份功能', 'warning');
      return;
    }

    setIsEnablingAutoBackup(true);
    try {
      await enableAutoBackup();
      showToast('自动备份已启用，数据会自动保存到本地文件', 'success');
    } catch (error) {
      console.error('Failed to enable auto backup:', error);
      showToast('启用失败', 'error');
    } finally {
      setIsEnablingAutoBackup(false);
    }
  };

  const handleDisableAutoBackup = () => {
    disableAutoBackup();
    showToast('自动备份已关闭', 'info');
  };

  const formatTime = (timestamp: number) => {
    if (!timestamp) return '未知';
    return new Date(timestamp).toLocaleString('zh-CN');
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="设置"
      maxWidth="max-w-md"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
            自动备份
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            启用后，每次修改工具数据都会自动保存到本地文件，即使清空浏览器缓存也不会丢失。
          </p>
          
          {!browserSupported && (
            <div className="mb-3 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded text-xs text-yellow-700 dark:text-yellow-300">
              您的浏览器不支持此功能，请使用现代浏览器（如 Chrome、Edge、Firefox）。
            </div>
          )}

          {isAutoBackupEnabled ? (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded">
                <p className="text-xs text-green-700 dark:text-green-300">
                  ✅ 自动备份已启用
                </p>
                {backupPath && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    备份文件: {backupPath}
                  </p>
                )}
                {lastBackupTime && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    最后备份: {formatTime(lastBackupTime)}
                  </p>
                )}
              </div>
              <Button variant="danger" onClick={handleDisableAutoBackup}>
                关闭自动备份
              </Button>
            </div>
          ) : (
            <Button onClick={handleEnableAutoBackup} loading={isEnablingAutoBackup}>
              启用自动备份
            </Button>
          )}
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
            数据统计
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">工具数量</p>
              <p className="text-lg font-semibold">{tools.length}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">分类数量</p>
              <p className="text-lg font-semibold">{categories.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={handleClose}>
          关闭
        </Button>
      </div>
    </Dialog>
  );
}
