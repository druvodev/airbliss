import React from "react";

const FareRuls = ({ flightFullDetails }) => {
  const { city } = flightFullDetails?.departure || {};
  const arrive = flightFullDetails?.arrival || {};

  return (
    <section className="mt-3 border-[1px] rounded-sm">
      <div className=" p-2 border-b-[1px] bg-gray-100 flex gap-3 items-center">
        <img
          className="h-6 w-6 rounded-full"
          src={flightFullDetails?.airlineLogo}
          alt=""
        />
        <h1 className="font-semibold">
          {city} to {arrive?.city}
        </h1>
      </div>

      {/* Table Body */}
      <section className="p-3">
        <div>
          <h4 className="text-[13px] font-bold">Some ruls and regulations:</h4>

          <div className="mt-2">
            {flightFullDetails.notes.map((note, index) => (
              <p className="text-[14px]" key={index}>
                {note}
              </p>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default FareRuls;
