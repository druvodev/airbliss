import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";


const HotDealCard = ({deal}) => {
    const {img, offer, destination} = deal;
    return (
        <div className="sm:border border-[#F1ECEC] rounded-[8px] sm:flex">
            <img src={img} alt="" className="rounded-[8px] w-full sm: h-[220px] object-cover sm:object-none" />
            <div className="sm:pr-1 md:pr-2 sm:pl-[18px] pt-3 sm:pt-6 space-y-2 md:space-y-4 lg:pr-2 lg:space-y-2 xl:pr-6 xl:space-y-3 lg:pl-3 xl:pl-[18px]">
                <h5 className="text-sm text-[#576070] ">{destination}</h5>
                <p className="text-lg leading-5 text-[#322F63]">{offer}</p>
                <Link to="" className="flex items-center gap-x-1 text-sm text-sky-500 font-medium">Explore More <BsArrowRight/></Link>
            </div>

            
        </div>
    );
};

export default HotDealCard;