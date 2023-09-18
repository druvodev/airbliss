import React, { useEffect, useState } from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import SectionTitle from "../../../Components/SectionTitle";

const RecommendedFlights = () => {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    fetch("recommendedFlights.json")
      .then((res) => res.json())
      .then((data) => setFlights(data));
  });

  return (
    <div>
      <div>
        <div>
          {/* <h1 className="text-xl mt-2 font-semibold">Recommended Flights</h1>
          <p className="text-sky-700 flex mt-1 font-bold m">
            <GiAirplaneDeparture /> --------
          </p> */}
          <SectionTitle sectionTitle={"Recommended Flights"} />
          <p className=" text-sm sm:text-base mb-10">
            Most famous Flights of us. Our happy clients always happy with these
            Flights. <br /> The flights are always maintenance there roles and
            regulations
          </p>
        </div>

        <div
          data-testid="cards-container"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {flights.map((flight, inx) => (
            <div
              key={inx}
              className="border card overflow-hidden rounded-md shadow-lg p-5"
            >
              <div>
                <div className="flex gap-5 container ">
                  <img
                    className="object-cover rounded-md shadow-md h-52 mb-20 w-full"
                    src={flight?.imageSrc}
                  />
                </div>
              </div>
              <div className="flex mt-2 gap-x-2 justify-between items-center">
                <div>
                  <p className="w-10 h-10 rounded-[100%] border border-black text-black pl-3 pt-3">
                    <GiAirplaneDeparture />
                  </p>
                </div>
                <div>
                  <h3 className="card-title mr-16 text-lg">{flight?.title}</h3>
                  <p className="text-semibold text-xs font-semibold">
                    {flight?.description}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">FROM</p>
                  <p className="text-sky-400 font-bold">{flight?.price}</p>
                </div>
              </div>
              <div className="flex  items-center align-middle justify-between  mt-8">
                <button className="rounded-full  pb-[2px] bg-cyan-700 hover:bg-cyan-600 font-bold px-3 text-white">
                  View
                </button>
                <button className="rounded-full border text-sky-500 px-3 font-bold hover:bg-cyan-700 hover:text-white border-sky-500 ">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedFlights;
