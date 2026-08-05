import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import SubjectChips from "../components/SubjectChips";
import FilterBar from "../components/FilterBar";
import LoadingSkeleton from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import BookGrid from "../components/BookGrid";
import Pagination from "../components/Pagination";
import useBooks from "../hooks/useBooks";
import useFavorites from "../hooks/useFavorites";
import useDebounce from "../hooks/useDebounce";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState("javascript");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  const { books, total, loading, error } = useBooks({
    query: debouncedQuery,
    subject: debouncedQuery ? "" : activeSubject,
    page,
    sort,
  });

  const { toggleFavorite, isFavorite } = useFavorites();

  const headingText = useMemo(() => {
    if (query) return `Results for "${query}"`;
    return `Top picks in ${activeSubject}`;
  }, [query, activeSubject]);

  const handleSearch = (value) => {
    setQuery(value.trim());
    setPage(1);
    if (value.trim()) {
      setActiveSubject("");
    } else {
      setActiveSubject("javascript");
    }
  };

  const handleSubjectSelect = (subject) => {
    setActiveSubject(subject);
    setQuery("");
    setPage(1);
  };

  const retry = () => {
    window.location.reload();
  };

  return (
    <main className="container-app py-8">
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-600 via-blue-700 to-slate-900 px-6 py-14 text-white shadow-soft sm:px-10">
        <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
            Interactive Data Explorer
          </div>

          <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-5xl">
            Discover books by topic, author, or title with a clean and thoughtful experience.
          </h1>

          <p className="mt-4 max-w-2xl text-base text-blue-100 sm:text-lg">
            Built for students and curious readers who want fast discovery, clear results,
            and a polished browsing flow across devices.
          </p>

          <div className="mt-8 max-w-3xl">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-blue-100">
            <span className="rounded-full bg-white/10 px-3 py-1">Responsive UI</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Thoughtful states</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Save favorites</span>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <SubjectChips activeSubject={activeSubject} onSelect={handleSubjectSelect} />
      </section>

      <section className="mt-8">
        <FilterBar sort={sort} setSort={setSort} resultCount={total} />
      </section>

      <section className="mt-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900">{headingText}</h2>
          <p className="mt-2 text-slate-600">
            Browse books with clean cards, reliable fallback states, and mobile-friendly layout.
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : books.length === 0 ? (
          <EmptyState
            title="No books found"
            message="Try another keyword, author name, or subject to explore more books."
          />
        ) : (
          <>
            <BookGrid
              books={books}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
            <Pagination page={page} total={total} onPageChange={setPage} />
          </>
        )}
      </section>
    </main>
  );
}