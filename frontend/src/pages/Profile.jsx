import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);


  useEffect(() => {

    const loadProfile = async () => {

      try {

        const savedUser =
          JSON.parse(localStorage.getItem("user"));

        setUser(savedUser);


        const res =
          await api.get("/favorites");


        setCount(res.data.length);


      } catch (error) {

        console.log(error);

      }

    };


    loadProfile();

  }, []);



  return (

    <main className="container-app py-8">

      <div className="rounded-[32px] bg-white p-8 shadow-soft">

        <h1 className="text-3xl font-bold text-slate-900">
          My Profile 👤
        </h1>


        {user ? (

          <div className="mt-6 space-y-4">

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Name
              </p>

              <p className="text-lg font-semibold">
                {user.name || "BookScout User"}
              </p>
            </div>


            <div className="rounded-2xl bg-slate-50 p-4">

              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="text-lg font-semibold">
                {user.email}
              </p>

            </div>


            <div className="rounded-2xl bg-blue-50 p-4">

              <p className="text-sm text-slate-500">
                Saved Books
              </p>

              <p className="text-3xl font-bold text-blue-600">
                {count}
              </p>

            </div>


          </div>

        ) : (

          <p className="mt-5 text-slate-600">
            Please login to view profile.
          </p>

        )}

      </div>

    </main>

  );
}