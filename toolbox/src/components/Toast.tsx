import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Toast() {
  const { toastMessage, toastType } = useApp();

  if (!toastMessage) return null;

  const getIcon = () => {
    switch (toastType) {
      case 'success':
        return <CheckCircle size={20} className="text-[#059669]" />;
      case 'error':
        return <AlertCircle size={20} className="text-[#dc2626]" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-[#d97706]" />;
      case 'info':
        return <Info size={20} className="text-[#2563eb]" />;
      default:
        return <Info size={20} className="text-[#2563eb]" />;
    }
  };

  const getStyles = () => {
    switch (toastType) {
      case 'success':
        return {
          backgroundColor: '#d1fae5',
          borderColor: '#10b981',
          color: '#065f46',
        };
      case 'error':
        return {
          backgroundColor: '#fee2e2',
          borderColor: '#ef4444',
          color: '#991b1b',
        };
      case 'warning':
        return {
          backgroundColor: '#fef3c7',
          borderColor: '#f59e0b',
          color: '#92400e',
        };
      case 'info':
        return {
          backgroundColor: '#dbeafe',
          borderColor: '#3b82f6',
          color: '#1e40af',
        };
      default:
        return {
          backgroundColor: '#dbeafe',
          borderColor: '#3b82f6',
          color: '#1e40af',
        };
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div 
        className="flex items-center gap-3 px-5 py-3 rounded-xl border shadow-md"
        style={getStyles()}
      >
        {getIcon()}
        <span className="text-sm font-medium">{toastMessage}</span>
      </div>
    </div>
  );
}
