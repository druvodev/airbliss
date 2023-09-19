import Heading from "../Heading/Heading";
import "./Hero.css";
import { FaLongArrowAltRight } from "react-icons/fa";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row text-cyan-700">
            <Heading subtitle="Welcome to airbliss" title="about us" />
          </div>
        </div>
      </section>
      <div className="margin"></div>
    </>
  );
};

export default Hero;
