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
    fetch("/offer.json")
      .then((res) => res.json())
      .then((data) => {
        const toCity = data.filter((city) => city.destination !== fromCity);
        const shuffledToCity = [...toCity].sort(() => Math.random() - 0.5);
        setData(shuffledToCity.slice(0, 6));
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
        {data.map((city) => (
          <SwiperSlide>
            <OfferCard
              offerImg={offerImg}
              date={date}
              fromCity={fromCity}
              toCity={city.destination}
              discount={city.discount}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SpecialOffer;
