import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";

const audienceCards = [
  {
    title: "Admin Teams",
    text: "Orchestrate institution data. Register faculty, manage student details, track course catalogs, and review core KPIs from a centralized control panel.",
    icon: FiShield,
    color: "from-indigo-500/20 to-blue-500/20 text-indigo-400",
  },
  {
    title: "Faculty Portals",
    text: "Streamline student grading. Record subject-wise marks semester by semester with real-time validation and automatic letter grade calculations.",
    icon: FiUsers,
    color: "from-purple-500/20 to-pink-500/20 text-purple-400",
  },
  {
    title: "Student Portals",
    text: "Visualize academic milestones. Monitor GPA metrics, track course timelines, review subject marks, and download secure PDF marksheets in one click.",
    icon: FiBookOpen,
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-400",
  },
];

const pillars = [
  {
    title: "Role-Based Navigation",
    desc: "Strictly isolated portals for Admin, Faculty, and Students with JWT authenticated route guards.",
  },
  {
    title: "Input Validation Guardrails",
    desc: "Both client and server validate data formats (email, phone, semesters, marks) to ensure database integrity.",
  },
  {
    title: "Polished Reporting & PDF",
    desc: "Automatic CGPA calculations and production-grade PDF marksheet generation with PDFKit.",
  },
];

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070b13] text-white">
      {/* Decorative background glows */}
      <div className="absolute -left-48 top-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[150px]" />
      <div className="absolute left-1/3 bottom-10 h-80 w-80 rounded-full bg-emerald-500/5 blur-[100px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 md:px-8">
        {/* Sleek Glass Navigation Header */}
        <header className="animate-fade-in-up flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-4 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
              <span className="font-display text-lg font-extrabold tracking-wider text-white">S</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-indigo-400">University System</p>
              <h1 className="font-display text-lg font-bold tracking-tight text-white">SRMS Portal</h1>
            </div>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 active:scale-95 shadow-lg shadow-white/5"
          >
            Enter Portal
            <FiArrowRight />
          </Link>
        </header>

        {/* Hero Section */}
        <main className="grid flex-1 gap-12 py-12 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
          <section className="animate-fade-in-up space-y-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-300">
              <FiTrendingUp className="text-sm" />
              <span>Modern institution dashboard</span>
            </div>

            <h2 className="font-display text-4xl font-extrabold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-6xl">
              Academic analytics and records. <br />
              <span className="gradient-text">Beautifully simplified.</span>
            </h2>

            <p className="max-w-2xl text-base leading-8 text-slate-400">
              A responsive, role-based Student Result Management System designed for modern institutions. Secure
              administration, rapid faculty grading workflows, and visual student performance tracking.
            </p>

            {/* Quick Metrics */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm">
                <p className="text-4xl font-black font-display text-indigo-400">3</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">Custom Workspaces</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm">
                <p className="text-4xl font-black font-display text-purple-400">PDF</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">Academic Marksheets</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm">
                <p className="text-4xl font-black font-display text-emerald-400">100%</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">Data Integrity</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/login"
                className="glass-button-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg active:scale-95"
              >
                Access Account
                <FiArrowRight />
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-slate-400">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>AWS RDS & Docker Ready</span>
              </div>
            </div>
          </section>

          {/* Role Cards */}
          <section className="grid gap-5">
            {audienceCards.map(({ title, text, icon: Icon, color }, index) => (
              <article
                key={title}
                style={{ animationDelay: `${index * 150}ms` }}
                className="animate-fade-in-up group relative rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-2xl transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${color}`}>
                    <Icon className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-slate-400">{text}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </main>

        {/* Pillars Section */}
        <section className="animate-fade-in-up mt-12 rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-8 backdrop-blur-sm shadow-xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 text-center">Core Platform Architecture</p>
          <h3 className="mt-2 font-display text-2xl font-extrabold text-white text-center">Engineered for Reliability</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04]"
              >
                <span className="text-xs font-bold text-indigo-400">0{index + 1}</span>
                <h4 className="mt-3 font-display text-lg font-bold text-white">{pillar.title}</h4>
                <p className="mt-2.5 text-sm leading-6 text-slate-400">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 rounded-[2rem] border border-white/5 bg-white/[0.01] px-6 py-6 text-center shadow-lg">
          <p className="text-sm text-slate-500">Student Result Management System &copy; {new Date().getFullYear()}</p>
          <p className="mt-1 text-xs text-slate-600">Enterprise Grade Portal - Active Validation Guardrails</p>
        </footer>
      </div>
    </div>
  );
}
