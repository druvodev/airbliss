import React, { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loader from "../Components/Loader/Loader";
import useAxios from "../hooks/useAxios";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const API = useAxios();
  const [isLoadingData, setIsLoadingData] = useState(true); // Add loading state

  useEffect(() => {
    API
      .get("/users")
      .then((response) => {
        setUsers(response?.data);
        setIsLoadingData(false); // Data has arrived, set loading to false
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoadingData(false); // Handle error and set loading to false
      });
  }, [API, user, isLoadingData]);

  const currentUser = users?.find(
    (userData) => userData?.email === user?.email
  );

  const isAdmin = currentUser?.role === "admin";

  if (loading || isLoadingData) {
    // Display loading when loading or fetching data
    return <Loader />;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
