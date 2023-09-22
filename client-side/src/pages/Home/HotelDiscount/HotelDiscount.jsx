import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import DiscountedHotelCard from "../../../Components/Card/DiscountedHotelCard";

const HotelDiscount = () => {
  const [discountedHotels, setDiscountedHotels] = useState([]);
  useEffect(() => {
    fetch("hotels.json")
      .then((res) => res.json())
      .then((data) => {
        setDiscountedHotels(data);
      });
  }, [discountedHotels]);
  return (
    <div id="discount-hotels" className="pb-16">
      <SectionTitle sectionTitle="Best Deal  for Hotels"></SectionTitle>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 md:gap-x-4 lg:gap-x-4 gap-6">
        {discountedHotels.map((hotel, index) => (
          <DiscountedHotelCard key={index} hotel={hotel}></DiscountedHotelCard>
        ))}
      </div>
    </div>
  );
};

export default HotelDiscount;
