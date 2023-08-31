import React, { useEffect, useState } from "react";
import FlightDetails from "../FlightDetails/FlightDetails";
import FlightSummery from "../FlightSummery/FlightSummery";
import FareRuls from "../FareRuls/FareRuls";
import ShortingFlight from "../../ShortingFlight/ShortingFlight";
import { GrPrevious, GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFlightInfo } from "../../../../redux/features/bookingInfoSlice";

const ITEMS_PER_PAGE = 3;

const BookFlight = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [activeCard, setActiveCard] = useState(true);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const [showFlightSummary, setShowFlightSummary] = useState(false);
  const [showFareRules, setShowFareRules] = useState(false);
  const [selectedButton, setSelectedButton] = useState("cheapest");
  const [flightData, setFlightData] = useState([]);

  const [singleFlightDetails, setsingleFlightDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [flightDetailsVisibility, setFlightDetailsVisibility] = useState({});

  const dispatch = useDispatch();
  const flight = useSelector(
    (state) => state?.flights?.filteredFlights?.flights
  );

  // Move the sorting logic inside a useEffect hook to avoid infinite re-renders
  useEffect(() => {
    if (flight) {
      const sortedData = flight?.slice();
      sortedData.sort((a, b) => b.fareSummary.total - a.fareSummary.total);
      setFlightData(sortedData);
      setIsLoading(false);
    }
  }, [flight]);

  console.log(flightData);

  const sortByTicketPrice = (sortOrder) => {
    const sortedData = [...flightData];
    sortedData.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.fareSummary.total - b.fareSummary.total;
      } else {
        return b.fareSummary.total - a.fareSummary.total;
      }
    });
    setFlightData(sortedData);
  };

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);

    if (buttonType === "cheapest") {
      sortByTicketPrice("desc");
    } else if (buttonType === "shortest") {
      sortByTicketPrice("asc");
    }
  };

  const handelVisible = (singleDataFlight) => {
    setVisibleDetails(!visibleDetails);
    const flightId = singleDataFlight._id;
    setFlightDetailsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [flightId]: !prevVisibility[flightId],
    }));
    setsingleFlightDetails(singleDataFlight);
    handleFlightDetailsClick();
  };

  const handleFlightDetailsClick = () => {
    setShowFlightDetails(true);
    setShowFlightSummary(false);
    setShowFareRules(false);
  };

  const handleFlightSummaryClick = () => {
    setShowFlightDetails(false);
    setShowFlightSummary(true);
    setShowFareRules(false);
  };

  const handleFareRulesClick = () => {
    setShowFlightDetails(false);
    setShowFlightSummary(false);
    setShowFareRules(true);
  };

  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePaginationNext = () => {
    const totalPages = Math.ceil(flightData.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  function formatDate(dateString) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return (
    <section className="mb-16">
      {isLoading ? (
        ""
      ) : (
        <section>
          {/* Filter Card */}
          <ShortingFlight destenation={flightData} />

          <section>
            <div className="flex w-full p-5 mt-10 rounded-md justify-between shadow-md">
              <button
                className={`p-4 text-left flex-grow py-2 px-3 pe-5 mb-0 border-0 ${
                  selectedButton === "cheapest"
                    ? "bg-gray-100 text-white"
                    : "text-white"
                }`}
                onClick={() => handleButtonClick("cheapest")}
              >
                <h1 className="text-[18px] font-semibold mb-2 text-gray-900">
                  Cheapest
                </h1>
                <p className="text-[14px] text-[#7c8db0]">
                  To get the cheapest available flights
                </p>
              </button>
              <div className="border self-stretch mx-5"></div>
              <button
                className={`p-4 text-left flex-grow py-2 px-3 pe-5 mb-0 border-0 ${
                  selectedButton === "shortest"
                    ? "bg-gray-100 text-white"
                    : "text-white"
                }`}
                onClick={() => handleButtonClick("shortest")}
              >
                <h1 className="text-[18px] font-semibold mb-2 text-gray-900">
                  Shortest
                </h1>
                <p className="text-[14px] text-[#7c8db0]">
                  To get the shortest available flights
                </p>
              </button>
            </div>
          </section>
          {/* Flight Details Card  Container*/}
          <section className=" mt-6">
            {/* Card Design */}

            {flightData?.slice(startIndex, endIndex)?.map((singleFlight) => (
              <section
                key={singleFlight?._id}
                className="shadow-md w-full rounded-md px-6 py-8 mt-8 border-[1px] border-gray-100"
              >
                <div className=" grid grid-cols-3 lg:grid-cols-6 gap-5 ">
                  <div>
                    <img
                      className="h-20 w-20 -ml-2"
                      src={singleFlight?.airlineLogo}
                      alt=""
                    />
                    <div>
                      <p className="text-gray-400">
                        <small>{singleFlight?.airlineName}</small>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-400 text-[13px]">Depart</h4>
                    <h2 className="mt-2 text-[15px] font-semibold">
                      {singleFlight?.departure?.time}
                    </h2>
                    <p className="-mt-1 pr-2">
                      <small>{formatDate(singleFlight?.departure?.date)}</small>
                    </p>
                    <h3 className="mt-2 text-[13px]">
                      {singleFlight?.departure?.city}
                    </h3>
                  </div>

                  <div align="center" className="space-y-1  pr-2">
                    <p className="text-gray-400 text-[14px]">
                      {singleFlight?.duration < 60
                        ? `${singleFlight?.duration} min`
                        : `${Math.floor(singleFlight?.duration / 60)} hr ${
                            singleFlight?.duration % 60
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
                    <p>
                      <small>{singleFlight?.stopType}</small>
                    </p>
                  </div>

                  <div>
                    <h4 className="text-gray-400 text-[13px]">Arrive</h4>
                    <h2 className="mt-2 text-[15px] font-semibold">
                      {singleFlight?.arrival?.time}
                    </h2>
                    <p className="-mt-1 pr-2">
                      <small>
                        {singleFlight?.flight_details?.arrival?.date}
                      </small>
                    </p>
                    <h3 className="mt-2 text-[13px]">
                      {singleFlight?.arrival?.city}
                    </h3>
                  </div>

                  <div>
                    <h4 className="text-gray-400 text-[13px]">Prise</h4>
                    <h2 className="mt-2 text-[15px] font-semibold">
                      BDT {singleFlight?.fareSummary?.total}
                    </h2>
                  </div>

                  <div align="center">
                    <Link to={`/review/${singleFlight?._id}`}>
                      <button
                        onClick={() => {
                          dispatch(setFlightInfo(singleFlight));
                        }}
                        className="p-3 bg-cyan-600 hover:bg-white hover:border-2 hover:text-cyan-600 hover:border-cyan-600 text-white rounded-md"
                      >
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>

                {/* View Details Section */}
                <div className="flex justify-between items-center mt-8 lg:mt-1">
                  <p>
                    <small>{singleFlight?.refundableStatus}</small>
                  </p>
                  <p
                    onClick={() => handelVisible(singleFlight)}
                    className="hover:cursor-pointer link-hover"
                  >
                    <small>
                      {visibleDetails
                        ? "Hide Flight Details"
                        : "View Flight Details"}
                    </small>
                  </p>
                </div>

                {/* View Details Card Section */}

                {flightDetailsVisibility[singleFlight._id] && (
                  <section className="mt-6 ">
                    <hr />
                    <section className="flex justify-start items-center mt-5 text-[12px]">
                      <p
                        onClick={() => handleFlightDetailsClick()}
                        className={`border-2 p-2 rounded-md cursor-pointer ${
                          showFlightDetails ? "bg-cyan-600 text-white" : ""
                        }`}
                      >
                        Flight Details
                      </p>
                      <p
                        onClick={() => handleFlightSummaryClick()}
                        className={`border-2 p-2 rounded-md cursor-pointer ${
                          showFlightSummary ? "bg-cyan-600 text-white" : ""
                        }`}
                      >
                        Fare Summary
                      </p>
                      <p
                        onClick={() => handleFareRulesClick()}
                        className={`border-2 p-2 rounded-md cursor-pointer ${
                          showFareRules ? "bg-cyan-600 text-white" : ""
                        }`}
                      >
                        Fare Rules
                      </p>
                    </section>

                    {showFlightDetails && (
                      <FlightDetails flightFullDetails={singleFlightDetails} />
                    )}
                    {showFlightSummary && (
                      <FlightSummery flightFullDetails={singleFlightDetails} />
                    )}
                    {showFareRules && (
                      <FareRuls flightFullDetails={singleFlightDetails} />
                    )}
                  </section>
                )}
              </section>
            ))}

            {/* Paination Button Section */}
            <section className="mt-12 flex justify-end items-center">
              <button
                className="border-[1px] p-2 rounded-l-md"
                onClick={handlePaginationPrev}
              >
                <GrPrevious size={20} />
              </button>
              {/* Render pagination buttons based on the total number of pages */}
              {Array.from(
                { length: Math.ceil(flightData.length / ITEMS_PER_PAGE) },
                (_, index) => (
                  <h3
                    key={index}
                    className={`pl-3 pr-3 pt-[6px] pb-[6px] border-[1px] ${
                      index + 1 === currentPage ? "bg-cyan-600 text-white" : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </h3>
                )
              )}
              <button
                className="border-[1px] p-2 rounded-r-md"
                onClick={handlePaginationNext}
              >
                <GrNext size={20} />
              </button>
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default BookFlight;
