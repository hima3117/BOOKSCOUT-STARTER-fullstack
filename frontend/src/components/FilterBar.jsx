export default function FilterBar({ sort, setSort, resultCount }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-slate-500">Showing results</p>
        <p className="text-lg font-semibold text-slate-900">
          {resultCount.toLocaleString()} books found
        </p>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-slate-600">Sort by</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none focus:border-brand-500"
        >
          <option value="">Relevance</option>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
        </select>
      </div>
    </div>
  );
}