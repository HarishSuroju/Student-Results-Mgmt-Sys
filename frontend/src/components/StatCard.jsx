export function StatCard({ label, value, hint, accent = "indigo" }) {
  const accentClasses = {
    indigo: "from-indigo-600 to-blue-500",
    emerald: "from-emerald-500 to-teal-500",
    amber: "from-amber-500 to-orange-500",
    rose: "from-rose-500 to-pink-500",
  };

  return (
    <div className="rounded-[1.75rem] border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm shadow-[0_20px_70px_-45px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]">
      <div className={`inline-flex rounded-full bg-gradient-to-r px-3.5 py-1 text-xs font-bold text-white ${accentClasses[accent]}`}>
        {label}
      </div>
      <p className="mt-5 font-display text-4xl font-extrabold text-white">{value}</p>
      <p className="mt-2.5 text-xs font-semibold text-slate-500">{hint}</p>
    </div>
  );
}
