import React, { useEffect, useState } from "react";
import { MdAddCircle, MdFlight, MdRemoveCircle } from "react-icons/md";
import { RiHotelFill } from "react-icons/ri";
import { BsPostcardFill } from "react-icons/bs";
import { format } from "date-fns";
import SearchLocation from "./SearchLocation";
import CalendarComponent from "./CalendarComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  storeFilteredFlights,
  storeFlights,
} from "../../redux/features/flightsSlice";
import {
  setIsActive,
  setFlightType,
  setCityCount,
  setDepartureDate,
  setReturnDate,
  setCalendarModal,
} from "../../redux/features/searchFilterSlice";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useCountdownContext } from "../../providers/CountdownContext";
import { setLoading } from "../../redux/features/globalSlice";
import { errorToast } from "../../utils/toast";

const SearchFilter = React.memo(({ bookingType, filterName }) => {
  const { setIsStart } = useCountdownContext();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [locationModal, setLocationModal] = useState("");
  const isActive = useSelector((state) => state?.searchFilter?.isActive);
  const flightType = useSelector((state) => state?.searchFilter?.flightType);
  const cityCount = useSelector((state) => state?.searchFilter?.cityCount);
  const departureDate = useSelector(
    (state) => state?.searchFilter?.departureDate
  );
  const returnDate = useSelector((state) => state?.searchFilter?.returnDate);
  const calendarModal = useSelector(
    (state) => state?.searchFilter?.calendarModal
  );
  const fromCityInfo = useSelector(
    (state) => state?.searchFilter?.fromCityInfo
  );
  const toCityInfo = useSelector((state) => state?.searchFilter?.toCityInfo);
  // Dispatch redux state
  const dispatch = useDispatch();

  // handel same destination
  useEffect(() => {
    if (
      fromCityInfo.destination.split(",")[0] ===
      toCityInfo.destination.split(",")[0]
    ) {
      setErrorMsg("From & To airports can't be same");
    } else {
      setErrorMsg("");
    }
  }, [fromCityInfo, toCityInfo]);

  // Convert Date Format
  const formattedDate = (date) => {
    return format(date, "dd MMM yy");
  };
  const dateName = (date) => {
    return format(date, "EEEE");
  };

  // Handle Departure Date
  const handleDepartureDate = (date) => {
    dispatch(setDepartureDate(date));
    if (flightType === "roundTrip") {
      dispatch(setCalendarModal("return"));
    } else {
      dispatch(setCalendarModal(null));
    }
  };
  // Handle Return Date
  const handleReturnDate = (date) => {
    dispatch(setReturnDate(date));
    dispatch(setCalendarModal(null));
  };

  const handleSearch = () => {
    setIsStart(false); // Reset Session Countdown
    dispatch(setLoading(true));
    const fromCity = fromCityInfo?.code;
    const toCity = toCityInfo?.code;
    const date = format(departureDate, "yyyy-MM-dd");

    const searchQuery = `fromCity=${fromCity}&toCity=${toCity}&departureDate=${date}`;
    const url = `/flights/search?${searchQuery}`;

    useAxios
      .get(url)
      .then((response) => {
        const data = response?.data;
        if (Object.keys(data).length > 0) {
          sessionStorage.setItem("search_flight", JSON.stringify(data));
          const sesonData = JSON.parse(sessionStorage.getItem("search_flight"));

          // Handle the response data here
          dispatch(storeFilteredFlights(sesonData));
          dispatch(storeFlights(sesonData));
          dispatch(setLoading(false));
          navigate("/flights");
          setIsStart(true);
        }
      })
      .catch((error) => {
        // Handle any errors here
        setIsStart(false); // Reset Session Countdown
        dispatch(setLoading(false));
        console.error("Error fetching data:", error);
      });
  };

  // recall when reload filter page
  useEffect(() => {
    if (filterName === "Modify Search") {
      handleSearch();
    }
  }, [filterName]);

  return (
    <div className="max-w-7xl mx-auto grid justify-center dark:text-gray-300 ">
      <div className="p-5 sm:mx-10 text-gray-500 rounded-xl shadow-md bg-white dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500 dark:z-50">
        {bookingType === "all" && (
          <div className="flex gap-1  bg-gray-200 p-1 rounded w-fit font-medium text-gray-600 text-sm  ">
            <div
              onClick={() => dispatch(setIsActive("flight"))}
              className={`px-4 py-2 cursor-pointer flex items-center gap-1  ${
                isActive === "flight" ? "bg-cyan-300" : "bg-white "
              }`}
            >
              <MdFlight /> Flight
            </div>
            <div
              // onClick={() => dispatch(setIsActive("hotel"))}
              className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
                isActive === "hotel" ? "bg-cyan-300" : "bg-white"
              }`}
            >
              <RiHotelFill /> Hotel{" "}
              <small className="text-xs font-normal hidden sm:block">
                (Upcoming)
              </small>
            </div>
            <div
              // onClick={() => dispatch(setIsActive("visa"))}
              className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
                isActive === "visa" ? "bg-cyan-300" : "bg-white"
              }`}
            >
              <BsPostcardFill /> Visa{" "}
              <small className="text-xs font-normal  hidden sm:block">
                (Upcoming)
              </small>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-4 font-semibold text-gray-600 my-4">
          <label className="flex gap-1 dark:text-gray-400">
            <input
              type="radio"
              name="flightType"
              value="oneWay"
              className="radio  radio-accent"
              checked
              onChange={() => dispatch(setFlightType("oneWay"))}
            />
            One Way for One Traveler
          </label>
          <div className="relative w-fit">
            <small className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-sm bg-white dark:bg-transparent dark:text-gray-300">
              Upcoming
            </small>
            <div className="border border-cyan-500 py-1 px-3 rounded-full flex gap-4">
              <label className="flex gap-1 dark:text-gray-400">
                <input
                  type="radio"
                  name="flightType"
                  value="roundTrip"
                  className="radio radio-accent"
                  // checked={flightType === "roundTrip"}
                  onChange={() => dispatch(setFlightType("roundTrip"))}
                  disabled
                />
                Round Trip
              </label>
              <label className="flex gap-1 dark:text-gray-400">
                <input
                  type="radio"
                  name="flightType"
                  value="multiCity"
                  className="radio radio-accent"
                  // checked={flightType === "multiCity"}
                  onChange={() => dispatch(setFlightType("multiCity"))}
                  disabled
                />
                Multi City
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          {flightType === "multiCity" ? (
            <>
              <div className="search-grid gap-2">
                <div className="w-full p-2 border rounded-md">
                  <label htmlFor="fromCity">
                    <p className="text-sm">From</p>
                    <input
                      id="fromCity"
                      type="text"
                      className="text-xl font-semibold outline-none"
                      value={fromCityInfo?.destination?.split(",")[0]}
                    />
                    <div className="cursor-pointer">
                      <small className="text-xs my-0">
                        <span title="" className="">
                          {fromCityInfo?.airportName}
                        </span>
                      </small>
                    </div>
                  </label>
                </div>
                <div className="w-full p-2 border rounded-md">
                  <label htmlFor="toCity">
                    <p className="text-sm">To</p>
                    <input
                      id="toCity"
                      type="text"
                      className="text-lg sm:text-xl font-semibold outline-none"
                      value={toCityInfo?.destination.split(",")[0]}
                    />
                    <div className="cursor-pointer">
                      <small className="text-xs my-0">
                        <span title="" className="">
                          {toCityInfo?.airportName}
                        </span>
                      </small>
                    </div>
                  </label>
                </div>
                <div className="grid grid-cols-2 border rounded-md">
                  <div
                    className="w-full  p-2 border-r relative"
                    onClick={() => dispatch(setCalendarModal(!calendarModal))}
                  >
                    <p className="text-sm">Departure</p>
                    <div className="cursor-pointer">
                      <input
                        type="text"
                        className="text-lg sm:text-xl font-semibold outline-none bg-transparent"
                        value={formattedDate(departureDate)}
                        readOnly
                      />
                      <small className="text-xs my-0">
                        <span title="" className="">
                          {dateName(departureDate)}
                        </span>
                      </small>
                    </div>
                    {calendarModal === "departure" && (
                      <div className="absolute top-20 left-0 z-40">
                        <CalendarComponent
                          date={departureDate}
                          setDate={handleDepartureDate}
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-full p-2">
                    <p className="text-sm">Return</p>
                    <input
                      type="text"
                      className="text-lg sm:text-xl font-semibold outline-none bg-transparent"
                      value={formattedDate(returnDate)}
                      readOnly
                    />
                    <small className="text-xs my-0">
                      <span title="" className="">
                        {dateName(returnDate)}
                      </span>
                    </small>
                  </div>
                </div>
                <div className="w-full p-2 border rounded-md cursor-pointer">
                  <p className="text-sm">Travel & Booking Class</p>
                  <h5 className="text-lg sm:text-xl font-semibold">
                    1 Traveler
                  </h5>
                  <small className="text-xs my-0">
                    <span title="" className="">
                      Business Class
                    </span>
                  </small>
                </div>
              </div>
              {Array.from({ length: cityCount }, (_, index) => (
                <div className="search-grid gap-2 mt-1">
                  <div className="w-full p-2 border rounded-md">
                    <label htmlFor="fromCity">
                      <p className="text-sm">From</p>
                      <input
                        id="fromCity"
                        type="text"
                        className="text-xl  font-semibold outline-none"
                        value="Dhaka"
                      />
                      <div className="cursor-pointer">
                        <small className="text-xs my-0">
                          <span title="" className="">
                            Hazrat Shahjalal International Airport
                          </span>
                        </small>
                      </div>
                    </label>
                  </div>
                  <div className="w-full p-2 border rounded-md">
                    <label htmlFor="toCity">
                      <p className="text-sm">To</p>
                      <input
                        id="toCity"
                        type="text"
                        className="text-lg sm:text-xl font-semibold outline-none"
                        value="Khulna"
                      />
                      <div className="cursor-pointer">
                        <small className="text-xs my-0">
                          <span title="" className="">
                            Khulna International Airport
                          </span>
                        </small>
                      </div>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 border rounded-md">
                    <div className="w-full p-2 border-r relative overflow-hidden">
                      <p className="text-sm">Departure</p>
                      <div className="cursor-pointer">
                        <input
                          type="text"
                          className="text-lg sm:text-xl font-semibold outline-none bg-transparent"
                          value="08 Aug 23"
                          readOnly
                        />
                        <small className="text-xs my-0">
                          <span title="" className="">
                            Tuesday
                          </span>
                        </small>
                      </div>
                    </div>
                    <div className="w-full p-2">
                      <p className="text-sm">Return</p>
                      <h5 className="text-lg sm:text-xl font-semibold">
                        11 Aug 23
                      </h5>
                      <small className="text-xs my-0">
                        <span title="" className="">
                          Friday
                        </span>
                      </small>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-sm w-full p-2 border rounded-md cursor-pointer">
                    {index !== cityCount - 1 ? (
                      <button
                        className="flex items-center gap-1 text-red-500"
                        onClick={() =>
                          dispatch(setCityCount((prevCount) => prevCount - 1))
                        }
                      >
                        <MdRemoveCircle /> Remove
                      </button>
                    ) : (
                      <>
                        <button
                          className="border px-3 py-1 flex items-center text-cyan-500"
                          onClick={() =>
                            dispatch(setCityCount((prevCount) => prevCount + 1))
                          }
                        >
                          <MdAddCircle /> Add
                        </button>
                        {index > 0 && (
                          <>
                            <div className="divider divider-horizontal"></div>
                            <button
                              className="flex items-center gap-1 text-red-500"
                              onClick={() =>
                                dispatch(
                                  setCityCount((prevCount) => prevCount - 1)
                                )
                              }
                            >
                              <MdRemoveCircle /> Remove
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="search-grid gap-2">
              <div
                className="w-full  p-2 border rounded-md relative"
                onClick={() => {
                  if (!isModal) {
                    setIsModal(true);
                  }
                  setLocationModal("from");
                }}
              >
                <label htmlFor="fromCity">
                  <p className="text-sm">From</p>
                  <input
                    id="fromCity"
                    type="text"
                    className="text-xl  font-semibold outline-none cursor-pointer dark:bg-transparent dark:text-gray-300"
                    value={fromCityInfo.destination.split(",")[0]}
                    readOnly
                  />
                  <div className="cursor-pointer">
                    <small className="text-xs my-0">
                      <span title="" className="">
                        {fromCityInfo.airportName}
                      </span>
                    </small>
                  </div>
                </label>
                {isModal && locationModal === "from" && (
                  <div className="absolute top-24 left-0 z-40 ">
                    <SearchLocation
                      setIsModal={setIsModal}
                      locationModal={locationModal}
                    />
                  </div>
                )}
              </div>
              <div
                className="w-full p-2 border rounded-md relative cursor-pointer"
                onClick={() => {
                  if (!isModal) {
                    setIsModal(true);
                  }
                  setLocationModal("to");
                }}
              >
                {errorMsg && (
                  <div className="absolute -bottom-3 px-2 rounded-full left-0 text-sm bg-red-50 text-red-500">
                    From & To airports can't be same
                  </div>
                )}
                <label htmlFor="toCity">
                  <p className="text-sm">To</p>
                  <input
                    id="toCity"
                    type="text"
                    className="text-lg sm:text-xl font-semibold outline-none cursor-pointer dark:bg-transparent dark:text-gray-300"
                    value={toCityInfo.destination.split(",")[0]}
                    readOnly
                  />
                  <div className="cursor-pointer">
                    <small className="text-xs my-0">
                      <span title="" className="">
                        {toCityInfo.airportName}
                      </span>
                    </small>
                  </div>
                </label>
                {isModal && locationModal === "to" && (
                  <div className="absolute top-24 left-0 z-40">
                    <SearchLocation
                      setIsModal={setIsModal}
                      locationModal={locationModal}
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 border rounded-md">
                <div
                  className="w-full p-2 border-r relative"
                  onClick={() => dispatch(setCalendarModal("departure"))}
                >
                  <p className="text-sm">Departure</p>
                  <div className="cursor-pointer">
                    <input
                      type="text"
                      className="text-lg   sm:text-xl w-24 font-semibold outline-none bg-transparent"
                      value={formattedDate(departureDate)}
                      readOnly
                    />{" "}
                    <br />
                    <small className="text-xs my-0">
                      <span title="" className="">
                        {dateName(departureDate)}
                      </span>
                    </small>
                  </div>
                  {calendarModal === "departure" && (
                    <div className="absolute top-20 left-0 z-40">
                      <CalendarComponent
                        date={departureDate}
                        setDate={handleDepartureDate}
                      />
                    </div>
                  )}
                </div>
                {flightType === "oneWay" && (
                  <div
                    className="w-full p-2 cursor-pointer"
                    onClick={() => {
                      // dispatch(setFlightType("roundTrip"));
                      // dispatch(setCalendarModal("return"));
                    }}
                  >
                    <p className="text-sm">Return</p>
                    <p className="text-xs   my-0 mt-2 cursor-pointer">
                      Tap to book return ticket for more savings
                    </p>
                  </div>
                )}
                {flightType === "roundTrip" && (
                  <div
                    className="w-full p-2 border-r relative"
                    // onClick={() => dispatch(setCalendarModal("return"))}
                  >
                    <p className="text-sm">Return</p>
                    <div className="cursor-pointer">
                      <input
                        type="text"
                        className="text-lg  sm:text-xl w-24 font-semibold outline-none bg-transparent"
                        value={formattedDate(returnDate)}
                        readOnly
                      />{" "}
                      <br />
                      <small className="text-xs my-0">
                        <span title="" className="">
                          {dateName(returnDate)}
                        </span>
                      </small>
                    </div>
                    {calendarModal === "return" && (
                      <div className="absolute top-20 left-0 z-40">
                        <CalendarComponent
                          date={returnDate}
                          setDate={handleReturnDate}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="w-full p-2 border rounded-md cursor-pointer">
                <p className="text-sm">Travel & Booking Class</p>
                <h5 className="text-lg  sm:text-xl font-semibold">
                  1 Traveler
                </h5>
                <small className="text-xs my-0">
                  <span title="" className="">
                    Business Class
                  </span>
                </small>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center -mb-11">
          {errorMsg ? (
            <button className="px-10 py-3 rounded bg-gray-400 cursor-not-allowed text-white font-semibold">
              {filterName}
            </button>
          ) : (
            <Link to="/flights">
              <button
                className="px-10 py-3 rounded bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white font-semibold"
                onClick={handleSearch}
              >
                {filterName}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
});

export default SearchFilter;
