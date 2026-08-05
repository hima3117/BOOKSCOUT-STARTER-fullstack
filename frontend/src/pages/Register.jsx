import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register(){

  const navigate = useNavigate();

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  });


  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      await api.post("/auth/register", form);

      alert("Registration successful");

      navigate("/login");

    }catch(error){

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  };


  return(
    <div className="container-app py-10">

      <h1 className="text-3xl font-bold mb-6">
        Create Account
      </h1>


      <form 
        onSubmit={handleSubmit}
        className="max-w-md space-y-4"
      >

        <input
          className="w-full border p-3 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e)=>
            setForm({...form,name:e.target.value})
          }
        />


        <input
          className="w-full border p-3 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>
            setForm({...form,email:e.target.value})
          }
        />


        <input
          className="w-full border p-3 rounded"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e)=>
            setForm({...form,password:e.target.value})
          }
        />


        <button className="bg-black text-white px-5 py-3 rounded">
          Register
        </button>

      </form>

    </div>
  );
}