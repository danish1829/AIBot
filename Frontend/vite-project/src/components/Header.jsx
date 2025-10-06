import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold text-indigo-400">AIBot 🤖</h1>

        <nav className="flex gap-4 items-center">
          <Link
            to="/"
            className={`text-gray-300 hover:text-indigo-400 ${location.pathname === "/" ? "border-b-2 border-indigo-400" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-gray-300 hover:text-indigo-400 ${location.pathname === "/about" ? "border-b-2 border-indigo-400" : ""}`}
          >
            About
          </Link>
          <Link
            to="/interview"
            className={`text-gray-300 hover:text-indigo-400 ${location.pathname === "/interview" ? "border-b-2 border-indigo-400" : ""}`}
          >
            Interview
          </Link>

          {/* Login / Signup Buttons */}
          <Link
            to="/login"
            className="ml-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-lg transition"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
