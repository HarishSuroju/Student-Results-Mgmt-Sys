export function SectionCard({ title, subtitle, children, actions }) {
  return (
    <section className="rounded-[1.75rem] border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm shadow-[0_20px_70px_-45px_rgba(0,0,0,0.5)]">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}
