export function Timeline({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.label} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`h-4 w-4 rounded-full ${item.active ? "bg-indigo-600" : "bg-slate-300"}`}></div>
            {index < items.length - 1 ? <div className="mt-2 h-full w-px bg-slate-200"></div> : null}
          </div>
          <div className="pb-5">
            <p className="font-semibold text-slate-900">{item.label}</p>
            <p className="text-sm text-slate-500">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
