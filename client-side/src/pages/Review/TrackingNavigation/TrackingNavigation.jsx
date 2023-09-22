import React, { useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleRight } from "react-icons/fa";
import { formatDate } from "../../../utils/formatDate";
import {
  setIsLoading,
  setIsCollapse,
  setData,
} from "../../../redux/features/trakingNavigationSlice";
import { setFlightInfo } from "../../../redux/features/bookingInfoSlice";

const TrackingNavigation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state) => state?.trackingNavigation?.isLoading
  );
  const isCollapse = useSelector(
    (state) => state?.trackingNavigation?.isCollapse
  );

  const flightInfo = useSelector((state) => state?.userBookingInfo?.flightInfo);
  if (Object.keys(flightInfo).length > 0) {
    sessionStorage.setItem("flightInfo", JSON.stringify(flightInfo));
  }

  const getAllData = JSON.parse(sessionStorage.getItem("flightInfo"));

  const { airlineLogo, airlineName, passengerType, stopType, duration } =
    getAllData || {};
  const { aircraft, cabin, checkIn, flightNumber } =
    getAllData?.flightInfo || {};
  const { city, date, time, code } = getAllData?.departure || {};

  const arrive = getAllData?.arrival || {};

  function calculateArrivalDate(departureDate, departureTime, arrivalTime) {
    const [depHour, depMinute] = departureTime?.split(":")?.map(Number);
    const [arrHour, arrMinute] = arrivalTime?.split(":")?.map(Number);

    const departureDateTime = new Date(departureDate);
    departureDateTime?.setHours(depHour, depMinute, 0, 0);

    if (arrHour < depHour || (arrHour === depHour && arrMinute < depMinute)) {
      departureDateTime?.setDate(departureDateTime?.getDate() + 1);
    }

    const arrivalDate = departureDateTime?.toISOString()?.slice(0, 10);
    const formattedArrivalDate = formatDate(arrivalDate);

    return formattedArrivalDate;
  }

  return (
    <section>
      {getAllData && (
        <section>
          <div className=" mb-8 flex lg:justify-between lg:items-center lg:flex-row flex-col ">
            <h1 className="font-bold text-lg md:text-3xl text-cyan-600 dark:text-gray-400">
              Review Your Booking
            </h1>

            <div className="text-cyan-600  mt-4 lg:mt-0">
              <h1 className="inline-flex items-center gap-3 text-sm md:text-[18px] dark:text-gray-400">
                Flight Section <FaAngleRight /> <strong>Booking</strong>{" "}
                <FaAngleRight /> Payment
              </h1>
            </div>
          </div>

          {/* Traking Card */}
          <div className="shadow-lg block rounded-xl overflow-hidden dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500">
            <div className="px-5">
              <div className="flex items-center gap-1 mb-4 md:mb-2 mt-4">
                <h5 className="font-semibold text-gray-600 text-sm md:text-[16px]">
                  {code}-{arrive?.code}
                </h5>
              </div>
              <hr />
              <div className="text-end flex justify-end items-center -mt-12 h-10">
                <hr />
                <div className="text-end flex justify-end items-center  h-10">
                  <div>
                    <button
                      onClick={() => window.my_modal_1.showModal()}
                      className="pt-[5px] dark:border-0 md:pt-2 pl-2 pr-2 pb-2 mr-12 btn btn-xs md:btn-sm  bg-cyan-600 text-white rounded-md hover:bg-white hover:border-2 hover:border-cyan-600 hover:text-gray-500"
                    >
                      View Baggage
                    </button>
                  </div>
                  <div>
                    <button onClick={() => dispatch(setIsCollapse())}>
                      {isCollapse ? (
                        <MdKeyboardArrowUp className="text-2xl rounded-full bg-gray-300 dark:text-cyan-500 dark:bg-gray-500" />
                      ) : (
                        <MdKeyboardArrowDown className="text-2xl rounded-full bg-gray-300 dark:bg-gray-500 dark:text-cyan-500" />
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
                <div className="p-2 md:p-5 pb-5 ">
                  <div className="flex justify-between items-center gap-6">
                    <div className="flex items-start md:items-center gap-2">
                      <img
                        className="h-12 w-12 mt-4 md:mt-0 rounded-full -ml-2"
                        src={airlineLogo}
                        alt=""
                      />
                      <div className="mt-3 md:mt-0">
                        <p className="text-gray-400 text-xs ">{airlineName}</p>
                        <h1 className="text-xs  font-semibold">
                          {flightNumber}
                        </h1>
                        <h3 className="text-xs  font-semibold">
                          Aircraft : {aircraft}
                        </h3>
                      </div>
                    </div>

                    <div>
                      <h1 className="text-xs md:text-sm">
                        {flightInfo?.flightInfo?.class}
                      </h1>
                    </div>
                  </div>

                  <hr className="mb-3 mt-3" />
                  <div className=" grid grid-cols-3 items-center gap-5 ">
                    <div>
                      <h4 className="text-gray-400 text-xs ">Depart</h4>
                      <h2 className="mt-2 text-xs  font-semibold">{time}</h2>
                      <p className=" pr-2 text-xs ">{formatDate(date)}</p>
                      <p className="mt-1 -ml-[1px] text-xs ">({code})</p>
                      <h3 className=" text-xs ">{city}</h3>
                    </div>

                    <div align="center" className="space-y-1 pl-2 pr-2">
                      <p className="text-gray-400 text-xs ">
                        {duration < 60
                          ? `${duration} min`
                          : `${Math.floor(duration / 60)} hr ${
                              duration % 60
                            } min`}
                      </p>
                      <img
                        style={{
                          WebkitFilter: "grayscale(100%)",
                          filter: "grayscale(100%)",
                        }}
                        src="https://flightexpert.com/assets/img/non-stop-shape.png"
                        alt=""
                      />
                      <p className="text-xs ">{stopType}</p>
                    </div>

                    <div className="flex justify-center">
                      <div>
                        <h4 className="text-gray-400 text-xs">Arrive</h4>
                        <h2 className="mt-2 text-xs  font-semibold">
                          {arrive?.time}
                        </h2>
                        <p className=" pr-2 text-xs ">
                          {calculateArrivalDate(date, time, arrive?.time)}
                        </p>
                        <p className="mt-1 -ml-[1px] text-xs ">
                          ({arrive?.code})
                        </p>
                        <h3 className=" text-xs">{arrive?.city}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Open the modal using ID.showModal() method */}

          <dialog id="my_modal_1" className="modal  ">
            <form
              method="dialog"
              className="modal-box max-w-2xl rounded-md dark:bg-white/10 dark:backdrop-blur-md dark:shadow-md dark:shadow-white"
            >
              <div className="w-full max-w-2lg lg:max-w-4xl  bg-white rounded-md dark:bg-transparent dark:backdrop-blur-md dark:shadow-md dark:p-2 ">
                <div className="mb-2 flex justify-between items-center ">
                  <h2 className="font-semibold">
                    {city} to {arrive?.city}, {date}
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

                <div className="border-[1px] p-4 rounded-sm mt-4 mb-24 dark:border-0 dark:bg-transparent">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-12 w-12 rounded-full -ml-2"
                      src={airlineLogo}
                      alt=""
                    />
                    <div>
                      <p className="text-gray-400">
                        <small>{airlineName}</small>
                      </p>
                      <h1 className="text-[13px] font-semibold">
                        {flightNumber}
                      </h1>
                      <h3 className="text-[11px] font-semibold">
                        Aircraft : {aircraft}
                      </h3>
                    </div>
                  </div>

                  <div className=" flex justify-between items-center mt-6 mb-4 ">
                    <div>
                      <h2 className="mt-2 text-[14px] font-semibold">
                        Baggage
                      </h2>

                      <h6 className="mt-2 text-[11px] text-gray-400">
                        {passengerType}
                      </h6>
                    </div>

                    <div>
                      <h2 className="mt-2 text-[14px] font-semibold">
                        Check In
                      </h2>

                      <h6 className="mt-2 text-[11px] text-gray-400">
                        {checkIn}
                      </h6>
                    </div>

                    <div>
                      <h2 className="mt-2 text-[14px] font-semibold">Cabin</h2>

                      <h6 className="mt-2 text-[11px] text-gray-400">
                        {cabin}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </dialog>
        </section>
      )}
    </section>
  );
};

export default TrackingNavigation;
