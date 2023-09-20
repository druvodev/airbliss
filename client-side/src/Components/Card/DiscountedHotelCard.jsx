import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const DiscountedHotelCard = ({ hotel }) => {
  const { name, details, star, distance, cost, discount, img, id } =
    hotel || {};

  const activeStars = Math.min(Math.floor(star), 5);
  const hasInactiveStar = star < 5 && star > activeStars;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < activeStars) {
      stars.push(
        <input
          key={i}
          type="radio"
          name="rating-5"
          className="mask  mask-star-2 bg-orange-400"
          readOnly
        />
      );
    } else if (hasInactiveStar && i === activeStars) {
      stars.push(
        <input
          key={i}
          type="radio"
          name="rating-5"
          className="mask mask-star-2 bg-gray-300"
          checked
          disabled
        />
      );
    } else {
      stars.push(
        <input
          key={i}
          type="radio"
          name="rating-5"
          className="mask mask-star-2 bg-gray-300"
          disabled
        />
      );
    }
  }

  return (
    <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-3 rounded-md bg-white dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500">
      <div className="relative">
        <img
          className="object-cover mx-auto h-56 shadow-md rounded-md"
          src={img}
          alt=""
        />
        <div className="absolute bottom-2 right-2 rating mr-2 md:mr-0 bg-white/10 backdrop-blur p-1 rounded">
          {stars}
        </div>
      </div>
      <div className="space-y-3 pt-2 pl-2">
        <h3 className="lg:text-xl font-semibold">{name}</h3>
        <p className="flex gap-x-1 items-center text-cyan-500">
          <CiLocationOn></CiLocationOn> {distance}
        </p>
        <p className="text-gray-400">{details}</p>
      </div>
      <div className="mt-5">
        <div className="flex justify-between gap-2">
          <div className="flex items-baseline gap-1">
            <p className="line-through font-semibold text-sm text-gray-600">
              ৳{cost} BDT
            </p>

            <p className="font-bold  md:text-lg text-cyan-600">
              ৳{(cost - (cost * discount) / 100).toFixed(0)} BDT
            </p>
          </div>
          <Link
            to={`/HotelDetails/${id}`}
            className="py-1 px-4 text-sm md:text-lg rounded-md font-medium bg-cyan-700 hover:bg-cyan-600 text-white duration-500 ml-auto"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiscountedHotelCard;
