import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const HotDealCard = ({ deal }) => {
  const { img, offer, destination, id } = deal;
  return (
    <div className="sm:border shadow-lg border-[#F1ECEC] rounded-[8px] flex rounded-ss-3xl">
      <img
        src={img}
        alt=""
        className="rounded-ss-3xl object-cover sm:object-cover"
      />
      <div className="sm:pr-1 px-2 pb-2 sm:p-4 md:p-2 bg-cyan-100  md:pr-2 sm:pl-[18px] pt-3 sm:pt-6 space-y-2 md:space-y-4 lg:pr-2 lg:space-y-2 xl:pr-6 xl:space-y-3 lg:pl-3 xl:pl-[18px]">
        <h5 className="text-sm text-[#576070] font-bold ">{destination}</h5>
        <p className="text-sm  sm:text-lg leading-4 sm:leading-5 text-[#322F63]">
          {offer}
        </p>
        <Link
          to={`hotDeals/${id}`}
          className="flex items-center gap-x-1 text-sm text-sky-500 font-medium"
        >
          Explore More <BsArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default HotDealCard;
