import React from "react";
import { formatDate } from "../../../../utils/formatDate";
import { calculateArrivalDate } from "../../../../utils/calculateArrivalDate";

const FlightDetails = ({ flightFullDetails }) => {
  const { airlineName, airlineLogo } = flightFullDetails || {};
  const { seats, airportName, city, code, date, terminal, time } =
    flightFullDetails?.departure || {};

  const { aircraft, cabin, checkIn, operatedBy } =
    flightFullDetails?.flightInfo || {};

  const { duration, passengerType, stopType } = flightFullDetails || {};

  const arrive = flightFullDetails?.arrival || {};

  return (
    <section className="mt-3 border-[1px] rounded-sm ">
      <h1 className=" p-3 border-b-[1px] font-semibold">
        {city} to {arrive?.city}, {formatDate(date)}
      </h1>

      {/* Details Body */}
      <section className="p-3">
        {/* Flight Profile */}
        <div className="flex gap-4 ml-3">
          <img
            className="h-16 w-16 rounded-full -ml-2"
            src={airlineLogo}
            alt=""
          />
          <div>
            <h1 className="font-semibold">{airlineName}</h1>
            <h3 className="font-semibold text-[13px]">Aircraft : {aircraft}</h3>
            <h4 className="font-semibold text-[12px]">
              Operated by : {operatedBy}
            </h4>
            <h4 className="font-semibold text-[12px]">
              {flightFullDetails?.flightInfo?.class}
            </h4>
            <h4 className="font-semibold text-[12px]">
              Available seats: {seats}
            </h4>
          </div>
        </div>

        {/* flight other details */}
        <section className="grid grid-cols-3 ml-4 lg:grid-cols-6 mt-4 gap-6 lg:mb-1 mb-8">
          <div>
            <h2 className="mt-2 text-[15px] font-semibold">{time}</h2>
            <p className="text-gray-400 mt-2 text-xs">{formatDate(date)}</p>
            <h2 className="text-[13px] font-semibold">{code}</h2>
            <p className="text-gray-400 text-xs">Tarminal: {terminal}</p>
            <p className="text-gray-400 text-xs">{airportName}</p>
            <p className="text-gray-400 text-xs"> {city}</p>
          </div>

          <div align="center" className="space-y-1 pr-2">
            <p className="text-gray-400 text-xs">
              {duration < 60
                ? `${duration} min`
                : `${Math.floor(duration / 60)} hr ${duration % 60} min`}
            </p>
            <img
              style={{
                WebkitFilter: "grayscale(100%)",
                filter: "grayscale(100%)",
              }}
              src="https://flightexpert.com/assets/img/non-stop-shape.png"
              alt=""
            />
            <p className="text-xs">{stopType}</p>
          </div>

          <div>
            <h2 className="mt-2 text-[15px] font-semibold">{arrive?.time}</h2>
            <p className="text-gray-400 mt-2 text-xs">
              {calculateArrivalDate(date, time, arrive?.time)}
            </p>
            <h2 className="text-xs font-semibold">{arrive?.code}</h2>
            <p className="text-gray-400 text-xs">
              Tarminal: {arrive?.terminal}
            </p>
            <p className="text-gray-400 text-xs">{arrive?.airportName}</p>
            <p className="text-gray-400 text-xs">{arrive?.city}</p>
          </div>

          <div>
            <h2 className="mt-2 text-[14px] font-semibold">Baggage</h2>
            <p className="text-gray-400 mt-1">
              <small>{passengerType}</small>
            </p>
          </div>

          <div>
            <h2 className="mt-2 text-[15px] font-semibold">Check In</h2>
            <p className="text-gray-400 mt-1">
              <small>{checkIn}</small>
            </p>
          </div>

          <div>
            <h2 className="mt-2 text-[15px] font-semibold">Cabin</h2>
            <p className="text-gray-400 mt-1">
              <small>{cabin}</small>
            </p>
          </div>
        </section>
      </section>
    </section>
  );
};

export default FlightDetails;
