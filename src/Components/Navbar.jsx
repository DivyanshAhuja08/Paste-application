import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex flex-row gap-8 justify-center p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-6 py-3 rounded-lg ${
            isActive ? "bg-blue-600 scale-105 shadow-lg" : ""
          } hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-110`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `px-6 py-3 rounded-lg ${
            isActive ? "bg-blue-600 scale-105 shadow-lg" : ""
          } hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-110`
        }
      >
        Pastes
      </NavLink>
    </div>
  );
};
