export function PageHero({ eyebrow, title, description, actions }) {
  return (
    <div className="mb-8 rounded-[2rem] border border-slate-200/80 bg-white px-6 py-7 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] md:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-600">{eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl text-slate-950 md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
