import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ServicesCards from "../../Components/ServicesCards/ServicesCards";
import SectionTitle from "../../Components/SectionTitle";
import SectionBanner from "../../Components/AboutUsBanner/SectionBanner";

const ServicesDetails = () => {
  const { id } = useParams();
  const allServices = useSelector((state) => state.ourServices?.services);
  const service = allServices.find((service) => service._id === id);
  const services = allServices.filter((services) => services._id !== id);
  console.log(service);

  return (
    <div className="">
      <SectionBanner subtitle={service?.title} title={service?.subTitle} />

      <div className="p-5 mx-auto z-10 sm:px-10 max-w-7xl h-auto overflow-hidden shadow-lg bg-white rounded-xl relative dark:bg-slate-800 dark:backdrop-blur-md dark:shadow-md dark:shadow-white/10 dark:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <img src={service?.image} alt="" className="rounded-md" />
          <div className="flex flex-col justify-between items-stretch">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold"></h2>
              <p className="text-lg"></p>
              <p className="font-semibold text-lg">
                <span className="font-bold">Service Title:</span>
                <span className="ml-2">
                  {service?.title}{" "}
                  {service?.service && (
                    <span className="capitalize text-sm text-cyan-600">
                      {" "}
                      ({service?.service}){" "}
                    </span>
                  )}
                </span>
              </p>
              <p className="font-semibold text-lg text-justify">
                <span className="font-bold">Service Details:</span>
                <span className="ml-2 text-base font-normal w-full">
                  {service?.details}
                </span>
              </p>
            </div>

            {service?.service === "upcoming" ? (
              <Link to="/" className="text-end">
                <button className="ml-auto bg-cyan-700 hover:bg-cyan-600  px-5 rounded-full h-[45px] text-white font-semibold">
                  Go Home
                </button>
              </Link>
            ) : (
              <Link to="/" className="text-end">
                <button className="ml-auto bg-cyan-700 hover:bg-cyan-600  px-5 rounded-full h-[45px] text-white font-semibold">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pb-14">
        <SectionTitle sectionTitle={"Other Services"} />
        <ServicesCards services={services} />
      </div>
    </div>
  );
};

export default ServicesDetails;
