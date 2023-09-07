import banner from "../../assets/banner/insuranceBanner.webp";

const InsurancePolicy = () => {
  return (
    <>
      <img src={banner} className="w-full h-44 object-cover" alt="" />
      <div className="max-w-7xl mx-auto px-5 sm:px-10 relative pb-20">
        <h1 className="text-2xl font-bold bg-white px-10 py-4 rounded-xl -mt-5 shadow-md w-fit mx-auto">
          Important Disclosures and Insurance Policy
        </h1>

        <section className="mb-8 p-5 rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_6px] bg-gray-50 mt-20">
          <h2 className="text-xl font-semibold">Important Disclosures</h2>
          <p>
            Before you book your flight, it's crucial to understand these
            important details:
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Cancellation Policy</h3>
            <p>
              If you need to cancel your flight due to unexpected events (like
              illness or family emergencies), you may be eligible for a refund.
              For example, if you fall ill before your trip, our insurance can
              cover the cost of canceling your flight.
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Travel Documents</h3>
            <p>
              It's vital to have the right travel documents, such as a valid
              passport and required visas. For instance, if you're traveling to
              a destination that requires a visa, not having one could lead to
              entry issues.
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Baggage Policy</h3>
            <p>
              Familiarize yourself with our baggage policy to avoid surprises at
              the airport. For instance, if your luggage exceeds the weight
              limit, extra fees may apply.
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Check-in and Boarding</h3>
            <p>
              Arrive at the airport on time to complete check-in and security
              procedures. Missing your flight due to a late arrival may result
              in additional costs.
            </p>
          </div>
        </section>

        <section className="p-5 rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_6px] bg-gray-50 mt-10">
          <h2 className="text-xl font-semibold">Insurance Policy</h2>
          <p>
            Our travel insurance provides coverage for various aspects of your
            trip. Let's break it down:
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Coverage</h3>
            <p>
              Our insurance includes the following essential features during
              your journey:
            </p>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>
                <strong>Trip Cancellation Coverage:</strong> If you have to
                cancel your trip due to covered reasons (like illness or a
                natural disaster), our insurance can help reimburse your
                non-refundable expenses.
              </li>
              <li>
                <strong>Delayed Flight Coverage:</strong> If your flight is
                significantly delayed (e.g., due to airline issues), you may be
                eligible for compensation to cover additional expenses.
              </li>
              <li>
                <strong>Lost Luggage Coverage:</strong> Our insurance provides
                coverage if your luggage is lost, damaged, or stolen during your
                journey. For instance, if your luggage is damaged by the
                airline, we can help cover repair costs.
              </li>
              <li>
                <strong>Medical Coverage During Your Trip:</strong> In case you
                require medical attention during your trip, our insurance offers
                coverage for medical expenses. For example, if you fall ill
                while abroad and need to see a doctor, we can assist with
                medical bills.
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Policy Terms</h3>
            <p>
              Our insurance policy is valid throughout your trip. Make sure to
              read and understand the terms and conditions provided in the
              policy document. Clarity is key.
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Claims Procedure</h3>
            <p>
              If you encounter a covered incident during your trip, follow our
              straightforward claims procedure outlined in the policy document.
              We're here to help you navigate the process.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default InsurancePolicy;
