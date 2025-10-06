import { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    profileURL: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/user/signup",
        form,
        { withCredentials: true }
      );
      setMessage(res.data.message);
      // Optionally redirect to login
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form className="bg-gray-900 p-10 rounded-2xl shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">Sign Up</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-indigo-400"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-indigo-400"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-indigo-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-indigo-400"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-indigo-400"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="profileURL"
          placeholder="Profile Image URL"
          value={form.profileURL}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-indigo-400"
        />

        <button
          type="submit"
          className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-semibold transition-transform hover:scale-105"
        >
          Sign Up
        </button>

        {message && <p className="mt-4 text-center text-gray-300">{message}</p>}
      </form>
    </div>
  );
}

export default Signup;
