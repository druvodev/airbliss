import React from "react";
import { Collapse } from "react-collapse";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const Accordion = ({ open, toggle, title, description }) => {
  return (
    <div>
      <div
        className="px-1 md:px-3 py-6 flex justify-between items-center border"
        onClick={toggle}
      >
        <p className="text-xl md:text-2xl font-semibold">{title}</p>
        <div className="text-xl font-semibold">
          {open ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </div>
      <Collapse isOpened={open}>
        <div className="border px-3 md:px-5 py-2 md:py-3 text-base">
          {description}
        </div>
      </Collapse>
    </div>
  );
};

export default Accordion;
