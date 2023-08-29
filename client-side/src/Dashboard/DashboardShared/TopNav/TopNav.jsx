import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

const TopNav = ({ handleToggle }) => {
  const { user } = useAuth()
  return (
    <>
      <div
        className="navbar lg:flex-row flex-row-reverse justify-between lg:w-[50%] w-[90%] mx-auto mt-2 py-0 rounded-full shadow-lg px-10 bg-cyan-200"
        style={{
          backgroundImage: 'linear-gradient(to right, #70cfc9 , #5daad6 )',
        }}
      >
        <div className="navbar-start">
          <div className='border-[1px] hidden lg:flex bg-white w-ful md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
            <div className='flex flex-row items-center justify-between'>
              <div className='text-sm font-semibold px-6'>Anywhere</div>
              <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                Any Week
              </div>
              <div className='text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3'>
                <div className='hidden sm:block'>Any Day's</div>
                <div className='p-1 bg-cyan-500 rounded-full text-white'>
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
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className=''>
                <Link to='/dashboard/account' className="hover:bg-cyan-300">
                  Profile
                </Link>
              </li>
              <li className=''>
                <Link to='/' className="hover:bg-cyan-300">
                  Home
                </Link>
              </li>
              <li className=''>
                <Link to='/' className="hover:bg-cyan-300">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          <div className=''>
            <h4 className='mx-2 font-medium text-[8px] lg:text-[18px] text-gray-50  hover:underline'>
              {user?.displayName}
            </h4>
            <p className='mx-2 text-[8px] lg:text-[14px] font-medium -mt-1 text-gray-100  hover:underline'>
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;