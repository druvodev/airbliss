import SearchFilter from "../../../components/SearchFilter";
import cover from "../../../assets/banner/skybg.jpg";
import plain from "../../../assets/banner/plain.png";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  const handleScroll = () => {
    setScrollOffset(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const updateAnimation = () => {
    const plainOffset = scrollOffset * 0.5;
    const img = document.getElementById("plainImg");
    img.style.transform = `translateX(${plainOffset}px)`;
    requestAnimationFrame(updateAnimation);
  };

  useEffect(() => {
    requestAnimationFrame(updateAnimation);
  }, [scrollOffset]);

  return (
    <>
      <div
        className="h-96 sm:h-[500px] w-full overflow-hidden relative z-30"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          id="plainImg"
          src={plain}
          alt=""
          className="mx-auto pt-20"
          style={{ transition: "none" }} // Disable CSS transition
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-full h-full bg-black/20">
          <div className="max-w-7xl mx-auto px-5 sm:px-10">
            <div className="absolute top-1/2 -translate-y-2/4 text-white">
              <h1 className="text-3xl sm:text-5xl font-light tracking-wide">
                Exclusive offer for visa cardholders
              </h1>
              <p className="mt-5 sm:mt-10 sm:text-lg">
                Save up to 10%* on fares
              </p>
              <button className="sm:text-lg px-6 sm:px-10 py-1 sm:py-2 rounded-full border mt-4 sm:mt-8">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-2/4 z-30 w-full">
        <SearchFilter />
      </div>
    </>
  );
};

export default Hero;
