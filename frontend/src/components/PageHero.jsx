export function PageHero({ eyebrow, title, description, actions }) {
  return (
    <div className="mb-6 rounded-[2rem] border border-white/5 bg-white/[0.02] px-6 py-7 backdrop-blur-sm shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-indigo-400">{eyebrow}</p>
          <h1 className="mt-2.5 font-display text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">{title}</h1>
          <p className="mt-2.5 max-w-2xl text-sm leading-7 text-slate-400 md:mt-3.5">{description}</p>
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
