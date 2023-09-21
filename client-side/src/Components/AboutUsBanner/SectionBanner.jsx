import Heading from "../Heading/Heading";
import "./SectionBanner.css";

const SectionBanner = ({ title, subtitle, bgImage }) => {
  console.log(bgImage);
  return (
    <div>
      <section
        className={`hero bg-[url("https://i.ibb.co/v4PLr16/flight-hero.jpg")]`}
      >
        <div className="row bg-black w-full h-full bg-opacity-30">
          <Heading subtitle={subtitle} title={title} />
        </div>
      </section>
    </div>
  );
};

export default SectionBanner;
