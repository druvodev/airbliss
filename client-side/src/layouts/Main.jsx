import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import ScrollTopButton from "../Components/ScrollToTopButton/ScrollTopButton";
import { CountdownProvider } from "../providers/CountdownContext";
import { useSelector } from "react-redux";
import Loader from "../Components/Loader/Loader";
import { useEffect } from "react";

const Main = () => {
  const loading = useSelector((state) => state.global.loading);
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);
  return (
    <div className="bg-[#f9f9f9]">
      <Navbar />
      <CountdownProvider>
        <ScrollRestoration />
        <Outlet />
      </CountdownProvider>
      <Footer />
      <ScrollTopButton />
      {loading && (
        <div className="fixed top-0 left-0  h-full w-full bg-[#f9f9f9] z-[100]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Main;
