import { createSlice } from "@reduxjs/toolkit";
import { setError, setLoading } from "./globalSlice";
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
    dispatch(setLoading({ key: "flights", loading: true }));
    const response = await useAxios.get(`/posts/${searchQuery}`);
    const data = response.data;
    console.log("flightSlice", response);
    dispatch(storeFlights(data));
    dispatch(setError({ key: "flights", error: "" }));
    dispatch(setLoading({ key: "flights", loading: false }));
  } catch (error) {
    dispatch(setError({ key: "flights", error: "Failed to fetch flights" }));
    dispatch(storeFlights([]));
    dispatch(setLoading({ key: "flights", loading: false }));
  }
};

export const { storeFlights, storeFilteredFlights } = flightsSlice.actions;
export default flightsSlice.reducer;
