import { useEffect, useState } from "react";
import api from "../api/axios";
import BookCard from "../components/BookCard";

export default function Favorites() {

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);


  const loadFavorites = async () => {
    try {

      const res = await api.get("/favorites");

      setFavorites(res.data);

    } catch (error) {

      console.log(error);

      setFavorites([]);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadFavorites();

  }, []);



  const removeFavorite = async (book) => {

    try {

      await api.delete(`/favorites/${book.bookId}`);

      setFavorites((prev) =>
        prev.filter(
          (item) => item.bookId !== book.bookId
        )
      );

    } catch (error) {

      console.log(error);

    }

  };



  return (

    <main className="container-app py-8">


      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        Your Favorite Books ❤️
      </h1>



      {loading ? (

        <div className="rounded-3xl bg-white p-8 shadow">
          Loading favorites...
        </div>


      ) : favorites.length === 0 ? (

        <div className="rounded-3xl bg-white p-10 text-center shadow">

          <h2 className="text-2xl font-bold">
            No favorites yet
          </h2>

          <p className="mt-2 text-slate-600">
            Save books from Discover page and they will appear here.
          </p>

        </div>


      ) : (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {favorites.map((book) => (

            <BookCard

              key={book._id}

              book={{
                id: book.bookId,
                title: book.title,
                author: book.author,
                cover: book.cover,
                year: book.year || "N/A",
                subject: book.subject || "General",
                editionCount: book.editionCount || 0,
              }}

              isFavorite={true}

              onToggleFavorite={() =>
                removeFavorite(book)
              }

            />

          ))}

        </div>

      )}


    </main>

  );
}