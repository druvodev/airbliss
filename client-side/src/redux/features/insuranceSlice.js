import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  insurance: false,
};

export const insuranceSlice = createSlice({
  name: "insurance",
  initialState,
  reducers: {
    setInsurance: (state, action) => {
      state.insurance = action.payload;
    },
  },
});

export const { setInsurance } = insuranceSlice.actions;
export default insuranceSlice.reducer;
