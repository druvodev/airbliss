import React from "react";
import {
  AiOutlineArrowRight,
  AiOutlinePhone,
  AiOutlineCalendar,
} from "react-icons/ai";
import { BsDashLg } from "react-icons/bs";
import { IoAirplaneSharp, IoLocationOutline } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import { FaFacebookF } from "react-icons/fa";
import {
  AiOutlineTwitter,
  AiFillLinkedin,
  AiOutlineWhatsApp,
} from "react-icons/ai";

const Footer = () => {
  return (
    <section className="bg-gray-600 relative mt-28 ">
      <img
        className="absolute -mt-[142px] w-[100vw] h-60"
        src="https://i.ibb.co/CnyK8My/wave-5.png"
        alt=""
      />

      {/* Footer Item Design */}
      <section className=" text-white p-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Airblees Text */}
        <div>
          <img
            className="w-24"
            src="https://i.ibb.co/C8G1Npj/airbliss-White.png"
            alt=""
          />

          <p className="mt-1 text-left text-sm mr-4">
            Discover seamless travel with Airbless BD! Our user-friendly website
            offers easy flight bookings, competitive prices, and a hassle-free
            experience. Explore a world of destinations with just a few clicks.
            Your journey begins with Airbless BD - your trusted companion in air
            travel.
          </p>

          <div className="mt-4 flex justify-start items-center gap-2">
            <div className="bg-gray-700 rounded-md border-[1px] h-10 w-10 text-center flex justify-center items-center">
              <p>
                <FaFacebookF />{" "}
              </p>
            </div>

            <div className="bg-gray-700 rounded-md border-[1px] h-10 w-10 text-center flex justify-center items-center">
              <p>
                {" "}
                <AiOutlineTwitter />{" "}
              </p>
            </div>

            <div className="bg-gray-700 rounded-md border-[1px] h-10 w-10 text-center flex justify-center items-center">
              <p>
                {" "}
                <AiFillLinkedin />{" "}
              </p>
            </div>

            <div className="bg-gray-700 rounded-md border-[1px] h-10 w-10 text-center flex justify-center items-center">
              <p>
                {" "}
                <AiOutlineWhatsApp />{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-flow-col gap-4">
          <div className="mt-6 lg:mt-0">
            <h1 className="text-xl font-bold">Quick Links</h1>
            <p>
              <span className="flex items-center  tracking-widest">
                <IoAirplaneSharp />
                <BsDashLg />
                <BsDashLg />
                <BsDashLg />
                <BsDashLg />
                <BsDashLg />
                <BsDashLg />
              </span>
            </p>

            <div>
              <p className="inline-flex items-center gap-1 mt-3">
                <span>
                  <AiOutlineArrowRight size={16} />
                </span>
                <span>About Us</span>
              </p>
            </div>

            <div>
              <p className="inline-flex items-center gap-1 mt-3">
                <span>
                  <AiOutlineArrowRight size={16} />
                </span>
                <span>Blogs</span>
              </p>
            </div>

            <div>
              <p className="inline-flex items-center gap-1 mt-3">
                <span>
                  <AiOutlineArrowRight size={16} />
                </span>
                <span>Destination</span>
              </p>
            </div>

            <div>
              <p className="inline-flex items-center gap-1 mt-3">
                <span>
                  <AiOutlineArrowRight size={16} />
                </span>
                <span>Booking Flight</span>
              </p>
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            <h1 className="text-xl font-bold">Contact Us</h1>
            <p>
              <span className="flex items-center  tracking-widest">
                <IoAirplaneSharp />
                <BsDashLg />
                <BsDashLg />
                <BsDashLg />
                <BsDashLg />
                <BsDashLg />
                <BsDashLg />
              </span>
            </p>

            <div>
              <p className="inline-flex justify-start items-center gap-1 mt-3">
                <span>
                  <IoLocationOutline size={20} />
                </span>
                <span>5807W 63rd Dhaka,Bangladesh</span>
              </p>
            </div>

            <div>
              <p className="inline-flex justify-start items-center gap-1 mt-3">
                <span>
                  <AiOutlinePhone size={20} />
                </span>
                <span>+88 0150000001</span>
              </p>
            </div>

            <div>
              <p className="inline-flex justify-start items-center gap-1 mt-3">
                <span>
                  <CgMail size={20} />
                </span>
                <span>info@airbless.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-0">
          <h1 className="text-xl font-bold">Recent Postes</h1>
          <p>
            <span className="flex items-center  tracking-widest">
              <IoAirplaneSharp />
              <BsDashLg />
              <BsDashLg />
              <BsDashLg />
              <BsDashLg />
              <BsDashLg />
              <BsDashLg />
            </span>
          </p>

          <div className="mt-2 flex justify-start items-center gap-2">
            <img
              className="rounded shadow-md"
              src="https://www.adivaha.com/themeforest-travon/assets/img/blog/recent-post-2-1.jpg"
              alt=""
            />

            <div>
              <h1 className="font-bold ">
                5 Ways To Get Your Dream Photos On Picnic
              </h1>
              <p className="mt-1 inline-flex items-center gap-1">
                <span>
                  <AiOutlineCalendar size={18} />{" "}
                </span>{" "}
                <span>21 June,2023</span>
              </p>
            </div>
          </div>

          <div className="mt-2 flex justify-start items-center gap-2">
            <img
              className="rounded shadow-md"
              src="https://www.adivaha.com/themeforest-travon/assets/img/blog/recent-post-2-2.jpg"
              alt=""
            />

            <div>
              <h1 className="font-bold ">9 Essential Tips For Ture.</h1>
              <p className="mt-1 inline-flex items-center gap-1">
                <span>
                  <AiOutlineCalendar size={18} />{" "}
                </span>{" "}
                <span>18 June,2023</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Partner */}
      <div>
        <h1 className="ml-12 text-white text-xl font-bold mb-2">
          Payment Partner
        </h1>
        <hr className="w-[170px] ml-12" />

        <div className="ml-10 flex lg:flex-row flex-col ">
          <div className="flex justify-start items-center">
            <img
              className="h-16 "
              style={{
                WebkitFilter: "grayscale(100%)",
                filter: "grayscale(100%)",
              }}
              src="https://i.ibb.co/gTF85MF/unnamed-removebg-preview.png"
              alt=""
            />

            <img
              className="h-10 img_bg"
              style={{
                WebkitFilter: "grayscale(100%)",
                filter: "grayscale(100%)",
              }}
              src="https://i.ibb.co/bzNCqnQ/Master-Card-early-1990s-logo-svg-removebg-preview.png"
              alt=""
            />
          </div>

          <div className="flex justify-start items-center">
            <img
              className="h-6 lg:ml-1 img_bg"
              style={{
                WebkitFilter: "grayscale(100%)",
                filter: "grayscale(100%)",
              }}
              src="https://i.ibb.co/J2fnFdy/2560px-Pay-Pal-logo-svg.png"
              alt=""
            />

            <img
              className="h-16 lg:ml-1 img_bg"
              style={{
                WebkitFilter: "grayscale(100%)",
                filter: "grayscale(100%)",
              }}
              src="https://i.ibb.co/BPwnQFQ/Discover-logo-removebg-preview.png"
              alt=""
            />
          </div>

          <div className="flex justify-start items-center">
            <img
              className="h-6 img_bg"
              style={{
                WebkitFilter: "grayscale(100%)",
                filter: "grayscale(100%)",
              }}
              src="https://i.ibb.co/C6Hzwdc/logo-black-59208b9-removebg-preview.png"
              alt=""
            />

            <img
              className="h-16 img_bg"
              style={{
                WebkitFilter: "grayscale(100%)",
                filter: "grayscale(100%)",
              }}
              src="https://i.ibb.co/qMLHdgs/download-2-removebg-preview-1.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <hr className="mt-12" />

      <p className="pb-4 text-white text-center mt-4">
        &copy; 2023 Airbliess Bd Ltd. All rights reserved.
      </p>
    </section>
  );
};

export default Footer;
