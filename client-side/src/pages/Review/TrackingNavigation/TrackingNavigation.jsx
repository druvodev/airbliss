import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleRight } from "react-icons/fa";

const TrackingNavigation = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [data, setData] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const flight = useSelector((state) => state.flights.flights);

  const { airlineLogo, airlineName, passengerType, stopType, duration } =
    data || {};
  const { aircraft, cabin, checkIn, flightNumber } = data?.flightInfo || {};
  const { airportName, city, code, date, terminal, time } =
    data?.departure || {};

  const arrive = data?.arrival || {};

  useEffect(() => {
    if (flight && flight.flights) {
      const singleData = flight.flights.find(
        (singleFlight) => singleFlight._id === id
      );
      setData(singleData);
    }
  }, [flight, id]);

  console.log(data);

  return (
    <>
      <div className=" mb-8 flex lg:justify-between lg:items-center lg:flex-row flex-col">
        <h1 className="font-bold text-3xl text-cyan-600">
          Review Your Booking
        </h1>

        <div className="text-cyan-600 font-semibold mt-4 lg:mt-0">
          <h1 className="inline-flex items-center gap-3">
            Flight Section <FaAngleRight /> Booking <FaAngleRight /> Payment
          </h1>
        </div>
      </div>

      {/* Traking Card */}
      <div className="shadow-lg block rounded-xl overflow-hidden">
        <div className="px-5">
          <div className="flex items-center gap-1 mb-2 mt-4">
            <h5 className="font-semibold text-gray-600">DAC-CGP</h5>
          </div>
          <hr />
          <div className="text-end flex justify-end items-center -mt-12 h-10">
            <hr />
            <div className="text-end flex justify-end items-center  h-10">
              <div>
                <button
                  onClick={() => window.my_modal_1.showModal()}
                  className="pt-1 pl-2 pr-2 pb-2 mr-12  bg-cyan-600 text-white rounded-md hover:bg-white hover:border-2 hover:border-cyan-600 hover:text-gray-500"
                >
                  View Baggage
                </button>
              </div>
              <div>
                <button onClick={() => setIsCollapse(!isCollapse)}>
                  {isCollapse ? (
                    <MdKeyboardArrowUp className="text-2xl rounded-full bg-gray-300" />
                  ) : (
                    <MdKeyboardArrowDown className="text-2xl rounded-full bg-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div
            className={`duration-500 ${
              isCollapse ? "max-h-[350px]" : "max-h-3"
            } transition-all ease-linear overflow-hidden`}
          >
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img className="h-12 w-12" src={airlineLogo} alt="" />
                  <div>
                    <p className="text-gray-400">
                      <small>{airlineName}</small>
                    </p>
                    <h1 className="text-[14px]">
                      <b>{flightNumber}</b>
                    </h1>
                    <h3 className="text-[13px]">
                      <b>Aircraft : {aircraft}</b>
                    </h3>
                  </div>
                </div>

                <div>
                  <h1 className="text-[16px]">{data?.flightInfo?.class}</h1>
                </div>
              </div>

              <hr className="mb-3 mt-3" />
              <div className=" grid grid-cols-3 items-center gap-5 ">
                <div>
                  <h4 className="text-gray-400 text-[13px]">Depart</h4>
                  <h2 className="mt-2 text-[15px]">
                    <strong>{time}</strong>
                  </h2>
                  <p className="-mt-1 pr-2">
                    <small>{date}</small>
                  </p>
                  <h3 className="mt-2 text-[13px]">{city}</h3>
                </div>

                <div align="center" className="space-y-1 pl-2 pr-2">
                  <p className="text-gray-400 text-[14px]">{duration}</p>
                  <img
                    style={{
                      WebkitFilter: "grayscale(100%)",
                      filter: "grayscale(100%)",
                    }}
                    src="https://flightexpert.com/assets/img/non-stop-shape.png"
                    alt=""
                  />
                  <p>
                    <small>{stopType}</small>
                  </p>
                </div>

                <div>
                  <h4 className="text-gray-400 text-[13px]">Arrive</h4>
                  <h2 className="mt-2 text-[15px]">
                    <strong> {arrive?.time}</strong>
                  </h2>
                  <p className="-mt-1 pr-2">
                    <small>Tue, 15 Aug 2023</small>
                  </p>
                  <h3 className="mt-2 text-[13px]">{arrive?.city}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      {/* Open the modal using ID.showModal() method */}

      <dialog id="my_modal_1" className="modal ">
        <form method="dialog" className="modal-box max-w-2xl rounded-md">
          <div className="w-full max-w-2lg lg:max-w-4xl  bg-white rounded-md">
            <div className="mb-2 flex justify-between items-center">
              <h2>
                <b>
                  {city} to {arrive?.city}, {date}
                </b>
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-circle bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="border-[1px] p-4 rounded-sm mt-4 mb-24">
              <div className="flex items-center gap-2">
                <img className="h-12 w-12" src={airlineLogo} alt="" />
                <div>
                  <p className="text-gray-400">
                    <small>{airlineName}</small>
                  </p>
                  <h1 className="text-[13px]">
                    <b>{flightNumber}</b>
                  </h1>
                  <h3 className="text-[11px]">
                    <b>Aircraft : {aircraft}</b>
                  </h3>
                </div>
              </div>

              <div className=" flex justify-between items-center mt-6 mb-4 ">
                <div>
                  <h2 className="mt-2 text-[14px] font-semibold">Baggage</h2>

                  <h6 className="mt-2 text-[11px] text-gray-400">
                    {passengerType}
                  </h6>
                </div>

                <div>
                  <h2 className="mt-2 text-[14px] font-semibold">Check In</h2>

                  <h6 className="mt-2 text-[11px] text-gray-400">{checkIn}</h6>
                </div>

                <div>
                  <h2 className="mt-2 text-[14px] font-semibold">Cabin</h2>

                  <h6 className="mt-2 text-[11px] text-gray-400">{cabin}</h6>
                </div>
              </div>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default TrackingNavigation;
