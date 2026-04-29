import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Toast() {
  const { toastMessage, toastType } = useApp();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle size={20} className="text-success" />,
    error: <AlertCircle size={20} className="text-error" />,
    warning: <AlertTriangle size={20} className="text-warning" />,
    info: <Info size={20} className="text-info" />,
  };

  const bgColors = {
    success: 'bg-success/20 border-success',
    error: 'bg-error/20 border-error',
    warning: 'bg-warning/20 border-warning',
    info: 'bg-info/20 border-info',
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors duration-300 ${bgColors[toastType]} dark:shadow-dark-border/30 shadow-light-border/30`}>
        {icons[toastType]}
        <span className="text-sm transition-colors duration-300 dark:text-dark-text-primary text-light-text-primary">{toastMessage}</span>
      </div>
    </div>
  );
}
