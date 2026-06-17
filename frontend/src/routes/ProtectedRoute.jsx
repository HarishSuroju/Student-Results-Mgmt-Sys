import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { routeByRole } from "../utils/appConstants.js";

export function ProtectedRoute({ children, roles }) {
  const { auth, isAuthenticated, bootstrapping } = useAuth();
  const location = useLocation();

  if (bootstrapping) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-center">
          <p className="font-display text-2xl">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!roles.includes(auth.user.role)) {
    return <Navigate to={routeByRole[auth.user.role]} replace />;
  }

  return children;
}
