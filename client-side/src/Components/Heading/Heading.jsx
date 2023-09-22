/* eslint-disable react/prop-types */

const Heading = ({ subtitle, title }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="capitalize mx-auto">
        <h3 className="text-2xl text-center text-white font-semibold md:text-5xl mb-3">
          {subtitle}
        </h3>
        <h1 className="text-xl text-center text-white font-bold md:text-3xl ">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Heading;
