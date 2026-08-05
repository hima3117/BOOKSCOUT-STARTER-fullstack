import api from "./api";
export async function searchBooks({
  query = "",
  subject = "",
  page = 1,
  sort = "",
  limit = 12,
}) {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.append("query", query.trim());
  } else {
    params.append("subject", subject || "javascript");
  }

  params.append("page", page);
  params.append("limit", limit);

  const response = await api.get(
    `/books/search?${params.toString()}`
  );

  return response.data;
}



export async function getWorkDetails(workId) {
  const response = await fetch(
    `https://openlibrary.org/works/${workId}.json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch book details.");
  }

  return response.json();
}


export function getCoverUrl(book, size = "M") {
  if (book?.cover_i) {
    return `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`;
  }

  if (book?.isbn?.[0]) {
    return `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-${size}.jpg`;
  }

  return null;
}


export function getWorkIdFromKey(key = "") {
  return key.replace("/works/", "");
}