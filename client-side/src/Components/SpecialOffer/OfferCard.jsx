import { MdOutlineLocationOn } from "react-icons/md";
import SearchFilter from "../SearchFilter/SearchFilter";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToCityInfo } from "../../redux/features/searchFilterSlice";
const OfferCard = ({ offerImg, fromCity, toCity, date }) => {
  const [isStart, setIsStart] = useState("");
  const dispatch = useDispatch();
  const handleSearch = () => {
    setIsStart(new Date().toString());
    dispatch(setToCityInfo(toCity));
  };

  return (
    <>
      <div className="h-20 bg-cyan-500/20 w-full rounded-xl shadow shadow-cyan-200 overflow-hidden flex">
        <div
          className="h-20 aspect-square bg-cover flex justify-center items-center"
          style={{ backgroundImage: `url(${offerImg})` }}
        >
          <p className="text-2xl font-bold text-white">{toCity.discount}%</p>
        </div>
        <div className="p-2 grid items-center w-full">
          <h4 className="font-semibold flex items-center">
            <MdOutlineLocationOn className="text-xl hidden sm:block" />{" "}
            {fromCity} to {toCity.destination.split(",")[0]}
          </h4>
          <div className="flex gap-1 justify-between">
            <div className="mt-auto">
              {" "}
              <p className="text-sm">{date}</p>
              <div className="flex items-center text-orange-500">
                Save up to {toCity.discount}%
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="px-2 mb-1 h-fit mt-auto border border-accent rounded shadow hover:bg-accent hover:text-white duration-200 "
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
