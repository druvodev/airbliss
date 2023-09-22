import { useEffect } from "react";
import PopUpOffer from "../../../Components/PopUpOffer/PopUpOffer";
import { useCountdownContext } from "../../../providers/CountdownContext";

import Hero from "../Hero/Hero";
import HotDeals from "../HotDeals/HotDeals";
import HotelDiscount from "../HotelDiscount/HotelDiscount";
import OurServices from "../OurServices/OurServices";
import RecommendedFlights from "../RecommendedFlight/RecommendedFlights";

const Home = () => {
  const { setIsStart } = useCountdownContext();

  useEffect(() => {
    setIsStart(false);
  }, []);

  return (
    <div>
      <Hero />
      <div className="px-5 sm:px-10 max-w-7xl mx-auto h-auto overflow-hidden">
        {/* Add Another Components */}
        <HotDeals></HotDeals>
        <RecommendedFlights />
        <OurServices />
        <HotelDiscount></HotelDiscount>
        <PopUpOffer />
        {/* <LoginForm /> */}
      </div>
    </div>
  );
};

export default Home;
