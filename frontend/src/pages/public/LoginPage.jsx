import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { routeByRole } from "../../utils/appConstants.js";

const sampleAccounts = [
  { role: "Admin", email: "admin@srms.edu", password: "Admin@123" },
  { role: "Faculty", email: "faculty@srms.edu", password: "Faculty@123" },
  { role: "Student", email: "student@srms.edu", password: "Student@123" },
];

export function LoginPage() {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(values) {
    setError("");
    setSubmitting(true);

    try {
      const authenticated = await login(values);
      const destination = location.state?.from?.pathname || routeByRole[authenticated.user.role];
      navigate(destination, { replace: true });
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Login failed. Please verify your credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-10 md:px-8 lg:grid-cols-[0.95fr,1.05fr]">
      <section className="rounded-[2.5rem] border border-white/70 bg-slate-950 p-10 text-white shadow-[0_30px_100px_-40px_rgba(15,23,42,0.55)]">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-300">Secure Sign In</p>
        <h1 className="mt-4 font-display text-5xl">One portal for every academic role.</h1>
        <p className="mt-5 text-base leading-8 text-slate-300">
          Admins manage records and analytics, faculty manage marks, and students review their academic performance with
          downloadable marksheets.
        </p>

        <div className="mt-8 space-y-3">
          {sampleAccounts.map((account) => (
            <button
              key={account.role}
              type="button"
              onClick={() => {
                setValue("email", account.email);
                setValue("password", account.password);
              }}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left transition hover:bg-white/10"
            >
              <div>
                <p className="font-semibold text-white">{account.role} Demo</p>
                <p className="text-sm text-slate-300">{account.email}</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">{account.password}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-white/70 bg-white/90 p-8 shadow-[0_30px_100px_-40px_rgba(15,23,42,0.35)] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-600">Welcome Back</p>
        <h2 className="mt-3 font-display text-4xl text-slate-950">Login to your workspace</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Use your university-issued account to access dashboards, result workflows, and marksheet tools.
        </p>

        <form className="mt-8 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              placeholder="name@srms.edu"
              {...register("email")}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
            />
          </label>

          {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-sm text-slate-500">
          Looking for the public overview instead?{" "}
          <Link to="/" className="font-semibold text-indigo-600">
            Return to the landing page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
