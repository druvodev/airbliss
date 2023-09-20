import React, { useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaHandHoldingMedical, FaHouseUser } from "react-icons/fa";
import { MdDashboardCustomize, MdOutlineDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setUserBookings } from "../../../redux/features/usersSlice";
import { MdManageSearch } from "react-icons/md";
import { TbCalendarTime } from "react-icons/tb";

const UserNav = ({closeSidebar}) => {
  const { user } = useAuth();
  const refetch = useSelector((state) => state.userInfo?.refetch);
  const dispatch = useDispatch();

  console.log("refetch from userNav", refetch);

  useEffect(() => {
    fetch(`http://localhost:5000/userBooking/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUserBookings(data));
      });
  }, [user, refetch]);

  return (
    <div>
      <NavLink
        to="UserHome"
        onClick={()=>closeSidebar('false')}
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
        onClick={()=>closeSidebar('false')}
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
        to="userInsurance"
        onClick={()=>closeSidebar('false')}
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-cyan-500 ${
            isActive
              ? "bg-white text-cyan-500 active:border rounded-full"
              : "text-white"
          }`
        }
      >
        <FaHandHoldingMedical className="w-5 h-5" />

        <span className="mx-4 font-medium">Insurance</span>
      </NavLink>
      <NavLink
        to="applyReschedule"
        onClick={()=>closeSidebar('false')}
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-cyan-500 ${
            isActive
              ? "bg-white text-cyan-500 active:border rounded-full"
              : "text-white"
          }`
        }
      >
        <TbCalendarTime className="w-5 h-5" />

        <span className="mx-4 font-medium">Reschedule</span>
      </NavLink>
      <NavLink
        to="account"
        onClick={()=>closeSidebar('false')}
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
