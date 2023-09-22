import React from "react";

const FlightSummery = ({ flightFullDetails }) => {
  const { passengerType } = flightFullDetails || {};
  const { baseFare, taxesAndFees, total } =
    flightFullDetails?.fareSummary || {};

  return (
    <section className="mt-3 border-[1px] rounded-sm">
      <h1 className=" p-3 border-b-[1px] font-semibold">Fare breakdown</h1>

      {/* Table Body */}
      <section className="p-3">
        <table className="border-collapse border w-full text-[10px] text-gray-500">
          <thead>
            <tr className="">
              <th className="border p-2" align="start">
                Fare Summary
              </th>
              <th className="border p-2" align="start">
                Base Fare
              </th>
              <th className="border p-2" align="start">
                Taxes + Fees
              </th>
              <th className="border p-2" align="start">
                Per Passenger
              </th>
              <th className="border p-2" align="start">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">{passengerType}</td>
              <td className="border p-2">BDT {baseFare}</td>
              <td className="border p-2">BDT {taxesAndFees}</td>
              <td className="border p-2">BDT {taxesAndFees}</td>
              <td className="border p-2">BDT {total}</td>
            </tr>
            <tr>
              <td className="border p-2">Total (1 Traveler)</td>
              <td className="border p-2"></td>
              <td className="border p-2"></td>
              <td className="border p-2"></td>
              <td className="border p-2">BDT {total}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default FlightSummery;
