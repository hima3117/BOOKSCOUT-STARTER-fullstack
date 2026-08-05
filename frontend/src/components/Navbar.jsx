import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [open, setOpen] = useState(false);


  useEffect(() => {

    const updateAuth = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener(
      "storage",
      updateAuth
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateAuth
      );
    };

  }, []);



  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setOpen(false);

    window.location.href = "/";

  };


  return (

    <nav className="border-b bg-white">

      <div className="container-app flex items-center justify-between py-4">


        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
          onClick={() => setOpen(false)}
        >
          BookScout
        </Link>



        <button
          className="text-2xl md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>



        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 top-16 z-50 w-full flex-col gap-4 bg-white p-6 shadow md:static md:flex md:w-auto md:flex-row md:items-center md:bg-transparent md:p-0 md:shadow-none`}
        >


          <Link
            to="/"
            className="text-slate-700 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Discover
          </Link>



          {token && (

            <Link
              to="/favorites"
              className="text-slate-700 hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Favorites ❤️
            </Link>

          )}
          <Link
            to="/profile"
            className="text-slate-700 hover:text-blue-600"
              onClick={() => setOpen(false)}
              >
              Profile 👤
            </Link>



          {!token ? (

            <>

              <Link
                to="/login"
                className="rounded-xl bg-blue-600 px-4 py-2 text-center text-white"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>


              <Link
                to="/register"
                className="rounded-xl border border-blue-600 px-4 py-2 text-center text-blue-600"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>


            </>

          ) : (

            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-4 py-2 text-white"
            >
              Logout
            </button>

          )}


        </div>


      </div>

    </nav>

  );
}