/* eslint-disable react/prop-types */

const Heading = ({ subtitle, title }) => {
  return (
    <>
      <div className="capitalize text-cyan-700" id="heading">
        <h3 className="text-2xl text-center text-cyan-700">{subtitle}</h3>
        <h1 className="text-4xl text-center text-cyan-700">{title} </h1>
      </div>
    </>
  );
};

export default Heading;
