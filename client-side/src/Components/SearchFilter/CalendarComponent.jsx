import React from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarComponent = React.memo(({ date, setDate }) => {
  return (
    <>
      <Calendar
        rangeColors={["#262626"]}
        color="#0891B2"
        date={date}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        onChange={setDate}
        className="w-fit shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-md"
      />
    </>
  );
});

export default CalendarComponent;
