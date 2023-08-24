import React, { useEffect, useState } from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import DomToImage from "dom-to-image";
import { useSelector } from "react-redux";

const ETicket = () => {
  const flightInfo = useSelector((state) => state.userBookingInfo.flightInfo);
  const userInfo = useSelector((state) => state.userBookingInfo.userInfo);

  console.log(flightInfo, userInfo, "mybooking");

  const [img, setImg] = useState(null);
  const [isDownload, setDownload] = useState("download");

  useEffect(() => {
    const generateImage = () => {
      const content = document.getElementById("downloadTicket");
      if (content) {
        DomToImage.toBlob(content).then(function (blob) {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "ticket.png";
          link.click();
          setImg(blob);
        });
      }
    };
    generateImage();
    uploadToImgBB();
  }, [isDownload]);
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

  // const generateImage = () => {
  //   const content = document.getElementById("downloadTicket");
  //   if (content) {
  //     DomToImage.toBlob(content).then(function (blob) {
  //       const link = document.createElement("a");
  //       link.href = URL.createObjectURL(blob);
  //       link.download = "ticket.png";
  //       link.click();
  //       setImg(link);
  //     });
  //   }
  // };

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

  return (
    <div>
      <h2 className="text-2xl font-bold text-center pt-20 md:text-3xl">
        E-Ticket
      </h2>
      <div id="downloadTicket">
        <div className="px-4 pt-16  md:px-6 ">
          <div className="md:flex overflow-x-auto md:justify-between border-cyan-700 md:rounded-lg pr-0 max-w-4xl mx-auto bg-base-100 border-2">
            <div className="md:flex md:w-12 md:items-center md:justify-center bg-cyan-600 md:rounded-r-xl text-white">
              <span className="md:-rotate-90 font-bold p-2 whitespace-nowrap text-lg uppercase">
                A i r B l i s s
              </span>
            </div>
            <div className="md:flex md:w-8 items-center justify-center">
              <div className="-rotate-90"></div>
              <span className="-rotate-90 font-semibold px-2 whitespace-nowrap text-lg uppercase">
                AUG23TD7OX4
              </span>
            </div>
            <div className="text-cyan-900 p-2 md:border-r-4 pr-10 border-cyan-600 border-dotted">
              <div className=" pb-2 border-b-2 border-cyan-600 border-dotted">
                <p>Passenger</p>
                <p className="font-semibold">Name Passenger</p>
              </div>
              <hr className="text-cyan-500 font-bold" />
              <div className="flex gap-5 pb-2 border-b-2 border-cyan-600 border-dotted ">
                <div>
                  <p>Boarding Time</p>
                  <p className="font-semibold">09.00 AM</p>
                </div>
                <div>
                  <p>Gate</p>
                  <p className="font-semibold">12</p>
                </div>
                <div>
                  <p>Flight</p>
                  <p className="font-semibold">A1 234</p>
                </div>
              </div>
              <div className="flex gap-11 pb-2 border-b-2 border-cyan-600 border-dotted ">
                <div>
                  <p>Date</p>
                  <p className="font-semibold">15.12.2023</p>
                </div>
                <div>
                  <p>From</p>
                  <p className="font-semibold">Dhaka City</p>
                </div>
              </div>
              <div className="pb-2 border-b-2 border-cyan-600 border-dotted">
                <p>To</p>
                <p className="font-semibold">Borcelle City</p>
              </div>
              <div className="flex gap-[92px]">
                <div>
                  <p>Seat</p>
                  <p className="font-semibold">12</p>
                </div>
                <div>
                  <p>Group</p>
                  <p className="font-semibold">D</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-2xl font-bold text-cyan-900 mt-6">
                First Class
              </h3>
              <GiAirplaneDeparture className="text-[100px] text-cyan-900 mt-14" />
              <p className="w-52 text-cyan-900 text-xs text-justify">
                Please watch the departure board for the boarding & gate update
                boarding ends 15 min before departure
              </p>
            </div>
            <div className="md:py-2 mt-2 md:mt-0 text-white">
              <div className=" md:rounded-l-3xl p-5 h-[100%]  bg-cyan-600">
                <div className=" border-r-2 pr-10 border-cyan-600  border-dotted">
                  <div className=" pb-2 border-b-2 border-white border-dotted">
                    <p>Passenger</p>
                    <p className="font-semibold">Name Passenger</p>
                  </div>

                  <div className="flex gap-5 pb-2 border-b-2 border-white border-dotted ">
                    <div>
                      <p>Boarding Time</p>
                      <p className="font-semibold">09.00 AM</p>
                    </div>
                    <div>
                      <p>Gate</p>
                      <p className="font-semibold">12</p>
                    </div>
                    <div>
                      <p>Flight</p>
                      <p className="font-semibold">A1 234</p>
                    </div>
                  </div>
                  <div className="flex pb-2 border-b-2 border-white border-dotted ">
                    <div className="flex gap-10">
                      <div>
                        <p>From</p>
                        <p className="font-semibold">Dhaka City</p>
                      </div>
                      <div>
                        <p>To</p>
                        <p className="font-semibold">Borcelle City</p>
                      </div>
                    </div>
                  </div>
                  <div className="pb-2 ">
                    <div>
                      <p>Date</p>
                      <p className="font-semibold">15.12.2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* frontTicket */}
        <div className="px-4 mt-2 md:px-6 lg:px-8 xl:px-10 pb-20">
          <div
            id="downloadTicket"
            className="md:flex overflow-x-auto md:justify-between border-cyan-700 md:rounded-lg pr-0 max-w-4xl mx-auto bg-cyan-600 text-white border-2"
          >
            <div className="md:flex md:w-12 md:items-center md:justify-center bg-white border-r-2  border-cyan-900 md:rounded-r-xl text-white">
              <span className="md:-rotate-90 text-cyan-900  p-2 whitespace-nowrap font-bold text-lg uppercase">
                A i r B l i s s
              </span>
            </div>
            <div className="md:flex md:w-[45px] items-center justify-center">
              <span className="-rotate-90  font-semibold px-2 whitespace-nowrap text-lg uppercase">
                AUG23TD7OX4
              </span>
            </div>
            <div className="p-2 md:border-r-4 pr-10 border-white border-dotted">
              <div className=" pb-2 border-b-2 border-white border-dotted">
                <p>Passenger</p>
                <p className="font-semibold">Name Passenger</p>
              </div>

              <div className="flex gap-5 pb-2 border-b-2 border-white border-dotted ">
                <div>
                  <p>Boarding Time</p>
                  <p className="font-semibold">09.00 AM</p>
                </div>
                <div>
                  <p>Gate</p>
                  <p className="font-semibold">12</p>
                </div>
                <div>
                  <p>Flight</p>
                  <p className="font-semibold">A1 234</p>
                </div>
              </div>
              <div className="flex gap-11 pb-2 border-b-2 border-white border-dotted ">
                <div>
                  <p>Date</p>
                  <p className="font-semibold">15.12.2023</p>
                </div>
                <div>
                  <p>From</p>
                  <p className="font-semibold">Dhaka City</p>
                </div>
              </div>
              <div className="pb-2 border-b-2 border-white border-dotted">
                <p>To</p>
                <p className="font-semibold">Borcelle City</p>
              </div>
              <div className="flex gap-[92px]">
                <div>
                  <p>Seat</p>
                  <p className="font-semibold">12</p>
                </div>
                <div>
                  <p>Group</p>
                  <p className="font-semibold">D</p>
                </div>
              </div>
            </div>
            <div className="pb-2 flex flex-col flex-grow justify-center items-center">
              <GiAirplaneDeparture className="text-[200px] opacity-70" />
              <h1 className="text-3xl font-bold">A i r B l i s s</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="btn bg-cyan-600 -mt-12 mb-24 text-white hover:bg-cyan-800"
          onClick={() => {
            uploadToImgBB, setDownload(new Date());
          }}
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default ETicket;
