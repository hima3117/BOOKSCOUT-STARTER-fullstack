import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";


export default function App() {

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-slate-50">

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile"  element={<Profile />} />
          <Route 
            path="/book/:workId" 
            element={<BookDetails />} 
          />

          <Route 
            path="/login" 
            element={<Login />} 
          />

          <Route 
            path="/register" 
            element={<Register />} 
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}