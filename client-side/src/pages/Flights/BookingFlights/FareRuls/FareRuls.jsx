import React from "react";

const FareRuls = () => {
  return (
    <section className="mt-3 border-[1px] rounded-sm">
      <div className=" p-2 border-b-[1px] bg-gray-100 flex gap-3 items-center">
        <img
          className="h-6 w-6"
          src="https://airlineimages.s3.ap-southeast-1.amazonaws.com/128/BG.png"
          alt=""
        />
        <h1>
          <b>Dhaka to Chittagong</b>
        </h1>
      </div>

      {/* Table Body */}
      <section className="p-3">
        <div>
          <h4 className="text-[13px]">
            <strong>Some ruls and regulations:</strong>
          </h4>

          <ol className="text-[10px]">
            <li>1. VOLUNTARY REFUNDS</li>
            <li>2. UNLESS OTHERWISE SPECIFIED</li>
            <li>3. PRICING UNIT AND COLLECT HIGHEST.</li>
            <li>4. VALIDATING CARRIER MAY REFUND TICKET.</li>
            <li>5. FOR TICKETING ON/AFTER 01APR 20</li>
            <li>6. VALID FOR INFANT WITHOUT A SEAT.</li>
          </ol>
        </div>

        <div className="bg-[#FFEDD1] rounded-sm mt-6">
          <p className="p-2 text-[10px]">
            *<b>Important</b>: The airline fees are continuously changing.
            AirBliess Ltd doesn’t certify the fees/price shown above. The
            mentioned fees are for prediction of easiness of our customer. You
            can change the date only by choosing the same airline on a different
            date. Users have to pay the fare difference of RBD or classes
            between booked and latest booking, if there is any.
          </p>
        </div>
      </section>
    </section>
  );
};

export default FareRuls;
