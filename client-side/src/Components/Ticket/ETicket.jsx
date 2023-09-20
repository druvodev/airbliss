import React, { useEffect, useState } from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import DomToImage from "dom-to-image";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import airbliss from "../../assets/banner/airblibanner.png";
import emailjs from "@emailjs/browser";
import { HashLoader } from "react-spinners";

const ETicket = ({ booking }) => {
  const [myBooking, setBooking] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const refID = useParams();

  useEffect(() => {
    setIsLoading(true);
    useAxios
      .get(`/bookings/${refID.bookingId}`)
      .then((res) => {
        setBooking(res.data);
        setIsLoading(false);
        const info = res.data;
        const templateParams = {
          bookingID: info?.bookingReference,
          transitionId: info?.transitionId,
          from_name: `${info?.user.first_name} ${info?.user.last_name}`,
          from_email: info?.user.traveler_email,
          amount: info?.flight.fareSummary?.total,
          departureDate: info?.flight.departureDate,
        };
        emailjs
          .send(
            "service_g3u6g2j",
            "template_lie9arz",
            templateParams,
            "08zZeCBY_SKio7TxV"
          )
          .then(
            (response) => {
              console.log(
                "Invoice Send SUCCESS!",
                response.status,
                response.text
              );
            },
            (err) => {
              console.log("FAILED...", err);
            }
          );
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
      });
  }, []);

  const [img, setImg] = useState(null);
  const [isDownload, setDownload] = useState("download");

  const uploadToImgBB = () => {
    if (img) {
      const formData = new FormData();
      formData.append("image", img);

      fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // You can handle the response from ImgBB here
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const generateImage = () => {
    const content = document.getElementById("downloadTicket");
    if (content) {
      DomToImage.toBlob(content).then(function (blob) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "ticket.png";
        link.click();
        setImg(link);
      });
    }
  };

  const { title, first_name, last_name, seatNo } = booking?.user || {};

  const {
    flightNumber,
    departureCity,
    arrivalCity,
    departureDate,
    departureTime,
  } = booking?.flight || {};

  // GeneratePDF
  // const generatePDF = () => {
  //   const content = document.getElementById("downloadTicket");
  //   if (content) {
  //     DomToImage.toPng(content).then(function (dataUrl) {
  //       const pdf = new jsPDF();
  //       const img = new Image();
  //       img.src = dataUrl;
  //       pdf.addImage(img, "PNG", 10, 10, 200, 250); // Adjust the position and dimensions
  //       pdf.save("ticket.pdf");
  //     });
  //   }
  // };

  // seat and group identify................
  const group = myBooking?.user?.seatNo?.charAt(0);
  const seat = myBooking?.user?.seatNo?.substring(1);

  return (
    <div className="dark:bg-gray-900">
      {booking ? (
        ""
      ) : (
        <div>
          <img
            src={airbliss}
            className="w-[100vw] h-36 md:w-full md:h-52 object-cover"
            alt=""
          />
        </div>
      )}
      <h2 className="text-2xl font-bold mt-2 text-center md:text-3xl dark:text-gray-400">
        E-Ticket
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[calc(100vh-260px)]">
          <HashLoader color="#0891B2" />
        </div>
      ) : (
        <>
          <div id="downloadTicket">
            <div className="px-4 pt-10 mt-2  md:px-6 ">
              <div className="md:flex overflow-x-auto md:justify-between border-cyan-700 md:rounded-lg pr-0 max-w-4xl mx-auto bg-base-100 border-2 dark:bg-gray-800 dark:border-0">
                {/* Airblisss area */}
                <div className="md:flex md:w-12 md:items-center md:justify-center bg-cyan-600 md:rounded-r-xl text-white">
                  <span className="md:-rotate-90 font-bold p-2 whitespace-nowrap text-lg uppercase">
                    A i r B l i s s
                  </span>
                </div>
                {/* Booking reference date area */}
                <div className="md:flex md:w-8 items-center justify-center">
                  <span className="-rotate-90  font-semibold px-2 whitespace-nowrap text-lg uppercase">
                    {myBooking?.bookingReference || booking?.bookingReference}
                  </span>
                </div>
                {/* passenger details area */}
                <div className="text-cyan-900 p-2 md:border-r-4 pr-10 border-cyan-600 border-dotted dark:text-gray-400  dark:border-gray-400">
                  <div className="pb-2 border-b border-cyan-600 border-dotted ">
                    <p>Passenger</p>
                    <p className="font-semibold">
                      {myBooking.user?.title
                        ? `${myBooking.user?.title} ${myBooking.user?.first_name} ${myBooking.user?.last_name}`
                        : `${title} ${first_name} ${last_name}`}
                    </p>
                  </div>

                  <div className="flex gap-5 pb-2 border-b-2 border-cyan-600 border-dotted ">
                    <div>
                      <p>Boarding Time</p>
                      <p className="font-semibold">
                        {myBooking?.flight?.departureTime || departureTime}
                      </p>
                    </div>
                    <div>
                      <p>Gate</p>
                      <p className="font-semibold">12</p>
                    </div>
                    <div>
                      <p>Flight</p>
                      <p className="font-semibold">
                        {myBooking.flight?.flightNumber || flightNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-11 pb-2 border-b-2 border-cyan-600 border-dotted ">
                    <div>
                      <p>Date</p>
                      <p className="font-semibold">
                        {myBooking?.flight?.departureDate || departureDate}
                      </p>
                    </div>
                    <div>
                      <p>From</p>
                      <p className="font-semibold">
                        {myBooking?.flight?.departureCity || departureCity} City
                      </p>
                    </div>
                  </div>
                  <div className="pb-2 border-b-2 border-cyan-600 border-dotted">
                    <p>To</p>
                    <p className="font-semibold">
                      {myBooking?.flight?.arrivalCity || arrivalCity} City
                    </p>
                  </div>
                  <div className="flex gap-[92px]">
                    <div>
                      <p>Seat</p>
                      <p className="font-semibold">
                        {seat || seatNo?.substring(1)}
                      </p>
                    </div>
                    <div>
                      <p>Group</p>
                      <p className="font-semibold">
                        {group || seatNo?.charAt(0)}
                      </p>
                    </div>
                  </div>
                </div>
                {/* seat Class area */}
                <div className="flex flex-col justify-center items-center ">
                  <h3 className="text-2xl font-bold text-cyan-900  mt-6 dark:text-gray-400">
                    First Class
                  </h3>
                  <GiAirplaneDeparture className="text-[100px] text-cyan-900 dark:text-gray-400 mt-14" />
                  <p className="w-52 text-cyan-900 text-xs text-justify dark:text-gray-400">
                    Please watch the departure board for the boarding & gate
                    update boarding ends 15 min before departure
                  </p>
                </div>
                {/* colored info area */}
                <div className="md:py-2 mt-2 md:mt-0 text-white ">
                  <div className=" md:rounded-l-3xl p-5 pr-0 h-[100%]  bg-cyan-600 dark:bg-slate-600 dark:text-gray-400 dark:shadow-md dark:shadow-white/10 dark:backdrop-blur-lg">
                    <div className=" border-r-2 pr-5 border-cyan-600   border-dotted">
                      <div className=" pb-2 border-b-2 border-white border-dotted">
                        <p>Passenger</p>
                        <p className="font-semibold">
                          {" "}
                          {myBooking.user?.title
                            ? `${myBooking.user?.title} ${myBooking.user?.first_name} ${myBooking.user?.last_name}`
                            : `${title} ${first_name} ${last_name}`}
                        </p>
                      </div>

                      <div className="flex gap-5 pb-2 border-b-2 border-white border-dotted ">
                        <div>
                          <p>Boarding Time</p>
                          <p className="font-semibold">
                            {myBooking?.flight?.departureTime || departureTime}
                          </p>
                        </div>
                        <div>
                          <p>Gate</p>
                          <p className="font-semibold">12</p>
                        </div>
                        <div>
                          <p>Flight</p>
                          <p className="font-semibold">
                            {myBooking.flight?.flightNumber || flightNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex pb-2 border-b-2 border-white border-dotted ">
                        <div className="flex gap-10">
                          <div>
                            <p>From</p>
                            <p className="font-semibold">
                              {myBooking?.flight?.departureCity ||
                                departureCity}{" "}
                              City
                            </p>
                          </div>
                          <div>
                            <p>To</p>
                            <p className="font-semibold">
                              {myBooking?.flight?.arrivalCity || arrivalCity}{" "}
                              City
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="pb-2 ">
                        <div>
                          <p>Date</p>
                          <p className="font-semibold">
                            {myBooking?.flight?.departureDate || departureDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* frontTicket */}
            <div className="px-4 mt-2 md:px-6 lg:px-8 xl:px-10 pb-20">
              <div className="md:flex overflow-x-auto md:justify-between border-cyan-700 md:rounded-lg pr-0 max-w-4xl mx-auto bg-cyan-600 text-white border-2 dark:bg-gray-800 dark:border-0 ">
                {/* AirBliss area */}
                <div className="md:flex md:w-12 md:items-center md:justify-center bg-white border-r-2  border-cyan-900 md:rounded-r-xl text-white dark:bg-slate-800">
                  <span className="md:-rotate-90 text-black font-bold p-2 whitespace-nowrap text-lg uppercase dark:text-gray-300">
                    A i r B l i s s
                  </span>
                </div>
                {/* reference area */}
                <div className="md:flex md:w-[55px] items-center justify-center">
                  <span className="-rotate-90  font-semibold whitespace-nowrap text-lg uppercase dark:text-gray-300">
                    {myBooking?.bookingReference || booking?.bookingReference}
                  </span>
                </div>
                {/* passenger details area */}
                <div className="text-white p-2 md:border-r-4 pr-10 border-white border-dotted dark:text-gray-400 dark:border-gray-400">
                  <div className=" pb-2 border-b-2 border-white border-dotted">
                    <p>Passenger</p>
                    <p className="font-semibold">
                      {" "}
                      {myBooking.user?.title
                        ? `${myBooking.user?.title} ${myBooking.user?.first_name} ${myBooking.user?.last_name}`
                        : `${title} ${first_name} ${last_name}`}
                    </p>
                  </div>

                  <div className="flex gap-5 pb-2 border-b-2 border-white border-dotted ">
                    <div>
                      <p>Boarding Time</p>
                      <p className="font-semibold">
                        {myBooking?.flight?.departureTime || departureTime}
                      </p>
                    </div>
                    <div>
                      <p>Gate</p>
                      <p className="font-semibold">12</p>
                    </div>
                    <div>
                      <p>Flight</p>
                      <p className="font-semibold">
                        {myBooking.flight?.flightNumber || flightNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-11 pb-2 border-b-2 border-white border-dotted ">
                    <div>
                      <p>Date</p>
                      <p className="font-semibold">
                        {myBooking?.flight?.departureDate || departureDate}
                      </p>
                    </div>
                    <div>
                      <p>From</p>
                      <p className="font-semibold">
                        {myBooking?.flight?.departureCity || departureCity} City
                      </p>
                    </div>
                  </div>
                  <div className="pb-2 border-b-2 border-white border-dotted">
                    <p>To</p>
                    <p className="font-semibold">
                      {myBooking?.flight?.arrivalCity || arrivalCity} City
                    </p>
                  </div>
                  <div className="flex gap-[92px]">
                    <div>
                      <p>Seat</p>
                      <p className="font-semibold">
                        {seat || seatNo?.substring(1)}
                      </p>
                    </div>
                    <div>
                      <p>Group</p>
                      <p className="font-semibold">
                        {group || seatNo?.charAt(0)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pb-2 flex flex-col flex-grow justify-center items-center">
                  <GiAirplaneDeparture className="text-[200px] opacity-70 dark:text-gray-400" />
                  <h1 className="text-3xl font-bold dark:text-gray-400">
                    A i r B l i s s
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="btn bg-cyan-600 -mt-12 mb-24 text-white hover:bg-cyan-800"
              onClick={() => {
                uploadToImgBB(), generateImage();
              }}
            >
              Download Ticket
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ETicket;
