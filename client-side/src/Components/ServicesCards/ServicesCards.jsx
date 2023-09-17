import React from "react";

const ServicesCards = ({ services }) => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-5 my-10">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex shadow-lg overflow-hidden rounded-md items-center gap-5 w-full bg-white  py-2 text-gray-500"
        >
          <div className="h-[120px] md:h-[180px] w-1/2">
            <img
              className="h-full  object-cover w-full p-2 image-full"
              src={service?.image}
              alt=""
            />
          </div>
          <div className="w-1/2">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              {service?.title}{" "}
              {service?.service && (
                <span className="capitalize text-sm text-cyan-600">
                  {" "}
                  ({service?.service}){" "}
                </span>
              )}
            </h2>
            <p className="mb-2 pr-2">{service?.caption}</p>
            <button className="ml-auto bg-cyan-700 hover:bg-cyan-600 px-5 rounded-full h-[38px] text-white font-semibold">
              See All
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesCards;
