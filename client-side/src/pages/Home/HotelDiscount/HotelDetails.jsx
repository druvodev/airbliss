import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MdOutlineBalcony } from "react-icons/md";
import { FaBed, FaToilet, FaPhone } from "react-icons/fa";
import HotelAdd from "../../../Components/Card/HotelAdd";
import SectionBanner from "../../../Components/AboutUsBanner/SectionBanner";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [discountedHotels, setDiscountedHotels] = useState([]);

  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedHotel = data.filter((hotel) => hotel.id === parseInt(id));
        setHotel(selectedHotel);
      });
  }, []);
  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => {
        setDiscountedHotels(data);
      });
  }, []);
  return (
    <div>
      <SectionBanner
        subtitle={"UpComming Hotel Booking Service"}
        title={"Stay Tune With Airbliss"}
      />
      <div className="lg:pb-16 pt-24 px-5 sm:px-10 max-w-7xl mx-auto h-auto overflow-hidden">
        <div className=" mx-auto">
          {hotel.map((h) => (
            <div key={h?.id} className="p-3 shadow-xl ">
              <div className="flex sm:gap-4 flex-col md:flex-row gap-y-3   sm:items-start md:items-center dark:bg-gray-700 dark:shadow-md dark:shadow-white/10 dark:backdrop-blur-md">
                <img
                  src={h?.img}
                  alt=""
                  className="lg:h-[230px] xl:h-[300px]"
                />
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{h?.name}</h2>
                  <p className="text-lg">{h?.details}</p>
                  <p className="font-semibold text-lg">
                    {" "}
                    <span className="font-bold">Discount:</span> {h?.discount}%
                  </p>
                  <p className="font-semibold text-lg">
                    {" "}
                    <span className="font-bold">Cost:</span> ${h?.cost}
                  </p>
                  <p className="font-semibold text-lg">
                    {" "}
                    <span className="font-bold">Location:</span> {h?.location}
                  </p>
                  <ul className="flex gap-x-14 lg:pt-6 ">
                    <li className="text-xl font-semibold flex items-center gap-x-1">
                      <FaBed></FaBed> <span>{h?.bed}</span>
                    </li>
                    <li className="text-xl font-semibold flex items-center gap-x-1">
                      <FaToilet></FaToilet> <span>{h?.wash_room}</span>
                    </li>
                    <li className="text-xl font-semibold flex items-center gap-x-1">
                      <MdOutlineBalcony></MdOutlineBalcony>{" "}
                      <span>{h?.balcony}</span>
                    </li>
                    <li className="text-xl font-semibold flex items-center gap-x-1">
                      <FaPhone></FaPhone>
                      <span>{h?.contact}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 md:gap-x-4 lg:gap-x-4 gap-6">
            {discountedHotels.map((hotel, index) => (
              <HotelAdd key={index} hotel={hotel}></HotelAdd>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
