import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const Main = () => {
  return (
    <>
      <Navbar />
      <div className="px-5 sm:px-10 max-w-7xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Main;
