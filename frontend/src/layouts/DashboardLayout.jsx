import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth.js";
import { navItemsByRole, roleLabels } from "../utils/appConstants.js";

export function DashboardLayout() {
  const { auth, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = navItemsByRole[auth.user.role];
  const initials = (auth.user.username || "U").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#070b13] text-white">
      <div className="flex min-h-screen">
        {/* Mobile backdrop */}
        {sidebarOpen ? (
          <div
            className="fixed inset-0 z-30 bg-[#070b13]/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}

        {/* Sidebar Panel */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/5 bg-[#090e18]/85 p-6 backdrop-blur-xl transition-all duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
        >
          <div className="mb-10 flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
              <span className="font-display text-xl font-extrabold tracking-wider text-white">S</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-indigo-400">SRMS Portal</p>
              <h1 className="font-display text-lg font-bold tracking-tight text-white">Academic Shell</h1>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 text-lg font-extrabold text-white shadow-md shadow-indigo-600/10">
              {initials}
            </div>
            <h2 className="mt-3 font-display text-base font-bold text-white">{auth.user.username}</h2>
            <span className="mt-1 inline-block rounded-full bg-indigo-500/10 px-3 py-0.5 text-[10px] font-semibold tracking-wider text-indigo-300">
              {roleLabels[auth.user.role]}
            </span>
          </div>

          <nav className="space-y-1.5">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
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
            className="mt-12 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20"
          >
            <FiLogOut />
            Logout
          </button>
        </aside>

        {/* Main Workspace Wrapper */}
        <div className="flex min-h-screen flex-1 flex-col bg-[#0b101b] text-slate-100">
          {/* Header Panel */}
          <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0b101b]/70 px-4 py-4 backdrop-blur-md md:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <button
                type="button"
                className="rounded-2xl border border-white/10 p-3 text-slate-300 hover:bg-white/5 lg:hidden"
                onClick={() => setSidebarOpen((open) => !open)}
              >
                {sidebarOpen ? <FiX /> : <FiMenu />}
              </button>

              <div className="hidden lg:flex items-center gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Active Workspace</p>
                  <h2 className="font-display text-sm font-semibold text-slate-300">
                    Student Results Management System
                  </h2>
                </div>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-white/5 bg-white/[0.01] px-5 py-3 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">Secure Node</p>
                  <p className="text-xs font-semibold text-slate-300">{auth.user.email}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
