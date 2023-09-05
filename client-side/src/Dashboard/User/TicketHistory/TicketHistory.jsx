import React from "react";
import logo from "../../../assets/icon/airblissBlack.png";

const TicketHistory = () => {
  return (
    <section className="p-4">
      {/* Top Logo  */}
      <div className=" p-4 shadow-md border  bg-white rounded-sm">
        <img className="w-24 mb-2" src={logo} alt="" />
        <h1 className="text-center -mt-11 mb-2 font-semibold text-xl">
          Purchase History
        </h1>
      </div>

      {/* Purches Body */}
      <section className="p-4 shadow-md border  bg-white rounded-sm mt-4">
        {/* Traveller Info Conntainer */}
        <div className="flex justify-between lg:flex-row flex-col-reverse lg:items-center">
          <div className="mt-4 lg:mt-0">
            <h1 className="font-semibold">Traveller Information</h1>
            <p className="h-[1px] rounded-full w-[153px] bg-black"></p>
          </div>

          <div className="p-3 bg-cyan-500 rounded-sm">
            <h4 className="text-white font-semibold">
              Booking Refference: ZS680ODPSE4
            </h4>
          </div>
        </div>

        {/* Traveller Details */}
        <div className="flex justify-start items-start gap-4 mt-6 lg:mt-3">
          <div>
            <p className="mb-3 font-semibold">Name: </p>
            <p className="mb-3 font-semibold">Email: </p>
            <p className="mb-3 font-semibold">Seat No: </p>
            <p className="mb-3 font-semibold">Phone No: </p>
            <p className="mb-3 font-semibold">Passport No: </p>
          </div>
          <div className="ml-9 md:ml-0">
            <p className="mb-3">Jishan</p>
            <p className="mb-3">imranislamjishan200@gmail.com</p>
            <p className="mb-3">08</p>
            <p className="mb-3">01575390042</p>
            <p className="mb-3">IOFJWEOIFJMV086DWEF</p>
          </div>
        </div>

        {/* Flight Info Container */}
        <div>
          <h1 className="font-semibold mt-6">Flight Information</h1>
          <p className="h-[0.5px] rounded-full w-[133px] bg-black"></p>
        </div>
        <div className="border-2 mt-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5  rounded-lg mt-3">
            <div className="flex justify-start items-start gap-4 mt-6 lg:mt-3">
              <div>
                <div className="mb-3">
                  <h1 className="font-semibold ">Airline</h1>
                  <p className="h-[0.5px] rounded-full w-[50px] bg-black"></p>
                </div>
                <p className="font-semibold text-sm">Name: </p>
                <p className="font-semibold text-sm">Aircraft: </p>
                <p className="font-semibold text-sm">Flight No: </p>
              </div>
              <div className="ml-9 md:ml-0 ">
                <p className="mb-4 text-sm text-white">airline</p>
                <p className="text-sm">Biman Bangladesh</p>
                <p className="text-sm">boing707</p>
                <p className=" text-sm">AJ474 || BG</p>
              </div>
            </div>

            <div className="flex justify-start items-start gap-4 mt-6 lg:mt-3">
              <div>
                <div className="mb-3">
                  <h1 className="font-semibold ">Depature</h1>
                  <p className="h-[0.5px] rounded-full w-[70px] bg-black"></p>
                </div>
                <p className="font-semibold text-sm">Time: </p>
                <p className="font-semibold text-sm">City: </p>
                <p className="font-semibold text-sm">Aitport: </p>
                <p className="font-semibold text-sm">Date: </p>
              </div>
              <div className="ml-9 md:ml-0 ">
                <p className="mb-4 text-sm text-white">airline</p>
                <p className="text-sm">Biman Bangladesh</p>
                <p className="text-sm">boing707</p>
                <p className=" text-sm">AJ474 || BG</p>
                <p className=" text-sm">24 Jul 2023</p>
              </div>
            </div>

            <div className="flex justify-start items-start gap-4 mt-6 lg:mt-3">
              <div>
                <div className="mb-3">
                  <h1 className="font-semibold ">Arrive</h1>
                  <p className="h-[0.5px] rounded-full w-[46px] bg-black"></p>
                </div>
                <p className="font-semibold text-sm">Time: </p>
                <p className="font-semibold text-sm">City: </p>
                <p className="font-semibold text-sm">Aitport: </p>
                <p className="font-semibold text-sm">Date: </p>
              </div>
              <div className="ml-9 md:ml-0 ">
                <p className="mb-4 text-sm text-white">airline</p>
                <p className="text-sm">Biman Bangladesh</p>
                <p className="text-sm">boing707</p>
                <p className=" text-sm">AJ474 || BG</p>
                <p className=" text-sm">24 Jul 2023</p>
              </div>
            </div>

            <div className="flex justify-start items-start gap-4 mt-6 lg:mt-3">
              <div>
                <div className="mb-3">
                  <h1 className="font-semibold ">Payments</h1>
                  <p className="h-[0.5px] rounded-full w-[73px] bg-black"></p>
                </div>
                <p className="font-semibold text-sm">Prise: </p>
                <p className="font-semibold text-sm">Tax: </p>
                <p className="font-semibold text-sm">Status: </p>
                <p className="font-semibold text-sm">Trenjection Id: </p>
              </div>
              <div className="ml-9 md:ml-0 ">
                <p className="mb-4 text-sm text-white">airline</p>
                <p className="text-sm">2500 BDT</p>
                <p className="text-sm">55 BDT</p>
                <p className=" text-sm">Paid</p>
                <p className=" text-sm">CODJSFE80</p>
              </div>
            </div>
          </div>

          {/* Ticket Download */}
          <div className="mt-6 mb-6">
            <div className="flex justify-center">
              <img src={logo} alt="" />
            </div>
            <div className="text-center">
              <button className="btn bg-cyan-500 mt-4 text-white">
                Download Ticket
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TicketHistory;
