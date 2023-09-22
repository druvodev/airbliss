import { BiStopCircle } from "react-icons/bi";
import { RxUpdate } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { setCurrentPage } from "../../redux/features/bookTicketSlice";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { setFlights, setPath } from "../../redux/features/manageFlightSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const ITEMS_PER_PAGE = 15;

const FlightStatus = () => {
  // Redux state
  const Filterflights = useSelector((state) => state?.manageFlight);
  const currentPage = useSelector((state) => state?.bookTicket?.currentPage);
  const [isActive, setIsActive] = useState("allFlights");
  const [airportCode, setSelectAirportCode] = useState("DAC");
  const [id, setSelectAirportId] = useState("64e0755f8bdfd4239ff10282");
  const [allFlight, setAllFlight] = useState([]);
  const { flights, loading } = Filterflights;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPath({ id, airportCode }));
  }, [airportCode]);

  useEffect(() => {
    fetch("http://localhost:5000/flights")
      .then((res) => res.json())
      .then((data) => setAllFlight(data));
  }, []);

  const filteredFlights =
    isActive === "running"
      ? flights?.filter((flight) => flight?.airlineStatus === "running")
      : isActive === "stop"
      ? flights?.filter((flight) => flight?.airlineStatus === "stop")
      : flights;

  console.log(filteredFlights);

  const handleTabClick = (tab) => {
    setIsActive(tab);
  };

  const handleAirportSelect = (event) => {
    const selectedAirportId = event.target.value;
    const selectedAirportCode =
      event.target.options[event.target.selectedIndex].text;
    setSelectAirportId(selectedAirportId);
    setSelectAirportCode(selectedAirportCode);
  };

  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handlePaginationNext = () => {
    const totalPages = Math.ceil(flights?.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return (
    <>
      <section>
        <section>
          <h1 className="font-semibold text-2xl">Manage Flights :</h1>
          <section className="bg-white p-4 shadow-md mt-5 flex flex-col md:flex-row md:justify-between md:items-center ">
            <div className="flex md:flex-row flex-col  md:items-center  md:space-x-4">
              <div className="mb-2 md:mb-0">
                <h1 className="font-semibold ">Filter Flights: </h1>
              </div>

              <div className="flex md:flex-row flex-col gap-1 rounded font-medium text-gray-600 text-sm">
                <div
                  onClick={() => handleTabClick("allFlights")}
                  className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
                    isActive === "allFlights"
                      ? "border-t-2 bg-cyan-50 border-cyan-400"
                      : ""
                  }`}
                >
                  All Flights
                </div>
                <div
                  onClick={() => handleTabClick("running")}
                  className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
                    isActive === "running"
                      ? "border-t-2 bg-cyan-50 border-cyan-400"
                      : ""
                  }`}
                >
                  Running Flights
                </div>

                <div
                  onClick={() => handleTabClick("stop")}
                  className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
                    isActive === "stop"
                      ? "border-t-2 bg-cyan-50 border-cyan-400"
                      : ""
                  }`}
                >
                  Stop Flights
                </div>
              </div>
            </div>

            <div className="flex items-center bg-white md:border-t-2 border-black p-2 rounded mr-6">
              <select
                required
                className=" cursor-pointer"
                onChange={handleAirportSelect}
              >
                <option className="border-0 bg-white" value="">
                  Select Airport
                </option>
                {allFlight?.map((airportData) => {
                  const airportCode = Object.keys(airportData)[1];
                  const airportId = Object.values(airportData)[0];

                  return (
                    <option key={airportCode} value={airportId}>
                      {airportCode}
                    </option>
                  );
                })}
              </select>
            </div>
          </section>
        </section>

        {flights.length > 1 && airportCode ? (
          <div className="overflow-x-auto mt-6 mb-12">
            <table className="table">
              {/* head */}
              <thead className="bg-gray-50 shadow">
                <tr>
                  <th>Airline Company</th>
                  <th>Cost Per Km</th>
                  <th>Depature</th>
                  <th>Fees</th>
                  <th>Total Seats</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center pt-16 pb-8">
                      <div className="flex justify-center items-center h-full">
                        <HashLoader color="#0891B2" />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredFlights
                      ?.slice(startIndex, endIndex)
                      ?.map((singleFlight) => (
                        <tr key={singleFlight?._id} className="border-b-2">
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar">
                                <div className="mask mask-squircle rounded-full w-12 h-12">
                                  <img
                                    src={singleFlight?.airlineLogo}
                                    alt="Avatar Tailwind CSS Component"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="">
                                  #{singleFlight?._id?.slice(0, 7)}
                                </div>
                                <div className="text-md">
                                  {singleFlight?.airlineName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h4>Amount: {singleFlight?.amountPerKm}.00 BDT</h4>
                            <p>Duration: {singleFlight?.durationPerKm} BDT</p>
                          </td>
                          <td>
                            <h4>Time: {singleFlight?.details?.time}</h4>
                            <p>{singleFlight?.airportName}</p>
                          </td>

                          <td>Tax: {singleFlight?.taxesAndFees} BDT</td>
                          <td>
                            <p>Seats: ({singleFlight?.totalSeats})</p>
                          </td>

                          <td>
                            <Link
                              to={`/dashboard/flightDetails/${airportCode}/${singleFlight?._id}/${id}`}
                            >
                              <p className="text-cyan-500">
                                <FiEdit size={24} />
                              </p>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <p className="font-semibold text-2xl text-center mt-12">
              Please Select Airport
            </p>
          </div>
        )}

        <section className="mt-12 mr-6 mb-8 flex justify-end items-center cursor-pointer">
          <button
            className="border-[1px] p-2 rounded-l-md"
            onClick={handlePaginationPrev}
          >
            <GrPrevious size={20} />
          </button>
          {/* Render pagination buttons based on the total number of pages */}
          {Array.from(
            { length: Math.ceil(flights?.length / ITEMS_PER_PAGE) },
            (_, index) => (
              <h3
                key={index}
                className={`pl-3 pr-3 pt-[6px] pb-[6px] border-[1px] ${
                  index + 1 === currentPage ? "bg-cyan-600 text-white" : ""
                }`}
                onClick={() => dispatch(setCurrentPage(index + 1))}
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
    </>
  );
};

export default FlightStatus;
