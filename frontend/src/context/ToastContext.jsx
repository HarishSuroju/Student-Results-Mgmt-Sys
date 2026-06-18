import { createContext, useCallback, useContext, useState } from "react";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "info") => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), 4000);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) return () => {};
  return ctx;
}

const iconMap = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  info: FiInfo,
};

const styleMap = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  error: "border-rose-200 bg-rose-50 text-rose-800",
  info: "border-sky-200 bg-sky-50 text-sky-800",
};

const iconStyleMap = {
  success: "text-emerald-500",
  error: "text-rose-500",
  info: "text-sky-500",
};

function ToastItem({ toast, onClose }) {
  const Icon = iconMap[toast.type] || iconMap.info;

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-lg backdrop-blur-sm animate-[slideInRight_0.3s_ease-out] ${styleMap[toast.type] || styleMap.info}`}
    >
      <Icon className={`shrink-0 text-lg ${iconStyleMap[toast.type] || iconStyleMap.info}`} />
      <p className="text-sm font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 shrink-0 rounded-full p-1 opacity-60 transition hover:opacity-100"
      >
        <FiX className="text-sm" />
      </button>
    </div>
  );
}
