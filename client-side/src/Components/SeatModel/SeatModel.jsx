// import seat from "../assets/seatMap.svg";
import frontSide from "../../assets/seatModel/frontSide.png";
import bottomSide from "../../assets/seatModel/bottom.png";
import leftSide from "../../assets/seatModel/leftSide.png";
import { FcLock } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/features/bookingInfoSlice";

const SeatModel = ({ setIsModalOpen }) => {
  const seatData = useSelector(
    (state) => state?.userBookingInfo?.flightInfo?.availableSeats?.seats
  );
  const userInfo = useSelector((state) => state.userBookingInfo.userInfo);
  const dispatch = useDispatch();
  const aSeats = seatData.filter((seat) => seat.seatNo.startsWith("A"));
  const bSeats = seatData.filter((seat) => seat.seatNo.startsWith("B"));

  const handleSeat = (seatNo) => {
    // document.body.classList.remove("modal-open");
    const updatedUserInfo = { ...userInfo };
    updatedUserInfo.seatNo = seatNo;
    setIsModalOpen(false);
    dispatch(setUserInfo(updatedUserInfo));
  };

  return (
    <div className="flex items-center justify-center w-fit mx-auto ">
      <img
        src={leftSide}
        alt=""
        className="mr-[2px] -scale-x-100 mt-10 hidden lg:block"
      />
      <div className="grid justify-center w-80 font-semibold tracking-widest ">
        <img src={frontSide} className="w-full" alt="" />
        <div className="flex justify-between w-80 gap-12 mx-auto bg-[#F5F7FD] px-5 ">
          <div className="grid grid-cols-2 gap-y-7 gap-x-5">
            {aSeats.map((seat) => (
              <div
                key={seat.seatNo}
                onClick={() => {
                  if (seat.available) {
                    handleSeat(seat.seatNo);
                  }
                }}
                title={
                  seat.available
                    ? `Seat ${seat.seatNo} is available`
                    : `Seat ${seat.seatNo} is already booked`
                }
                className={`py-2 px-2 rounded border-2 ${
                  seat.available
                    ? "border-cyan-500 hover:border-cyan-600 bg-cyan-500 hover:bg-cyan-600 shadow shadow-cyan-300  text-white cursor-pointer"
                    : "bg-amber-100  border-amber-500 cursor-not-allowed relative"
                }`}
              >
                {seat.available ? (
                  seat.seatNo
                ) : (
                  <>
                    <FcLock className="text-xl bg-rose-500/20 backdrop-blur rounded-full absolute -top-2 -right-2" />{" "}
                    {seat.seatNo}
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-y-7 gap-x-5">
            {bSeats.map((seat) => (
              <div
                key={seat.seatNo}
                onClick={() => {
                  if (seat.available) {
                    handleSeat(seat.seatNo);
                  }
                }}
                title={
                  seat.available
                    ? `Seat ${seat.seatNo} is available`
                    : `Seat ${seat.seatNo} is already booked`
                }
                className={`py-2 px-2 rounded border-2 ${
                  seat.available
                    ? "border-cyan-500 hover:border-cyan-600 bg-cyan-500 hover:bg-cyan-600 shadow shadow-cyan-300  text-white cursor-pointer"
                    : "bg-amber-100  border-amber-500 cursor-not-allowed relative"
                }`}
              >
                {seat.available ? (
                  seat.seatNo
                ) : (
                  <>
                    <FcLock className="text-xl bg-rose-500/20 backdrop-blur rounded-full absolute -top-2 -right-2" />{" "}
                    {seat.seatNo}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <img src={bottomSide} className="w-full" alt="" />
      </div>
      <img src={leftSide} alt="" className="ml-[2px] mt-10 hidden lg:block" />
    </div>
  );
};

export default SeatModel;
