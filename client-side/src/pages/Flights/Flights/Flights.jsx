import SearchFilter from "../../../Components/SearchFilter/SearchFilter";
import ResultsFilter from "../ResultsFilter/ResultsFilter";

const Flights = () => {
  return (
    <div className="mt-16 max-w-7xl mx-auto">
      <SearchFilter />
      <div className=" grid md:grid-cols-3 gap-5 mt-12 px-5 sm:px-10">
        <div className="col-span-1">
          <ResultsFilter />
        </div>
        <div className="col-span-2">Right Side</div>
      </div>
    </div>
  );
};

export default Flights;
