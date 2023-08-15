import FareSummary from "../FareSummary/FareSummary";

const Review = () => {
  return (
    <div className="mt-16 max-w-7xl mx-auto px-5 sm:px-10">
      <div className="grid md:grid-cols-3 gap-5">
        <div className="col-span-2">
          <div>Tracking Navigation </div>
          <div className="mt-8">Left Side</div>
        </div>
        <div className="col-span-1">
          <FareSummary />
        </div>
      </div>
    </div>
  );
};

export default Review;
