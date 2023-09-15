import { CiLocationOn } from "react-icons/ci";

const HotelAdd = ({hotel}) => {
    const { name, details, star, distance, cost, discount, img, id } = hotel;
    return (
        <div className="shadow-2xl p-4 rounded-lg">
        <img src={img} alt="" className="object-cover mx-auto h-56 shadow-md rounded-md" />
        <div className="space-y-3 pt-5 pl-2">
          <h3 className="lg:text-2xl xl:text-2xl text-[#504D75] ">{name}</h3>
          <p className="flex gap-x-1 items-center text-[#8B89A4]"><CiLocationOn></CiLocationOn> {distance}</p>
          <p className="text-[#6B698F]">{details}</p>
        </div>
    
      </div>
    );
};

export default HotelAdd;