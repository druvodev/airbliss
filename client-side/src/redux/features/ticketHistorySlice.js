import { createSlice } from "@reduxjs/toolkit";

const ticketHistorySlice = createSlice({
  name: "booking",
  initialState: {
    bookingData: null,
  },
  reducers: {
    setBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
  },
});

export const { setBookingData } = ticketHistorySlice.actions;
export default ticketHistorySlice.reducer;
