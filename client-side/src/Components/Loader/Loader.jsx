import Lottie from "lottie-react";
// import flight from "../../assets/Lotti/animation_llf4s0jy.json";
import loader from "../../assets/Lotti/openerLoader.json";

const Loader = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[calc(100vh-60px)]">
      <div className="w-80">
        <Lottie animationData={loader} loop={true} />
      </div>
      {/* <div className="flex justify-center items-center">
        <p className="text-7xl font-thin">L</p>
        <div className="w-10 h-10 border-8 border-dashed rounded-full animate-spin mt-5 border-cyan-500"></div>
        <p className="text-7xl font-thin">ading....</p>
      </div> */}
    </div>
  );
};

export default Loader;
