import { Link } from "react-router-dom";

export default function BookCard({ book, onToggleFavorite, isFavorite }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        {book.cover ? (
          <img
  src={book.cover}
  alt={book.title}
  onError={(e) => {
    e.currentTarget.style.display = "none";
  }}
  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
/>
        ) : (
          <div className="flex h-72 w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 px-6 text-center text-sm text-slate-500">
            No Cover Available
          </div>
        )}
       
       <button
  onClick={() => {
    if (!localStorage.getItem("token")) {
      alert("Please login to save favorites");
      return;
    }

    onToggleFavorite(book);
  }}
  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-sm font-medium shadow transition ${
    isFavorite
      ? "bg-brand-600 text-white"
      : "bg-white/95 text-slate-700 hover:bg-white"
  }`}
>
 {isFavorite ? "❤️ Saved" : "🤍 Save"}
</button>
        
      </div>

      <div className="p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
          {book.subject}
        </p>

        <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold text-slate-900">
          {book.title}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{book.author}</p>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>{book.year}</span>
          <span>{book.editionCount} editions</span>
        </div>

        <Link
          to={`/book/${book.id}`}
          state={{ book }}
          className="mt-5 inline-flex items-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}