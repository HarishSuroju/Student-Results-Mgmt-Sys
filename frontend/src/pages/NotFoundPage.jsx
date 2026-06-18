import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="max-w-lg rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-300">SRMS</p>
        <p className="mt-6 font-display text-8xl font-bold text-indigo-400">404</p>
        <h1 className="mt-4 font-display text-3xl">Page not found</h1>
        <p className="mt-4 text-slate-300">
          The page you requested is not part of this Student Result Management System workspace.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <FiHome />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
