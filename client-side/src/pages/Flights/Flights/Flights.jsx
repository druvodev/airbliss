import SearchFilter from "../../../Components/SearchFilter/SearchFilter";
import ResultsFilter from "../ResultsFilter/ResultsFilter";
import banner from "../../../assets/banner/flights.webp";
import BookFlight from "../BookingFlights/BookFlight/BookFlight";

const Flights = () => {
  return (
    <>
      <img src={banner} className="w-full h-44 object-cover" alt="" />
      <div className=" max-w-7xl mx-auto -mt-10 mb-[250px]">
        <SearchFilter bookingType="flight" filterName="Modify Search" />
        <div className=" grid md:grid-cols-3 gap-5 mt-12 px-5 sm:px-10">
          <div className="col-span-1">
            <ResultsFilter />
          </div>
          <div className="col-span-2">
            <BookFlight />
          </div>
        </div>
      </div>
    </>
  );
};

export default Flights;
