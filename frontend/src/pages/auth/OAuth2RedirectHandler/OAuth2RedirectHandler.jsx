// src/components/OAuth2RedirectHandler.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router";

function OAuth2RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      console.log("this is from authHandler frontend component", localStorage)
      navigate("/app");   // Go to main app page
    } else {
      navigate("/signup"); // fallback if no token
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
}

export default OAuth2RedirectHandler;
