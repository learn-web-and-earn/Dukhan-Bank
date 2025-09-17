import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "@/assets/Loading.jpg"

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Simulate checking user (replace with real API or context check)
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      // Example: simulate API delay
      setTimeout(() => {
        const storedUser = localStorage.getItem("user"); // or check token
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          navigate("/login"); // redirect if not logged in
        }
        setLoading(false);
      }, 1000);
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <img src={Loading} alt="" />
      </>
    );
  }

  return <div>Welcome {user?.name || "User"} 👋</div>;
};

export default Home;
