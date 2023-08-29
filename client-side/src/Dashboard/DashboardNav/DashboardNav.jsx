import React, { useState } from "react";
import UserNav from "./UserNav/UserNav";
import AdminNav from "./AdminNav/AdminNav";

const DashboardNav = () => {
  const userType = "admin";

  const renderNavigation = () => {
    if (userType === "admin") {
      return <AdminNav />;
    } else if (userType === "user") {
      return <UserNav />;
    }
    return null;
  };

  return <>{renderNavigation()}</>;
};

export default DashboardNav;
