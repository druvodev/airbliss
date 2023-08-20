import FareSummary from "../FareSummary/FareSummary";
import TrackingNavigation from "../TrackingNavigation/TrackingNavigation";
import TravelerDetailsForm from "../TravelerDetailsForm/TravelerDetailsForm";
import banner from "../../../assets/banner/review.webp";

const Review = () => {
  return (
<<<<<<< HEAD
    <>
      <img src={banner} className="w-full h-44 object-cover" alt="" />
      <div className="mt-10 max-w-7xl mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div>
              {" "}
              <TrackingNavigation />{" "}
            </div>
            <div className="mt-8">
              <TravelerDetailsForm />
            </div>
=======
    <div className="m-16 max-w-7xl mx-auto px-5 sm:px-10 pb-20">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div>
            <TrackingNavigation />
>>>>>>> a2edf955e369b00e82140012bad4405b40cb206e
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
