import { useEffect, useState } from "react";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { TbBrandFlightradar24 } from "react-icons/tb";
import { GiWorld } from "react-icons/gi";
import { BiStopCircle } from "react-icons/bi";
import { RxUpdate } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { setCurrentPage } from "../../redux/features/bookTicketSlice";
import { GrNext, GrPrevious } from "react-icons/gr";

const ITEMS_PER_PAGE = 5;

const FlightStatus = () => {
  const [flight, setFlight] = useState([]);
  const [allFlight, setAllFlight] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("allFlight");
  const currentPage = useSelector((state) => state.bookTicket.currentPage);
  const dispatch = useDispatch(); // Initialize useDispatch

  useEffect(() => {
    fetch("/flight.json")
      .then((res) => res.json())
      .then((data) => {
        setAllFlight(data);
        const filteredData =
          selectedStatus === "allFlight"
            ? data
            : data.filter(
                (selectFlight) => selectFlight.status === selectedStatus
              );
        const sortedData = filteredData
          .slice()
          .sort((a, b) => a.flightName.localeCompare(b.flightName));
        setFlight(sortedData);
      });
  }, [selectedStatus]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handlePaginationNext = () => {
    const totalPages = Math.ceil(flight?.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return (
    <section>
      <section>
        <h1 className="font-semibold text-2xl">Flights</h1>
        <div className="mt-3 flex justify-start items-center gap-3 ">
          <div
            className={`p-2 h-[120px] md:h-auto shadow-md border-t w-full ${
              selectedStatus === "allFlight" ? "bg-cyan-100" : "bg-white"
            }`}
            onClick={() => handleStatusChange("allFlight")}
          >
            <h4 className="font-semibold text-sm mt-5 md:mt-0 mb-2 md:mb-0 md:text-lg pl-2">
              All Flights
            </h4>
            <div className="flex justify-center items-center mb-[14px]">
              <GiWorld size={35} color="#32a9db" />
            </div>
          </div>

          <div
            className={`p-2 h-[120px] md:h-auto shadow-md border-t w-full ${
              selectedStatus === "runningFlight" ? "bg-cyan-100" : "bg-white"
            }`}
            onClick={() => handleStatusChange("runningFlight")}
          >
            <h4 className="font-semibold text-sm mb-2 md:mb-0 md:text-lg pl-2">
              Running Flights
            </h4>
            <div className="flex justify-center items-center mb-2">
              <MdOutlineFlightTakeoff size={40} color="#32a9db" />
            </div>
          </div>

          <div
            className={`p-2 h-[120px] md:h-auto shadow-md border-t w-full ${
              selectedStatus === "arriveFlight" ? "bg-cyan-100" : "bg-white"
            }`}
            onClick={() => handleStatusChange("arriveFlight")}
          >
            <h4 className="font-semibold text-sm mb-2 md:mb-0 md:text-lg pl-2">
              Arrival Flight
            </h4>
            <div className="flex justify-center items-center mb-2">
              <TbBrandFlightradar24 size={40} color="#32a9db" />
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <div className="overflow-x-auto mt-6 mb-12">
        <table className="table">
          {/* head */}
          <thead className="bg-gray-50 shadow">
            <tr>
              <th>Airline Company</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Duration</th>
              <th>Price (BDT)</th>
              <th>Total Bookings</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {flight?.slice(startIndex, endIndex)?.map((singleFlight) => (
              <tr key={singleFlight?.flightImage} className="border-b-2">
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={singleFlight?.flightImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="">{singleFlight?.flightTrackingId}</div>
                      <div className="text-md">{singleFlight?.flightName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <h4>{singleFlight?.departurePlace}</h4>
                  <p>{singleFlight?.departureTime}</p>
                </td>
                <td>
                  <h4>{singleFlight?.arrivalPlace}</h4>
                  <p>{singleFlight?.arrivalTime}</p>
                </td>
                <td>
                  <h4>Non-Stop</h4>
                  <p>{singleFlight?.duration}</p>
                </td>

                <td>{singleFlight?.ticketPrice}</td>
                <td>
                  <div className="flex relative gap-x-3 items-center ">
                    <div className="font-[450]">
                      <p className="text-green-600">
                        Confirmed({singleFlight?.confirmed})
                      </p>
                      <p className="text-red-500">
                        Refund({singleFlight?.refund})
                      </p>
                      <p className="text-cyan-700">
                        Available({singleFlight?.available})
                      </p>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-1">
                    <p className="text-cyan-500">
                      <RxUpdate size={24} />{" "}
                    </p>
                    <p className="text-cyan-500">
                      <BiStopCircle size={26} />
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-12 flex justify-end items-center">
        <button
          className="border-[1px] p-2 rounded-l-md"
          onClick={handlePaginationPrev}
        >
          <GrPrevious size={20} />
        </button>
        {/* Render pagination buttons based on the total number of pages */}
        {Array.from(
          { length: Math.ceil(flight?.length / ITEMS_PER_PAGE) },
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
  );
};

export default FlightStatus;
