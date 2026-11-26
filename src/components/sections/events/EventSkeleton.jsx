function EventSkeleton() {
  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse overflow-hidden rounded-3xl bg-white shadow"
        >
          <div className="h-56 bg-slate-200"></div>

          <div className="space-y-4 p-6">
            <div className="h-4 w-24 rounded bg-slate-200"></div>

            <div className="h-6 rounded bg-slate-200"></div>

            <div className="h-4 rounded bg-slate-200"></div>

            <div className="h-4 w-3/4 rounded bg-slate-200"></div>

            <div className="mt-8 h-10 rounded bg-slate-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventSkeleton;