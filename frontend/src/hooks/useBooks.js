import { useEffect, useState } from "react";
import { searchBooks } from "../services/openLibraryApi";
import { formatBook } from "../utils/formatBook";

export default function useBooks({ query, subject, page, sort }) {

  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {

    let ignore = false;


    async function fetchBooks() {

      try {

        setLoading(true);
        setError("");


        const data = await searchBooks({
          query,
          subject,
          page,
          sort,
          limit: 12
        });


        console.log("BOOK DATA:", data);


        if (!ignore) {


          let formattedBooks =
            (data.docs || []).map(formatBook);



          // Newest first
        if (sort === "new") {

  formattedBooks.sort(
    (a, b) =>
      Number(b.year || 0) -
      Number(a.year || 0)
  );

}


if (sort === "old") {

  formattedBooks.sort(
    (a, b) =>
      Number(a.year || 0) -
      Number(b.year || 0)
  );

}


          // Relevance = API default order


          setBooks(formattedBooks);

          setTotal(data.numFound || 0);

        }


      } catch (err) {


        if (!ignore) {

          setError(
            err.message || "Please Try Again."
          );

          setBooks([]);

        }

      } finally {

        if (!ignore) {

          setLoading(false);

        }

      }

    }


    fetchBooks();


    return () => {

      ignore = true;

    };


  }, [query, subject, page, sort]);


  return {
    books,
    total,
    loading,
    error
  };

}