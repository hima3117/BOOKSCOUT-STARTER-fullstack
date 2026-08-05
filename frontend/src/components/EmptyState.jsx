export default function EmptyState({ title, message }) {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-12 text-center shadow-soft">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
        📚
      </div>
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-slate-600">{message}</p>
    </div>
  );
}