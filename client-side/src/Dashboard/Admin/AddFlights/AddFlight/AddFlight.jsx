import React, { useEffect, useState } from "react";
import { setLoading } from "../../../../redux/features/globalSlice";
import { toast } from "react-hot-toast";
import shortid from "shortid";
import { MdOutlineCloudUpload } from "react-icons/md";
import { errorToast, successToast } from "../../../../utils/toast";

import { setAllFlights } from "../../../../redux/features/addFlightSlice";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  airportName: "",
  airlineLogo: "",
  airlineName: "",
  airlineStatus: "",
  amountPerKm: "",
  taxesAndFees: "",
  totalSeats: "",
  passengerType: "",
  stopType: "",
  refundableStatus: "",
  flightInfo: {
    flightNumber: "",
    aircraft: "",
    operatedBy: "",
    class: "",
    baggage: "",
    checkIn: "",
    cabin: "",
  },
  cancellationRules: [{ rule: "", amountPerKm: "" }],
  dateChangeRules: [{ rule: "", amountPerKm: "" }],
  details: {
    code: "",
    time: "",
    city: "",
    latitude: "",
    longitude: "",
    terminal: "",
  },
  notes: [],
  durationPerKm: "",
};

const AddFlight = () => {
  const allFlights = useSelector((state) => state?.addFlight?.allFlights);
  const [selectAirportId, setSelectAirportId] = useState("");
  const [selectAirportCode, setSelectAirportCode] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [notes, setNotes] = useState(initialFormData.notes);
  const [chekAirportSelect, setchekAirportSelect] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:5000/flights")
      .then((res) => res.json())
      .then((data) => dispatch(setAllFlights(data)));
  }, []);

  const handleAirportSelect = (event) => {
    const selectedAirportId = event.target.value;
    const selectedAirportCode =
      event.target.options[event.target.selectedIndex].text;
    setSelectAirportId(selectedAirportId);
    setSelectAirportCode(selectedAirportCode);

    if (selectedAirportCode.length >= 1) {
      setchekAirportSelect(false);
    }
  };

  const updateFlightInfo = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      flightInfo: {
        ...prevData.flightInfo,
        [field]: value,
      },
    }));
  };

  const updateDetails = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        [field]: value,
      },
    }));
  };

  const updateDateChangeRules = (ruleIndex, field, value) => {
    setFormData((prevData) => {
      const updatedDateChangeRules = [...prevData.dateChangeRules];
      updatedDateChangeRules[ruleIndex] = {
        ...updatedDateChangeRules[ruleIndex],
        [field]: value,
      };

      return {
        ...prevData,
        dateChangeRules: updatedDateChangeRules,
      };
    });
  };

  const updateCancellationRules = (ruleIndex, field, value) => {
    setFormData((prevData) => {
      const updatedCancellationRules = [...prevData.cancellationRules];
      updatedCancellationRules[ruleIndex] = {
        ...updatedCancellationRules[ruleIndex],
        [field]: value,
      };

      return {
        ...prevData,
        cancellationRules: updatedCancellationRules,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("flightInfo")) {
      const field = name.split(".")[1];
      updateFlightInfo(field, value);
    } else if (name.startsWith("details")) {
      const field = name.split(".")[1];
      updateDetails(field, value);
    } else if (name.startsWith("dateChangeRules")) {
      const ruleIndex = parseInt(name.match(/\[(\d+)\]/)[1]);
      const field = name.match(/\.(.*)/)[1];
      updateDateChangeRules(ruleIndex, field, value);
    } else if (name.startsWith("cancellationRules")) {
      const ruleIndex = parseInt(name.match(/\[(\d+)\]/)[1]);
      const field = name.match(/\.(.*)/)[1];
      updateCancellationRules(ruleIndex, field, value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddNote = () => {
    setNotes([...notes, ""]);
  };

  const handleRemoveNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      // Send the image to ImgBB
      const imgbbResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgbbData = await imgbbResponse.json();

      if (imgbbData && imgbbData.data) {
        // Set the image link in your form data
        setFormData((prevData) => ({
          ...prevData,
          airlineLogo: imgbbData.data.url,
        }));
      } else {
        console.error("Error uploading image to ImgBB");
      }
    }
  };

  const handelSubmit = (event) => {
    event.preventDefault();

    if (chekAirportSelect) {
      return errorToast("Please Select Airport From Top");
    }

    const generatedId = shortid.generate();
    // Update the notes in formData
    const updatedFormData = {
      ...formData,
      notes: notes,
    };

    // Add the generated ID and airportName to the formData
    const finalFormData = {
      ...updatedFormData,
      _id: generatedId,
      airportName: selectAirportCode,
    };

    const queryString = `airportId=${selectAirportId}&airportCode=${selectAirportCode}`;

    fetch(
      `http://localhost:5000/add_flight/${selectAirportId}?${queryString}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      }
    )
      .then((res) => {
        res.json();
      })
      .then((insertResult) => {
        successToast("Flight Added Successfully");
      });
  };

  return (
    <section className="shadow-md bg-white m-2 lg:m-8 rounded-sm ">
      <div className="flex justify-between items-center p-4">
        <div>
          <h1 className="font-bold text-[18px]">Add New Flights</h1>
          <p className="text-[10px]">Airbliss Ltd.</p>
        </div>

        <div className="flex items-center bg-white shadow-md  hover:border-2 border-t-2 border-black p-4 rounded-md md:mr-6">
          <select
            required
            className=" cursor-pointer "
            onChange={handleAirportSelect}
          >
            <option className="border-0 bg-white" value="">
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
        <form className="  mb-8" onSubmit={handelSubmit}>
          {/* Ariport Info */}
          <section className="">
            <div className="ml-[5px] mb-1">
              <p className="text-sm font-semibold ">Airline Information</p>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="airportName"
                  value={formData.airportName}
                  onChange={handleChange}
                  placeholder="Airport Name"
                  required
                />
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="airlineName"
                  value={formData.airlineName}
                  onChange={handleChange}
                  placeholder="Airline Name"
                  required
                />
              </div>

              <div>
                <label className=" relative border-b-[1px] w-full border-black md:w-[195px] py-2 px-4 cursor-pointer flex items-center">
                  <span className="absolute inset-0 z-10"></span>
                  <MdOutlineCloudUpload className="mr-2" />
                  Airline Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                    className="absolute inset-0 z-20  w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min  border-black"
                  type="number"
                  name="amountPerKm"
                  value={formData.amountPerKm}
                  onChange={handleChange}
                  placeholder="Amount Per Km Ex:(0.2)"
                  required
                />
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="number"
                  name="taxesAndFees"
                  value={formData.taxesAndFees}
                  onChange={handleChange}
                  placeholder="Taxes and Fees Ex:(200)"
                  required
                />
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="number"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  placeholder="Total Seats Ex:(50)"
                  required
                />
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="passengerType"
                  value={formData.passengerType}
                  onChange={handleChange}
                  placeholder="Passenger Type"
                  required
                />
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="stopType"
                  value={formData.stopType}
                  onChange={handleChange}
                  placeholder="Stop Type"
                  required
                />
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="refundableStatus"
                  value={formData.refundableStatus}
                  onChange={handleChange}
                  placeholder="Refundable Status"
                  required
                />
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="durationPerKm"
                  value={formData.durationPerKm}
                  onChange={handleChange}
                  placeholder="Duration Per Km Ex:(0.2)"
                  required
                />
              </div>

              <div>
                <select
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  name="airlineStatus"
                  value={formData.airlineStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="">Flight Status</option>
                  <option value="running">Running</option>
                  <option value="stop">Stop</option>
                </select>
              </div>
            </div>
          </section>

          <section className="">
            <div className="ml-[5px] mb-2 mt-6">
              <p className="text-sm font-semibold ">Flight Information</p>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="flightInfo.aircraft"
                  value={formData.flightInfo.aircraft}
                  onChange={handleChange}
                  placeholder="Aircraft"
                  required
                />
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="flightInfo.operatedBy"
                  value={formData.flightInfo.operatedBy}
                  onChange={handleChange}
                  placeholder="Operated By"
                  required
                />
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="flightInfo.flightNumber"
                  value={formData.flightInfo.flightNumber}
                  onChange={handleChange}
                  placeholder="Flight Number "
                  required
                />
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="flightInfo.class"
                  value={formData.flightInfo.class}
                  onChange={handleChange}
                  placeholder="Class"
                  required
                />
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="flightInfo.baggage"
                  value={formData.flightInfo.baggage}
                  onChange={handleChange}
                  placeholder="Baggage Kg Ex:(12)"
                  required
                />
              </div>
              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="flightInfo.checkIn"
                  value={formData.flightInfo.checkIn}
                  onChange={handleChange}
                  placeholder="Check-in Kg Ex:(6)"
                  required
                />
              </div>

              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="flightInfo.cabin"
                  value={formData.flightInfo.cabin}
                  onChange={handleChange}
                  placeholder="Cabin Kg Ex:(4)"
                  required
                />
              </div>
            </div>
          </section>

          <section className="">
            <div className="ml-[5px] mb-1 mt-6">
              <p className="text-sm font-semibold ">Flight Details</p>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="details.code"
                  value={formData.details.code}
                  onChange={handleChange}
                  placeholder="Details Code Ex:(DAC)"
                  required
                />
              </div>
              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="time"
                  name="details.time"
                  value={formData.details.time}
                  onChange={handleChange}
                  placeholder="Details Time"
                  required
                />
              </div>
              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="details.city"
                  value={formData.details.city}
                  onChange={handleChange}
                  placeholder="Details City"
                  required
                />
              </div>
              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="details.latitude"
                  value={formData.details.latitude}
                  onChange={handleChange}
                  placeholder="Details Latitude"
                  required
                />
              </div>
              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="details.longitude"
                  value={formData.details.longitude}
                  onChange={handleChange}
                  placeholder="Details Longitude"
                  required
                />
              </div>
              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="details.terminal"
                  value={formData.details.terminal}
                  onChange={handleChange}
                  placeholder="Details Terminal"
                  required
                />
              </div>
            </div>
          </section>

          <section className="">
            <div className="ml-[5px] mb-1 mt-6">
              <p className="text-sm font-semibold ">Flight Ruls</p>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                {/* Adding date change rules */}
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="dateChangeRules[0].rule"
                  onChange={handleChange}
                  placeholder="Date Change Rules"
                  required
                />
              </div>
              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="number"
                  name="dateChangeRules[0].amountPerKm"
                  onChange={handleChange}
                  placeholder="Date Change Prise Ex(50)"
                  required
                />
              </div>
              <div>
                {/* Adding cancellation rules */}
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="text"
                  name="cancellationRules[0].rule"
                  onChange={handleChange}
                  placeholder="Cancellation Rules"
                  required
                />
              </div>
              <div>
                <input
                  className="p-2 border-b-[0.5px] w-full md:w-min border-black"
                  type="number"
                  name="cancellationRules[0].amountPerKm"
                  onChange={handleChange}
                  placeholder="Cancellation Prise Ex(300)"
                  required
                />
              </div>
            </div>
          </section>

          <div>
            <button
              className="p-1 shadow border-[1px]  mt-5"
              onClick={handleAddNote}
            >
              Add Fare Regulation +
            </button>

            {notes.map((note, index) => (
              <div
                key={index}
                className="mt-2 p-2 border border-gray-300 rounded shadow"
              >
                <input
                  type="text"
                  required
                  className="w-full border p-2 border-black"
                  placeholder="Enter Fare Ruls"
                  value={note}
                  onChange={(e) => {
                    const updatedNotes = [...notes];
                    updatedNotes[index] = e.target.value;
                    setNotes(updatedNotes);
                  }}
                />
                <button
                  className="btn text-white mt-8 bg-cyan-500 hover:border-2 hover:border-black hover:bg-white hover:text-cyan-500"
                  onClick={() => handleRemoveNote(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            className="btn text-white mt-8 bg-cyan-500 hover:border-2 hover:border-black hover:bg-white hover:text-cyan-500"
            type="submit"
          >
            Add Flights
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddFlight;
