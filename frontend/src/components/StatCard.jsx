export function StatCard({ label, value, hint, accent = "indigo" }) {
  const accentClasses = {
    indigo: "from-indigo-600 to-blue-500",
    emerald: "from-emerald-500 to-teal-500",
    amber: "from-amber-500 to-orange-500",
    rose: "from-rose-500 to-pink-500",
  };

  return (
    <div className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.5)]">
      <div className={`inline-flex rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white ${accentClasses[accent]}`}>
        {label}
      </div>
      <p className="mt-5 font-display text-4xl text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{hint}</p>
    </div>
  );
}
