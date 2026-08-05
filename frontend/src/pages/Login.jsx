import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  async function handleLogin(e) {
    e.preventDefault();

    try {
      setError("");

      const res = await api.post("/auth/login", {
        email,
        password,
      });


      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );


      // update navbar instantly
      window.dispatchEvent(
        new Event("storage")
      );


      navigate("/");


    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        "Login failed"
      );

    }
  }


  return (
    <main className="container-app py-10">

      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow">

        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          Login
        </h1>


        {error && (
          <p className="mb-4 text-red-600">
            {error}
          </p>
        )}


        <form onSubmit={handleLogin}>

          <input
            className="mb-4 w-full rounded-xl border p-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />


          <input
            className="mb-4 w-full rounded-xl border p-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />


          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700"
          >
            Login
          </button>

        </form>

      </div>

    </main>
  );
}