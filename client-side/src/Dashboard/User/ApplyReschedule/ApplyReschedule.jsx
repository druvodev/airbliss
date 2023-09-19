import React, { useState } from 'react';
import RescheduleTable from './RescheduleTable';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

const ApplyReschedule = () => {
    const [isActive, setIsActive] = useState("allflight");

    const dispatch = useDispatch();

    const handleTabClick = (tab) => {
        setIsActive(tab);
    };

    const newDate = new Date();
    const todayDate = format(newDate, "yyyy-MM-dd");
    console.log(todayDate);

    const bookings = useSelector((state) => state?.userInfo?.userBookings);
    console.log(bookings);

    const rescheduleBookingData = bookings.filter(
        (bookingData) => bookingData?.flight?.arrivalDate >= todayDate
    )
    console.log(rescheduleBookingData);

    return (
        <div className="lg:mt-10">
            <section className="bg-white p-4 shadow-md mt-5 flex md:flex-row flex-col  md:items-center md:mx-7 md:space-x-4">
                <div className="mb-2 md:mb-0">
                    <h1 className="font-semibold ">Apply Reschedule: </h1>
                </div>
                <div className="flex gap-1 rounded font-medium text-gray-600 text-sm">
                    <div
                        onClick={() => handleTabClick("allflight")}
                        className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${isActive === "allflight"
                            ? "border-t-2 bg-cyan-50 border-cyan-400"
                            : ""
                            }`}
                    >
                        All Flight
                    </div>
                    <div
                        onClick={() => handleTabClick("confirm")}
                        className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${isActive === "confirm"
                            ? "border-t-2 bg-cyan-50 border-cyan-400"
                            : ""
                            }`}
                    >
                        Confirm Reschedule
                    </div>
                    <div
                        onClick={() => handleTabClick("cancel")}
                        className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${isActive === "cancel"
                            ? "border-t-2 bg-cyan-50 border-cyan-400"
                            : ""
                            }`}
                    >
                        Cancel Reschedule
                    </div>
                </div>
            </section>

            {isActive === "allflight" && (
                <RescheduleTable
                    rescheduleBookingData={rescheduleBookingData}
                    // openModal={openModal}
                    // setFlightRef={setFlightRef}
                    status="flight status"
                />
            )}

            {isActive === "cancel" && (
                <RescheduleTable
                    rescheduleBookingData={rescheduleBookingData}
                    // openModal={openModal}
                    // setFlightRef={setFlightRef}
                    status="cancel status"
                />
            )}

            {isActive === "confirm" && (
                <RescheduleTable
                    rescheduleBookingData={rescheduleBookingData}
                    // openModal={openModal}
                    // setFlightRef={setFlightRef}
                    status="confirm status"
                />
            )}
        </div>
    );
};

export default ApplyReschedule;