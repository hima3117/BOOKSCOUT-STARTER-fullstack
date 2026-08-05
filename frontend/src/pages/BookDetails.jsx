import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getWorkDetails } from "../services/openLibraryApi";
import useFavorites from "../hooks/useFavorites";

export default function BookDetails() {
  const { workId } = useParams();
  const location = useLocation();
  const passedBook = location.state?.book;

  const { toggleFavorite, isFavorite } = useFavorites();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(!passedBook);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchDetails() {
      try {
        setLoading(true);
        setError("");

        const data = await getWorkDetails(workId);

        if (!ignore) {
          setDetails(data);
        }

      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load details.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchDetails();

    return () => {
      ignore = true;
    };
  }, [workId]);


  const title = passedBook?.title || details?.title || "Book Details";

  const description =
    typeof details?.description === "string"
      ? details.description
      : details?.description?.value || "No description available.";

  const subjects = details?.subjects?.slice(0, 8)?.join(", ");


  return (
    <main className="container-app py-8">

      <Link
        to="/"
        className="mb-6 inline-block rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-soft"
      >
        ← Back to Discover
      </Link>


      {loading ? (

        <div className="rounded-[32px] bg-white p-8 shadow-soft">
          Loading details...
        </div>

      ) : error ? (

        <div className="rounded-[32px] bg-white p-8 text-red-600 shadow-soft">
          {error}
        </div>

      ) : (

        <div className="rounded-[32px] bg-white p-8 shadow-soft">

          <div className="grid gap-8 md:grid-cols-[300px_1fr]">

            <div>
              {passedBook?.coverLarge || passedBook?.cover ? (

                <img
                  src={passedBook.coverLarge || passedBook.cover}
                  alt={title}
                  className="w-full rounded-[28px] object-cover shadow-soft"
                />

              ) : (

                <div className="flex h-96 items-center justify-center rounded-[28px] bg-slate-200 text-slate-500">
                  No Cover Available
                </div>

              )}
            </div>


            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
                Work ID: {workId}
              </p>


              <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                {title}
              </h1>


              {passedBook?.author && (
                <p className="mt-3 text-lg text-slate-600">
                  {passedBook.author}
                </p>
              )}


              <button
                onClick={() => {

                  if (!localStorage.getItem("token")) {
                    alert("Please login to save favorites");
                    return;
                  }


                  toggleFavorite({

                    id: workId,

                    title,

                    author: passedBook?.author || "",

                    cover:
                      passedBook?.cover ||
                      passedBook?.coverLarge ||
                      ""

                  });

                }}

                className={`mt-5 rounded-2xl px-5 py-3 font-medium transition ${
                  isFavorite(workId)
                    ? "bg-brand-600 text-white"
                    : "bg-slate-900 text-white hover:bg-brand-600"
                }`}
              >

                {isFavorite(workId)
                  ? "❤️ Saved Favorite"
                  : "🤍 Save Favorite"}

              </button>



              {passedBook?.year && (
                <p className="mt-2 text-sm text-slate-500">
                  First published: {passedBook.year}
                </p>
              )}



              <div className="mt-8">

                <h2 className="text-lg font-semibold text-slate-900">
                  Description
                </h2>

                <p className="mt-3 leading-7 text-slate-700">
                  {description}
                </p>

              </div>



              {subjects && (

                <div className="mt-8">

                  <h2 className="text-lg font-semibold text-slate-900">
                    Subjects
                  </h2>

                  <p className="mt-3 text-slate-700">
                    {subjects}
                  </p>

                </div>

              )}



              <a
                href={`https://openlibrary.org/works/${workId}`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-2xl bg-brand-600 px-5 py-3 font-medium text-white transition hover:bg-brand-700"
              >
                Open on Open Library
              </a>


            </div>

          </div>

        </div>

      )}

    </main>
  );
}