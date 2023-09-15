import React, { useEffect, useState } from "react";
import logo from "../../../assets/icon/airblissBlack.png";
import { useLocation, useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { formatDate } from "../../../utils/formatDate";
import ETicket from "../../../Components/Ticket/ETicket";
import { useSelector, useDispatch } from "react-redux";
import { setBookingData } from "../../../redux/features/ticketHistorySlice";

const TicketHistory = () => {
  const { bookingReference } = useParams();
  const { user } = useAuth();

  const booking = useSelector((state) => state.booking.bookingData);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:5000/userBooking/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        const singleData = data?.find(
          (singleFlight) => singleFlight?.bookingReference === bookingReference
        );

        // Dispatch the action to set the booking data
        dispatch(setBookingData(singleData));
      });
  }, [bookingReference, user, dispatch]);

  const {
    title,
    first_name,
    last_name,
    traveler_email,
    phone_number,
    seatNo,
    passport_number,
  } = booking?.user || {};

  const {
    flightNumber,
    airline,
    aircraft,
    departureAirport,
    departureCity,
    arrivalAirport,
    arrivalCity,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    fareSummary,
  } = booking?.flight || {};

  return (
    <section className="md:p-4">
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
              Booking Refference: {bookingReference}
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
          <div className="ml-0 md:ml-0">
            <p className="mb-3">
              {title} {first_name} {last_name}{" "}
            </p>
            <p className="mb-3 hidden md:block">{traveler_email}</p>
            <p className="mb-3">{seatNo}</p>
            <p className="mb-3">{phone_number}</p>
            <p className="mb-3">{passport_number}</p>
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
                <p className="text-sm">{airline}</p>
                <p className="text-sm">{aircraft}</p>
                <p className=" text-sm">{flightNumber}</p>
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
                <p className="text-sm">{departureTime}</p>
                <p className="text-sm">{departureCity}</p>
                <p className=" text-sm">{departureAirport}</p>
                <p className=" text-sm">{formatDate(departureDate)}</p>
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
                <p className="text-sm">{arrivalTime}</p>
                <p className="text-sm">{arrivalCity}</p>
                <p className=" text-sm">{arrivalAirport}</p>
                <p className=" text-sm">{formatDate(arrivalDate)}</p>
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
                <p className="text-sm">{fareSummary?.total} BDT</p>
                <p className="text-sm">{fareSummary?.taxesAndFees} BDT</p>
                <p className=" text-sm">{booking?.paymentStatus}</p>
                <p className=" text-sm hidden md:block">
                  {booking?.transitionId}
                </p>
              </div>
            </div>
          </div>

          {/* Ticket Download */}
          <div className="mt-6 mb-6">
            <ETicket booking={booking} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default TicketHistory;
