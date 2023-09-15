import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUserInfo: [],
  userInfo: {},
  userBookings: [],
  flightRef: "",
  refetch: false,
};

export const usersSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setAllUserInfo: (state, action) => {
      state.allUserInfo = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserBookings: (state, action) => {
      state.userBookings = action.payload;
    },
    setFlightRef: (state, action) => {
      state.userBookings = action.payload;
    },
    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
  },
});

export const { setAllUserInfo, setUserInfo, setUserBookings, setFlightRef, setRefetch } =
  usersSlice.actions;
export default usersSlice.reducer;
