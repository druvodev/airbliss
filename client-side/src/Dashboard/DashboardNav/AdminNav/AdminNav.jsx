import React, { useEffect } from "react";
import { FaHome, FaHouseUser } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { BiSolidAddToQueue } from "react-icons/bi";
import { MdManageSearch } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRefetch } from "../../../redux/features/usersSlice";
import { setAllBookings } from "../../../redux/features/bookingInfoSlice";

const AdminNav = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:5000/allBookings`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setAllBookings(data));
        dispatch(setRefetch(true));
        // console.log(data);
      });
  }, []);

  const allBooking = useSelector((state) => state.userBookingInfo.allBookings)
  const userData = useSelector((state) => state?.userInfo.allUserInfo);

  if (allBooking.length > 1) {
    sessionStorage.setItem('userBookings', JSON.stringify(allBooking));
  }

  
  if (userData.length > 1) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }

  return (
    <>
      <NavLink
        to="adminHome"
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-cyan-500 ${isActive
            ? "bg-white text-cyan-500 active:border rounded-full"
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
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-cyan-500 ${isActive
            ? "bg-white text-cyan-500 active:border rounded-full"
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
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-cyan-500 ${isActive
            ? "bg-white text-cyan-500 active:border rounded-full"
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
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-gray-800 ${isActive
            ? "bg-white text-gray-800 active:border rounded-full"
            : "text-white"
          }`
        }
      >
        <MdManageSearch className="w-5 h-5" />

        <span className="mx-4 font-medium">Manage Flight</span>
      </NavLink>
      <NavLink
        to="managebookings"
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-gray-800 ${isActive
            ? "bg-white text-gray-800 active:border rounded-full"
            : "text-white"
          }`
        }
      >
        <MdManageSearch className="w-5 h-5" />

        <span className="mx-4 font-medium">Bookings</span>
      </NavLink>
      <NavLink
        to="account"
        className={({ isActive }) =>
          `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-cyan-500 ${isActive
            ? "bg-white text-cyan-500 active:border rounded-full"
            : "text-white"
          }`
        }
      >
        <BsFillPersonFill className="w-5 h-5" />

        <span className="mx-4 font-medium">Account</span>
      </NavLink>
    </>
  );
};

export default AdminNav;
