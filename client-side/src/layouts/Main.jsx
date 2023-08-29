import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import ScrollTopButton from "../Components/ScrollToTopButton/ScrollTopButton";
import { CountdownProvider } from "../providers/CountdownContext";

const Main = () => {
  return (
    <>
      <Navbar />
      <CountdownProvider>
        <Outlet />
      </CountdownProvider>
      <Footer />
      <ScrollTopButton />
    </>
  );
};

export default Main;
