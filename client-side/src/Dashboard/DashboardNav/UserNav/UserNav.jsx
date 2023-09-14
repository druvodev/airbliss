import React, { useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaHome, FaHouseUser } from "react-icons/fa";
import { MdDashboardCustomize, MdOutlineDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  setRefetch,
  setUserBookings,
} from "../../../redux/features/usersSlice";
import { MdManageSearch } from "react-icons/md";

const UserNav = () => {
  const { user } = useAuth();
  const refetch = useSelector((state) => state.userInfo?.refetch);
  const dispatch = useDispatch();

  // console.log(refetch);

  useEffect(() => {
    fetch(`http://localhost:5000/userBooking/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUserBookings(data));
        dispatch(setRefetch(true));
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
        <MdDashboardCustomize className="w-5 h-5" />

        <span className="mx-4 font-medium">My Dashboard</span>
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
        <MdManageSearch className="w-5 h-5" />

        <span className="mx-4 font-medium">My Bookings</span>
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
