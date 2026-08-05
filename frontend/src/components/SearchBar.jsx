import { useEffect, useState } from "react";

export default function SearchBar({ initialValue = "", onSearch }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-md sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔎
          </span>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search by title, author, or topic..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}