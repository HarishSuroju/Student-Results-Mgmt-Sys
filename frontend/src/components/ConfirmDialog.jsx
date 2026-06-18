import { FiAlertTriangle, FiX } from "react-icons/fi";

export function ConfirmDialog({ open, title, message, confirmLabel = "Delete", onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[#070b13]/70 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-[1.75rem] border border-white/5 bg-[#0b101b] p-7 shadow-2xl animate-[scaleIn_0.2s_ease-out] text-white">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <FiX />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20">
          <FiAlertTriangle className="text-xl text-rose-400" />
        </div>

        <h3 className="mt-5 font-display text-xl font-bold text-white">{title || "Confirm Action"}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {message || "Are you sure you want to proceed? This action cannot be undone."}
        </p>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 active:scale-95 shadow-lg shadow-rose-600/10"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
