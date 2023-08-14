import React, { useState } from "react";

const BookFlight = () => {
  const [activeCard, setActiveCard] = useState(true);

  const cardStatus = () => {
    setActiveCard(!activeCard);
  };

  return (
    <section className="mb-16">
      {/* Filter Card */}
      <section className="shadow-lg flex items-center p-4 gap-4">
        <div
          onClick={() => cardStatus()}
          className={`${
            activeCard ? "bg-gray-100" : "bg-white"
          } rounded-md pt-2 pb-3 pl-3 w-1/2`}
        >
          <h1>
            <b>Cheapest</b>
          </h1>
          <p>
            <small>To get the cheapest available flights</small>
          </p>
        </div>
        <div className="bg-gray-500 rounded-lg h-12 w-[1.5px]"></div>

        <div
          onClick={() => cardStatus()}
          className={`${
            !activeCard ? "bg-gray-100" : "bg-white"
          } rounded-md pt-2 pb-3 pl-3 w-1/2`}
        >
          <h1>
            <b>Shortest</b>
          </h1>
          <p>
            <small>To get the shortest available flights</small>
          </p>
        </div>
      </section>

      {/* Flight Details Card  Container*/}
      <section className=" mt-6">
        {/* Card Design */}
        <section className="shadow-lg rounded-md pl-6 pr-6 pt-8 pb-8">
          <div className=" grid grid-cols-3 lg:grid-cols-6 items-center gap-5 ">
            <div>
              <img
                className="h-12 w-12"
                src="https://airlineimages.s3.ap-southeast-1.amazonaws.com/128/BG.png"
                alt=""
              />
              <div>
                <p className="text-gray-400">
                  <small>Biman Bangladesh Airlines</small>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-gray-400 text-[13px]">Depart</h4>
              <h2 className="mt-2 text-[15px]">
                <strong>7:45</strong>
              </h2>
              <p className="-mt-1 pr-2">
                <small>Tue, 15 Aug 2023</small>
              </p>
              <h3 className="mt-2 text-[13px]">Dhaka</h3>
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
              <h4 className="text-gray-400 text-[13px]">Arrive</h4>
              <h2 className="mt-2 text-[15px]">
                <strong>18:05</strong>
              </h2>
              <p className="-mt-1 pr-2">
                <small>Tue, 15 Aug 2023</small>
              </p>
              <h3 className="mt-2 text-[13px]">Chittagong</h3>
            </div>

            <div>
              <h4 className="text-gray-400 text-[13px]">Prise</h4>
              <h2 className="mt-2 text-[15px]">
                <strong>BDT 2,901</strong>
              </h2>
            </div>

            <div>
              <button className="p-3 bg-cyan-600 hover:bg-white hover:border-2 hover:border-cyan-600 hover:text-cyan-600 text-white rounded-md">
                Book Now
              </button>
            </div>
          </div>

          {/* View Details Section */}
          <div className="flex justify-between items-center mt-8">
            <p>
              <small>Partially Refundable</small>
            </p>
            <p>
              <small>View Flight Details</small>
            </p>
          </div>
        </section>
      </section>
    </section>
  );
};

export default BookFlight;
