import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="max-w-lg rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-300">404</p>
        <h1 className="mt-4 font-display text-5xl">Page not found</h1>
        <p className="mt-4 text-slate-300">The page you requested is not part of this SRMS workspace.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">
          Back to home
        </Link>
      </div>
    </div>
  );
}
