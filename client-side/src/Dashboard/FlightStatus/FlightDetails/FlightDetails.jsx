import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  setPath,
  setupdateMode,
} from "../../../redux/features/manageFlightSlice";
import { HashLoader } from "react-spinners";
import logo from "../../../assets/icon/airblissBlack.png";
import { FaFantasyFlightGames } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { CiBadgeDollar } from "react-icons/ci";
import { PiNoteLight } from "react-icons/pi";
import axios from "axios";
import { errorToast, successToast } from "../../../utils/toast";

const FlightDetails = () => {
  const { airportCode, _id, id } = useParams();
  const dispatch = useDispatch();

  // _id is single flight id and only id is main array id

  const Filterflights = useSelector((state) => state?.manageFlight);
  const { flights, loading, updateMode } = Filterflights;
  const filterFlight = flights?.filter((flight) => flight?._id === _id);

  useEffect(() => {
    dispatch(setPath({ id, airportCode }));
  }, [id]);

  console.log(filterFlight);

  const [updateData, setUpdateData] = useState({
    airportName: filterFlight[0]?.airportName,
    airlineName: filterFlight[0]?.airlineName,
    amountPerKm: filterFlight[0]?.amountPerKm,
    taxesAndFees: filterFlight[0]?.taxesAndFees,
    totalSeats: filterFlight[0]?.totalSeats,
    durationPerKm: filterFlight[0]?.durationPerKm,
    airlineStatus: "",
    aircraft: filterFlight[0]?.flightInfo?.aircraft,
    flightNumber: filterFlight[0]?.flightInfo?.flightNumber,
    baggage: filterFlight[0]?.flightInfo?.baggage,
    checkIn: filterFlight[0]?.flightInfo?.checkIn,
    cabin: filterFlight[0]?.flightInfo?.cabin,
    code: filterFlight[0]?.details?.code,
    time: filterFlight[0]?.details?.time,
    latitude: filterFlight[0]?.details?.longitude,
    longitude: filterFlight[0]?.details?.longitude,
    dateAmountPerKm: filterFlight[0]?.dateChangeRules[0]?.amountPerKm,
    cancelAmountPerKm: filterFlight[0]?.cancellationRules[0]?.amountPerKm,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/update/${airportCode}/${id}/${_id}`,
        updateData
      );

      successToast("Flight Data Updated Success");
    } catch (error) {
      errorToast("Flight Data Fail to Update");
      console.error("Error updating flight:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <HashLoader color="#0891B2" />
        </div>
      ) : (
        <section className=" ">
          {/* Flight Info */}
          <div className="shadow-md p-4 rounded-md">
            <img className="md:h-10 md:w-20 h-6 w-12" src={logo} alt="" />
            <div className="flex justify-center items-center flex-col -mt-6 md:-mt-8">
              <h1 className="font-semibold ">Flight Information</h1>
            </div>
          </div>

          {/* Main Flight All Info */}
          <section className="shadow-md bg-white mt-6 p-5 rounded-md">
            {/* Top Flight Container */}
            <nav className="flex justify-between items-center md:flex-row flex-col-reverse">
              <div className="flex md:justify-start items-center space-x-3 text-[12px]">
                <div>
                  <img
                    className="h-16 w-15  rounded-full"
                    src="https://airlineimages.s3.ap-southeast-1.amazonaws.com/128/RJ.png"
                    alt=""
                  />
                </div>

                <div>
                  <p>{filterFlight[0]?.flightInfo?.aircraft}</p>
                  <h3 className="md:text-[15px] text-[13px] font-semibold">
                    {filterFlight[0]?.airlineName}
                  </h3>
                </div>

                <div>
                  <p>{filterFlight[0]?.flightInfo?.flightNumber}</p>
                  <h3 className="md:text-[15px] text-[13px] font-semibold">
                    {filterFlight[0]?.flightInfo?.class}
                  </h3>
                </div>
              </div>
              <div className="w-full mb-3 md:mb-0 md:w-56">
                <p className="p-2 bg-cyan-600 text-white rounded">
                  Flight id : {filterFlight[0]?._id?.slice(8)}
                </p>
              </div>
            </nav>

            <hr className="mt-2 mb-2" />

            <section className="mt-3">
              <div
                onClick={() => dispatch(setupdateMode(!updateMode))}
                className="flex items-center space-x-2 "
              >
                <h1 className="group border-2 border-cyan-300 rounded p-1 px-2 transition-all duration-300 ease-in-out hover:text-white hover:bg-cyan-600 hover:border-cyan-400 hover:shadow-lg cursor-pointer">
                  {updateMode ? "Edit" : "View"} Flight Information
                </h1>
              </div>
            </section>

            {/* Flight Info Container */}
            {updateMode ? (
              <div>
                {/* More Flight Info */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mx-4 mb-10">
                  <div className="shadow-md border-t relative  border-gray-200 p-3 rounded-md">
                    <div className="p-6 top-0 left-0 -mt-3 -ml-5 absolute bg-cyan-500 rounded-full h-10 w-10 text-white flex justify-center items-center">
                      <p className="text-2xl">
                        <FaFantasyFlightGames />
                      </p>
                    </div>

                    <div className="ml-5">
                      <h3 className="font-semibold ">Flights</h3>
                      <p className="text-xs mt-1">
                        <span className="font-semibold">Airline Name</span>:{" "}
                        {filterFlight[0]?.airlineName}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">Airport Name</span>:{" "}
                        {filterFlight[0]?.airportName}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">Oparated By</span>:{" "}
                        {filterFlight[0]?.flightInfo?.operatedBy}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">Total Seat</span>:{" "}
                        {filterFlight[0]?.totalSeats}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">Depature City</span>:{" "}
                        {filterFlight[0]?.details?.city}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">Passanger Type</span>:{" "}
                        {filterFlight[0]?.passengerType}
                      </p>
                    </div>
                  </div>

                  <div className="shadow-md border-t relative  border-gray-200 p-3 rounded-md">
                    <div className="p-6 top-0 left-0 -mt-3 -ml-5 absolute bg-cyan-500 rounded-full h-10 w-10 text-white flex justify-center items-center">
                      <p className="text-2xl">
                        <BiCurrentLocation />
                      </p>
                    </div>

                    <div className="ml-5">
                      <h3 className="font-semibold">Destination</h3>
                      <p className="text-xs mt-1">
                        <span className="font-semibold">Depature City</span>:{" "}
                        {filterFlight[0]?.details?.city}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">City Code</span>:{" "}
                        {filterFlight[0]?.details?.code}
                      </p>
                      <p className="text-xs mt-1">
                        <span className="font-semibold">Depature Time</span>:{" "}
                        {filterFlight[0]?.details?.time}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">Location</span>:{" "}
                        {filterFlight[0]?.details?.latitude} |{" "}
                        {filterFlight[0]?.details?.longitude}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">Tarminal</span>:{" "}
                        {filterFlight[0]?.details?.terminal}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">Flight Type</span>:{" "}
                        {filterFlight[0]?.stopType}
                      </p>
                    </div>
                  </div>

                  <div className="shadow-md border-t relative  border-gray-200 p-3 rounded-md">
                    <div className="p-6 top-0 left-0 -mt-3 -ml-5 absolute bg-cyan-500 rounded-full h-10 w-10 text-white flex justify-center items-center">
                      <p className="text-2xl">
                        <CiBadgeDollar />
                      </p>
                    </div>

                    <div className="ml-5">
                      <h3 className="font-semibold ">Prise & Weight</h3>
                      <p className="text-xs mt-1">
                        <span className="font-semibold">Kilometer Cost</span>:{" "}
                        {filterFlight[0]?.amountPerKm}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">Dunration Cost km</span>
                        : {filterFlight[0]?.durationPerKm}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">Tax and Fees</span>:{" "}
                        {filterFlight[0]?.taxesAndFees}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">Cabin </span>:{" "}
                        {filterFlight[0]?.flightInfo?.cabin}
                      </p>
                      <p className="text-xs mt-1">
                        <span className="font-semibold">CheckIn</span>:{" "}
                        {filterFlight[0]?.flightInfo?.checkIn}
                      </p>

                      <p className="text-xs mt-1">
                        <span className="font-semibold">Baggage</span>:{" "}
                        {filterFlight[0]?.flightInfo?.baggage}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-16 mx-4">
                  <div className="shadow-md border-t relative  border-gray-200 p-3 rounded-md">
                    <div className="p-6 top-0 left-0 -mt-3 -ml-5 absolute bg-cyan-500 rounded-full h-10 w-10 text-white flex justify-center items-center">
                      <p className="text-2xl">
                        <PiNoteLight />
                      </p>
                    </div>

                    <div className="ml-5">
                      <h3 className="font-semibold ">Notes</h3>
                      <ul className="text-xs mt-1">
                        {filterFlight[0]?.notes?.map((note) => (
                          <li key={note}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <section className="mt-12 mx-4 mb-10">
                <form onSubmit={handleSubmit}>
                  <section>
                    <div className="ml-[5px] mb-1">
                      <p className="text-sm font-semibold ">
                        Update Airline Information
                      </p>
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="text"
                          name="airportName"
                          value={updateData.airportName}
                          onChange={handleChange}
                          placeholder="Airport Name"
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="text"
                          name="airlineName"
                          value={updateData.airlineName}
                          onChange={handleChange}
                          placeholder="Airline Name"
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="number"
                          name="amountPerKm"
                          value={updateData.amountPerKm}
                          onChange={handleChange}
                          placeholder="Amount Per Km Ex:(0.2)"
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="number"
                          name="taxesAndFees"
                          value={updateData.taxesAndFees}
                          onChange={handleChange}
                          placeholder="Taxes and Fees Ex:(200)"
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="number"
                          name="totalSeats"
                          value={updateData.totalSeats}
                          onChange={handleChange}
                          placeholder="Total Seats Ex:(50)"
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="text"
                          name="durationPerKm"
                          value={updateData.durationPerKm}
                          onChange={handleChange}
                          placeholder="Duration Per Km Ex:(0.2)"
                          required
                        />
                      </div>

                      <div>
                        <select
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          name="airlineStatus"
                          value={updateData.airlineStatus}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Flight Status</option>
                          <option value="running">Running</option>
                          <option value="stop">Stop</option>
                        </select>
                      </div>
                    </div>
                  </section>

                  <section className="">
                    <div className="ml-[5px] mb-2 mt-6">
                      <p className="text-sm font-semibold ">
                        Update Flight Information
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="text"
                          name="aircraft"
                          value={updateData.aircraft}
                          onChange={handleChange}
                          placeholder="Aircraft"
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="text"
                          name="flightNumber"
                          value={updateData.flightNumber}
                          onChange={handleChange}
                          placeholder="Flight Number "
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="text"
                          name="baggage"
                          value={updateData.baggage}
                          onChange={handleChange}
                          placeholder="Baggage Kg Ex:(12)"
                          required
                        />
                      </div>
                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="text"
                          name="checkIn"
                          value={updateData.checkIn}
                          onChange={handleChange}
                          placeholder="Check-in Kg Ex:(6)"
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="text"
                          name="cabin"
                          value={updateData.cabin}
                          onChange={handleChange}
                          placeholder="Cabin Kg Ex:(4)"
                          required
                        />
                      </div>
                    </div>
                  </section>

                  <section className="">
                    <div className="ml-[5px] mb-1 mt-6">
                      <p className="text-sm font-semibold ">
                        Update Flight Details
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="text"
                          name="code"
                          value={updateData.code}
                          onChange={handleChange}
                          placeholder="Details Code Ex:(Khulna Airport)"
                          required
                        />
                      </div>
                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="time"
                          name="time"
                          value={updateData.time}
                          onChange={handleChange}
                          placeholder="Details Time"
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="text"
                          name="latitude"
                          value={updateData.latitude}
                          onChange={handleChange}
                          placeholder="Details Latitude"
                          required
                        />
                      </div>
                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="text"
                          name="longitude"
                          value={updateData.longitude}
                          onChange={handleChange}
                          placeholder="Details Longitude"
                          required
                        />
                      </div>
                    </div>
                  </section>

                  <section className="">
                    <div className="ml-[5px] mb-1 mt-6">
                      <p className="text-sm font-semibold ">
                        {" "}
                        Update Ruls Prise
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="number"
                          name="dateAmountPerKm"
                          value={updateData.dateAmountPerKm}
                          onChange={handleChange}
                          placeholder="Date Change Prise Ex(50)"
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                          type="number"
                          name="cancelAmountPerKm"
                          value={updateData.cancelAmountPerKm}
                          onChange={handleChange}
                          placeholder="Cancellation Prise Ex(300)"
                          required
                        />
                      </div>
                    </div>
                  </section>

                  <button
                    className="btn text-white mt-8 bg-cyan-600 hover:border-2 hover:border-black hover:bg-white hover:text-cyan-500"
                    type="submit"
                  >
                    Update Flights
                  </button>
                </form>
              </section>
            )}
          </section>
        </section>
      )}
    </>
  );
};

export default FlightDetails;
