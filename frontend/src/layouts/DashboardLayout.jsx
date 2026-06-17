import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth.js";
import { navItemsByRole, roleLabels } from "../utils/appConstants.js";

export function DashboardLayout() {
  const { auth, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = navItemsByRole[auth.user.role];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-slate-950/95 p-6 backdrop-blur transition-transform lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">SRMS Portal</p>
            <h1 className="mt-3 font-display text-3xl">Student Results</h1>
            <p className="mt-2 text-sm text-slate-300">{roleLabels[auth.user.role]} workspace</p>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    isActive ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "text-slate-300 hover:bg-white/8"
                  }`
                }
              >
                <Icon className="text-lg" />
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={logout}
            className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10"
          >
            <FiLogOut />
            Logout
          </button>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col bg-[linear-gradient(180deg,_#f7fafc_0%,_#e2e8f0_100%)] text-slate-900">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 px-4 py-4 backdrop-blur md:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <button
                type="button"
                className="rounded-xl border border-slate-200 p-3 text-slate-700 lg:hidden"
                onClick={() => setSidebarOpen((open) => !open)}
              >
                {sidebarOpen ? <FiX /> : <FiMenu />}
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Signed in as</p>
                <h2 className="font-display text-xl">{auth.user.username}</h2>
              </div>
              <div className="rounded-2xl bg-slate-900 px-4 py-3 text-right text-white shadow-lg shadow-slate-900/10">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">{roleLabels[auth.user.role]}</p>
                <p className="text-sm text-slate-100">{auth.user.email}</p>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
