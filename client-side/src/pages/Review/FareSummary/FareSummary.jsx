import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import CountdownTimer from "../../../Components/CountdownTimer/CountdownTimer";
import { useSelector } from "react-redux";

const FareSummary = React.memo(() => {
  const [isCollapse, setIsCollapse] = useState(true);
  const flightInfo = useSelector((state) => state.userBookingInfo.flightInfo);
  const { airlineLogo, airlineName, fareSummary } = flightInfo;
  console.log("fareSummary", flightInfo);
  return (
    <div className="">
      <div className="shadow-lg rounded-xl overflow-hidden">
        <div className="px-5">
          <div className="flex items-center gap-1 mb-2">
            <img className="h-12 w-12" src={airlineLogo} alt=" " />{" "}
            <h5 className="font-semibold text-gray-600">{airlineName}</h5>
          </div>
          <hr />
          <div className="text-end -mt-3">
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
            <h5 className="font-semibold text-gray-600">Fare Summary</h5>
            <p className="mt-2">{"Adult (1 Traveler)"}</p>
            <div className="flex justify-between mt-1">
              <p className="text-gray-500 text-sm">Base Fare</p>
              <div className="text-end">
                <p>
                  BDT{" "}
                  <span className="font-semibold">{fareSummary?.baseFare}</span>
                </p>
                <p className="text-xs text-gray-500">{`( 1 x ${fareSummary?.baseFare} )`}</p>
              </div>
            </div>
            <div className="flex justify-between mt-1 mb-2">
              <p className="text-gray-500 text-sm">Taxes + Fees</p>
              <div className="text-end">
                <p>
                  BDT{" "}
                  <span className="font-semibold">
                    {fareSummary?.taxesAndFees}
                  </span>
                </p>
                <p className="text-xs text-gray-500">{`( 1 x ${fareSummary?.taxesAndFees} )`}</p>
              </div>
            </div>
            <hr />
            <div className="flex justify-between mt-2">
              <p className="text-gray-500 text-sm">Sub Total</p>
              <p>
                BDT <span className="font-semibold">{fareSummary?.total}</span>
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
            <p className="font-semibold">BDT {fareSummary?.total}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 shadow-lg rounded-xl">
        <CountdownTimer />
      </div>
    </div>
  );
});

export default FareSummary;
