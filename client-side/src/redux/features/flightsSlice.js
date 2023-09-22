import { createSlice } from "@reduxjs/toolkit";
import { setLoading, setError } from "./globalSlice";
import useAxios from "../../hooks/useAxios";

const initialState = {
  flights: [],
  filteredFlights: [],
};

export const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    storeFlights: (state, action) => {
      state.flights = action.payload;
    },
    storeFilteredFlights: (state, action) => {
      state.filteredFlights = action.payload;
    },
  },
});

export const fetchFlights = (searchQuery) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await useAxios.get(`/flights/search?${searchQuery}`);
    const data = response.data;
    dispatch(storeFlights(data));
    dispatch(setError(""));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError("Failed to fetch flights"));
    dispatch(storeFlights([]));
    dispatch(setLoading(false));
  }
};

export const { storeFlights, storeFilteredFlights } = flightsSlice.actions;
export default flightsSlice.reducer;
