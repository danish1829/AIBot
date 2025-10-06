function Home() {
  return (
    <div className="relative bg-gray-950 text-gray-100 overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[600px] h-[600px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 right-1/3">
        <div className="w-[400px] h-[400px] bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in">
          Welcome to <span className="text-indigo-400">AIBot 🤖</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8 animate-fade-in delay-200">
          Your personal AI assistant for interviews, learning, and productivity. 
          Experience intelligent conversation and real-time feedback.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-transform hover:scale-105 animate-fade-in delay-400">
            Get Started
          </button>
          <button className="px-8 py-3 border border-indigo-500 text-indigo-400 font-semibold rounded-xl hover:bg-indigo-500 hover:text-white transition-all animate-fade-in delay-600">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 bg-gray-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            What <span className="text-indigo-400">AIBot</span> Can Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <div className="text-indigo-400 text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">Mock Interviews</h3>
              <p className="text-gray-300">
                Practice technical and HR interviews with AI-driven questions and get instant feedback.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <div className="text-indigo-400 text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-2">Smart Suggestions</h3>
              <p className="text-gray-300">
                Receive helpful tips and strategies to improve your answers and performance.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <div className="text-indigo-400 text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-300">
                Track your preparation progress and see your improvement over time with analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Ace Your Interviews?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of learners who are practicing with AIBot and boosting their confidence.
        </p>
        <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} AIBot | Built with ❤️ using React + TailwindCSS
        </p>
      </footer>

      {/* Tailwind Animation Keyframes */}
      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease forwards;
          }
          .delay-200 { animation-delay: 0.2s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-600 { animation-delay: 0.6s; }
        `}
      </style>
    </div>
  );
}

export default Home;
