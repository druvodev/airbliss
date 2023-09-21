import React from "react";
import { useSelector } from "react-redux";
import ServicesCards from "../../Components/ServicesCards/ServicesCards";
import SectionBanner from "../../Components/AboutUsBanner/SectionBanner";
import Accordion from "../../Components/Accordion/Accordion";
import { useState } from "react";

const AboutUs = () => {
  const [open, setOpen] = useState(false);
  const services = useSelector((state) => state.ourServices?.services);
  console.log(services);
  const accordionData = [
    {
      title: "Expertise",
      description:
        "When it comes to travel, knowledge is key. At Airbliss, we've assembled a team of travel experts who are not only passionate about exploring the world but also possess extensive knowledge of the industry. Their expertise ensures that you receive the best advice and recommendations for your trips. Whether it's finding the best time to visit a destination, securing the most convenient flight routes, or uncovering hidden gems at your chosen location, our experts are your ultimate resource for making informed travel decisions.",
    },
    {
      title: "Convenience",
      description:
        "We believe that travel planning should be a pleasure, not a chore. That's why we've invested in creating a user-friendly website and providing dedicated customer support. Our goal is to make planning your entire journey a seamless experience all in one place. From browsing options to booking, managing reservations, and even seeking assistance along the way, Airbliss is your go-to platform for stress-free travel arrangements.",
    },
    {
      title: "Variety",
      description:
        "We understand that every traveler is unique, and that's why we offer a diverse range of services to cater to all travelers. Whether you're a budget-conscious adventurer seeking affordable accommodations, a luxury seeker desiring lavish indulgence, or somewhere in between, our extensive selection of services allows you to tailor your trip precisely to your preferences. With Airbliss, the world is your oyster, and you have the freedom to design your travel experiences just the way you want them.",
    },
    {
      title: "Security",
      description:
        "Your safety and privacy are of utmost importance to us. We've taken comprehensive measures to ensure that your personal information is safeguarded and your transactions are secure. Our booking system adheres to the highest industry standards for security, guaranteeing a worry-free travel experience. When you choose Airbliss, you can focus on the excitement of your journey, knowing that your safety and privacy are in reliable hands.",
    },
    {
      title: "Personalization",
      description:
        "We recognize that your journey is a reflection of who you are. It's as unique as your interests and desires. That's why we put the power of personalization in your hands. Our team works closely with you to create customized itineraries that perfectly match your preferences and interests. Whether you're a history enthusiast, a culinary explorer, a nature lover, or someone with a blend of interests, we're here to ensure that every aspect of your journey aligns with your vision. Your adventure with Airbliss is truly yours to define.",
    },
  ];

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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 px-3 py-20">
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
