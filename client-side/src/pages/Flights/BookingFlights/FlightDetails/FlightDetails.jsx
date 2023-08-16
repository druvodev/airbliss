import React from "react";

const FlightDetails = ({ flightFullDetails }) => {
  const {
    flight_name,
    flight_image,
    destination,
    travel_date,
    aircraft,
    operated_by,
    economy_type,
    available_seats,
  } = flightFullDetails?.flight || {};

  const { time, date, terminal, airport_name, airport_address } =
    flightFullDetails?.flight_details?.arrival || {};

  const { travel_duration } = flightFullDetails?.flight_details || {};

  const { check_in, cabin } =
    flightFullDetails?.flight_details?.baggage_allowance || {};

  return (
    <section className="mt-3 border-[1px] rounded-sm">
      <h1 className=" p-3 border-b-[1px]">
        <b>
          {destination}, {travel_date}
        </b>
      </h1>

      {/* Details Body */}
      <section className="p-3">
        {/* Flight Profile */}
        <div className="flex gap-4 ml-3">
          <img className="h-12 w-12" src={flight_image} alt="" />
          <div>
            <h1>
              <b>{flight_name}</b>
            </h1>
            <h3 className="font-semibold text-[13px]">Aircraft : {aircraft}</h3>
            <h4 className="font-semibold text-[12px]">
              Operated by : {operated_by}
            </h4>
            <h4 className="font-semibold text-[12px]">{economy_type}</h4>
            <h4 className="font-semibold text-[12px]">
              Available seats: {available_seats}
            </h4>
          </div>
        </div>

        {/* flight other details */}
        <section className="grid grid-cols-3 ml-4 lg:grid-cols-6 mt-4 gap-6 lg:mb-1 mb-8">
          <div>
            <h2 className="mt-2 text-[15px]">
              <strong>
                {flightFullDetails?.flight_details?.departure?.time}
              </strong>
            </h2>
            <p className="text-gray-400 mt-2">
              <small>{travel_date}</small>
            </p>
            <h2 className="text-[13px] font-semibold">(DAC)</h2>
            <p className="text-gray-400 text-[13px]">
              {flightFullDetails?.flight_details?.departure?.terminal}
            </p>
            <p className="text-gray-400 text-[13px]">
              {flightFullDetails?.flight_details?.departure?.airport_name}
            </p>
            <p className="text-gray-400 text-[13px]">
              {" "}
              {flightFullDetails?.flight_details?.departure?.airport_address}
            </p>
          </div>

          <div align="center" className="space-y-1 pl-2 pr-2">
            <p className="text-gray-400 text-[14px]">{travel_duration}</p>
            <img
              style={{
                WebkitFilter: "grayscale(100%)",
                filter: "grayscale(100%)",
              }}
              src="https://flightexpert.com/assets/img/non-stop-shape.png"
              alt=""
            />
            <p>
              <small>Non Stop</small>
            </p>
          </div>

          <div>
            <h2 className="mt-2 text-[15px]">
              <strong>{time}</strong>
            </h2>
            <p className="text-gray-400 mt-2">
              <small>{date}</small>
            </p>
            <h2 className="text-[13px] font-semibold">(CGP)</h2>
            <p className="text-gray-400 text-[13px]">{terminal}</p>
            <p className="text-gray-400 text-[13px]">{airport_name}</p>
            <p className="text-gray-400 text-[13px]">{airport_address}</p>
          </div>

          <div>
            <h2 className="mt-2 text-[15px]">
              <strong>Baggage</strong>
            </h2>
            <p className="text-gray-400 mt-1">
              <small>Adult</small>
            </p>
          </div>

          <div>
            <h2 className="mt-2 text-[15px]">
              <strong>Check In</strong>
            </h2>
            <p className="text-gray-400 mt-1">
              <small>{check_in}</small>
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
