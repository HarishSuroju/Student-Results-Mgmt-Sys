import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070b13] px-4 text-white">
      <div className="max-w-lg rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 text-center shadow-2xl backdrop-blur-md">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-indigo-400">SRMS</p>
        <p className="mt-6 font-display text-8xl font-black text-indigo-500">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold">Page not found</h1>
        <p className="mt-4 text-slate-400 text-sm leading-7">
          The page you requested is not part of this Student Result Management System workspace.
        </p>
        <Link
          to="/"
          className="glass-button-primary mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white active:scale-95 shadow-lg shadow-indigo-600/10"
        >
          <FiHome />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
