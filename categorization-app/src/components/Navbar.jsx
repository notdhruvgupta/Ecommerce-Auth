import React, { useEffect, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/auth/get-username/${userId}`
        );
        const name = response.data.username;
        setUsername(name);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  function logout() {
    localStorage.removeItem("userId");
    navigate('/login');
  }

  return (
    <div>
      {/* TOP LAYER */}
      <div className="flex font-sans gap-7 justify-end mx-7 pt-4 text-sm">
        {["Help", "Orders & Returns"].map((str, index) => (
          <p key={index}>{str}</p>
        ))}
        {username && <p>Hi, {username}!</p>}
        <button onClick={logout} className=" bg-black text-white px-2 text-sm rounded-sm font-bold">LOGOUT</button>
      </div>
      {/* SECOND LAYER */}
      <div className="flex justify-between items-baseline mx-7 py-3">
        <p className=" font-bold text-3xl">ECOMMERCE</p>
        <div className="flex gap-7 text-lg font-medium">
          {["Categories", "Sales", "Clearance", "New Stock", "Trending"].map(
            (sections, index) => (
              <p key={index}>{sections}</p>
            )
          )}
        </div>
        <div className="flex gap-5">
          <Search strokeWidth={1} />
          <ShoppingCart strokeWidth={1} />
        </div>
      </div>
      {/* THIRD LAYER */}
      <div className=" bg-gray-400/15 p-1 font-medium text-center">
        &lt; Get 10% off on business sign up &gt;
      </div>
    </div>
  );
}

export default Navbar;
