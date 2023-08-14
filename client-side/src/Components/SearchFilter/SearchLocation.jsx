import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchLocation = React.memo(({ setIsModal }) => {
  return (
    <div className="text-gray-600 w-80 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-md bg-white overflow-hidden">
      <div className="flex gap-1 items-center mb-1 pt-2 px-2">
        <FaSearch className="text-cyan-600 text-xl" />{" "}
        <input
          type="text"
          placeholder="Type for the location name"
          className="w-full p-1 outline-none"
        />
      </div>
      <hr />
      <div className="max-h-80 overflow-y-scroll">
        <div
          onClick={() => setIsModal(false)}
          className="flex items-center justify-between gap-1 px-2 py-1 hover:bg-slate-100 cursor-pointer"
        >
          <div>
            <h5 className="text-sm font-semibold">Dhaka, Bangladesh</h5>
            <p className="text-sm">
              <small>Hazrat Shahjalal International Airport</small>
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-500">DAC</p>
        </div>
        <div
          onClick={() => setIsModal(false)}
          className="flex items-center justify-between gap-1 px-2 py-1 hover:bg-slate-100 cursor-pointer"
        >
          <div>
            <h5 className="text-sm font-semibold">Dhaka, Bangladesh</h5>
            <p className="text-sm">
              <small>Hazrat Shahjalal International Airport</small>
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-500">DAC</p>
        </div>
        <div
          onClick={() => setIsModal(false)}
          className="flex items-center justify-between gap-1 px-2 py-1 hover:bg-slate-100 cursor-pointer"
        >
          <div>
            <h5 className="text-sm font-semibold">Dhaka, Bangladesh</h5>
            <p className="text-sm">
              <small>Hazrat Shahjalal International Airport</small>
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-500">DAC</p>
        </div>
        <div
          onClick={() => setIsModal(false)}
          className="flex items-center justify-between gap-1 px-2 py-1 hover:bg-slate-100 cursor-pointer"
        >
          <div>
            <h5 className="text-sm font-semibold">Dhaka, Bangladesh</h5>
            <p className="text-sm">
              <small>Hazrat Shahjalal International Airport</small>
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-500">DAC</p>
        </div>
        <div
          onClick={() => setIsModal(false)}
          className="flex items-center justify-between gap-1 px-2 py-1 hover:bg-slate-100 cursor-pointer"
        >
          <div>
            <h5 className="text-sm font-semibold">Dhaka, Bangladesh</h5>
            <p className="text-sm">
              <small>Hazrat Shahjalal International Airport</small>
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-500">DAC</p>
        </div>
        <div
          onClick={() => setIsModal(false)}
          className="flex items-center justify-between gap-1 px-2 py-1 hover:bg-slate-100 cursor-pointer"
        >
          <div>
            <h5 className="text-sm font-semibold">Dhaka, Bangladesh</h5>
            <p className="text-sm">
              <small>Hazrat Shahjalal International Airport</small>
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-500">DAC</p>
        </div>
        <div
          onClick={() => setIsModal(false)}
          className="flex items-center justify-between gap-1 px-2 py-1 hover:bg-slate-100 cursor-pointer"
        >
          <div>
            <h5 className="text-sm font-semibold">Dhaka, Bangladesh</h5>
            <p className="text-sm">
              <small>Hazrat Shahjalal International Airport</small>
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-500">DAC</p>
        </div>
        <div
          onClick={() => setIsModal(false)}
          className="flex items-center justify-between gap-1 px-2 py-1 hover:bg-slate-100 cursor-pointer"
        >
          <div>
            <h5 className="text-sm font-semibold">Dhaka, Bangladesh</h5>
            <p className="text-sm">
              <small>Hazrat Shahjalal International Airport</small>
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-500">DAC</p>
        </div>
      </div>
    </div>
  );
});

export default SearchLocation;
