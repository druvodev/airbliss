import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const DiscountedHotelCard = ({ hotel }) => {
  const { name, details, star, distance, cost, discount, img } = hotel;
  return (
    <div>
      <img src={img} alt="" />
      <div className="space-y-3">
        <h3 className="lg:text-2xl xl:text-2xl text-[#504D75] ">{name}</h3>
        <p className="flex gap-x-1 items-center text-[#8B89A4]">
          <CiLocationOn></CiLocationOn> {distance}
        </p>
        <p className="text-[#6B698F]">{details}</p>
      </div>
      <div className="flex justify-between items-center mt-3 px-3">
        <p>{star}</p>
        <div className="flex items-center gap-x-3">
          <p className="line-through font-semibold text-lg">${cost}</p>
          <Link className="py-3 px-6 border bg-cyan-700 hover:bg-cyan-600 border-cyan-300 rounded-lg font-medium text-white hover:text-white duration-500">
            ${(cost - (cost * discount) / 100).toFixed(0)} per night
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiscountedHotelCard;
