import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import ServicesCards from "../../../Components/ServicesCards/ServicesCards";
import { useSelector } from "react-redux";

const OurServices = () => {
  const [viewAll, setViewAll] = useState(false);
  const allServices = useSelector((state) => state.ourServices?.services);

  const handleViewAll = () => {
    setViewAll(true);
  };

  const services = viewAll ? allServices : allServices.slice(0, 4);

  return (
    <section id="our-services">
      <SectionTitle sectionTitle="Our Services" />
      <div className="grid grid-cols-2 text-gray-500">
        <p>
          Explore seamless travel with our flight, hotel, car, and cruise
          booking services. Effortlessly tailor your journey for a memorable,
          personalized experience. Your dream adventure starts here..
        </p>
        <button
          onClick={handleViewAll}
          className={`ml-auto bg-cyan-700 hover:bg-cyan-600  px-5 rounded-full h-[45px] text-white font-semibold ${
            viewAll && "hidden"
          }`}
        >
          View All
        </button>
      </div>
      <ServicesCards services={services} />
    </section>
  );
};

export default OurServices;
