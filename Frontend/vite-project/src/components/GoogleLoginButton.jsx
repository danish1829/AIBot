import React from "react";

function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    // Open backend Google OAuth in a new tab/window
    const googleAuthURL = "http://localhost:3000/user/google"; // your backend route
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const authWindow = window.open(
      googleAuthURL,
      "Google Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    // Listen for message from backend (we'll send token via postMessage)
    window.addEventListener("message", function handleMessage(event) {
      if (event.origin !== "http://localhost:3000/") return; // backend origin
      const { token, user } = event.data;

      if (token && user) {
        localStorage.setItem("token", token); // save JWT
        localStorage.setItem("user", JSON.stringify(user));
        window.removeEventListener("message", handleMessage);
        authWindow.close();
        // redirect to Interview page
        window.location.href = "/interview";
      }
    });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full py-3 flex items-center justify-center border border-gray-400 rounded-xl hover:bg-gray-800 transition-all text-gray-200 font-semibold"
    >
      <img src="/google-logo.png" alt="Google" className="w-6 h-6 mr-2" />
      Continue with Google
    </button>
  );
}

export default GoogleLoginButton;
