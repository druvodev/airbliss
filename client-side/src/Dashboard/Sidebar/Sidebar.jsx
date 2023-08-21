import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import logo from '../../assets/icon/airblissBlack.png'
import { AiOutlineBars } from 'react-icons/ai'
import useAuth from '../../hooks/useAuth'
import DashboardNav from '../DashboardNav/DashboardNav'
import AdminNav from '../DashboardNav/AdminNav/AdminNav'

const Sidebar = () => {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const { user, logOut } = useAuth()

    const [isActive, setActive] = useState('false')
    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    const handleLogOut = () => {
        logOut()
        navigate('/')
    }
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <img
                            className='hidden md:block'
                            width='100'
                            height='100'
                            src="https://i.ibb.co/FbFzwxM/4425949-2411-removebg-preview.png"
                            alt=""
                        />
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>
            {/* Sidebar */}
            <div
                className={`z-10 px-[25px] md:fixed flex flex-col justify-between overflow-x-hidden bg-cyan-50 w-64 space-y-6 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    {/* Branding & Profile Info */}
                    <div>
                        <div className='w-full hidden md:flex py-2 justify-center items-center rounded-md mx-auto'>
                            <img
                                className='hidden md:block'
                                width='100'
                                height='100'
                                src={logo}
                                alt=""
                            />
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>
                            <>
                                <DashboardNav />
                            </>
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />
                    <button
                        onClick={handleLogOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar