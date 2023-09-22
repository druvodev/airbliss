import React, { useEffect, useState } from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import { FaClock, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { useParams } from "react-router";
import Amenities from "./Amenities";
import { Link } from "react-router-dom";

const RecommendedHotelDetails = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState([]);

  useEffect(() => {
    fetch("/recommendedFlights.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedFlight = data.filter(
          (flight) => flight.id === parseInt(id)
        );
        setFlight(selectedFlight);
      });
  }, []);
  return (
    <div className="pb-16">
      <div className="bg-[url('https://i.ibb.co/99WG5TR/pascal-meier-UYies-SO4-Fi-M-unsplash.jpg')] py-48 bg-cover bg-no-repeat bg-center ">
        <div className="text-center text-white">
          <h3 className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold">
            AirBliss
          </h3>
          <h3 className="text-sm sm:text-lg lg:text-xl font-bold">
            The sky is not the limit, it's only the beginning
          </h3>
        </div>
      </div>

      <div className="pb-10 lg:pb-16 pt-16 px-5 sm:px-10 md:px-6  max-w-5xl mx-auto h-auto overflow-hidden border shadow-lg  mt-6">
        {flight?.map((f) => (
          <div key={f?.id}>
            <div className="flex gap-y-8  md:gap-x-4 lg:gap-x-6 flex-col-reverse md:flex-row md:items-start lg:items-center ">
              <img
                src={f?.bg_pic}
                alt=""
                className="md:w-8/12 border-b-2 border-gray-200 pb-3"
              />
              <div>
                <h2 className="text-cyan-500 text-2xl font-bold md:text-4xl pb-3">
                  About Us
                </h2>
                <p>{f?.about}</p>
               
              </div>
            </div>
            <div className="flex md:flex-row gap-x-4 mt-6 flex-col ">
              {/* Flight Overview  */}
              <div className="md:w-8/12 mx-auto md:mx-0 mb-6">
                <div>
                  {f?.overviews?.map((overview, index) => (
                    <div
                      key={index}
                      className="py-4 px-6 bg-[#f5f5f5] dark:bg-slate-800 text-sm space-y-2 "
                    >
                      <div className="flex justify-between items-center">
                        <p className="uppercase text-[#01b7f2]">AIRLINE:</p>
                        <p className="uppercase">{overview?.airline}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="uppercase text-[#01b7f2]">Flight Type:</p>
                        <p className="uppercase">{overview?.flight}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="uppercase text-[#01b7f2]">Fare Type:</p>
                        <p className="uppercase">{overview?.fare_type}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="uppercase text-[#01b7f2]">
                          Cancellation:
                        </p>
                        <p className="uppercase">
                          ${overview?.cancel_fee}/Person
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="uppercase text-[#01b7f2]">
                          Flight Change:
                        </p>
                        <p className="uppercase">{overview?.flight_change}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="uppercase text-[#01b7f2]">
                          Seats & baggage:
                        </p>
                        <p className="uppercase">{overview?.baggage}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="uppercase text-[#01b7f2]">Base Fare:</p>
                        <p className="uppercase">${overview?.base_fare}.00</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="uppercase text-[#01b7f2]">Tax & Fees:</p>
                        <p className="uppercase">${overview?.tax}.00</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="uppercase text-[#01b7f2]">Total Price:</p>
                        <p className="uppercase">
                          ${overview?.base_fare + overview?.tax}.00
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Amenities  */}
                <Amenities></Amenities>

                {/* Travel Information  */}
                <div className="text-sm uppercase mt-4">
                  <div className="p-2 bg-[#f5f5f5] dark:bg-slate-800  text-sm">
                    <h1 className="text-lg font-semibold">
                      Travel Information
                    </h1>
                    <div className="mt-5 flex justify-between">
                      <div className="">
                        <div className="mb-5">
                          <h5 className="font-semibold">{f?.airline_name}</h5>
                          <p>{f?.coach_number}</p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex gap-x-1 items-center">
                            <FaClock className="text-lg text-[#01b7f2]"></FaClock>
                            <div>
                              <p className="font-medium">Take OFF</p>
                              <p>{f?.first_take_off}</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex gap-x-2 items-center">
                              <FaLocationDot className="text-lg text-[#01b7f2]"></FaLocationDot>
                              <div>
                                <p className="font-medium">landing</p>
                                <p>{f?.first_landing}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="mb-5">
                          <h5 className="font-semibold">{f?.airline_name}</h5>
                          <p>{f?.coach_number}</p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex gap-x-1 items-center">
                            <FaClock className="text-lg text-[#01b7f2]"></FaClock>
                            <div>
                              <p className="font-medium">Take OFF</p>
                              <p>{f?.second_take_off}</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex gap-x-2 items-center">
                              <FaLocationDot className="text-lg text-[#01b7f2]"></FaLocationDot>
                              <div>
                                <p className="font-medium">landing</p>
                                <p>{f?.second_landing}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:w-8/12 mx-auto md:w-4/12">
                <img src={f?.img} alt="" />
                <div className="flex mt-4 gap-x-6 sm:gap-x-2 sm:justify-between items-center lg:px-4">
                  <div className="flex gap-x-3 items-center">
                    <p className="w-10 h-10 rounded-[100%] border border-black text-black pl-3 pt-3">
                      <GiAirplaneDeparture />
                    </p>
                    <div>
                      <h3 className="card-title lg:mr-8 lg:text-lg md:text-base text-lg">
                        {f?.destination}
                      </h3>
                      <p className="text-semibold text-xs font-semibold">
                        {f?.route}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">FROM</p>
                    <p className="text-sky-400 font-bold">{f?.fare} BDT</p>
                  </div>
                </div>

                <div className="mt-10 p-4 shadow-2xl shadow-gray-400 space-y-4">
                  <h4 className="text-lg font-semibold">Need Help?</h4>
                  <p>
                    We would be more than happy to help you. Our team advisor
                    are 24/7 at your service to help you.
                  </p>
                  <div>
                    <p>(+880) 163 456 7890</p>
                    <p className="flex items-center gap-x-2">
                      <FaEnvelope className="text-cyan-400"></FaEnvelope>{" "}
                      airbliss@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedHotelDetails;
