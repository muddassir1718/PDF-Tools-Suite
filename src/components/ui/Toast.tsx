import React from 'react';
import { Toast, ToastType } from '../../types';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onClose }) => {
  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
    }
  };

  const getBgClass = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30';
      case 'error':
        return 'bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30';
      case 'warning':
        return 'bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full font-sans">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg ${getBgClass(
              toast.type
            )}`}
          >
            {getIcon(toast.type)}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => onClose(toast.id)}
              className="text-gray-400 hover:text-gray-650 dark:hover:text-gray-300 transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
