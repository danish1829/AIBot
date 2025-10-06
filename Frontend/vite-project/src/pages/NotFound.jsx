function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-gray-400 text-lg mb-6">Page Not Found</p>
      <a href="/" className="text-indigo-400 hover:underline">
        Go back to Home
      </a>
    </div>
  );
}
export default NotFound;
