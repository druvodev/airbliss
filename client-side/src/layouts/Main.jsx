import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const Main = () => {
  return (
    <div className="px-5 sm:px-10">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
