import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import DiscountedHotelCard from "../../../Components/Card/DiscountedHotelCard";
import { GrAnnounce } from "react-icons/gr";
import { FaCalendarAlt, FaHandshake } from "react-icons/fa";
import { Link } from "react-router-dom";
import Accordion from "../../../Components/Accordion/Accordion";

const HotDealDetails = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState([]);
  const [discountedHotels, setDiscountedHotels] = useState([]);
  const [open, setOpen] = useState(false);
  const faqData = [
    {
      title: "What is the offer?",
      description:
        "Up to 15% discount on domestic flight bookings for EBL Visa debit & credit cards.",
    },
    {
      title: "How long is this offer valid?",
      description: "The offer is valid till 10 Oct 2023.",
    },
    {
      title: "What is the travel period of this offer?",
      description:
        "There is no specific travel period. Customers can purchase air tickets, book hotels and book bus tickets during the offer period for any available travel date.",
    },
    {
      title: "Who is eligible to avail these discounts?",
      description:
        "All EBL Visa debit and credit card holders are eligible to avail the offer.",
    },
    {
      title: "For which routes are these discounts available?",
      description:
        "Applicable for both one way and round way domestic flight bookings.",
    },
  ];

  useEffect(() => {
    fetch("/hotDeals.json")
      .then((res) => res.json())
      .then((data) => {
        const hotDeal = data.filter((d) => d.id === parseInt(id));
        setDeal(hotDeal);
      });
  }, []);
  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => {
        setDiscountedHotels(data);
      });
  }, []);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(false);
    }
    setOpen(index);
  };

  return (
    <div>
      <div className="bg-[url('https://i.ibb.co/5x8y5VT/offer-bg-1-1.png')] h-56 bg-cover bg-no-repeat  object-cover relative">
       <span className="bg-[#0000005d] absolute top-0 left-0 w-full h-full "></span>
      </div>

      {/* <img className="w-full object-cover h-52" src={detailsBanner} alt="" /> */}
      <div className="pb-8 md:pb-16 pt-12 px-2 sm:px-10 max-w-7xl mx-auto h-auto overflow-hidden">
        <div className="lg:w-10/12 mx-auto">
          {deal.map((d) => (
            <div key={d?.id} className="">
              <div className="mb-10 flex sm:gap-x-5 items-center justify-center whitespace-nowrap">
                <h2 className="text-2xl traveler information md:text-5xl font-bold text-cyan-600">
                  AirBLiss <span>|</span>{" "}
                </h2>
                <img
                  src={d?.offered_by}
                  alt=""
                  className="w-7/12 sm:w-6/12 md:w-1/2 lg:w-1/2 h-12 sm:h-16 md:h-full  rounded-lg"
                />
              </div>
              {/* Offer  */}
              <div className="mb-10">
                <div>
                  <h3 className="text-cyan-600 text-3xl font-semibold text-center mb-20">
                    What is the offer
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-12 text-center ">
                  <div className="bg-[#F8F9FA] dark:bg-slate-800 pt-20 pb-8 px-6 relative w-[300px] mx-auto sm:w-full ">
                    <div className="p-8 rounded-full absolute shadow-xl left-1/3 -top-10 bg-white ">
                      <GrAnnounce className="text-3xl dark:text-black"></GrAnnounce>
                    </div>

                    <h4 className="text-cyan-600 text-lg font-semibold ">
                      Offer
                    </h4>
                    <p className="text-sm">{d?.applicable}</p>
                  </div>
                  <div className="bg-[#F8F9FA] dark:bg-slate-800  pt-20 pb-8 px-6 relative w-[300px] mx-auto sm:w-full  ">
                    <div className="p-8 rounded-full absolute shadow-xl left-1/3 -top-10 bg-white">
                      <FaHandshake className="text-3xl dark:text-black"></FaHandshake>
                    </div>
                    <h4 className="text-cyan-600 text-lg font-semibold ">
                      Partner
                    </h4>
                    <p className="text-sm">{d?.sponsor}</p>
                  </div>
                  <div className="bg-[#F8F9FA] dark:bg-slate-800  pt-20 pb-8 px-6 relative w-[300px] mx-auto sm:w-full ">
                    <div className="p-8 rounded-full absolute shadow-xl left-1/3 -top-10 bg-white">
                      <FaCalendarAlt className="text-3xl dark:text-black"></FaCalendarAlt>
                    </div>
                    <h4 className="text-cyan-600 text-lg font-semibold">
                      Validity
                    </h4>
                    <p className="text-sm">{d?.validity}</p>
                  </div>
                </div>
              </div>

              {/* Get Offer  */}

              <div className="py-10 md:pt-20  bg-[#F8F9FA] dark:bg-slate-800  ">
                <h3 className="text-cyan-600 text-3xl font-semibold text-center mb-12">
                  How to avail the offer
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5 justify-between px-10">
                  <div>
                    <h4 className="text-lg font-semibold text-cyan-600 mb-4">
                      Search
                    </h4>
                    <ul className="list-disc space-y-1">
                      <li>
                        Select destination, journey date & number of travelers
                        on flight tab
                      </li>
                      <li>Click ‘Search’</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-cyan-600 mb-4">
                      Select
                    </h4>
                    <ul className="list-disc space-y-1">
                      <li>Select preferred flight</li>
                      <li>Click ‘Select’</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-cyan-600 mb-4">
                      Book
                    </h4>
                    <ul className="list-disc space-y-1">
                      <li>Log in to your profile</li>
                      <li>Provide traveler details</li>
                      <li>Click 'Confirm'</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-cyan-600 mb-4">
                      Payment
                    </h4>
                    <ul className="list-disc space-y-1">
                      <li>
                        Provide BIN number of your card (First 6 digits your
                        card)
                      </li>
                      <li>
                        Check discount details and click "Proceed to Payment"
                      </li>
                      <li>Complete payment and get instant confirmation</li>
                    </ul>
                  </div>
                </div>

              </div>

              {/* Terms & Conditions  */}

              <div className="mt-10 md:mt-20">
                <h2 className="text-cyan-600 text-3xl font-semibold mb-6">
                  Terms & Condition
                </h2>
                <div className="pl-6">
                  {d.terms.map((term, index) => (
                    <ul key={index} className="list-disc space-y-3 text-sm">
                      <li>{term}</li>{" "}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* FAQ Part  */}
          <div className="mt-6 sm:mt-10">
            <h2 className="text-cyan-600 text-3xl font-semibold mb-6">FAQ</h2>
            {/* FAQ Accordion */}
            {faqData.map((data, index) => (
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

        <div className="mt-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 md:gap-x-4 lg:gap-x-4 gap-6">
            {discountedHotels.map((hotel, index) => (
              <DiscountedHotelCard
                key={index}
                hotel={hotel}
              ></DiscountedHotelCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotDealDetails;
