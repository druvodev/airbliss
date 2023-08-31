import FareSummary from "../FareSummary/FareSummary";
import TrackingNavigation from "../TrackingNavigation/TrackingNavigation";
import TravelerDetailsForm from "../TravelerDetailsForm/TravelerDetailsForm";
import banner from "../../../assets/banner/review.webp";
import { useSelector } from "react-redux";

const Review = () => {
  return (
    <>
      <img src={banner} className="w-full h-44 object-cover" alt="" />
      <div className="mt-3 max-w-7xl mx-auto px-5 sm:px-10 pb-20">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div>
              <TrackingNavigation />
            </div>
            <div className="mt-8">
              <TravelerDetailsForm />
            </div>
          </div>
          <div className="md:col-span-1 mt-14">
            <FareSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
