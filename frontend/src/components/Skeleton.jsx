export function Skeleton({ className = "", count = 1, variant = "rect" }) {
  const baseClasses = "animate-pulse bg-slate-200/70 rounded-xl";
  const variantClasses = {
    rect: "h-4 w-full",
    circle: "h-10 w-10 rounded-full",
    card: "h-32 w-full rounded-2xl",
    text: "h-3 w-3/4",
    heading: "h-6 w-1/2",
  };

  if (count === 1) {
    return <div className={`${baseClasses} ${variantClasses[variant] || variantClasses.rect} ${className}`} />;
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${baseClasses} ${variantClasses[variant] || variantClasses.rect} ${className}`}
          style={{ width: variant === "text" ? `${75 + Math.random() * 25}%` : undefined }}
        />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 md:p-8">
        <Skeleton variant="text" className="w-24" />
        <Skeleton variant="heading" className="mt-4" />
        <Skeleton variant="text" className="mt-3 w-2/3" />
      </div>
      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6">
            <Skeleton variant="text" className="w-16" />
            <Skeleton variant="heading" className="mt-5" />
            <Skeleton variant="text" className="mt-2 w-24" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6">
          <Skeleton variant="heading" />
          <Skeleton variant="text" count={4} className="mt-4" />
        </div>
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6">
          <Skeleton variant="heading" />
          <Skeleton variant="card" className="mt-4" />
        </div>
      </div>
    </div>
  );
}
