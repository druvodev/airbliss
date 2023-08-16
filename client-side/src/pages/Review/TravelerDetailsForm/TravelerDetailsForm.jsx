import React, { useState } from "react";
import CountdownTimer from "../../../Components/CountdownTimer/CountdownTimer";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

const TravelerDetailsForm = () => {
  const [isCollapse, setIsCollapse] = useState(true);

  return (
    <div className="">
      <div className="shadow-md rounded-xl overflow-hidden">
        <div className="px-5">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-2xl font-semibold">Traveler 1</h2>
            <span className="px-2 py-1 border bg-[#e4dede] rounded text-sm ">
              Adult
            </span>
            <span className="font-semibold text-gray-600">Primary Contact</span>

            {/* <level>Select Title</level>
            <div className="flex gap-2">
              <input
                className="join-item btn"
                type="radio"
                name="options"
                aria-label="Mr."
              />
              <input
                className="join-item btn"
                type="radio"
                name="options"
                aria-label="Mrs."
              />
              <input
                className="join-item btn"
                type="radio"
                name="options"
                aria-label="Ms"
              />
            </div>
            <h5 className="font-semibold text-gray-600">
              Biman Bangladesh Airlines
            </h5> */}
          </div>
          <hr />
          <div className="text-end -mt-10">
            <button onClick={() => setIsCollapse(!isCollapse)}>
              {isCollapse ? (
                <MdKeyboardArrowUp className="text-2xl rounded-full bg-gray-300" />
              ) : (
                <MdKeyboardArrowDown className="text-2xl rounded-full bg-gray-300" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`duration-500 ${
            isCollapse ? "max-h-[289px]" : "max-h-0"
          } transition-all ease-linear overflow-hidden`}
        >
          <div className="p-5">
            <h2 className="font-semibold text-2xl">Personal Details (Adult)</h2>
            <div className="flex items-center text-gray-400 gap-1 text-sm mt-2">
              <span>
                <FaInfoCircle />
              </span>
              <span>
                as mentioned on your passport or government approved IDs
              </span>
            </div>
            <p className="mt-2">{"Adult (1 Traveler)"}</p>
            <div className="flex justify-between mt-1">
              <p className="text-gray-500 text-sm">Base Fare</p>
              <div className="text-end">
                <p>
                  BDT <span className="font-semibold">1,967</span>
                </p>
                <p className="text-xs text-gray-500">{"( 1 x 1,967 )"}</p>
              </div>
            </div>
            <div className="flex justify-between mt-1 mb-2">
              <p className="text-gray-500 text-sm">Taxes + Fees</p>
              <div className="text-end">
                <p>
                  BDT <span className="font-semibold">934</span>
                </p>
                <p className="text-xs text-gray-500">{"( 1 x 934 )"}</p>
              </div>
            </div>
            <hr />
            <div className="flex justify-between mt-2">
              <p className="text-gray-500 text-sm">Sub Total</p>
              <p>
                BDT <span className="font-semibold">1,967</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between p-5 bg-cyan-100">
            <p>
              <span className="font-semibold">You Pay</span>{" "}
              <span className="text-sm text-gray-500">
                {"(for 1 traveler)"}
              </span>
            </p>
            <p className="font-semibold">BDT 2,901</p>
          </div>
        </div>
      </div>
      <div className="mt-5 shadow-md rounded-xl">
        <CountdownTimer />
      </div>
    </div>
  );
};

export default TravelerDetailsForm;
