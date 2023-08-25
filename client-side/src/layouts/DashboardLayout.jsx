import { Outlet } from 'react-router-dom'
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import TopNav from '../Dashboard/DashboardShared/TopNav/TopNav';
import { useState } from 'react';

const DashboardLayout = () => {
    const [isActive, setActive] = useState('false')
    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    return (
        <div className='relative min-h-screen md:flex'>
            <Sidebar
                isActive={isActive}
            />
            <div className='flex-1 md:ml-64 bg-[#f7f8fe]'>
                <TopNav
                    handleToggle={handleToggle}
                />
                <div className='p-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;