import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "../features/flightsSlice";
import globalReducer from "../features/globalSlice";

export const store = configureStore({
  reducer: {
    flights: flightsReducer,
    global: globalReducer,
  },
});
