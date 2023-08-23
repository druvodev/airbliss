import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const TopNav = () => {
    const { user } = useAuth()
    return (
        <>
            <div className="navbar justify-between w-[80%] mx-auto mt-2 py-0 rounded-full shadow-lg px-10 bg-cyan-200">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
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
                        <h4 className='mx-2 font-medium text-[18px] text-gray-800  hover:underline'>
                            {user?.displayName}
                        </h4>
                        <p className='mx-2 text-[14px] text-sm font-medium -mt-1 text-gray-600  hover:underline'>
                            {user?.email}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopNav;