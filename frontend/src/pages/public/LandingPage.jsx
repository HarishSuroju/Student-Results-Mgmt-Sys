import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";

const audienceCards = [
  {
    title: "Prospective Admin Teams",
    text: "Launch a secure result workflow with role-based access, analytics, and deployment-ready architecture.",
    icon: FiShield,
  },
  {
    title: "Faculty Members",
    text: "Enter marks faster, review records by student, and keep academic workflows focused and trackable.",
    icon: FiUsers,
  },
  {
    title: "Students",
    text: "Check semester performance, monitor CGPA, and download polished PDF marksheets in one click.",
    icon: FiBookOpen,
  },
];

const pillars = [
  "Audience-aware navigation that adapts to admin, faculty, and student journeys.",
  "Clean card-driven layouts with strong contrast, quick scanning, and mobile-ready responsiveness.",
  "Academic storytelling with progress timelines, analytics, and clearly staged semester progress.",
];

export function LandingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 md:px-8">
      <header className="flex items-center justify-between rounded-full border border-white/70 bg-white/80 px-5 py-4 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-600">Summit Ridge</p>
          <h1 className="font-display text-xl text-slate-950">Student Result Management System</h1>
        </div>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Enter Portal
          <FiArrowRight />
        </Link>
      </header>

      <main className="grid flex-1 gap-8 py-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
        <section className="rounded-[2.5rem] border border-white/70 bg-white/85 p-8 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.45)] backdrop-blur md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-indigo-600">Modern College Platform</p>
          <h2 className="mt-4 font-display text-5xl leading-tight text-slate-950 md:text-6xl">
            A results portal built for clear decisions and confident academic journeys.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            This SRMS combines secure authentication, faculty marks workflows, student-grade visibility, and analytics
            dashboards in one production-ready experience designed for RDS-backed deployments.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white">
              <p className="text-4xl font-display">3</p>
              <p className="mt-2 text-sm text-slate-300">Role-specific workspaces</p>
            </div>
            <div className="rounded-[1.75rem] bg-indigo-600 p-5 text-white">
              <p className="text-4xl font-display">PDF</p>
              <p className="mt-2 text-sm text-indigo-100">Marksheet generation ready</p>
            </div>
            <div className="rounded-[1.75rem] bg-emerald-500 p-5 text-white">
              <p className="text-4xl font-display">AWS</p>
              <p className="mt-2 text-sm text-emerald-50">RDS and EC2 friendly architecture</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Login to Dashboard
              <FiArrowRight />
            </Link>
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-600">
              <FiTrendingUp className="text-indigo-600" />
              Responsive, accessible, role-aware dashboards
            </div>
          </div>
        </section>

        <section className="grid gap-5">
          {audienceCards.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)]">
              <div className="inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600">
                <Icon className="text-xl" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </section>
      </main>

      <section className="rounded-[2.5rem] border border-white/70 bg-white/85 p-8 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.45)] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Design Pillars</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar} className="rounded-[1.5rem] bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              {pillar}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
