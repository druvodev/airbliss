import React from "react";

const FlightDetails = ({ flightFullDetails }) => {
  const { airlineName, airlineLogo } = flightFullDetails || {};
  const { airportName, city, code, date, terminal, time } =
    flightFullDetails?.departure || {};

  const { aircraft, cabin, checkIn, operatedBy } =
    flightFullDetails?.flightInfo || {};

  const { duration, passengerType, stopType } = flightFullDetails || {};

  const arrive = flightFullDetails?.arrival || {};

  return (
    <section className="mt-3 border-[1px] rounded-sm ">
      <h1 className=" p-3 border-b-[1px]">
        <b>
          {city} to {arrive?.city}, {date}
        </b>
      </h1>

      {/* Details Body */}
      <section className="p-3">
        {/* Flight Profile */}
        <div className="flex gap-4 ml-3">
          <img className="h-12 w-12" src={airlineLogo} alt="" />
          <div>
            <h1>
              <b>{airlineName}</b>
            </h1>
            <h3 className="font-semibold text-[13px]">Aircraft : {aircraft}</h3>
            <h4 className="font-semibold text-[12px]">
              Operated by : {operatedBy}
            </h4>
            <h4 className="font-semibold text-[12px]">
              {flightFullDetails?.flightInfo?.class}
            </h4>
            <h4 className="font-semibold text-[12px]">Available seats: 10</h4>
          </div>
        </div>

        {/* flight other details */}
        <section className="grid grid-cols-3 ml-4 lg:grid-cols-6 mt-4 gap-6 lg:mb-1 mb-8">
          <div>
            <h2 className="mt-2 text-[15px]">
              <strong>{time}</strong>
            </h2>
            <p className="text-gray-400 mt-2">
              <small>{date}</small>
            </p>
            <h2 className="text-[13px] font-semibold">{code}</h2>
            <p className="text-gray-400 text-[13px]">{terminal}</p>
            <p className="text-gray-400 text-[13px]">{airportName}</p>
            <p className="text-gray-400 text-[13px]"> {city}</p>
          </div>

          <div align="center" className="space-y-1 pl-2 pr-2">
            <p className="text-gray-400 text-[14px]">{duration}</p>
            <img
              style={{
                WebkitFilter: "grayscale(100%)",
                filter: "grayscale(100%)",
              }}
              src="https://flightexpert.com/assets/img/non-stop-shape.png"
              alt=""
            />
            <p>
              <small>{stopType}</small>
            </p>
          </div>

          <div>
            <h2 className="mt-2 text-[15px]">
              <strong>{arrive?.time}</strong>
            </h2>
            <p className="text-gray-400 mt-2">
              <small>{date}</small>
            </p>
            <h2 className="text-[13px] font-semibold">{arrive?.code}</h2>
            <p className="text-gray-400 text-[13px]">{arrive?.terminal}</p>
            <p className="text-gray-400 text-[13px]">{arrive?.airportName}</p>
            <p className="text-gray-400 text-[13px]">{arrive?.city}</p>
          </div>

          <div>
            <h2 className="mt-2 text-[15px]">
              <strong>Baggage</strong>
            </h2>
            <p className="text-gray-400 mt-1">
              <small>{passengerType}</small>
            </p>
          </div>

          <div>
            <h2 className="mt-2 text-[15px]">
              <strong>Check In</strong>
            </h2>
            <p className="text-gray-400 mt-1">
              <small>{checkIn}</small>
            </p>
          </div>

          <div>
            <h2 className="mt-2 text-[15px]">
              <strong>Cabin</strong>
            </h2>
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
