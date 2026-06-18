import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiAlertCircle, FiKey, FiLoader, FiMail } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth.js";
import { useToast } from "../../context/ToastContext.jsx";
import { setAuthToast } from "../../context/AuthContext.jsx";
import { routeByRole } from "../../utils/appConstants.js";

const sampleAccounts = [
  { role: "Admin", email: "admin@srms.edu", password: "Admin@123" },
  { role: "Faculty", email: "faculty@srms.edu", password: "Faculty@123" },
  { role: "Student", email: "student@srms.edu", password: "Student@123" },
];

export function LoginPage() {
  const emailRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const { login } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setAuthToast(showToast);
  }, [showToast]);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  async function onSubmit(values) {
    setError("");
    setSubmitting(true);

    try {
      const authenticated = await login(values);
      const destination = location.state?.from?.pathname || routeByRole[authenticated.user.role];
      navigate(destination, { replace: true });
    } catch (submitError) {
      const msg = submitError.response?.data?.message || "Login failed. Please verify your credentials.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  }

  const handleSelectDemo = (account) => {
    clearErrors();
    setValue("email", account.email);
    setValue("password", account.password);
  };

  const { ref: emailFormRef, ...emailRegister } = register("email", {
    required: "Email is required.",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address.",
    },
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#070b13] px-4 py-12 text-white overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative w-full max-w-5xl grid gap-8 lg:grid-cols-[0.95fr,1.05fr] animate-scale-in">
        {/* Left Panel: Demo Accounts */}
        <section className="glass-panel rounded-3xl p-8 lg:p-10 flex flex-col justify-between shadow-2xl">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-indigo-400">Secure Gateway</p>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
              One login portal for every academic role.
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Select one of the demo credentials below to instantly autofill and explore dashboard features.
            </p>
          </div>

          <div className="mt-8 space-y-3.5">
            {sampleAccounts.map((account) => (
              <button
                key={account.role}
                type="button"
                onClick={() => handleSelectDemo(account)}
                className="group flex w-full items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-4 text-left transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05]"
              >
                <div>
                  <p className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {account.role} Workspace
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{account.email}</p>
                </div>
                <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                  {account.password}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-8 text-xs text-slate-500 text-center">
            Authorized access only. Actions logged by system audit.
          </p>
        </section>

        {/* Right Panel: Login Form */}
        <section className="glass-panel rounded-3xl p-8 lg:p-10 flex flex-col justify-center shadow-2xl">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-purple-400">Credentials</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white">Login to Workspace</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Provide your university-issued account details below.
            </p>
          </div>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <label className="grid gap-2 text-sm font-semibold text-slate-300">
              <span>Email Address</span>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                  <FiMail />
                </div>
                <input
                  type="email"
                  placeholder="name@srms.edu"
                  {...emailRegister}
                  ref={(e) => {
                    emailFormRef(e);
                    emailRef.current = e;
                  }}
                  className={`glass-input w-full rounded-2xl py-3 pl-10 pr-4 outline-none ${
                    errors.email ? "border-rose-500/50 focus:border-rose-500 focus:box-shadow-[0_0_0_3px_rgba(244,63,94,0.25)]" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <span className="text-xs font-medium text-rose-400 flex items-center gap-1.5 mt-0.5">
                  <FiAlertCircle className="shrink-0" />
                  {errors.email.message}
                </span>
              )}
            </label>

            {/* Password Field */}
            <label className="grid gap-2 text-sm font-semibold text-slate-300">
              <span>Password</span>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                  <FiKey />
                </div>
                <input
                  type="password"
                  placeholder="Enter secure password"
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters.",
                    },
                  })}
                  className={`glass-input w-full rounded-2xl py-3 pl-10 pr-4 outline-none ${
                    errors.password ? "border-rose-500/50 focus:border-rose-500 focus:box-shadow-[0_0_0_3px_rgba(244,63,94,0.25)]" : ""
                  }`}
                />
              </div>
              {errors.password && (
                <span className="text-xs font-medium text-rose-400 flex items-center gap-1.5 mt-0.5">
                  <FiAlertCircle className="shrink-0" />
                  {errors.password.message}
                </span>
              )}
            </label>

            {error ? (
              <div className="flex items-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                <FiAlertCircle className="shrink-0 text-rose-400" />
                <p>{error}</p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="glass-button-primary inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-75 active:scale-98 mt-2"
            >
              {submitting ? (
                <>
                  <FiLoader className="animate-spin text-lg" />
                  Verifying account...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-slate-400 text-center">
            Want to see the portal overview?{" "}
            <Link to="/" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
              Return to landing page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
