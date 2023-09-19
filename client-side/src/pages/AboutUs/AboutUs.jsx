import React from "react";
import Hero from "../../Components/Hero/Hero";
import "./AboutUs.css";
import { useSelector } from "react-redux";
import ServicesCards from "../../Components/ServicesCards/ServicesCards";

const AboutUs = () => {
  const services = useSelector((state) => state.ourServices?.services);
  return (
    <div>
      <Hero />
      <div className="p-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 px-10 py-20 bg-white">
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
            <div className="right max-w-[700px]">
              <div className="img-container">
                <div className="img-stack top">
                  <img
                    src="https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/02/01135456/Untitled-design.jpg?tr=w-1200,h-900"
                    alt="About img"
                    className="about-img rounded-lg"
                  />
                </div>
                <div className="img-stack bottom">
                  <img
                    src="https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/QLCTMIGQOBEFVKG27DONZ3KKNI.jpg"
                    alt="About img"
                    className="about-img rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-10 py-10">
          <h3 className="text-xl md:text-4xl font-semibold">We are Offering</h3>
          <ServicesCards services={services} />
        </div>
        <div className="join join-vertical w-full max-w-7xl mx-auto px-14 ">
          <h3 className="text-xl md:text-4xl font-semibold mb-10">
            Why Choose Airbliss?
          </h3>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">Expertise:</div>
            <div className="collapse-content">
              <p>
                Our team of travel experts has extensive knowledge of the
                industry, ensuring that you receive the best advice and
                recommendations for your trips.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300 ">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              Convenience:
            </div>
            <div className="collapse-content">
              <p>
                We believe that travel planning should be stress-free. With our
                user-friendly website and dedicated customer support, we make it
                easy for you to plan your entire journey in one place.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">Variety:</div>
            <div className="collapse-content">
              <p>
                From budget to luxury, we offer a wide range of options to cater
                to all travelers. Our diverse selection of services allows you
                to tailor your trip to your specific desires.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">Security:</div>
            <div className="collapse-content">
              <p>
                We prioritize your safety and privacy. Our secure booking system
                and payment processes guarantee a worry-free travel experience.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              Personalization:
            </div>
            <div className="collapse-content">
              <p>
                Your journey is as unique as you are. We work closely with you
                to create customized itineraries that match your preferences and
                interests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
