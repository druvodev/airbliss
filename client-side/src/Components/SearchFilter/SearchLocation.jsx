import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  setFromCityInfo,
  setToCityInfo,
} from "../../redux/features/searchFilterSlice";

const SearchLocation = React.memo(({ setIsModal, locationModal }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await fetch("/locations.json");
        const data = await response.json();
        setLocations(data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    }

    fetchInitialData();
  }, []);

  const handleInputSearch = async (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);

    if (inputValue.trim() !== "") {
      try {
        const response = await fetch("/locations.json");
        const data = await response.json();
        const filteredLocations = data.filter((item) =>
          item.destination.toLowerCase().includes(inputValue.toLowerCase())
        );
        setLocations(filteredLocations);
      } catch (error) {
        console.error("Error searching location:", error);
      }
    } else {
      // Restore initial 10 data entries when input is empty
      setLocations((prevLocations) => prevLocations.slice(0, 10));
    }
  };

  return (
    <div className="text-gray-600 w-80 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-md bg-white overflow-hidden">
      <div className="flex gap-1 items-center mb-1 pt-2 px-2">
        <FaSearch className="text-cyan-600 text-xl" />
        <input
          type="text"
          placeholder="Type for the location name"
          className="w-full p-1 outline-none"
          onChange={handleInputSearch}
        />
      </div>
      <hr />
      <div className="max-h-80 overflow-y-scroll">
        {locations.length === 0 ? (
          <div className="p-3 text-center text-red-500">No match found!</div>
        ) : (
          locations.map((item) => (
            <div
              key={item.code}
              onClick={() => {
                setIsModal(false);
                if (locationModal === "from") {
                  dispatch(setFromCityInfo(item));
                } else if (locationModal === "to") {
                  dispatch(setToCityInfo(item));
                }
              }}
              className="flex items-center justify-between gap-1 px-2 py-1 hover:bg-slate-100 cursor-pointer"
            >
              <div>
                <h5 className="text-sm font-semibold">{item.destination}</h5>
                <p className="text-sm">
                  <small>{item.airportName}</small>
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-500">{item.code}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export default SearchLocation;
