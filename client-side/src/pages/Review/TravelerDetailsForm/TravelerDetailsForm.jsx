import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdRMobiledata,
  MdVerifiedUser,
} from "react-icons/md";
// import { FaExclamationCircle } from "react-icons/bi";
import { HiOutlineExternalLink } from "react-icons/hi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../redux/features/bookingInfoSlice";
import { paymentLater, paymentProcessing } from "../../../utils/handlePayment";
import SeatModel from "../../../Components/SeatModel/SeatModel";
import useAuth from "../../../hooks/useAuth";
import { errorToast } from "../../../utils/toast";
import { setInsurance } from "../../../redux/features/insuranceSlice";

const TravelerDetailsForm = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [countries, setCountries] = useState([]);
  const [firstInputValue, setFirstInputValue] = useState("");
  const [secondInputValue, setSecondInputValue] = useState("");
  const [isSecondInputDisabled, setIsSecondInputDisabled] = useState(true);
  const [isContinue, setContinue] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userBookingInfo.userInfo); // get user information from redux
  const flightInfo = useSelector((state) => state.userBookingInfo.flightInfo); // get flight information from redux
  const insuranceStatus = useSelector((state) => state.insurance.insurance);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); //for Check box checked State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsuranceModal, setIsInsuranceModal] = useState(false);
  const [hasInsuranceModalShown, setHasInsuranceModalShown] = useState(false);
  const [isNoInsuranceSelected, setIsNoInsuranceSelected] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const handleFirstInputChange = (event) => {
    const value = event.target.value;
    setFirstInputValue(value);

    if (value) {
      setIsSecondInputDisabled(false);
    } else {
      setIsSecondInputDisabled(true);
      setSecondInputValue("");
    }
  };

  const handleSecondInputChange = (event) => {
    setSecondInputValue(event.target.value);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const handleContinue = (data) => {
    const chekTitel = data.title;

    if (chekTitel != null) {
      dispatch(setUserInfo(data)); // stored user information in redux
      reset();
      setContinue(true);
      openModal();
    } else {
      return errorToast("Please select titel");
    }
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle Payment Later
  const handlePayLater = () => {
    paymentLater(flightInfo, userInfo); // This function from utils
    navigate("/");
  };

  // Handle Processing Payment
  const handleProcessingPayment = () => {
    paymentProcessing(flightInfo, userInfo, insuranceStatus); // This function from utils
  };

  // Check box Handler
  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  // Insurance Modal Showing After 2sec
  if (isContinue && !isModalOpen && !hasInsuranceModalShown) {
    setTimeout(() => {
      document.body.style.overflow = "hidden";
      setIsInsuranceModal(true);
      !setHasInsuranceModalShown(true);
    }, 2000);
  }

  // Handel Insurance System
  const handleInsuranceButtonClick = (status) => {
    setIsInsuranceModal(false);
    document.body.style.overflow = "auto";
    if (status) {
      dispatch(setInsurance(true));
      setIsNoInsuranceSelected(status);
    } else {
      setIsNoInsuranceSelected(status);
      dispatch(setInsurance(false));
    }
  };

  return (
    <section>
      {isContinue ? (
        <div className=" dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500 dark:p-2">
          <h2 className="text-xl font-bold mb-4 px-2">Traveler Details</h2>
          <div className="w-full ">
            <div className="bg-cyan-700 dark:bg-transparent mb-5">
              <h2 className="text-xl text-white font-semibold px-2">
                {" "}
                Only Traveler 1 (Adult)
              </h2>
            </div>
            <div className=" px-5 md:px-10  grid grid-cols-1 md:grid-cols-2">
              <div className="flex justify-start items-start gap-4">
                <div>
                  <p className="mb-3 font-semibold">Name: </p>
                  <p className="mb-3 font-semibold hidden md:block">Email: </p>
                  <p className="mb-3 font-semibold">Gender: </p>
                  <p className="mb-3 font-semibold">Date of Birth: </p>
                  <p className="mb-3 font-semibold">City: </p>
                </div>
                <div className="ml-9 md:ml-0">
                  <p className="mb-3">
                    {userInfo.title} {userInfo.first_name} {userInfo.last_name}
                  </p>
                  <p className="mb-3 hidden md:block">
                    {userInfo.traveler_email}
                  </p>
                  <p className="mb-3">
                    {userInfo.title === "Mr." ? "Male" : "Female"}
                  </p>
                  <p className="mb-3">{userInfo.date_of_birth}</p>
                  <p className="mb-3">{userInfo.city}</p>
                </div>
              </div>
              <div className="flex justify-start gap-4">
                <div>
                  <p className="mb-3 font-semibold">Country: </p>
                  <p className="mb-3 font-semibold">Passport Number: </p>
                  <p className="mb-3 font-semibold">Phone Number: </p>
                  <p className="mb-3 font-semibold">Frequent Flyer: </p>
                </div>
                <div>
                  <p className="mb-3">{userInfo.country}</p>
                  <p className="mb-3">{userInfo.passport_number}</p>
                  <p className="mb-3">{userInfo.phone_number}</p>
                  <p className="mb-3">
                    {userInfo.frequent_flyer ? userInfo.frequent_flyer : "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5  mx-1 md:mx-10">
              <div className="border-2 border-accent py-5 px-2 rounded-xl relative">
                <p className="absolute -top-4 left-10 px-2 font-semibold bg-white dark:bg-gray-700 text-accent">
                  Select Travel Insurance Option
                </p>
                <div className="form-control">
                  <label
                    className="flex gap-2 cursor-pointer"
                    onClick={() => handleInsuranceButtonClick(true)}
                  >
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio radio-accent"
                      checked={isNoInsuranceSelected}
                    />
                    <div className="label-text">
                      <p className="font-semibold dark:text-gray-400">
                        Yes, insure my trip for only{" "}
                        <span className="font-bold">
                          {(0.05 * flightInfo?.fareSummary?.total).toFixed()}
                        </span>{" "}
                        BDT.
                      </p>
                      <small className="flex gap-1 dark:text-gray-400">
                        I have read, understand and agree to the terms and
                        conditions of the
                        <Link
                          to="/insurance-policy"
                          className="text-accent font-semibold flex items-center gap-[1px]"
                        >
                          Policy of Insurance <HiOutlineExternalLink />
                        </Link>
                        and
                        <Link
                          to="/insurance-policy"
                          className="text-accent font-semibold flex items-center gap-[1px]"
                        >
                          Important Disclosures <HiOutlineExternalLink />
                        </Link>
                      </small>
                    </div>
                  </label>
                </div>
                <div className="form-control">
                  <label
                    className="flex gap-2 mt-4 cursor-pointer"
                    onClick={() => handleInsuranceButtonClick(false)}
                  >
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio radio-accent"
                      checked={!isNoInsuranceSelected}
                    />
                    <div className="label-text">
                      <p className="font-semibold dark:text-gray-400">
                        No, I will travel without this insurance for my{" "}
                        <span className="font-bold">
                          {flightInfo?.fareSummary?.total}
                        </span>{" "}
                        BDT trip. I understand that by declining coverage I may
                        be responsible for substantial cancellation fees and
                        delay expenses.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="form-control mt-5 mx-5 md:mx-10 text-xs md:text-[15px]">
              <label className="cursor-pointer flex items-center gap-3">
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  className="checkbox checkbox-accent"
                />
                <span className="">
                  By clicking Book Now or Pay Now option I agree with the
                  Airbliss{" "}
                  <Link to="" className="text-cyan-800  font-semibold">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="" className="text-cyan-800 font-semibold">
                    Terms & Conditions
                  </Link>
                </span>
              </label>
            </div>

            <div className="mx-5  md:mx-10 flex items-center flex-col md:flex-row  gap-3 mt-5">
              <button
                onClick={handlePayLater}
                className={`${
                  isCheckboxChecked
                    ? "hover:bg-cyan-600 hover:tracking-wide hover:text-white"
                    : "opacity-50 cursor-not-allowed"
                } text-cyan-700 border w-48 border-cyan-700  rounded-md h-[50px]  font-semibold text-sm t`}
                disabled={!isCheckboxChecked}
              >
                Book Now (Pay Later)
              </button>
              <button
                onClick={handleProcessingPayment}
                className={`${
                  isCheckboxChecked
                    ? "hover:bg-cyan-600 hover:tracking-wide"
                    : "opacity-50 cursor-not-allowed"
                } bg-cyan-700  w-48 rounded-md h-[50px] text-white font-semibold text-sm`}
                disabled={!isCheckboxChecked}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500 rounded p-2  dark:text-gray-400">
          <div className="shadow-lg rounded-xl overflow-hidden">
            <div className="px-5 ">
              <div className="flex items-center gap-2 mt-4 mb-8 ">
                <h2 className="text-2xl font-semibold">Traveler 1</h2>
                <span className="px-2 py-1 border bg-[#e4dede] dark:bg-gray-700 dark:border-0 rounded text-sm ">
                  Adult
                </span>
                <span className="font-semibold text-gray-600">
                  Primary Contact
                </span>
              </div>
              <hr />
              <div className=" absolute top-5 right-5">
                <button onClick={() => setIsCollapse(!isCollapse)}>
                  {isCollapse ? (
                    <MdKeyboardArrowUp className="text-2xl rounded-full bg-gray-300 dark:text-cyan-500 dark:bg-gray-500" />
                  ) : (
                    <MdKeyboardArrowDown className="text-2xl rounded-full bg-gray-300 dark:text-cyan-500 dark:bg-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div
              className={`duration-500 ${
                isCollapse ? "max-h-[1475px] md:max-h-[925px]" : "max-h-0"
              } transition-all ease-linear overflow-hidden`}
            >
              <div className="p-5">
                <h2 className="font-semibold text-2xl">
                  Personal Details (Adult)
                </h2>
                <div className=" text-gray-400  text-sm mt-2">
                  <span>
                    <span className="px-2 rounded-full bg-gray-100 text-red-400">
                      !
                    </span>{" "}
                    as mentioned on your passport or government approved IDs
                  </span>
                </div>
              </div>
              <div className="py-2 px-5">
                <form onSubmit={handleSubmit(handleContinue)}>
                  <label className="font-semibold mb-2">
                    Select Title<span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2 mt-1 mb-3">
                    <input
                      className="join-item btn dark:bg-gray-700 dark:text-gray-300"
                      type="radio"
                      name="options"
                      {...register("title")}
                      aria-label="Mr."
                      value="Mr."
                    />
                    <input
                      className="join-item btn dark:bg-gray-700 dark:text-gray-300"
                      type="radio"
                      name="options"
                      {...register("title")}
                      aria-label="Mrs."
                      value="Mrs."
                    />
                    <input
                      className="join-item btn dark:bg-gray-700 dark:text-gray-300"
                      type="radio"
                      name="options"
                      {...register("title")}
                      aria-label="Ms"
                      value="Ms."
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
                        {...register("first_name", { required: true })}
                        placeholder="First Name"
                        className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white dark:bg-gray-700 border rounded-md dark:border-0 focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          errors.first_name &&
                          "focus:border-red-500 focus:ring-red-500 "
                        }`}
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
                        {...register("last_name", { required: true })}
                        placeholder="Last Name"
                        className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white border rounded-md focus:border-gray-500 dark:bg-gray-700 dark:border-0 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          errors.last_name &&
                          "focus:border-red-500 focus:ring-red-500 "
                        }`}
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
                        {...register("date_of_birth", { required: true })}
                        placeholder="Select Date"
                        className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white dark:text-gray-200 border rounded-md dark:border-0 dark:bg-gray-700 focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          errors.date_of_birth &&
                          "focus:border-red-500 focus:ring-red-500 "
                        }`}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold">
                        Passport Number<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        {...register("passport_number", { required: true })}
                        placeholder="Passport Number"
                        className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white dark:border-0 dark:bg-gray-700 border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          errors.passport_number &&
                          "focus:border-red-500 focus:ring-red-500 "
                        }`}
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
                        {...register("passport_expiry_date")}
                        placeholder="Passport Expiry Date"
                        className="block w-full px-2 py-2 mt-1 text-gray-500 bg-white border dark:text-gray-200 dark:border-0 dark:bg-gray-700 rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
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
                        {...register("city", { required: true })}
                        placeholder="City"
                        className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white dark:border-0 dark:bg-gray-700 border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          errors.city &&
                          "focus:border-red-500 focus:ring-red-500 "
                        }`}
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
                        {...register("country", { required: true })}
                        placeholder="Country"
                        className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white border dark:border-0 dark:bg-gray-700 rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          errors.country &&
                          "focus:border-red-500 focus:ring-red-500 "
                        }`}
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
                    <div className=" text-gray-400  text-sm mt-2">
                      <span>
                        <span className="px-2 rounded-full bg-gray-100 text-red-400">
                          !
                        </span>{" "}
                        receive booking confirmation & updates
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col">
                      <label className="font-semibold">
                        Email<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        readOnly
                        name=""
                        defaultValue={user?.email}
                        id=""
                        {...register("traveler_email", { required: true })}
                        placeholder="Email"
                        className="block w-full px-2 py-2 mt-1 dark:border-0 dark:bg-gray-700 dark:text-gray-400 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
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
                          backgroundColor: "",
                          border: "1px solid rgba(158, 158, 158,0.2)",
                        }}
                        {...register("phone_number", { required: true })}
                        value={getValues("phone_number")}
                        onChange={(value) => {
                          setValue("phone_number", value);
                        }}
                        inputProps={{
                          name: "phone_number",
                          required: true,
                        }}
                      />
                      {errors.phone_number && (
                        <span className="text-red-500">
                          Phone number is required
                        </span>
                      )}
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
                        {...register("frequent_flayer")}
                        placeholder="No Preference"
                        value={firstInputValue}
                        onChange={handleFirstInputChange}
                        className="block w-full px-2 py-2 mt-1 text-gray-500 bg-white border dark:border-0 dark:bg-gray-700 rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold"></label>
                      <input
                        type="number"
                        name=""
                        id=""
                        {...register("flyer_number")}
                        value={secondInputValue}
                        onChange={handleSecondInputChange}
                        disabled={isSecondInputDisabled}
                        placeholder="Frequent Flyer Number"
                        className={`block w-full px-2 py-2 mt-7 text-gray-500 bg-white border dark:border-0 dark:bg-gray-700 rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          isSecondInputDisabled ? "bg-[#e6e4e4]" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {user ? (
                    <button
                      className=" my-10 block w-full bg-cyan-700 cursor-pointer hover:bg-cyan-600 hover:tracking-wide px-5 rounded h-[38px] text-white font-semibold "
                      type="submit"
                    >
                      Continue
                    </button>
                  ) : (
                    <div className="my-10 pt-[6px] block w-full bg-cyan-600 cursor-pointer px-5 rounded h-[38px] text-white font-semibold text-center">
                      <p>Please Login For Continue</p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Seat selecting Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 z-50 w-full md:w-screen  h-full overflow-y-auto ">
          <div className="md:w-screen w-full  bg-white/20 backdrop-blur-md backdrop-filter shadow-md sm:p-10">
            <div className="text-center ">
              <h3 className="mb-5 text-3xl sm:text-4xl font-bold bg-slate-500/30 backdrop-blur py-2 px-5 w-fit mx-auto rounded-xl shadow shadow-cyan-100">
                Choose Your Seating Preference
              </h3>
              <SeatModel setIsModalOpen={setIsModalOpen} />
            </div>
          </div>
        </div>
      )}
      {isContinue && isInsuranceModal && (
        <div className="fixed p-4 top-0 left-0  z-50 w-full h-full bg-black/20 overflow-y-auto flex items-center justify-center ">
          <div className="bg-white rounded-xl border p-5 w-fit relative dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500 dark:border-0">
            <h2 className="text-3xl font-semibold mb-4 text-center">
              Travel Insurance Preference
            </h2>
            <div className="">
              <p className="mb-4">
                Protect your trip with our travel insurance for only
                <span className="font-semibold">
                  {" "}
                  <span className="font-bold">
                    {(0.05 * flightInfo?.fareSummary?.total).toFixed()}
                  </span>{" "}
                  BDT
                </span>
                . Here's what it covers:
              </p>
              <ul className="font-semibold">
                <li className="flex gap-1 items-center">
                  <MdVerifiedUser /> Trip cancellation coverage
                </li>
                <li className="flex gap-1 items-center">
                  <MdVerifiedUser /> Delayed flight coverage
                </li>
                <li className="flex gap-1 items-center">
                  <MdVerifiedUser /> Lost luggage coverage
                </li>
                <li className="flex gap-1 items-center">
                  <MdVerifiedUser /> Medical coverage during your trip
                </li>
              </ul>
              <p className="mt-4">
                By accepting the insurance, you agree to the terms and
                conditions of the{" "}
                <Link
                  to="/insurance-policy"
                  className="text-accent font-semibold hover:underline"
                >
                  Policy of Insurance
                </Link>{" "}
                and
                <Link
                  to="/insurance-policy"
                  className="text-accent font-semibold hover:underline"
                >
                  {" "}
                  Important Disclosures
                </Link>
                .
              </p>
              <p className="mt-4">
                If you decline coverage, please be aware that you may be
                responsible for substantial cancellation fees and delay
                expenses.
              </p>
            </div>
            <div className="flex justify-center mt-6 pb-8">
              <button
                onClick={() => handleInsuranceButtonClick(true)}
                className="bg-cyan-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-cyan-700"
              >
                Yes, insure my trip
              </button>
              <button
                onClick={() => handleInsuranceButtonClick(false)}
                className="text-cyan-600 font-semibold py-2 px-6 ml-4 border border-cyan-600 rounded-full hover:bg-cyan-100 hover:border-cyan-700"
              >
                No, I will travel without insurance
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TravelerDetailsForm;
