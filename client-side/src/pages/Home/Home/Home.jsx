import Hero from "../Hero/Hero";
import HotDeals from "../HotDeals/HotDeals";
import OurServices from "../OurServices/OurServices";
import RecommendedFlights from "../RecommendedFlight/RecommendedFlights";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="px-5 sm:px-10 max-w-7xl mx-auto h-auto overflow-hidden">
        {/* Add Another Components */}
        <HotDeals></HotDeals>
        <RecommendedFlights />
        <OurServices />
      </div>
    </div>
  );
};

export default Home;
