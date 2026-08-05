import { getCoverUrl, getWorkIdFromKey } from "../services/openLibraryApi";

export function formatBook(book) {
  return {
    id: getWorkIdFromKey(book.key || ""),
    key: book.key || "",
    title: book.title || "Untitled",
    author: book.author_name?.join(", ") || "Unknown author",
    cover: getCoverUrl(book, "M"),
    coverLarge: getCoverUrl(book, "L"),
    year: book.first_publish_year || "N/A",
    subject: book.subject?.slice(0, 3)?.join(", ") || "General",
    editionCount: book.edition_count || 0,
    ebookAccess: book.ebook_access || "unavailable",
    rating: book.ratings_average || null,
    isbn: book.isbn || [],
  };
}