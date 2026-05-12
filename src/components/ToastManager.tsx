import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { X } from 'lucide-react';

type ToastTone = 'success' | 'error' | 'info';

type Toast = {
  id: string;
  message: string;
  tone: ToastTone;
};

type ToastContextValue = {
  showToast: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const ToastListContext = createContext<{ toasts: Toast[]; dismissToast: (id: string) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, tone: ToastTone = 'info') => {
    const id = crypto.randomUUID?.() ?? `${Date.now()}`;
    setToasts((current) => [...current, { id, message, tone }]);
    window.setTimeout(() => dismissToast(id), 6000);
  }, [dismissToast]);

  const api = useMemo(() => ({ showToast }), [showToast]);
  const list = useMemo(() => ({ toasts, dismissToast }), [toasts, dismissToast]);

  return (
    <ToastContext.Provider value={api}>
      <ToastListContext.Provider value={list}>{children}</ToastListContext.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside ToastProvider');
  }
  return context;
}

export function ToastManager() {
  const context = useContext(ToastListContext);
  if (!context) return null;

  return (
    <div aria-live="polite" aria-relevant="additions" className="fixed bottom-4 right-4 z-50 flex w-[min(92vw,24rem)] flex-col gap-3">
      {context.toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start justify-between gap-3 rounded-md border p-4 shadow-lg ${
            toast.tone === 'error'
              ? 'border-red-300 bg-red-50 text-red-900'
              : toast.tone === 'success'
                ? 'border-green-300 bg-green-50 text-green-900'
                : 'border-slate-300 bg-white text-slate-900'
          }`}
        >
          <p className="text-sm font-medium">{toast.message}</p>
          <button type="button" aria-label="Dismiss notification" onClick={() => context.dismissToast(toast.id)} className="rounded p-1 hover:bg-black/10">
            <X aria-hidden="true" size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
