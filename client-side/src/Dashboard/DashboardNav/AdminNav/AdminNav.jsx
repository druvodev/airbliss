import React from "react";
import { FaHome, FaHouseUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <>
      <NavLink
        to="adminHome"
        className={({ isActive }) =>
          `flex items-center rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-cyan-300 hover:text-gray-700 ${isActive
            ? 'bg-white text-gray-700 active:border rounded-full'
            : 'text-gray-600'
          }`
        }
      >
        <FaHouseUser className="w-5 h-5" />
        <span className="mx-4 font-medium">Admin Home</span>
      </NavLink>
      <NavLink
        to="manageUsers"
        className={({ isActive }) =>
          `flex items-center rounded-md px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-cyan-300   hover:text-gray-700 ${isActive ? "bg-cyan-300  text-gray-700" : "text-gray-600"
          }`
        }
      >
        <FaHouseUser className="w-5 h-5" />

        <span className="mx-4 font-medium">Manage Users</span>
      </NavLink>
      <NavLink
        to="addFlight"
        className={({ isActive }) =>
          `flex items-center rounded-md px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-cyan-300   hover:text-gray-700 ${isActive ? "bg-cyan-300  text-gray-700" : "text-gray-600"
          }`
        }
      >
        <FaHouseUser className="w-5 h-5" />

        <span className="mx-4 font-medium">Add Flight</span>
      </NavLink>
      <NavLink
        to="flightStatus"
        className={({ isActive }) =>
          `flex items-center rounded-md px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-cyan-300   hover:text-gray-700 ${isActive ? "bg-cyan-300  text-gray-700" : "text-gray-600"
          }`
        }
      >
        <FaHouseUser className="w-5 h-5" />

        <span className="mx-4 font-medium">Manage Flight</span>
      </NavLink>
      <NavLink
        to="account"
        className={({ isActive }) =>
          `flex items-center rounded-md px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-cyan-300   hover:text-gray-700 ${isActive ? "bg-cyan-300  text-gray-700" : "text-gray-600"
          }`
        }
      >
        <FaHouseUser className="w-5 h-5" />

        <span className="mx-4 font-medium">Account</span>
      </NavLink>
      <div className="divider"></div>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center rounded-md px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-cyan-300   hover:text-gray-700 ${isActive ? "bg-cyan-300  text-gray-700" : "text-gray-600"
          }`
        }
      >
        <FaHome className="w-5 h-5" />

        <span className="mx-4 font-medium">Home</span>
      </NavLink>
    </>
  );
};

export default AdminNav;
