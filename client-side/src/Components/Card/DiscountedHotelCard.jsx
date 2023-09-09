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
          className="mask mask-star-2 bg-orange-400"
          checked
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
    <div className="shadow-2xl p-4 rounded-lg">
      <img
        className="object-cover mx-auto h-56 shadow-md rounded-md"
        src={img}
        alt=""
      />
      <div className="space-y-3 pt-5 pl-2">
        <h3 className="lg:text-xl text-semibold">{name}</h3>
        <p className="flex gap-x-1 items-center text-cyan-500">
          <CiLocationOn></CiLocationOn> {distance}
        </p>
        <p className="text-gray-400">{details}</p>
      </div>
      <div className="flex justify-between items-center mt-5 px-3">
        <div className="rating rating-xs mr-2 md:mr-0">{stars}</div>
        <div className="flex items-center gap-x-3">
          <p className="line-through font-semibold text-sm md:text-lg text-cyan-600">
            BDT{cost}
          </p>
          <Link className="py-3 px-2 md:px-4 text-sm md:text-lg border border-cyan-300 rounded-lg font-medium bg-cyan-600 hover:bg-cyan-700 text-white duration-500">
            {(cost - (cost * discount) / 100).toFixed(0)} BDT Night
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiscountedHotelCard;
