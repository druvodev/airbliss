import { MdOutlineLocationOn } from "react-icons/md";
import SearchFilter from "../SearchFilter/SearchFilter";
import { useState } from "react";
const OfferCard = ({ offerImg, fromCity, toCity, date, discount }) => {
  const [isStart, setIsStart] = useState("");
  const handleSearch = () => {
    setIsStart(new Date().toString());
  };
  return (
    <>
      <div className="h-20 bg-cyan-500/20 w-full rounded-xl shadow shadow-cyan-200 overflow-hidden flex">
        <div
          className="h-20 aspect-square bg-cover flex justify-center items-center"
          style={{ backgroundImage: `url(${offerImg})` }}
        >
          <p className="text-2xl font-bold text-white">{discount}%</p>
        </div>
        <div className="py-2 pl-2 pr-3 flex gap-2 items-center justify-between w-full">
          <div>
            <h4 className="font-semibold flex items-center gap-1">
              <MdOutlineLocationOn className="text-xl hidden sm:block" />{" "}
              {fromCity.length > 6 ? `${fromCity.substring(0, 6)}..` : fromCity}{" "}
              to {toCity.length > 6 ? `${toCity.substring(0, 6)}..` : toCity}
            </h4>
            <p className="text-sm">{date}</p>
            <div className="flex items-center text-orange-500">
              Save up to {discount}%
            </div>
          </div>
          <div className="mt-auto">
            <button
              onClick={handleSearch}
              className="px-2 border border-accent rounded shadow hover:bg-accent hover:text-white duration-200"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      {isStart && (
        <div className="hidden">
          <SearchFilter bookingType="flight" filterName="Modify Search" />
        </div>
      )}
    </>
  );
};

export default OfferCard;
