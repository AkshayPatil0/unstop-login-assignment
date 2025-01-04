import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "@/pages/home/home";
import Login from "@/pages/login/login";
import "./index.css";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginData = localStorage.getItem("auth");
    if (loginData) {
      navigate("/home");
    } else {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
