import React, { useEffect, useState } from 'react';
import UserNav from './UserNav/UserNav';
import AdminNav from './AdminNav/AdminNav';

import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const DashboardNav = ({closeSidebar}) => {
    const { user } = useAuth()
    const [users, setUsers] = useState([])
    const API = useAxios();

    useEffect(() => {
        API.get('/users')
            .then(response => {
                setUsers(response?.data)
                // console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [API]);

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
