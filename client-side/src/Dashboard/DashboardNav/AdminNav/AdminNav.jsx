import React from "react";
import { FaHome, FaHouseUser } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { BiSolidAddToQueue } from "react-icons/bi";
import { MdManageSearch } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <>
      <NavLink
        to="adminHome"
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-gray-800 ${
            isActive
              ? "bg-white text-gray-800 active:border rounded-full"
              : "text-white"
          }`
        }
      >
        <FaHouseUser className="w-5 h-5" />
        <span className="mx-4 font-medium">Admin Home</span>
      </NavLink>
      <NavLink
        to="manageUsers"
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-gray-800 ${
            isActive
              ? "bg-white text-gray-800 active:border rounded-full"
              : "text-white"
          }`
        }
      >
        <TiGroup className="w-5 h-5" />

        <span className="mx-4 font-medium">Manage Users</span>
      </NavLink>
      <NavLink
        to="addFlight"
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-gray-800 ${
            isActive
              ? "bg-white text-gray-800 active:border rounded-full"
              : "text-white"
          }`
        }
      >
        <BiSolidAddToQueue className="w-5 h-5" />

        <span className="mx-4 font-medium">Add Flight</span>
      </NavLink>
      <NavLink
        to="flightStatus"
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-gray-800 ${
            isActive
              ? "bg-white text-gray-800 active:border rounded-full"
              : "text-white"
          }`
        }
      >
        <MdManageSearch className="w-5 h-5" />

        <span className="mx-4 font-medium">Manage Flight</span>
      </NavLink>
      <NavLink
        to="account"
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-gray-800 ${
            isActive
              ? "bg-white text-gray-800 active:border rounded-full"
              : "text-white"
          }`
        }
      >
        <BsFillPersonFill className="w-5 h-5" />

        <span className="mx-4 font-medium">Account</span>
      </NavLink>

      <div className="divider"></div>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-gray-800 ${
            isActive
              ? "bg-white text-gray-800 active:border rounded-full"
              : "text-white"
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
