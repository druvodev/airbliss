import React, { useEffect, useState } from "react";

const AddFlight = () => {
  const [allFlights, setAllFlights] = useState([]);
  const [selectAirportId, setSelectAirportId] = useState("");
  const [selectAirportCode, setSelectAirportCode] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/flights")
      .then((res) => res.json())
      .then((data) => setAllFlights(data));
  }, []);

  const handleAirportSelect = (event) => {
    const selectedAirportId = event.target.value;
    const selectedAirportCode =
      event.target.options[event.target.selectedIndex].text;
    setSelectAirportId(selectedAirportId);
    setSelectAirportCode(selectedAirportCode);
  };

  const handelSubmit = (event) => {
    event.preventDefault();

    const flightData = {
      name: "jishan",
      flight: "zet plain",
    };

    console.log(selectAirportId, selectAirportCode);

    const queryString = `airportId=${selectAirportId}&airportCode=${selectAirportCode}`;

    fetch(
      `http://localhost:5000/add_flight/${selectAirportId}?${queryString}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(flightData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <section className="shadow-md m-8 rounded-sm ">
      <div className="flex justify-between items-center p-4">
        <div>
          <h1 className="font-bold text-[18px]">Add New Flights</h1>
          <p className="text-[10px]">Airbliss Ltd.</p>
        </div>

        <div className="flex items-center bg-cyan-50 p-4 rounded-md mr-6">
          <select className="bg-cyan-50 " onChange={handleAirportSelect}>
            <option className="border-0" value="">
              Select Airport
            </option>
            {allFlights.map((airportData) => {
              const airportCode = Object.keys(airportData)[1];
              const airportId = Object.values(airportData)[0];
              return (
                <option key={airportCode} value={airportId}>
                  {airportCode}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <hr className="mb-2" />

      <div className="p-4 ">
        <form
          onSubmit={handelSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
          action=""
        >
          <input
            className="p-2 border-b-[0.5px] border-black"
            type="text"
            name=""
            id=""
            placeholder="Airline Logo"
          />

          <input
            className="p-2 border-b-[0.5px] border-black"
            type="text"
            name=""
            id=""
            placeholder="Airline Logo"
          />
          <input
            className="p-2 border-b-[0.5px] border-black"
            type="text"
            name=""
            id=""
            placeholder="Airline Logo"
          />

          <button type="submit" className="btn bg-cyan-500 text-white">
            Add Flights
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddFlight;
