import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),_transparent_45%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_50%,_#f7f7fb_100%)] text-slate-900">
      <Outlet />
    </div>
  );
}
