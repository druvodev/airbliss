import { useState } from "react";
import CountdownTimer from "../../../Components/CountdownTimer/CountdownTimer";
import { MdOutlineWbSunny } from "react-icons/md";
import { PiSunHorizonFill } from "react-icons/pi";

const ResultsFilter = () => {
  const [minPrice, setMinPrice] = useState(2100); // Soon Changes
  const [maxPrice, setMaxPrice] = useState(5010); // Soon Changes
  const [price, setPrice] = useState(5010); // Soon Changes
  const [departureTime, setDepartureTime] = useState("");
  const [nonStopChecked, setNonStopChecked] = useState(false);
  const [baggageAllowanceChecked, setBaggageAllowanceChecked] = useState(false);
  const [refundableChecked, setRefundableChecked] = useState(false);
  const [noTransitTimeChecked, setNoTransitTimeChecked] = useState(false);

  const clearFilters = () => {
    setPrice(5010);
    setDepartureTime("");
    setNonStopChecked(false);
    setBaggageAllowanceChecked(false);
    setRefundableChecked(false);
    setNoTransitTimeChecked(false);
  };

  return (
    <div className="rounded-2xl shadow-md sm:py-5">
      <div>
        <CountdownTimer />
      </div>
      <hr className="text-gray-300" />
      <div className="p-5">
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
      <div className="p-5">
        <p className="text-lg font-semibold mb-4">Departure time in Dhaka</p>
        <div className="flex gap-5 sm:gap-10">
          <div
            className={`shadow rounded py-4 w-full text-center cursor-pointer ${
              departureTime === "noon"
                ? "border border-cyan-600  bg-cyan-600 text-white"
                : "border border-black/40"
            }`}
            onClick={() => setDepartureTime("noon")}
          >
            <MdOutlineWbSunny className="mx-auto text-2xl" />
            <p className="text-sm font-semibold mt-2">After noon</p>
            <p className="text-sm">
              <small>12:00</small> - <small>17:59</small>
              <small>{` (${12})`}</small>
            </p>
          </div>
          <div
            className={`shadow rounded py-4 w-full text-center cursor-pointer ${
              departureTime === "evening"
                ? "border border-cyan-600  bg-cyan-600 text-white"
                : "border border-black/40"
            }`}
            onClick={() => setDepartureTime("evening")}
          >
            <PiSunHorizonFill className="mx-auto text-2xl" />
            <p className="text-sm font-semibold mt-2">Evening</p>
            <p className="text-sm">
              <small>18:00</small> - <small>23:59</small>
              <small>{` (${4})`}</small>
            </p>
          </div>
        </div>
      </div>
      <hr className="text-gray-300" />
      <div className="p-5">
        <p className="text-lg font-semibold mb-4">Stops From Dhaka</p>
        <div className="flex items-center justify-between flex-wrap gap-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={nonStopChecked}
              onChange={() => setNonStopChecked(!nonStopChecked)}
              className="checkbox checkbox-sm checkbox-accent"
            />{" "}
            <span>Non Stop {` (${14})`}</span>
          </div>
          <p>BDT {2901}</p>
        </div>
      </div>
      <hr className="text-gray-300" />
      <div className="p-5">
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
          <span>20 KG {` (${14})`}</span>
        </div>
      </div>
      <hr className="text-gray-300" />
      <div className="p-5">
        <p className="text-lg font-semibold mb-4">Refundable</p>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={refundableChecked}
            onChange={() => setRefundableChecked(!refundableChecked)}
            className="checkbox checkbox-sm checkbox-accent"
          />{" "}
          <span>20 KG {` (${14})`}</span>
        </div>
      </div>
      <hr className="text-gray-300" />
      <div className="p-5">
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
          <span>No Transit Time {` (${14})`}</span>
        </div>
      </div>
      <div className="p-5">
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
