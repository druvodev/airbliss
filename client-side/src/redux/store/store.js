import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "../features/flightsSlice";
import globalReducer from "../features/globalSlice";
import searchFilterReducer from "../features/searchFilterSlice";
import bookingInfoReducer from "../features/bookingInfoSlice";
import usersReducer from "../features/usersSlice";


export const store = configureStore({
  reducer: {
    flights: flightsReducer,
    global: globalReducer,
    searchFilter: searchFilterReducer,
    userBookingInfo: bookingInfoReducer,
    userInfo: usersReducer,
  },
});
