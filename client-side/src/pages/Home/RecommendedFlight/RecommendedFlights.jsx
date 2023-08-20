import React from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import SectionTitle from "../../../Components/SectionTitle";

const RecommendedFlights = () => {
  return (
    <div>
      <div>
        <div>
          {/* <h1 className="text-xl mt-2 font-semibold">Recommended Flights</h1>
          <p className="text-sky-700 flex mt-1 font-bold m">
            <GiAirplaneDeparture /> --------
          </p> */}
          <SectionTitle sectionTitle={"Recommended Flights"} />
          <p className="text-xs mb-10">
            Most famous Flights of us. Our happy clients always happy with these
            Flights. <br /> The flights are always maintenance there roles and
            regulations
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-7">
          <div className="border overflow-hidden rounded-md shadow-lg p-5">
            <div>
              <div className="flex gap-5 container ">
                <img
                  className="object-cover rounded-md shadow-md h-52 mb-14 w-full"
                  src="https://c4.wallpaperflare.com/wallpaper/393/536/1/the-sky-clouds-flight-lights-wallpaper-preview.jpg"
                />
              </div>
            </div>
            <div className="flex mt-2 justify-between items-center">
              <div>
                <p className="w-10 h-10 rounded-[100%] border border-black text-black pl-3 pt-3">
                  <GiAirplaneDeparture />
                </p>
              </div>
              <div>
                <h3 className="card-title mr-16">Bengaluru to Paris</h3>
                <p className="text-semibold text-xs font-semibold">
                  ONE WAY FLIGHTS
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">FROM</p>
                <p className="text-sky-400 font-bold">$620</p>
              </div>
            </div>
            <div className="flex  items-center align-middle justify-between  mt-8">
              <button className="rounded-full bg-cyan-700 hover:bg-cyan-600 font-bold px-3 text-white">
                View
              </button>
              <button className="rounded-full border text-sky-500 px-3 font-bold hover:bg-cyan-700 hover:text-white border-sky-500 ">
                Book
              </button>
            </div>
          </div>
          <div className="border shadow-lg p-5">
            <div>
              <div className="flex gap-5 container ">
                <img
                  className="object-cover rounded-md shadow-md h-52 mb-14 w-full"
                  src="https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                />
              </div>
            </div>
            <div className="flex mt-2 justify-between items-center">
              <div>
                <p className="w-10 h-10 rounded-[100%] border border-black text-black pl-3 pt-3">
                  <GiAirplaneDeparture />
                </p>
              </div>
              <div>
                <h3 className="card-title mr-16">Bengaluru to Paris</h3>
                <p className="text-semibold text-xs font-semibold">
                  ONE WAY FLIGHT
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">FROM</p>
                <p className="text-sky-400 font-bold">$620</p>
              </div>
            </div>
            <div className="flex items-center align-middle justify-between mt-8">
              <button className="rounded-full bg-cyan-700 hover:bg-cyan-600 font-bold px-3 text-white">
                View
              </button>
              <button className="rounded-full border text-sky-500 px-3 font-bold hover:bg-cyan-700 hover:text-white border-sky-500 ">
                Book
              </button>
            </div>
          </div>
          <div className="border shadow-lg p-5 ">
            <div>
              <div className="flex gap-5 container ">
                <img
                  className="object-cover rounded-md shadow-md h-52 mb-14 w-full "
                  src="https://www.traveloffpath.com/wp-content/uploads/2021/11/New%E2%80%8B-Low-Cost-Airline-Set-To-Launch-In-Calgary-Next-Year.jpg"
                />
              </div>
            </div>
            <div className="flex mt-2 justify-between items-center">
              <div>
                <p className="w-10 h-10 rounded-[100%] border border-black text-black pl-3 pt-3">
                  <GiAirplaneDeparture />
                </p>
              </div>
              <div>
                <h3 className="card-title mr-16">Bengaluru to Paris</h3>
                <p className="text-semibold text-xs font-semibold">
                  ONE WAY FLIGHT
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">FROM</p>
                <p className="text-sky-400 font-bold">$620</p>
              </div>
            </div>
            <div className="flex items-center align-middle justify-between  mt-8">
              <button className="rounded-full bg-cyan-700 hover:bg-cyan-600 font-bold px-3 text-white">
                View
              </button>
              <button className="rounded-full border text-sky-500 px-3 font-bold hover:bg-cyan-700 hover:text-white border-sky-500 ">
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedFlights;
