import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const DiscountedHotelCard = ({ hotel }) => {
  const { name, details, star, distance, cost, discount, img, id } = hotel;
  return (
    <div className="shadow-2xl p-4 rounded-lg">
      <img className="object-cover h-56 rounded-md" src={img} alt="" />
      <div className="space-y-3 pt-5 pl-2">
        <h3 className="lg:text-2xl xl:text-2xl text-semibold">{name}</h3>
        <p className="flex gap-x-1 items-center text-cyan-500">
          <CiLocationOn></CiLocationOn> {distance}
        </p>
        <p className="text-gray-400">{details}</p>
      </div>
      <div className="flex justify-between items-center mt-3 px-3">
        <p>{star}</p>
        <div className="flex items-center gap-x-3">
          <p className="line-through font-semibold text-lg text-cyan-600">
            ${cost}
          </p>
          <Link className="py-3 px-6 border border-cyan-300 rounded-lg font-medium bg-cyan-600 hover:bg-cyan-700 text-white duration-500">
            ${(cost - (cost * discount) / 100).toFixed(0)} per night
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiscountedHotelCard;
