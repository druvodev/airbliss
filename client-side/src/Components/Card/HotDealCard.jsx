import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState } from "react";

const HotDealCard = ({ deal }) => {
  const { img, offer, destination, id } = deal;
  const [isHovered, setIsHovered] = useState(false);

  const animation = {
    x: 0,
    y: 0,
    scale: isHovered ? 1.1 : 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md flex rounded-ss-3xl overflow-hidden"
    >
      <motion.img
        src={img}
        alt=""
        className="rounded-ss-3xl rounded-bl-md object-cover sm:object-cover w-1/2 "
        animate={animation}
      />

      <div className="sm:pr-1 px-2 pb-2 sm:p-4 md:p-2 bg-cyan-100 md:pr-2 sm:pl-[18px] pt-3 sm:pt-6 space-y-2 md:space-y-4 lg:pr-2 lg:space-y-2 xl:pr-6 xl:space-y-3 lg:pl-3 xl:pl-[18px] h-full z-10 text-gray-500 dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500">
        <h5 className="sm:text-lg dark:text-gray-400 text-slate-700 font-semibold ">
          {destination}
        </h5>
        <p className="text-sm sm:text-base leading-4 dark:text-gray-400 sm:leading-5 text-[#322F63]">
          {offer}
        </p>
        <Link
          to={`/hotDeals/${id}`}
          className="text-sm flex items-center gap-x-1 text-sky-500 font-medium mt-auto hover:underline hover:underline-offset-2"
        >
          Explore More <BsArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default HotDealCard;
