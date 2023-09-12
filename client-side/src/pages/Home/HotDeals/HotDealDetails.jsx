import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import DiscountedHotelCard from "../../../Components/Card/DiscountedHotelCard";
import useScrollTop from "../../../hooks/useScrollTop";
import detailsBanner from "../../../assets/banner/aiblissdetailsbanner.jpg";

const HotDealDetails = () => {
  const { path } = useLocation();
  useScrollTop(path);
  const { id } = useParams();
  const [deal, setDeal] = useState([]);
  const [discountedHotels, setDiscountedHotels] = useState([]);
  useEffect(() => {
    fetch("/hotDeals.json")
      .then((res) => res.json())
      .then((data) => {
        const hotDeal = data.filter((d) => d.id === parseInt(id));

        setDeal(hotDeal);
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
      <img className="w-full object-cover h-52" src={detailsBanner} alt="" />
      <div className="lg:pb-16 pt-24 px-5 sm:px-10 max-w-7xl mx-auto h-auto overflow-hidden">
        <div className="lg:w-10/12 mx-auto">
          {deal.map((d) => (
            <div key={d?.id} className="p-3 shadow-xl ">
              <div className="flex sm:gap-4 flex-col sm:flex-row gap-y-3  sm:items-center">
                <img src={d?.img} alt="" />
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{d?.destination}</h2>
                  <p className="text-lg">{d?.offer}</p>
                  <p className="font-semibold text-lg">
                    {" "}
                    <span className="font-bold">Discount:</span> {d?.discount}%
                  </p>
                  <p className="font-semibold text-lg">
                    {" "}
                    <span className="font-bold">Air-Line:</span> {d?.airline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 md:gap-x-4 lg:gap-x-4 gap-6">
            {discountedHotels.map((hotel, index) => (
              <DiscountedHotelCard
                key={index}
                hotel={hotel}
              ></DiscountedHotelCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotDealDetails;
