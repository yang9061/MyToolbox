import { Dialog } from './Dialog';
import { Button } from './Button';
import { useApp } from '../context/AppContext';
import { AlertTriangle } from 'lucide-react';

export function ConfirmDialog() {
  const { currentDialog, setCurrentDialog, editingTool, deleteTool } = useApp();
  const isOpen = currentDialog === 'confirm';
  const tool = editingTool;

  const handleClose = () => {
    setCurrentDialog(null);
  };

  const handleConfirm = async () => {
    if (tool) {
      await deleteTool(tool.id);
    }
    handleClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="确认删除" maxWidth="max-w-sm">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-error/20">
            <AlertTriangle size={24} className="text-error" />
          </div>
          <div>
            <div className="text-sm text-text-primary mb-2">
              确定要删除该工具吗？
            </div>
            {tool && (
              <div className="text-xs text-text-secondary">
                工具名称：{tool.name}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            确定删除
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
