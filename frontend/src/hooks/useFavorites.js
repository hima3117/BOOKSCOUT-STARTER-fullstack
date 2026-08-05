import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function useFavorites() {

  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    fetchFavorites();
  }, []);



  const fetchFavorites = async () => {

    try {

      const res = await api.get("/favorites");

      setFavorites(res.data);

    } catch (error) {

      console.log(error);

    }

  };



  const isFavorite = (id) => {

    return favorites.some(
      (item) => item.bookId === id
    );

  };



  const toggleFavorite = async (book) => {

    try {


      const exists = favorites.find(
        (item) => item.bookId === book.id
      );



      if (exists) {


        await api.delete(
          `/favorites/${book.id}`
        );


        setFavorites((prev) =>
          prev.filter(
            (item) =>
              item.bookId !== book.id
          )
        );


        toast.success(
          "Removed from favorites"
        );


        return;

      }



      const res = await api.post(
        "/favorites",
        {
          bookId: book.id,
          title: book.title,
          author: book.author,
          cover: book.cover
        }
      );



      setFavorites((prev) => [
        ...prev,
        res.data
      ]);



      toast.success(
        "Added to favorites ❤️"
      );



    } catch (error) {


      toast.error(
        error.response?.data?.message ||
        "Favorite update failed"
      );


    }

  };



  return {
    favorites,
    toggleFavorite,
    isFavorite
  };

}