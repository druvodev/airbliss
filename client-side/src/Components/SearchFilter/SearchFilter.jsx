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
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SearchFilter = React.memo(({ bookingType, filterName }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("flight");
  const [flightType, setFlightType] = useState("oneWay");
  const [cityCount, setCityCount] = useState(1);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [calendarModal, setCalendarModal] = useState("");
  const [locationModal, setLocationModal] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [fromCityInfo, setFromCityInfo] = useState({
    airportName: "Shahjalal International Airport",
    code: "DAC",
    destination: "Dhaka, Bangladesh",
  });
  const [toCityInfo, setToCityInfo] = useState({
    airportName: "Barisal Airport",
    code: "BZL",
    destination: "Barisal, Bangladesh",
  });

  // Dispatch redux state
  const dispatch = useDispatch();
  const flight = useSelector((state) => state.flights.flights);

  console.log("rerender");
  console.log(isModal);

  // Convert Date Format
  const formattedDate = (date) => {
    return format(date, "dd MMM yy");
  };
  const dateName = (date) => {
    return format(date, "EEEE");
  };

  // Handle Departure Date
  const handleDepartureDate = (date) => {
    setDepartureDate(date);
    if (flightType === "roundTrip") {
      setCalendarModal("return");
    } else {
      setCalendarModal(null);
    }
  };
  // Handle Return Date
  const handleReturnDate = (date) => {
    setReturnDate(date);
    setCalendarModal(null);
  };

  const handleSearch = () => {
    const fromCity = fromCityInfo.code;
    const toCity = toCityInfo.code;
    const date = format(departureDate, "yyyy-MM-dd");

    const searchQuery = `fromCity=${fromCity}&toCity=${toCity}&departureDate=${date}`;
    const url = `/flights/search?${searchQuery}`;

    useAxios
      .get(url)
      .then((response) => {
        const data = response.data;
        // Handle the response data here
        storeFilteredFlights(data);
        dispatch(storeFlights(data));
        navigate("/flights");
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching data:", error);
      });
  };

  // redux state test
  useEffect(() => {
    console.log("Search Filter", flight);
  }, [flight]);

  return (
    <div className="max-w-7xl mx-auto grid justify-center">
      <div className="p-5 sm:mx-10 rounded-xl shadow-md bg-white">
        {bookingType === "all" && (
          <div className="flex gap-1 bg-gray-200 p-1 rounded w-fit font-medium text-gray-600 text-sm">
            <div
              onClick={() => setIsActive("flight")}
              className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
                isActive === "flight" ? "bg-cyan-300" : "bg-white"
              }`}
            >
              <MdFlight /> Flight
            </div>
            <div
              onClick={() => setIsActive("hotel")}
              className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
                isActive === "hotel" ? "bg-cyan-300" : "bg-white"
              }`}
            >
              <RiHotelFill /> Hotel
            </div>
            <div
              onClick={() => setIsActive("visa")}
              className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
                isActive === "visa" ? "bg-cyan-300" : "bg-white"
              }`}
            >
              <BsPostcardFill /> Visa
            </div>
          </div>
        )}
        <div className="flex gap-4 font-semibold text-gray-600 my-4">
          <label className="flex gap-1">
            <input
              type="radio"
              name="flightType"
              value="oneWay"
              className="radio radio-accent"
              checked={flightType === "oneWay"}
              onChange={() => setFlightType("oneWay")}
            />
            One Way
          </label>
          <label className="flex gap-1">
            <input
              type="radio"
              name="flightType"
              value="roundTrip"
              className="radio radio-accent"
              checked={flightType === "roundTrip"}
              onChange={() => setFlightType("roundTrip")}
            />
            Round Trip
          </label>
          <label className="flex gap-1">
            <input
              type="radio"
              name="flightType"
              value="multiCity"
              className="radio radio-accent"
              checked={flightType === "multiCity"}
              onChange={() => setFlightType("multiCity")}
            />
            Multi City
          </label>
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
                      value={fromCityInfo.destination.split(",")[0]}
                    />
                    <div className="cursor-pointer">
                      <small className="text-xs my-0">
                        <span title="" className="">
                          {fromCityInfo.airportName}
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
                      value={toCityInfo.destination.split(",")[0]}
                    />
                    <div className="cursor-pointer">
                      <small className="text-xs my-0">
                        <span title="" className="">
                          {toCityInfo.airportName}
                        </span>
                      </small>
                    </div>
                  </label>
                </div>
                <div className="grid grid-cols-2 border rounded-md">
                  <div
                    className="w-full p-2 border-r relative"
                    onClick={() => setCalendarModal(!calendarModal)}
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
                        className="text-xl font-semibold outline-none"
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
                          setCityCount((prevCount) => prevCount - 1)
                        }
                      >
                        <MdRemoveCircle /> Remove
                      </button>
                    ) : (
                      <>
                        <button
                          className="border px-3 py-1 flex items-center text-cyan-500"
                          onClick={() =>
                            setCityCount((prevCount) => prevCount + 1)
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
                                setCityCount((prevCount) => prevCount - 1)
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
                className="w-full p-2 border rounded-md relative"
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
                    className="text-xl font-semibold outline-none cursor-pointer"
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
                  <div className="absolute top-24 left-0 z-40">
                    <SearchLocation
                      setIsModal={setIsModal}
                      setCityInfo={setFromCityInfo}
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
                <label htmlFor="toCity">
                  <p className="text-sm">To</p>
                  <input
                    id="toCity"
                    type="text"
                    className="text-lg sm:text-xl font-semibold outline-none cursor-pointer"
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
                      setCityInfo={setToCityInfo}
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 border rounded-md">
                <div
                  className="w-full p-2 border-r relative"
                  onClick={() => setCalendarModal("departure")}
                >
                  <p className="text-sm">Departure</p>
                  <div className="cursor-pointer">
                    <input
                      type="text"
                      className="text-lg sm:text-xl w-24 font-semibold outline-none bg-transparent"
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
                      setFlightType("roundTrip");
                      setCalendarModal("return");
                    }}
                  >
                    <p className="text-sm">Return</p>
                    <p className="text-xs my-0 mt-2 cursor-pointer">
                      Tap to book return ticket for more savings
                    </p>
                  </div>
                )}
                {flightType === "roundTrip" && (
                  <div
                    className="w-full p-2 border-r relative"
                    onClick={() => setCalendarModal("return")}
                  >
                    <p className="text-sm">Return</p>
                    <div className="cursor-pointer">
                      <input
                        type="text"
                        className="text-lg sm:text-xl w-24 font-semibold outline-none bg-transparent"
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
                <h5 className="text-lg sm:text-xl font-semibold">1 Traveler</h5>
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
          <Link to="/flights">
            <button
              className="px-10 py-3 rounded bg-cyan-600 active:bg-cyan-700 text-white font-semibold"
              onClick={handleSearch}
            >
              {filterName}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default SearchFilter;
