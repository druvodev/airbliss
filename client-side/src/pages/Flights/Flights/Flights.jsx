import SearchFilter from "../../../Components/SearchFilter/SearchFilter";
import ResultsFilter from "../ResultsFilter/ResultsFilter";
import banner from "../../../assets/banner/flights.webp";
import { BiSolidEdit } from "react-icons/bi";
import { TbFilterEdit } from "react-icons/tb";
import { useState } from "react";
import BookFlight from "../BookingFlights/BookFlight/BookFlight";

const Flights = () => {
  const [isShowSearch, setIsShowSearch] = useState(false);
  return (
    <>
      <img src={banner} className="w-full h-44 object-cover" alt="" />
      <div className="max-w-7xl mx-auto sm:-mt-10">
        <div className="flex items-center justify-between sm:hidden gap-1 p-3 mt-3 mx-3 border rounded-md bg-cyan-50/50">
          <div>
            <p className="text-sm font-semibold">Dhaka to Khulna</p>
            <small>15 Aug | 1 Adult | First Class</small>
          </div>
          <div
            onClick={() => setIsShowSearch(!isShowSearch)}
            className="text-cyan-500"
          >
            <BiSolidEdit className="mx-auto text-xl" />
            <small>Modify</small>
          </div>
        </div>

        <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box p-0">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <>
              <ResultsFilter />
            </>
          </form>
        </dialog>
        <div
          onClick={() => window.my_modal_3.showModal()}
          className="flex items-center justify-between sm:hidden gap-1 p-3 mt-3 mx-3 shadow rounded-md bg-cyan-50/50"
        >
          <p className="font-semibold text-sm">Filter your search result</p>
          <div className="text-gray-500">
            <TbFilterEdit className="text-xl" />
          </div>
        </div>
        {isShowSearch && (
          <SearchFilter bookingType="flight" filterName="Modify Search" />
        )}
        <div className="hidden sm:block">
          <SearchFilter bookingType="flight" filterName="Modify Search" />
        </div>
        <div className=" grid md:grid-cols-3 gap-5 mt-12 px-5 sm:px-10">
          <div className="col-span-1 hidden sm:block">
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
