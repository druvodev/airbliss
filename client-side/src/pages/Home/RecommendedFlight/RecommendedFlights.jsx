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
         
          <SectionTitle sectionTitle={"Recommended Flights"} />
          <p className=" text-sm dark:text-gray-400 sm:text-base mb-5">
            Most famous Flights of us. Our happy clients always happy with these
            Flights. <br /> The flights are always maintenance there roles and
            regulations
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {
            recommendedFlights.map(flight =>
             <div key={flight?.id}
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
                <h3 className="card-title mr-16 text-lg">{flight?.destination}</h3>
                <p className="text-semibold text-xs font-semibold">
                  {flight?.route}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">FROM</p>
                <p className="text-sky-400 font-bold">{flight?.fare} BDT</p>
              </div>
            </div>
            <div className="flex  items-center align-middle justify-end  mt-8">
              <Link to={`/recommendedFlight/${flight?.id}`}>
              <button className="rounded-full  pb-[2px] bg-cyan-700 hover:bg-cyan-600 font-bold px-3 text-white">
                View
              </button>
              </Link>

            </div>

            </div>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default RecommendedFlights;
