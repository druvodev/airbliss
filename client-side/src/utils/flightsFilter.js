export const nonStopLength = (flights) => {
  return flights.filter((flight) => {
    return flight.stopType === "Non Stop";
  }).length;
};

export const baggageAllowanceLength = (flights) => {
  return flights.filter((flight) => {
    return flight.flightInfo.baggage.includes("20 Kg");
  }).length;
};

export const refundableLength = (flights) => {
  return flights.filter((flight) => {
    return flight.refundableStatus.includes("Refundable");
  }).length;
};

export const noTransitTimeLength = (flights) => {
  return flights.filter((flight) => {
    return flight.duration <= 60;
  }).length;
};

export const highestPrice = (flights) => {
  const sortedFlights = flights
    .slice()
    .sort((a, b) => b.fareSummary?.total - a.fareSummary?.total);
  return sortedFlights[0].fareSummary?.total;
};

export const lowestPrice = (flights) => {
  const sortedFlights = flights
    .slice()
    .sort((a, b) => a.fareSummary?.total - b.fareSummary?.total);
  return sortedFlights[0].fareSummary?.total;
};
