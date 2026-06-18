import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#070b13] text-white">
      <Outlet />
    </div>
  );
}
