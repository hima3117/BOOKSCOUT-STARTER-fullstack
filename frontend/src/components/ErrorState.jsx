export default function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-[28px] border border-red-100 bg-white p-12 text-center shadow-soft">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
        ⚠️
      </div>
      <h3 className="text-2xl font-bold text-red-600">Something went wrong</h3>
      <p className="mx-auto mt-3 max-w-xl text-slate-600">{message}</p>
      <button
        onClick={onRetry}
        className="mt-5 rounded-2xl bg-brand-600 px-5 py-3 font-medium text-white transition hover:bg-brand-700"
      >
        Retry
      </button>
    </div>
  );
}