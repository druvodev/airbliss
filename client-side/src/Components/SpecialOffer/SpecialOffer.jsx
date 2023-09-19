import { useSelector } from "react-redux";
import offerImg from "../../assets/icon/discount.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

import { format } from "date-fns";
import OfferCard from "./OfferCard";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
const SpecialOffer = () => {
  const [data, setData] = useState([]);
  const departureDate = useSelector(
    (state) => state?.searchFilter?.departureDate
  );
  const destination = useSelector(
    (state) => state?.searchFilter?.fromCityInfo.destination
  );
  const date = format(departureDate, "dd MMM yy");
  const fromCity = destination.split(",")[0];
  useEffect(() => {
    useAxios
      .get("/specialDiscount")
      .then((response) => {
        const toCity = response.data.filter(
          (city) => city.destination.split(",")[0] !== fromCity
        );

        const shuffledToCity = [...toCity].sort(() => Math.random() - 0.5);
        setData(shuffledToCity.slice(0, 8));
      })
      .catch((error) => {
        console.log("Special Discount Offer Can't Fetch", error);
      });
  }, [departureDate, destination]);

  return (
    <div className="mt-12">
      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        onPause={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={3000}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[Autoplay]}
      >
        {data.map((city, index) => (
          <SwiperSlide key={index}>
            <OfferCard
              offerImg={offerImg}
              date={date}
              fromCity={fromCity}
              toCity={city}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SpecialOffer;
