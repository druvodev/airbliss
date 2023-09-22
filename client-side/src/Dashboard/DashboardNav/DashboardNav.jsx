import React, { useEffect, useState } from 'react';
import UserNav from './UserNav/UserNav';
import AdminNav from './AdminNav/AdminNav';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import useAuth from '../../hooks/useAuth';

const DashboardNav = ({closeSidebar}) => {
    const { user } = useAuth()
    const [users, setUsers] = useState([])
    const [axiosSecure] = UseAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/users')
            .then(response => {
                setUsers(response?.data)
                // console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [axiosSecure]);

    const currentUser = users.find(userData => userData?.email === user?.email);

    const userType = currentUser?.role;

    const renderNavigation = () => {
        if (userType === "admin") {
            return <AdminNav closeSidebar={closeSidebar} />;
        } else if (userType === "user") {
            return <UserNav closeSidebar={closeSidebar} />;
        }
        return null;
    };


    return <>{renderNavigation()}</>;
};

export default DashboardNav;
