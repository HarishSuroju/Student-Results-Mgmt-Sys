export function Timeline({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.label} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`h-4 w-4 rounded-full ${item.active ? "bg-indigo-500 shadow-lg shadow-indigo-500/30" : "bg-white/20"}`}></div>
            {index < items.length - 1 ? <div className="mt-2 h-full w-px bg-white/10"></div> : null}
          </div>
          <div className="pb-5">
            <p className="font-semibold text-white">{item.label}</p>
            <p className="text-sm text-slate-400 mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
