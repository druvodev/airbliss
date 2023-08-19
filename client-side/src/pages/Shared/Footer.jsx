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
import { Link } from "react-router-dom";

const Footer = () => {
  const svgStyle = {
    fill: "#414D5E",
  };

  return (
    <div>
      <section className="bg-[#414D5E]  relative mt-28  ">
        <div className="absolute w-full sm:pr-11 md:pr-0   h-auto overflow-hidden -top-[79px] md:-top-[109px]   left-0 md:left-0">
          <svg
            version="1.1"
            width="2000"
            height="131"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 2000 131.2"
            style={{ enableBackground: "new 0 0 2000 131.2" }}
            xmlSpace="preserve"
            className="w-full"
          >
            <style type="text/css">
              {`
            .st0 {
              opacity: 0.25;
              enable-background: new;
            }
            .st1 {
              opacity: 0.35;
              enable-background: new;
            }
          `}
            </style>
            <path
              className="st0"
              d="M-0.5,83.4c59.6,40.5,193.3,35,316.7-12.3C525.6-9.2,756.7-9.6,979.8,12.3s445.6,57.9,669.8,54.1C1821.1,63.5,1932,56,2000,53c0,36,0,76.4,0,76.4H1L-0.5,83.4z"
              style={svgStyle}
            ></path>
            <path
              className="st1"
              d="M309.2,46.1c265.1-57.8,453.7-19.6,687.9,6.8c285.1,32.2,564.2,63,863.4,33.4c94-9.3,119.5-19.6,139.5-19c0,32.2,0,63,0,63H0v-66C0,64.3,152.7,80.2,309.2,46.1z"
              style={svgStyle}
            ></path>
            <path
              className="st1"
              d="M344.5,54.9c82.3-26.3,167.2-46,253-36.5S767,51.6,851.9,67.8c272.3,52,522.5,16.7,819.3,5c90-3.5,293.8-13.6,328.8-12.6c0,24,0,71,0,71H-1v-59C-1,72.3,198.7,101.6,344.5,54.9z"
              style={svgStyle}
            ></path>
            <path
              d="M1731.8,97.1c-289.3,18.5-590.4,17.2-873.9-16.8C746,66.9,641.1,42.1,528.5,39.5s-249.3,31-353.7,69.9c-57.5,21.4-164.7,2.3-175.7-4.7c0,8,0,26.5,0,26.5h2003v-58C2002,73.3,1854.2,89.2,1731.8,97.1z"
              style={svgStyle}
            ></path>
          </svg>
        </div>

        <div className="px-5  sm:px-10 max-w-7xl mx-auto h-auto overflow-hidden">
          <div>
            {/* Footer Item Design */}
            <section className="  text-white p-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Airblees Text */}
              <div>
                <img
                  className="w-24"
                  src="https://i.ibb.co/C8G1Npj/airbliss-White.png"
                  alt=""
                />

                <p className="mt-1 text-left text-sm mr-4">
                  Discover seamless travel with Airbless BD! Our user-friendly
                  website offers easy flight bookings, competitive prices, and a
                  hassle-free experience. Explore a world of destinations with
                  just a few clicks. Your journey begins with Airbless BD - your
                  trusted companion in air travel.
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
                  <div>
                    <p className="inline-flex items-center gap-1 mt-3">
                      <span>
                        <AiOutlineArrowRight size={16} />
                      </span>
                      <Link to="/terms">Terms & Conditions</Link>
                    </p>
                  </div>
                  <div>
                    <p className="inline-flex items-center gap-1 mt-3">
                      <span>
                        <AiOutlineArrowRight size={16} />
                      </span>
                      <Link to="/refund">Refund Policy</Link>
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
          </div>
        </div>

        <div className="mt-12 lg:mt-0">
          <hr className="mt-12 text-white" />
          <p className="pb-4 text-center text-white  mt-4">
            &copy; 2023 Airbliess Bd Ltd. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
