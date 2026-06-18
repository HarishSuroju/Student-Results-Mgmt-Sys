import { createContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService.js";

const storageKey = "srms_auth";

export const AuthContext = createContext(null);

let _toastFn = null;
export function setAuthToast(fn) { _toastFn = fn; }

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : { token: null, user: null, profile: null };
  });
  const [bootstrapping, setBootstrapping] = useState(Boolean(auth.token));

  useEffect(() => {
    if (!auth.token) {
      setBootstrapping(false);
      return;
    }

    if (auth.profile) {
      setBootstrapping(false);
      return;
    }

    let ignore = false;

    async function hydrateProfile() {
      try {
        const response = await authService.profile();
        if (!ignore) {
          setAuth((current) => {
            const nextAuth = { ...current, profile: response.data.profile, user: response.data.user };
            localStorage.setItem(storageKey, JSON.stringify(nextAuth));
            return nextAuth;
          });
        }
      } catch {
        if (!ignore) {
          localStorage.removeItem(storageKey);
          setAuth({ token: null, user: null, profile: null });
        }
      } finally {
        if (!ignore) {
          setBootstrapping(false);
        }
      }
    }

    hydrateProfile();
    return () => {
      ignore = true;
    };
  }, [auth.token, auth.profile]);

  const value = useMemo(
    () => ({
      auth,
      bootstrapping,
      isAuthenticated: Boolean(auth.token && auth.user),
      async login(credentials) {
        const response = await authService.login(credentials);
        const nextAuth = {
          token: response.data.token,
          user: response.data.user,
          profile: null,
        };

        setBootstrapping(true);
        setAuth(nextAuth);
        localStorage.setItem(storageKey, JSON.stringify(nextAuth));
        _toastFn?.("Login successful! Welcome back.", "success");
        return nextAuth;
      },
      logout() {
        localStorage.removeItem(storageKey);
        setAuth({ token: null, user: null, profile: null });
        _toastFn?.("Logged out successfully.", "info");
      },
      async refreshProfile() {
        const response = await authService.profile();
        const nextAuth = {
          ...auth,
          profile: response.data.profile,
          user: response.data.user,
        };
        setAuth(nextAuth);
        localStorage.setItem(storageKey, JSON.stringify(nextAuth));
      },
    }),
    [auth, bootstrapping],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
