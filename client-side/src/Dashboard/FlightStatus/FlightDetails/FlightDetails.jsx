import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setPath } from "../../../redux/features/manageFlightSlice";
import { HashLoader } from "react-spinners";
import logo from "../../../assets/icon/airblissBlack.png";

const FlightDetails = () => {
  const { airportCode, _id, id } = useParams();
  const dispatch = useDispatch();

  const Filterflights = useSelector((state) => state?.manageFlight);
  const { flights, loading } = Filterflights;
  const filterFlight = flights?.filter((flight) => flight?._id === _id);

  useEffect(() => {
    dispatch(setPath({ id, airportCode }));
  }, [id]);

  console.log(filterFlight);

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
          <div className="shadow-md p-4 rounded-md"></div>
        </section>
      )}
    </>
  );
};

export default FlightDetails;
