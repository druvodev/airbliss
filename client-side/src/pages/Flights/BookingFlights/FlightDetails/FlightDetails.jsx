import React from "react";

const FlightDetails = () => {
  return (
    <section className="mt-3 border-[1px] rounded-sm">
      <h1 className=" p-3 border-b-[1px]">
        <b>Dhaka to Chittagong, 15 Aug 2023</b>
      </h1>

      {/* Details Body */}
      <section className="p-3">
        {/* Flight Profile */}
        <div className="flex gap-4 ml-3">
          <img
            className="h-12 w-12"
            src="https://airlineimages.s3.ap-southeast-1.amazonaws.com/128/BG.png"
            alt=""
          />
          <div>
            <h1>
              <b>Biman Bangladesh Airlines</b>
            </h1>
            <h3 className="font-semibold text-[13px]">
              Aircraft : DHC8 Dash 8
            </h3>
            <h4 className="font-semibold text-[12px]">Operated by : BG</h4>
            <h4 className="font-semibold text-[12px]">Economy (G)</h4>
            <h4 className="font-semibold text-[12px]">Available seats: 8</h4>
          </div>
          zz
        </div>

        {/* flight other details */}
        <section className="grid grid-cols-3 ml-4 lg:grid-cols-6 mt-4 gap-6 lg:mb-1 mb-8">
          <div>
            <h2 className="mt-2 text-[15px]">
              <strong>7:45</strong>
            </h2>
            <p className="text-gray-400 mt-2">
              <small>Tue, 15 Aug 2023</small>
            </p>
            <h2 className="text-[13px] font-semibold">(DAC)</h2>
            <p className="text-gray-400 text-[13px]">Terminal D</p>
            <p className="text-gray-400 text-[13px]">
              Hazrat Shahjalal International Airport
            </p>
            <p className="text-gray-400 text-[13px]">Dhaka, Bangladesh</p>
          </div>

          <div align="center" className="space-y-1 pl-2 pr-2">
            <p className="text-gray-400 text-[14px]">45 minutes</p>
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
              <strong>08:45</strong>
            </h2>
            <p className="text-gray-400 mt-2">
              <small>Tue, 15 Aug 2023</small>
            </p>
            <h2 className="text-[13px] font-semibold">(CGP)</h2>
            <p className="text-gray-400 text-[13px]">Terminal D</p>
            <p className="text-gray-400 text-[13px]">Patenga</p>
            <p className="text-gray-400 text-[13px]">Chittagong, Bangladesh</p>
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
              <small>A20 Kg(s)</small>
            </p>
          </div>

          <div>
            <h2 className="mt-2 text-[15px]">
              <strong>Cabin</strong>
            </h2>
            <p className="text-gray-400 mt-1">
              <small>7 Kg(s)</small>
            </p>
          </div>
        </section>
      </section>
    </section>
  );
};

export default FlightDetails;
