import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, HelpCircle, Loader2 } from "lucide-react";
import Logo from "@/assets/logo.png";
import Loading from "@/assets/Loading.jpg";

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check user from localStorage
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      setTimeout(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          navigate("/login");
        }
        setLoading(false);
      }, 2000);
    };

    checkUser();
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <img src={Loading} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 p-6">
      {/* Top Bar */}
      <div className="flex justify-between w-full max-w-sm mb-4 text-gray-500">
        <HelpCircle className="w-6 h-6" />
        <Globe className="w-6 h-6" />
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Dukhan Bank" className="h-12 mb-2" />
      </div>

      {/* Welcome Section */}
      <div className="w-full max-w-sm mt-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">
          Welcome {user?.name || "User"} 👋
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          You are successfully logged in.
        </p>

        {/* Login Again Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-red-700 transition"
        >
          Login Again
        </button>
      </div>
    </div>
  );
};

export default Home;
