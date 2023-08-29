import React from 'react';
import { FaHome, FaHouseUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const UserNav = () => {
    return (
        <div>
            <NavLink
                to='booking'
                className={({ isActive }) =>
                    `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-gray-800 ${isActive
                        ? 'bg-white text-gray-800 active:border rounded-full'
                        : 'text-white'
                    }`
                }
            >
                <FaHouseUser className='w-5 h-5' />

                <span className='mx-4 font-medium'>Manage Book</span>
            </NavLink>
            <NavLink
                to='account'
                className={({ isActive }) =>
                    `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-gray-800 ${isActive
                        ? 'bg-white text-gray-800 active:border rounded-full'
                        : 'text-white'
                    }`
                }
            >
                <FaHouseUser className='w-5 h-5' />

                <span className='mx-4 font-medium'>Account</span>
            </NavLink>
            <div className="divider"></div>
            <NavLink
                to='/'
                className={({ isActive }) =>
                    `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-gray-800 ${isActive
                        ? 'bg-white text-gray-800 active:border rounded-full'
                        : 'text-white'
                    }`
                }
            >
                <FaHome className='w-5 h-5' />

                <span className='mx-4 font-medium'>Home</span>
            </NavLink>
        </div>
    );
};

export default UserNav;