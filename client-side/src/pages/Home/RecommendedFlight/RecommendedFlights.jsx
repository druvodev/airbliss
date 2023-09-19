import { useEffect, useState } from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import SectionTitle from "../../../Components/SectionTitle";
import { Link } from "react-router-dom";

const RecommendedFlights = () => {
  const [recommendedFlights, setRecommendedFLights] = useState([]);

  useEffect(() => {
    fetch("recommendedFlights.json")
      .then((res) => res.json())
      .then((data) => {
        setRecommendedFLights(data);
      });
  }, []);

  console.log(recommendedFlights);

  return (
    <div id="recommended-flights">
      <div>
        <div>
          {/* <h1 className="text-xl mt-2 font-semibold">Recommended Flights</h1>
          <p className="text-sky-700 flex mt-1 font-bold m">
            <GiAirplaneDeparture /> --------
          </p> */}
          <SectionTitle sectionTitle={"Recommended Flights"} />
          <p className=" text-sm dark:text-gray-500 sm:text-base mb-5">
            Most famous Flights of us. Our happy clients always happy with these
            Flights. <br /> The flights are always maintenance there roles and
            regulations
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recommendedFlights.map((flight) => (
            <div
              key={flight?.id}
              className="border overflow-hidden rounded-md shadow-lg p-5"
            >
              <div>
                <div className="flex gap-5 container ">
                  <img
                    className="object-cover rounded-md shadow-md h-52 mb-3 w-full"
                    src={flight?.img}
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
                  <h3 className="card-title mr-16 text-lg">
                    {flight?.destination}
                  </h3>
                  <p className="text-semibold text-xs font-semibold">
                    {flight?.route}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">FROM</p>
                  <p className="text-sky-400 font-bold">{flight?.fare} BDT</p>
                </div>
              </div>
              <div className="flex  items-center align-middle justify-between  mt-8">
                <Link to={`/recommendedFlight/${flight?.id}`}>
                  <button className="rounded-full  pb-[2px] bg-cyan-700 hover:bg-cyan-600 font-bold px-3 text-white">
                    View
                  </button>
                </Link>

                <button className="rounded-full border text-sky-500 px-3 font-bold hover:bg-cyan-700 hover:text-white border-sky-500 ">
                  Book
                </button>
              </div>
            </div>
          ))}
          {/* <div className="border overflow-hidden rounded-md shadow-lg p-5">
            <div>
              <div className="flex gap-5 container ">
                <img
                  className="object-cover rounded-md shadow-md h-52 mb-3 w-full"
                  src="https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
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
                <h3 className="card-title mr-16 text-lg">Dhaka to Khulna</h3>
                <p className="text-semibold text-xs font-semibold">
                  ONE WAY FLIGHTS
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">FROM</p>
                <p className="text-sky-400 font-bold">2499 BDT</p>
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

        <div
          data-testid="cards-container"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {flights.map((flight, inx) => (
            <div
              key={inx}
              className="border dark:border-x-0 dark:bg-white/10 dark:backdrop-blur-lg card overflow-hidden rounded-md shadow-lg p-5"
            >
              <div>
                <div className="flex gap-5 container ">
                  <img
                    className="object-cover rounded-md shadow h-52 mb-20 w-full"
                    src={flight?.imageSrc}
                  />
                </div>
              </div>
              <div className="flex mt-2 gap-x-2 justify-between items-center">
                <div>
                  <p className="w-10 h-10 rounded-[100%] border border-black dark:border-cyan-100 text-black pl-3 pt-3">
                    <GiAirplaneDeparture className="dark:text-cyan-200" />
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
                <button className="rounded-full  pb-[2px] bg-cyan-700 hover:bg-cyan-600 font-semibold px-3 text-white">
                  View
                </button>
                <button className="rounded-full border text-sky-500 px-3 font-semibold hover:bg-cyan-700 hover:text-white border-sky-500 ">
                  Book
                </button>
              </div>
            </div>
            <div className="flex mt-2 gap-x-2  justify-between items-center">
              <div>
                <p className="w-10 h-10 rounded-[100%] border border-black text-black pl-3 pt-3">
                  <GiAirplaneDeparture />
                </p>
              </div>
              <div>
                <h3 className="card-title mr-16 text-lg">Dhaka to Barisal </h3>
                <p className="text-semibold text-xs font-semibold">
                  ONE WAY FLIGHT
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">FROM</p>
                <p className="text-sky-400 font-bold">2799 BDT</p>
              </div>
            </div>
            <div className="flex items-center align-middle justify-between mt-8">
              <button className="rounded-full  pb-[2px] bg-cyan-700 hover:bg-cyan-600 font-bold px-3 text-white">
                View
              </button>
              <button className="rounded-full border text-sky-500 px-3 font-bold hover:bg-cyan-700 hover:text-white border-sky-500 ">
                Book
              </button>
            </div>
          </div>

          <div className="border overflow-hidden rounded-md shadow-lg p-5 ">
            <div>
              <div className="flex gap-5 container ">
                <img
                  className="object-cover rounded-md shadow-md h-52 mb-20 w-full "
                  src="https://www.traveloffpath.com/wp-content/uploads/2021/11/New%E2%80%8B-Low-Cost-Airline-Set-To-Launch-In-Calgary-Next-Year.jpg"
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
                <h3 className="card-title mr-16 text-lg">Dhaka to Cox's</h3>
                <p className="text-semibold text-xs font-semibold">
                  ONE WAY FLIGHTS
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">FROM</p>
                <p className="text-sky-400 font-bold">2699 BDT</p>
              </div>
            </div>
            <div className="flex items-center align-middle justify-between  mt-8">
              <button className="rounded-full bg-cyan-700 pb-[2px] hover:bg-cyan-600 font-bold px-3 text-white">
                View
              </button>
              <button className="rounded-full border text-sky-500 px-3 font-bold hover:bg-cyan-700 hover:text-white border-sky-500 ">
                Book
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RecommendedFlights;
