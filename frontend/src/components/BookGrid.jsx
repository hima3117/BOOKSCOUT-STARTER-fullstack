import BookCard from "./BookCard";

export default function BookGrid({ books, onToggleFavorite, isFavorite }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite(book.id)}
        />
      ))}
    </div>
  );
}