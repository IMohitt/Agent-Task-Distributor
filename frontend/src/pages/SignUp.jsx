import { useState } from "react";
import axios from "axios";
import { signUp } from "../services/api";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signUp(form);
    navigate("/");
    alert(res.data.message);
  };

  return (
    <div className="flex justify-center items-center h-screen  bg-gray-100">
    <div className=" bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" className="w-full p-2 mb-2 border rounded" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" className="w-full p-2 mb-2 border rounded" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full p-2 mb-2 border rounded" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded">Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
