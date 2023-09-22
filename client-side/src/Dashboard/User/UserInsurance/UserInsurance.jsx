import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalInsurance from './ModalInsurance';
import logo from "../../../assets/icon/airblissBlack.png";
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { setRefetch } from '../../../redux/features/usersSlice';
import { Link } from 'react-router-dom';

const UserInsurance = () => {
  const [isActive, setIsActive] = useState("allInsurance");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flightRef, setFlightRef] = useState("");

  const newDate = new Date();
  const todayDate = format(newDate, "yyyy-MM-dd");
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state?.userInfo?.userBookings);
  const insuranceBookings = bookings.filter(
    (booking) => booking.insurancePolicy != "Without Insurance"
  );
  const confirmedData = insuranceBookings?.filter(confirmed => confirmed?.insurancePolicy?.claimedStatus === "approved")
  const cancelData = insuranceBookings?.filter(cancel => cancel?.insurancePolicy?.claimedStatus === "denied")
  const expiredData = insuranceBookings?.filter(expired => expired?.insurancePolicy?.endDate < todayDate)
  // console.log(insuranceBookings);

  const myFlight = bookings?.find(
    (flight) => flight?.bookingReference === flightRef
  );
  const premiumType = myFlight?.insurancePolicy?.requestedClaimInfo?.premiumType
  // console.log(myFlight);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const premiumType = event.target.premiumType.value;
    const requireAmount = event.target.requireAmount.value;
    const summary = event.target.summary.value;
    const image = event.target.image.files[0];

    console.log(premiumType, requireAmount, summary, image);

    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (imageData) => {
        const imageUrl = imageData.data.display_url;
        console.log(imageUrl);

        const insuranceData = {
          media: imageUrl,
          summary: summary,
          requireAmount: requireAmount,
          premiumType: premiumType,
        };
        try {
          const response = await fetch(
            `http://localhost:5000/insuranceClaim/${myFlight?.flight?.departureDate}/${myFlight?.flight?.departureAirport}/${myFlight?.bookingReference}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ insuranceData }),
            }
          );
          const data = await response.json();
          dispatch(setRefetch(new Date().toString()));
          console.log(data);
          closeModal();
        } catch (error) {
          console.error("Error saving user:", error);
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  }


  const handleTabClick = (tab) => {
    setIsActive(tab);
  };

  return (
    <div>
      <section className="bg-white p-4 shadow-md mt-5 flex md:flex-row flex-col  md:items-center md:mx-7 md:space-x-4">
        <div className="mb-2 md:mb-0">
          <h1 className="font-semibold ">All Insurance: </h1>
        </div>
        <div className="flex gap-1 rounded font-medium text-gray-600 text-sm">
          <div
            onClick={() => handleTabClick("allInsurance")}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${isActive === "allInsurance"
              ? "border-t-2 bg-cyan-50 border-cyan-400"
              : ""
              }`}
          >
            All Insurance
          </div>
          <div
            onClick={() => handleTabClick("confirm")}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${isActive === "confirm"
              ? "border-t-2 bg-cyan-50 border-cyan-400"
              : ""
              }`}
          >
            Confirm Insurance
          </div>
          <div
            onClick={() => handleTabClick("cancel")}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${isActive === "cancel"
              ? "border-t-2 bg-cyan-50 border-cyan-400"
              : ""
              }`}
          >
            Cancel Insurance
          </div>
          <div
            onClick={() => handleTabClick("expired")}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${isActive === "expired"
              ? "border-t-2 bg-cyan-50 border-cyan-400"
              : ""
              }`}
          >
            Expired Date
          </div>
        </div>
      </section>

      {isActive === "allInsurance" && (
        <ModalInsurance
          insuranceBookings={insuranceBookings}
          openModal={openModal}
          setFlightRef={setFlightRef}
          status="Insurance Status"
          todayDate={todayDate}
        />
      )}

      {isActive === "cancel" && (
        <ModalInsurance
          insuranceBookings={cancelData}
          openModal={openModal}
          setFlightRef={setFlightRef}
          status="cancel status"
          todayDate={todayDate}
        />
      )}

      {isActive === "confirm" && (
        <ModalInsurance
          insuranceBookings={confirmedData}
          openModal={openModal}
          setFlightRef={setFlightRef}
          status="confirm status"
          todayDate={todayDate}
        />
      )}

      {isActive === "expired" && (
        <ModalInsurance
          insuranceBookings={expiredData}
          openModal={openModal}
          setFlightRef={setFlightRef}
          todayDate={todayDate}
          status="expired status"
        />
      )}

      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-40 ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            } transition-opacity duration-300 `}
        >
          <div className=" bg-black/20 min-h-screen w-full flex justify-center items-center">
            {/* Modal content */}
            <div className="modal-box w-10/12 max-w-2xl max-h-[95vh] p-8 md:max-h-[100vh] overflow-y-scroll md:overflow-auto">
              <div className="bg-white w-full h-full rounded-lg ">
                <div className="flex lg:flex-row flex-col gap-2 md:gap-5 lg:gap-10 items-center mb-5">
                  <img className="w-24" src={logo} alt="Website Logo" />
                  <h2 className="text-lg text-center md:text-left md:text-xl font-semibold">
                    AirBliss Flight Insurance Claim Policy
                  </h2>
                </div>
                <hr />
                <div className="flex gap-5 md:gap-10 items-center my-2">
                  <div>
                    <h2 className="text-md font-semibold">Booking Date:</h2>
                    <p className="text-sm">
                      {myFlight?.bookingDateTime.split(" ")[0]}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-md font-semibold">Traveler:</h2>
                    <p className="text-sm">
                      {myFlight?.user?.title} {myFlight?.user?.first_name}{" "}
                      {myFlight?.user?.last_name}
                    </p>
                  </div>
                </div>
                <hr />

                <div className="mb-2 mt-5">
                  <h2 className="text-md font-semibold">Flight Details</h2>
                  <hr />
                  <div className="md:flex gap-5 items-center text-sm">
                    <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                      <h2 className="font-semibold">Airline</h2>
                      <p>{myFlight?.flight?.airline}</p>
                    </div>
                    <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0">
                      <h2 className="font-semibold">Route</h2>
                      <p>
                        {myFlight?.flight?.departureCity} to{" "}
                        {myFlight?.flight?.arrivalCity}
                      </p>
                    </div>
                    <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0">
                      <h2 className="font-semibold">Departure Date</h2>
                      <p>
                        {myFlight?.flight?.departureDate}{" "}
                        {myFlight?.flight?.departureTime}
                      </p>
                    </div>
                    <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0">
                      <h2 className=" font-semibold">Arrival Date</h2>
                      <p>
                        {myFlight?.flight?.arrivalDate}{" "}
                        {myFlight?.flight?.arrivalTime}
                      </p>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="mb-2 mt-5">
                  <h2 className="text-md font-semibold">Insurance Details</h2>
                  <hr />
                  <div className="md:flex gap-5 items-center text-sm">
                    <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                      <h2 className="font-semibold">Policy Number</h2>
                      <p>{myFlight?.insurancePolicy?.policyNumber}</p>
                    </div>
                    <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                      <h2 className="font-semibold">Policy Type</h2>
                      <p>{myFlight?.insurancePolicy?.policyType}</p>
                    </div>
                    <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                      <h2 className="font-semibold">Policy Start</h2>
                      <p>{myFlight?.insurancePolicy?.startDate}</p>
                    </div>
                    <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                      <h2 className="font-semibold">Policy end</h2>
                      <p>{myFlight?.insurancePolicy?.endDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="mb-2 mt-5">
                <h2 className="text-md font-semibold">Claimed Insurance</h2>
                <hr />
                {
                  myFlight?.insurancePolicy?.claimedStatus === "approved" || myFlight?.insurancePolicy?.claimedStatus === "denied" || myFlight?.insurancePolicy?.claimedStatus === "pending" ? (
                    <>
                      <div className="grid grid-cols-2 gap-5 mt-2 mb-3">
                        <div className="text-sm">
                          <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                            <h2 className="font-semibold">Premium Type</h2>
                            <p>{myFlight?.insurancePolicy?.requestedClaimInfo?.premiumType}</p>
                          </div>
                          <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                            <h2 className="font-semibold">Require Amount</h2>
                            <p>{myFlight?.insurancePolicy?.requestedClaimInfo?.requireAmount}</p>
                          </div>
                          <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                            <h2 className="font-semibold">Explain Reason</h2>
                            <p>{myFlight?.insurancePolicy?.requestedClaimInfo?.summary}</p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                            <h2 className="font-semibold">Reference Image</h2>
                            <Link to={myFlight?.insurancePolicy?.requestedClaimInfo?.media}>
                              <img className="w-[100px] h-[100px]" src={myFlight?.insurancePolicy?.requestedClaimInfo?.media} alt="" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="mt-2">
                        <h2 className="text-md font-semibold">Insurance Status</h2>
                        <div className="text-sm grid grid-cols-2 gap-5">
                          <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                            <h2 className="font-semibold">Premium Type</h2>
                            <p>{myFlight?.insurancePolicy?.requestedClaimInfo?.premiumType}</p>
                          </div>
                          {
                            myFlight?.insurancePolicy?.claimedStatus === "denied" ? <></> :
                              <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                                <h2 className="font-semibold">Payable Amount</h2>
                                <p>{myFlight?.insurancePolicy?.claimedInsurance[premiumType]?.claimedPrice}BDT</p>
                              </div>
                          }
                          <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                            <h2 className="font-semibold">Explain Reason</h2>
                            <p>{myFlight?.insurancePolicy?.deniedFeedback}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex modal-action justify-end mt-2 sm:mt-5 tracking-wide">
                        <button
                          className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            closeModal()
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label
                          htmlFor="gender"
                          className="block font-bold mb-2 text-md">
                          Insurance:
                          <span className="text-red-600">*</span>
                        </label>
                        <select
                          name="premiumType"
                          id="premiumType"
                          className="w-full px-[24px] py-[5px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                          required
                        >
                          <option value="">Select a Claim Type</option>
                          <option value="tripCancellation">Trip Cancellation</option>
                          <option value="medicalCoverage">Medical Coverage</option>
                          <option value="lostLuggage">Lost Luggage</option>
                          <option value="delayedFlight">Delayed Flight</option>
                        </select>
                      </div>
                      <div className='grid grid-cols-2 gap-5 pt-2'>
                        <div>
                          <label
                            htmlFor="DateOfBirth"
                            className="block font-bold mb-2 text-md">
                            Require Amount:
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="number"
                            name="requireAmount"
                            id="requireAmount"
                            placeholder="Enter Your From address Here"
                            className="w-full px-[24px] py-[5px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="image"
                            className="block font-bold mb-2 text-md">
                            Select Image:
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            required
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="exampleField"
                          className="block font-bold mb-2 text-md"
                        >
                          Write Your Reason
                          <span className="text-red-600">*</span>
                        </label>
                        <textarea
                          name="summary"
                          id="summary"
                          placeholder="Enter Your reason Here"
                          className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                          cols="5"
                          rows="2"
                          required
                        ></textarea>
                      </div>
                      <div className="flex modal-action justify-end mt-2 sm:mt-5 tracking-wide">
                        <button
                          className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            closeModal()
                          }}
                        >
                          Close
                        </button>
                        <button
                          onClick={() => closeModal()}
                          type="submit" // Use type="submit" here
                          className="bg-cyan-500 btn text-white active:bg-cyan-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInsurance;