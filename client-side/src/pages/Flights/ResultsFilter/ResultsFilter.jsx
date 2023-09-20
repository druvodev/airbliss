import { useEffect, useState } from "react";
import CountdownTimer from "../../../Components/CountdownTimer/CountdownTimer";
import { MdOutlineWbSunny } from "react-icons/md";
import { PiSunHorizonFill } from "react-icons/pi";
import { BsSunrise } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { storeFilteredFlights } from "../../../redux/features/flightsSlice";
import {
  baggageAllowanceLength,
  highestPrice,
  lowestPrice,
  noTransitTimeLength,
  nonStopLength,
  refundableLength,
} from "../../../utils/flightsFilter";
import { set } from "date-fns";

const ResultsFilter = () => {
  const flights = useSelector((state) => state?.flights?.flights?.flights);
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [departureTime, setDepartureTime] = useState("");
  const [nonStopChecked, setNonStopChecked] = useState(false);
  const [baggageAllowanceChecked, setBaggageAllowanceChecked] = useState(false);
  const [refundableChecked, setRefundableChecked] = useState(false);
  const [noTransitTimeChecked, setNoTransitTimeChecked] = useState(false);
  const [baggageL, setBaggageL] = useState(0);
  const [noTranTimeL, setNoTranTimeL] = useState(0);
  const [nonStopL, setNonStopL] = useState(0);
  const [refundableL, setRefundableL] = useState(0);

  useEffect(() => {
    setMaxPrice(parseInt(flights && highestPrice(flights)));
    setMinPrice(parseInt(flights && lowestPrice(flights)));
    setPrice(parseInt(flights && highestPrice(flights)));
    setBaggageL(flights && baggageAllowanceLength(flights));
    setNoTranTimeL(flights && noTransitTimeLength(flights));
    setNonStopL(flights && nonStopLength(flights));
    setRefundableL(flights && refundableLength(flights));
  }, [flights]);
  const clearFilters = () => {
    setPrice(5010);
    setDepartureTime("");
    setNonStopChecked(false);
    setBaggageAllowanceChecked(false);
    setRefundableChecked(false);
    setNoTransitTimeChecked(false);
  };

  const applyFilters = () => {
    const updatedFilteredFlights = flights?.filter((flight) => {
      // Apply filters based on filter values
      const meetsPriceCriteria =
        parseFloat(flight?.fareSummary?.total) <= price;

      let meetsDepartureTimeCriteria = true;
      if (departureTime) {
        const flightDepartureTimeHours = parseInt(
          flight.departure.time.split(":")[0],
          10
        );
        const isMorning =
          flightDepartureTimeHours >= 6 && flightDepartureTimeHours < 12;
        const isNoon =
          flightDepartureTimeHours >= 12 && flightDepartureTimeHours < 18;
        const isEvening =
          flightDepartureTimeHours >= 18 && flightDepartureTimeHours <= 23;

        meetsDepartureTimeCriteria =
          (departureTime === "morning" && isMorning) ||
          (departureTime === "noon" && isNoon) ||
          (departureTime === "evening" && isEvening);
      }

      const meetsNonStopCriteria =
        !nonStopChecked || flight?.stopType === "Non Stop";
      const meetsBaggageAllowanceCriteria =
        !baggageAllowanceChecked ||
        flight?.flightInfo?.baggage.includes("20 Kg");
      const meetsRefundableCriteria =
        !refundableChecked || flight?.refundableStatus.includes("Refundable");
      const meetsNoTransitTimeCriteria =
        !noTransitTimeChecked || flight?.duration <= 60;

      return (
        meetsPriceCriteria &&
        meetsDepartureTimeCriteria &&
        meetsNonStopCriteria &&
        meetsBaggageAllowanceCriteria &&
        meetsRefundableCriteria &&
        meetsNoTransitTimeCriteria
      );
    });
    dispatch(storeFilteredFlights({ flights: updatedFilteredFlights }));
  };

  // Call applyFilters whenever any filter value changes
  useEffect(() => {
    applyFilters();
  }, [
    price,
    departureTime,
    nonStopChecked,
    baggageAllowanceChecked,
    refundableChecked,
    noTransitTimeChecked,
  ]);

  return (
    <div className="rounded-2xl shadow-md sm:py-">
      <div className="dark:bg-gray-800">
        <CountdownTimer />
      </div>
      <hr className="text-gray-300" />
      <div className="p-5 dark:bg-gray-700">
        <p className="text-lg font-semibold mb-4">One way price</p>
        <div>
          <input
            type="range"
            name="price"
            id=""
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={() => setPrice(parseInt(event.target.value, 10))}
            className="w-full range range-xs range-accent"
          />{" "}
        </div>
        <p>
          <span>{minPrice} tk</span> - <span>{price} tk</span>
        </p>
      </div>
      <hr className="text-gray-300" />
      <div className="p-5 dark:bg-gray-700">
        <p className="text-lg font-semibold mb-4">Departure time in Dhaka</p>
        <div>
          <div className="flex gap-5 w-full mb-5">
            <div
              className={`shadow rounded py-4 w-full text-center cursor-pointer  ${
                departureTime === "morning"
                  ? "border border-cyan-600  bg-cyan-600 text-white dark:bg-gray-600 dark:border-0"
                  : "border dark:border-0 dark:bg-gray-700 border-black/40"
              }`}
              onClick={() => setDepartureTime("morning")}
            >
              <BsSunrise className="mx-auto text-2xl" />
              <p className="text-sm font-semibold mt-2">Morning</p>
              <p className="text-sm">
                <small>06.00</small> - <small>11:59</small>
              </p>
            </div>
            <div
              className={`shadow rounded py-4 w-full text-center cursor-pointer ${
                departureTime === "noon"
                  ? "border border-cyan-600  bg-cyan-600 text-white dark:bg-gray-600 dark:border-0"
                  : "border border-black/40 dark:border-0 dark:bg-gray-700"
              }`}
              onClick={() => setDepartureTime("noon")}
            >
              <MdOutlineWbSunny className="mx-auto text-2xl" />
              <p className="text-sm font-semibold mt-2">After noon</p>
              <p className="text-sm">
                <small>12:00</small> - <small>17:59</small>
              </p>
            </div>
          </div>
          <div
            className={`shadow rounded py-4 w-full text-center cursor-pointer ${
              departureTime === "evening"
                ? "border border-cyan-600  bg-cyan-600 text-white dark:bg-gray-600 dark:border-0"
                : "border border-black/40 dark:border-0 dark:bg-gray-700"
            }`}
            onClick={() => setDepartureTime("evening")}
          >
            <PiSunHorizonFill className="mx-auto text-2xl" />
            <p className="text-sm font-semibold mt-2">Evening</p>
            <p className="text-sm">
              <small>18:00</small> - <small>23:59</small>
            </p>
          </div>
        </div>
      </div>
      <hr className="text-gray-300" />
      <div className="p-5 dark:bg-gray-700">
        <p className="text-lg font-semibold mb-4">Stops From Dhaka</p>
        <div className="flex items-center justify-between flex-wrap gap-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={nonStopChecked}
              onChange={() => setNonStopChecked(!nonStopChecked)}
              className="checkbox checkbox-sm checkbox-accent"
            />{" "}
            <span>Non Stop ({nonStopL})</span>
          </div>
        </div>
      </div>
      <hr className="text-gray-300" />
      <div className="p-5 dark:bg-gray-700">
        <p className="text-lg font-semibold mb-4">Check in Baggage Allowance</p>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={baggageAllowanceChecked}
            onChange={() =>
              setBaggageAllowanceChecked(!baggageAllowanceChecked)
            }
            className="checkbox checkbox-sm checkbox-accent"
          />{" "}
          <span>20 KG ({baggageL})</span>
        </div>
      </div>
      <hr className="text-gray-300" />
      <div className="p-5 dark:bg-gray-700">
        <p className="text-lg font-semibold mb-4">Refundable</p>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={refundableChecked}
            onChange={() => setRefundableChecked(!refundableChecked)}
            className="checkbox checkbox-sm checkbox-accent"
          />{" "}
          <span>Partially Refundable ({refundableL})</span>
        </div>
      </div>
      <hr className="text-gray-300" />
      <div className="p-5 dark:bg-gray-700">
        <p className="text-lg font-semibold mb-4">
          Transit Time in {"Dhaka"} - {"Chittagong"}
        </p>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={noTransitTimeChecked}
            onChange={() => setNoTransitTimeChecked(!noTransitTimeChecked)}
            className="checkbox checkbox-sm checkbox-accent"
          />{" "}
          <span>No Transit Time ({noTranTimeL})</span>
        </div>
      </div>
      <div className="p-5 dark:bg-gray-700">
        <button
          onClick={clearFilters}
          className="py-2 w-full text-lg text-cyan-600 font-semibold border border-cyan-600 hover:bg-cyan-600 hover:text-white rounded"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ResultsFilter;
