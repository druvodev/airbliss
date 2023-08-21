import { format, parseISO } from "date-fns";
import emailjs from "@emailjs/browser";

const userBookingInfo = {};

const transformFlightInfo = (flightInfo) => {
  return {
    flightNumber: flightInfo.flightInfo.flightNumber,
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
export const handlePaymentLater = (flightInfo, userInfo) => {
  userBookingInfo.bookingReference = generateBookingId();
  userBookingInfo.user = {
    ...userInfo,
    PNR: generatePNR(),
  };
  userBookingInfo.flight = transformFlightInfo(flightInfo);
  userBookingInfo.status = "pending";
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
        "service_y6ldylc",
        "template_rkov8w3",
        templateParams,
        "w9Pnw6KhtfQAcLD4k"
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
