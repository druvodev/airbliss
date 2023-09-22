import React from "react";
import { useSelector } from "react-redux";
import ServicesCards from "../../Components/ServicesCards/ServicesCards";
import SectionBanner from "../../Components/AboutUsBanner/SectionBanner";
import Accordion from "../../Components/Accordion/Accordion";
import { useState } from "react";

const AboutUs = () => {
  const [open, setOpen] = useState(false);
  const services = useSelector((state) => state.ourServices?.services);
  const accordionData = useSelector(
    (state) => state.ourServices?.accordionData
  );

  const toggle = (index) => {
    if (open === index) {
      return setOpen(false);
    }
    setOpen(index);
  };

  return (
    <div>
      <SectionBanner
        subtitle="About Airbliss"
        title="Your Gateway to Seamless Travel Experiences"
        bgImage="url('https://i.ibb.co/v4PLr16/flight-hero.jpg')"
      />
      <div className="md:p-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 px-3 md:px-10 py-20 bg-white dark:bg-slate-800">
          <div className="">
            <h3 className="text-xl font-semibold">About Airbliss</h3>
            <p className="text-base text-justify">
              At Airbliss, we are passionate about making your travel dreams a
              reality. We understand that travel is more than just a journey;
              it's an experience that enriches your life with memories, new
              perspectives, and unforgettable moments. That's why we've
              dedicated ourselves to providing you with a one-stop platform for
              all your travel needs.
            </p>
            <h3 className="text-xl font-semibold mt-5">Our Story</h3>
            <p className="text-base text-justify">
              Founded by a team of avid travelers, Airbliss was born out of a
              passion for exploration and a desire to make travel planning as
              effortless as possible. We understand that every traveler is
              unique, with distinct preferences and needs, and that's why we
              offer a wide range of travel services to cater to your individual
              requirements.
            </p>
          </div>
          <div>
            <div className="relative h-[250px]">
              <img
                className="absolute w-10/12 lg:w-8/12 top-20 rounded-lg  md:left-5 z-10"
                src="https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/02/01135456/Untitled-design.jpg?tr=w-1200,h-900"
                alt=""
              />
              <img
                className="absolute w-10/12 lg:w-8/12 top-2 left-14 lg:left-52 md:left-20 rounded-lg"
                src="https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/QLCTMIGQOBEFVKG27DONZ3KKNI.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-3  py-10">
          <h3 className="text-xl md:text-4xl font-semibold">We are Offering</h3>
          <ServicesCards services={services} />
        </div>
        <div className="max-w-7xl mx-auto px-3">
          <h3 className="text-xl md:text-4xl font-semibold mb-10">
            Why Choose Airbliss?
          </h3>

          {accordionData.map((data, index) => (
            <Accordion
              key={index}
              open={index === open}
              title={data?.title}
              description={data?.description}
              toggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
