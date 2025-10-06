import { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/user/login",
        form,
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage(res.data.message);
      window.location.href = "/interview"; // redirect after login
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/user/google"; // backend Google OAuth
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form className="bg-gray-900 p-10 rounded-2xl shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">Login</h2>

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
          className="w-full mb-6 px-4 py-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-indigo-400"
        />

        <button
          type="submit"
          className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-semibold transition-transform hover:scale-105"
        >
          Login
        </button>

        <div className="my-6 text-center text-gray-400">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 flex items-center justify-center border border-gray-400 rounded-xl hover:bg-gray-800 transition-all text-gray-200 font-semibold"
        >
          <img src="/google-logo.png" alt="Google" className="w-6 h-6 mr-2" />
          Continue with Google
        </button>

        {message && <p className="mt-4 text-center text-gray-300">{message}</p>}
      </form>
    </div>
  );
}

export default Login;
