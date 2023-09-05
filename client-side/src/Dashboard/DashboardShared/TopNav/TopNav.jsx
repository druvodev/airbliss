import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

const TopNav = ({ handleToggle }) => {
  const { user, logOut } = useAuth()
  return (
    <>
      <div
        className="navbar lg:gap-10 gap-0 lg:flex-row flex-row-reverse justify-between w-[100%] mx-auto py-0 rounded shadow-md px-10 bg-white"
      // style={{
      //   backgroundImage: 'linear-gradient(to right, #70cfc9 , #5daad6 )',
      // }}
      >
        <div className="navbar-start">
          <div className='border-[1px] hidden lg:flex bg-[#e5eaf5] w-full md:w-auto py-2 rounded shadow-sm hover:shadow-md transition cursor-pointer'>
            <div className='flex flex-row items-center justify-between'>
              <div className='text-sm font-semibold text-[#4d61cd] px-6'>Anywhere</div>
              <div className='hidden text-[#4d61cd] sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                Any Week
              </div>
              <div className='text-sm pl-6 pr-2 text-[#4d61cd] flex flex-row items-center gap-3'>
                <div className='hidden sm:block'>Any Day's</div>
                <div className='p-1 bg-[#2f45c8] ml-10 rounded-full text-white'>
                  <BiSearch size={18} />
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost ml-24 lg:hidden">
              <svg onClick={handleToggle} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
          </div>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-error indicator-item"></span>
            </div>
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle online avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className=''>
                <Link to='/dashboard/account' className="hover:bg-blue-50">
                  Profile
                </Link>
              </li>
              <li className=''>
                <Link to='/' className="hover:bg-blue-50">
                  Home
                </Link>
              </li>
              <li className=''>
                <Link to="/" onClick={logOut} className="hover:bg-blue-50">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          <div className=''>
            <h4 className='mx-2 font-medium text-[8px] lg:text-[18px] text-[#37517e]  hover:underline'>
              {user?.displayName}
            </h4>
            <p className='mx-2 text-[8px] lg:text-[14px] font-medium -mt-1 text-[#37517e] hover:underline'>
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;