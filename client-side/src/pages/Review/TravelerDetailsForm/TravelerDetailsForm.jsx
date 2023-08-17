import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaExclamationCircle } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const TravelerDetailsForm = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <div className="relative">
      <div className="shadow-md rounded-xl overflow-hidden">
        <div className="px-5 ">
          <div className="flex items-center gap-2 mt-4 mb-8">
            <h2 className="text-2xl font-semibold">Traveler 1</h2>
            <span className="px-2 py-1 border bg-[#e4dede] rounded text-sm ">
              Adult
            </span>
            <span className="font-semibold text-gray-600">Primary Contact</span>
          </div>
          <hr />
          <div className=" absolute top-5 right-5">
            <button onClick={() => setIsCollapse(!isCollapse)}>
              {isCollapse ? (
                <MdKeyboardArrowUp className="text-2xl rounded-full bg-gray-300" />
              ) : (
                <MdKeyboardArrowDown className="text-2xl rounded-full bg-gray-300" />
              )}
            </button>
          </div>
        </div>
        <div
          // className={`duration-500 ${
          //   !isCollapse && "max-h-0"
          // } transition-all ease-linear`}
          className={`duration-500 ${
            isCollapse ? "max-h-[1275px] md:max-h-[925px]" : "max-h-0"
          } transition-all ease-linear overflow-hidden`}
        >
          <div className="p-5">
            <h2 className="font-semibold text-2xl">Personal Details (Adult)</h2>
            <div className="flex items-center text-gray-400 gap-2 text-sm mt-2">
              <span>
                <FaExclamationCircle />
              </span>
              <span>
                as mentioned on your passport or government approved IDs
              </span>
            </div>
          </div>
          <div className="py-2 px-5">
            <form>
              <label className="font-semibold mb-2">Select Title</label>
              <div className="flex gap-2 mt-1 mb-3">
                <input
                  className="join-item btn"
                  type="radio"
                  name="options"
                  aria-label="Mr."
                />
                <input
                  className="join-item btn"
                  type="radio"
                  name="options"
                  aria-label="Mrs."
                />
                <input
                  className="join-item btn"
                  type="radio"
                  name="options"
                  aria-label="Ms"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label className="font-semibold">
                    First Name<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="First Name"
                    className="block w-full px-2 py-2 mt-1 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Last Name<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Last Name"
                    className="block w-full px-2 py-2 mt-1 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Date of Birth<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name=""
                    id=""
                    placeholder="Select Date"
                    className="block w-full px-2 py-2 mt-1 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Passport Number{" "}
                    <span className="text-gray-500">(Optinal)</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Last Name"
                    className="block w-full px-2 py-2 mt-1 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Passport Expiry Date{" "}
                    <span className="text-gray-500">(Optinal)</span>
                  </label>
                  <input
                    type="date"
                    name=""
                    id=""
                    placeholder="Passport Expiry Date"
                    className="block w-full px-2 py-2 mt-1 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    City<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="City"
                    className="block w-full px-2 py-2 mt-1 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Country<span className="text-red-600">*</span>
                  </label>
                  <select
                    type="select"
                    name=""
                    id=""
                    placeholder="Country"
                    className="block w-full px-2 py-2 mt-1 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country.name.common}>
                        {country.name.common}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-10">
                <h2 className="font-semibold text-2xl">Contact Details</h2>
                <div className="flex items-center text-gray-400 gap-2 text-sm mt-2">
                  <span>
                    <FaExclamationCircle />
                  </span>
                  <span>receive booking confirmation & updates</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Email<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="Email"
                    className="block w-full px-2 py-2 mt-1 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">
                    Phone Number<span className="text-red-600">*</span>
                  </label>
                  <PhoneInput
                    country={"bd"}
                    inputStyle={{
                      width: "100%",
                      padding: "20px 40px",
                      border: "1px solid rgba(158, 158, 158,0.2)",
                    }}
                    value={this?.state.phone}
                    onChange={(phone) => this?.setState({ phone })}
                    inputProps={{
                      name: "phone",
                      required: true,
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Frequent Flyer{" "}
                    <span className="text-gray-500">(If any)</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    defaultValue="No Preference"
                    className="block w-full px-2 py-2 mt-1 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold"></label>
                  <input
                    type="text"
                    disabled
                    name=""
                    id=""
                    placeholder="Frequent Flyer Number"
                    className="block w-full px-2 py-2 mt-7 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
              <button
                className=" my-10 block w-full bg-cyan-700 hover:bg-cyan-600 hover:tracking-wide px-5 rounded h-[38px] text-white font-semibold"
                type="submit"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerDetailsForm;
