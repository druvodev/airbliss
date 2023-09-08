import React, { useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaHome, FaHouseUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setUserBookings } from "../../../redux/features/usersSlice";

const UserNav = () => {
  const { user } = useAuth();
  const refetch = useSelector((state) => state.userInfo.refetch);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://server-side-tawny-sigma.vercel.app/userBooking/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUserBookings(data));
      });
  }, [user, refetch]);

  return (
    <div>
      <NavLink
        to="UserHome"
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-cyan-500 ${
            isActive
              ? "bg-white text-cyan-500 active:border rounded-full"
              : "text-white"
          }`
        }
      >
        <FaHouseUser className="w-5 h-5" />

        <span className="mx-4 font-medium">User Home</span>
      </NavLink>
      <NavLink
        to="booking"
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-cyan-500 ${
            isActive
              ? "bg-white text-cyan-500 active:border rounded-full"
              : "text-white"
          }`
        }
      >
        <FaHouseUser className="w-5 h-5" />

        <span className="mx-4 font-medium">Manage Book</span>
      </NavLink>
      <NavLink
        to="account"
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-cyan-500 ${
            isActive
              ? "bg-white text-cyan-500 active:border rounded-full"
              : "text-white"
          }`
        }
      >
        <BsFillPersonFill className="w-5 h-5" />

        <span className="mx-4 font-medium">Account</span>
      </NavLink>
    </div>
  );
};

export default UserNav;
