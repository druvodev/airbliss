import { format, parseISO } from "date-fns";
import emailjs from "@emailjs/browser";
import useAxios from "../hooks/useAxios";

const userBookingInfo = {};

const transformFlightInfo = (flightInfo) => {
  return {
    flightNumber: flightInfo?.flightInfo?.flightNumber,
    airline: flightInfo.airlineName,
    aircraft: flightInfo.flightInfo.aircraft,
    departureAirport: flightInfo.departure.code,
    departureCity: flightInfo.departure.city,
    arrivalAirport: flightInfo.arrival.code,
    arrivalCity: flightInfo.arrival.city,
    departureDate: flightInfo.departure.date,
    departureTime: flightInfo.departure.time,
    arrivalDate: flightInfo.arrival.date,
    arrivalTime: flightInfo.arrival.time,
    fareSummary: flightInfo.fareSummary,
    class: flightInfo.flightInfo.class,
    seat: "",
  };
};

// Generate Booking ID
function generateBookingId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 6;

  const currentDate = new Date();
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear().toString().slice(-2);

  let additionalCharacters = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    additionalCharacters += characters.charAt(randomIndex);
  }
  return `${month}${year}${additionalCharacters}`;
}

// Generate Passenger Name Record Code PNR
function generatePNR() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let pnr = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    pnr += characters.charAt(randomIndex);
  }

  return pnr;
}

function formatDateTime(date) {
  return format(date, "dd/MM/yyyy 'at' HH:mm");
}

//------------------------------------------- Handle Pending Payment Flights
export const paymentLater = (flightInfo, userInfo) => {
  userBookingInfo.bookingReference = generateBookingId();
  userBookingInfo.user = {
    ...userInfo,
    PNR: generatePNR(),
  };
  userBookingInfo.flight = transformFlightInfo(flightInfo);
  userBookingInfo.paymentStatus = "pending";
  userBookingInfo.bookingDateTime = formatDateTime(new Date());

  if (userBookingInfo) {
    function formatDepartureDate(departureDate) {
      const parsedDate = parseISO(departureDate);
      return format(parsedDate, "EEE, dd MMM yyyy", {
        awareOfUnicodeTokens: true,
      });
    }
    const { bookingReference, bookingDateTime, user, flight } = userBookingInfo;
    const templateParams = {
      bookingID: bookingReference,
      bookingDateTime: bookingDateTime,
      PNR: user.PNR,
      from_name: `${user.first_name} ${user.last_name}`,
      from_email: user.traveler_email,
      message: ` ${flight.departureCity} (${flight.departureAirport}) to ${
        flight.arrivalCity
      } (${flight.arrivalAirport}) starting at ${formatDepartureDate(
        flight.departureDate
      )}`,
    };

    // Come back soon...........................
    emailjs
      .send(
        "service_g3u6g2j",
        "template_6gdp0x6",
        templateParams,
        "08zZeCBY_SKio7TxV"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  }
};

// -----------------------------------Handle Processing Payment
export const paymentProcessing = (flightInfo, userInfo, insurance) => {
  userBookingInfo.bookingReference = generateBookingId();
  userBookingInfo.insurance = insurance;
  userBookingInfo.user = {
    ...userInfo,
    PNR: generatePNR(),
  };

  userBookingInfo.flight = transformFlightInfo(flightInfo);
  userBookingInfo.paymentStatus = "processing";
  userBookingInfo.bookingDateTime = formatDateTime(new Date());
  userBookingInfo.totalSeat = flightInfo?.departure.seats;
  userBookingInfo.flightId = flightInfo?._id;
  userBookingInfo.airlineLogo = flightInfo?.airlineLogo;

  // Make a POST request using Axios from useAxios hook
  useAxios
    .post("/process-payment", userBookingInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.data.paymentUrl) {
        const paymentURL = response.data.paymentUrl;
        console.log("Payment URL: ", paymentURL);
        window.location.replace(paymentURL);
      } else {
        console.log("Payment Processing Failed: ", response.data);
      }
    })
    .catch((error) => {
      console.error("An error occurred during payment processing: ", error);
    });
};
