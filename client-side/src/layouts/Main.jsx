import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import ScrollTopButton from "../Components/ScrollToTopButton/ScrollTopButton";
import { CountdownProvider } from "../providers/CountdownContext";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader/Loader";
import { useEffect } from "react";
import { setAccordionData, setServices } from "../redux/features/servicesSlice";

const Main = () => {
  const loading = useSelector((state) => state.global.loading);

  const dispatch = useDispatch();
  const refetch = useSelector((state) => state.ourServices?.refetch);

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => dispatch(setServices(data)));
  }, [refetch]);

  useEffect(() => {
    fetch("http://localhost:5000/whyairbliss")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data", data);
        dispatch(setAccordionData(data));
      });
  }, [refetch]);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);
  return (
    <div className="  dark:bg-slate-900 dark:text-gray-300 ">
      <Navbar />
      <CountdownProvider>
        <ScrollRestoration />
        <Outlet />
      </CountdownProvider>
      <Footer />
      <ScrollTopButton />
      {loading && (
        <div className="fixed top-0 left-0  h-full bg-white w-full z-[100]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Main;
