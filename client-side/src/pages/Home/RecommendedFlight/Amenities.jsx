import { FaBasketball, FaCamera, FaCar, FaWifi } from "react-icons/fa6";
import {
  FaGlassMartiniAlt,
  FaGlassCheers,
  FaCoffee,
  FaShoppingBag,
} from "react-icons/fa";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { BiSolidDish } from "react-icons/bi";
import { IoBookSharp } from "react-icons/io5";

const Amenities = () => {
  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold">Amenities</h3>
      <div className="mt-4">
        <div className="grid grid-cols-2 bg-[#f5f5f5] dark:bg-slate-800 mb-[1px]">
          <div className="flex gap-x-3 items-center">
            <p className="p-2 bg-[#01b7f2]">
              <FaWifi className="text-xl text-white"></FaWifi>
            </p>
            <p>Wi-fi</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <p className="p-2 bg-[#01b7f2]">
              <FaCamera className="text-xl text-white"></FaCamera>
            </p>
            <p>Entertainment</p>
          </div>
        </div>
        <div className="grid grid-cols-2 bg-[#f5f5f5] dark:bg-slate-800  mb-[1px]">
          <div className="flex gap-x-3 items-center">
            <p className="p-2 bg-[#01b7f2]">
              <PiTelevisionSimpleFill className="text-xl text-white"></PiTelevisionSimpleFill>
            </p>
            <p>Television</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <p className="p-2 bg-[#01b7f2]">
              <TbAirConditioning className="text-xl text-white"></TbAirConditioning>
            </p>
            <p>Air-Condition</p>
          </div>
        </div>
        <div className="grid grid-cols-2 bg-[#f5f5f5] dark:bg-slate-800  mb-[1px]">
          <div className="flex gap-x-3 items-center">
            <p className="p-2 bg-[#01b7f2]">
              <FaBasketball className="text-xl text-white"></FaBasketball>
            </p>
            <p>Game</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <p className="p-2 bg-[#01b7f2]">
              <FaGlassMartiniAlt className="text-xl text-white"></FaGlassMartiniAlt>
            </p>
            <p>Drinks</p>
          </div>
        </div>
        <div className="grid grid-cols-2 bg-[#f5f5f5] dark:bg-slate-800  mb-[1px]">
          <div className="flex gap-x-3 items-center">
            <p className="p-2 bg-[#01b7f2]">
              <FaGlassCheers className="text-xl text-white"></FaGlassCheers>
            </p>
            <p>Wine Bar</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <p className="p-2 bg-[#01b7f2]">
              <FaCoffee className="text-xl text-white"></FaCoffee>
            </p>
            <p>Coffee</p>
          </div>
        </div>
        <div className="grid grid-cols-2 bg-[#f5f5f5] dark:bg-slate-800  mb-[1px]">
          <div className="flex gap-x-3 items-center">
            <p className="p-2 bg-[#01b7f2]">
              <FaShoppingBag className="text-xl text-white"></FaShoppingBag>
            </p>
            <p>Shopping</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <p className="p-2 bg-[#01b7f2]">
              <BiSolidDish className="text-xl text-white"></BiSolidDish>
            </p>
            <p>Air-Condition</p>
          </div>
        </div>
        <div className="grid grid-cols-2 bg-[#f5f5f5] dark:bg-slate-800  mb-[1px]">
          <div className="flex gap-x-3 items-center">
            <p className="p-2 bg-[#01b7f2]">
              <FaCar className="text-xl text-white"></FaCar>
            </p>
            <p>Comfort</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <p className="p-2 bg-[#01b7f2]">
              <IoBookSharp className="text-xl text-white"></IoBookSharp>
            </p>
            <p>Air-Condition</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amenities;
