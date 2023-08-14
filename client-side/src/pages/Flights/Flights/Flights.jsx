import SearchFilter from "../../../Components/SearchFilter/SearchFilter";

const Flights = () => {
  return (
    <div className="mt-16">
      <SearchFilter />
      <div className=" grid md:grid-cols-3 gap-5 mt-12">
        <div className="col-span-1">Left Side</div>
        <div className="col-span-2">Right Side</div>
      </div>
    </div>
  );
};

export default Flights;
