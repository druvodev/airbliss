import { Outlet } from 'react-router-dom'
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import TopNav from '../Dashboard/DashboardShared/TopNav/TopNav';

const DashboardLayout = () => {
    return (
        <div className='relative min-h-screen md:flex'>
            <Sidebar />
            <div className='flex-1 md:ml-64 bg-[#f7f8fe]'>
                <TopNav />
                <div className='p-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;