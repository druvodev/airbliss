import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import TopNav from "../Dashboard/DashboardShared/TopNav/TopNav";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../Components/Loader/Loader";

const DashboardLayout = () => {
  const { loading } = useAuth();
  console.log(loading);
  const [isActive, setActive] = useState("false");
  // const [isLoading, setLoading] = useState(false)
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      console.log(isDarkMode);
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative min-h-screen md:flex">
          <Sidebar
            isActive={isActive}
            setActive={setActive}
            isDarkMode={isDarkMode}
          />
          <div className="flex-1 md:ml-64 bg-[#fffafa] dark:bg-slate-900">
            <TopNav
              handleToggle={handleToggle}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
            <div className="p-5">
              <ScrollRestoration />
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
