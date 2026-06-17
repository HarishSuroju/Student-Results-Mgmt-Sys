export function LoadingState({ label = "Loading..." }) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-500">
      <p className="font-display text-2xl text-slate-800">{label}</p>
    </div>
  );
}
