import Heading from "../Heading/Heading";
import "./Hero.css";
import { FaLongArrowAltRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div>
      <section className="hero">
        <div className="bg-black w-full h-full bg-opacity-30">
          <div className="container">
            <div className="flex flex-col justify-center items-center w-full h-full mt-20 md:mt-40  text-cyan-700">
              <Heading
                subtitle="About Airbliss"
                title="Your Gateway to Seamless Travel Experiences"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
