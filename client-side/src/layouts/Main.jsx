import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import ScrollTopButton from "../Components/ScrollToTopButton/ScrollTopButton";

const Main = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      {/* <TawkToChat /> */}
      <ScrollTopButton />
    </>
  );
};

export default Main;
