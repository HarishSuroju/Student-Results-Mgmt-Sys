export function PageHero({ eyebrow, title, description, actions }) {
  return (
    <div className="mb-6 rounded-[2rem] border border-slate-200/80 bg-white px-5 py-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] md:px-8 md:py-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-600">{eyebrow}</p>
          <h1 className="mt-2 font-display text-2xl text-slate-950 md:text-3xl lg:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 md:mt-3">{description}</p>
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
