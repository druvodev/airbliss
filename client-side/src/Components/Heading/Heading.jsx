/* eslint-disable react/prop-types */

const Heading = ({ subtitle, title }) => {
  return (
    <>
      <div className="capitalize">
        <h3 className="text-3xl text-center text-white font-semibold md:text-5xl mb-3">
          {subtitle}
        </h3>
        <h1 className="text-2xl text-center text-white font-bold md:text-3xl">
          {title}
        </h1>
      </div>
    </>
  );
};

export default Heading;
