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
  const flight = useSelector((state) => state.flights.flights);

  // Move the sorting logic inside a useEffect hook to avoid infinite re-renders
  useEffect(() => {
    if (flight && flight.flights) {
      const sortedData = flight.flights.slice();
      sortedData.sort((a, b) => b.fareSummary.total - a.fareSummary.total);
      setFlightData(sortedData);
    }
  }, [flight]);

  // useEffect(() => {
  //   fetch("booking.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // Sort the fetched data by descending ticket price
  //       const sortedData = data.slice(); // Create a copy of the data array
  //       sortedData.sort(
  //         (a, b) => b.fare_summary.ticket_price - a.fare_summary.ticket_price
  //       );
  //       setFlightData(sortedData);
  //     });
  // }, []);

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
    console.log(sortedData);
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

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return (
    <section className="mb-16">
      {/* Filter Card */}
      <ShortingFlight />

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

        {flightData.slice(startIndex, endIndex).map((singleFlight) => (
          <section
            key={singleFlight?._id}
            className="shadow-md w-full rounded-md pl-6 pr-6 pt-8 pb-8"
          >
            <div className=" grid grid-cols-3 lg:grid-cols-6 items-center gap-5 ">
              <div>
                <img
                  className="h-12 w-12"
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
                <h2 className="mt-2 text-[15px]">
                  <strong>{singleFlight?.departure?.time}</strong>
                </h2>
                <p className="-mt-1 pr-2">
                  <small>{singleFlight?.departure?.date}</small>
                </p>
                <h3 className="mt-2 text-[13px]">
                  {singleFlight?.departure?.airportName}
                </h3>
              </div>

              <div align="center" className="space-y-1 pl-2 pr-2">
                <p className="text-gray-400 text-[14px]">
                  {singleFlight?.duration}
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
                <h2 className="mt-2 text-[15px]">
                  <strong> {singleFlight?.arrival?.time}</strong>
                </h2>
                <p className="-mt-1 pr-2">
                  <small>{singleFlight?.flight_details?.arrival?.date}</small>
                </p>
                <h3 className="mt-2 text-[13px]">
                  {singleFlight?.arrival?.airportName}
                </h3>
              </div>

              <div>
                <h4 className="text-gray-400 text-[13px]">Prise</h4>
                <h2 className="mt-2 text-[15px]">
                  <strong>BDT {singleFlight?.fareSummary?.total}</strong>
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
            <div className="flex justify-between items-center mt-8">
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
  );
};

export default BookFlight;
