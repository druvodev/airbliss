import Heading from "../Heading/Heading";
import "./AboutUsBanner.css";
import { FaLongArrowAltRight } from "react-icons/fa";

const AboutUsBanner = () => {
  return (
    <div>
      <section className="hero">
        <div className="row bg-black w-full h-full bg-opacity-30">
          <Heading
            subtitle="About Airbliss"
            title="Your Gateway to Seamless Travel Experiences"
          />
        </div>
      </section>
    </div>
  );
};

export default AboutUsBanner;
