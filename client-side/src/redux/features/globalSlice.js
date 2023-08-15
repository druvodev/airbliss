import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      const { key, loading } = action.payload;
      state[key] = { ...state[key], loading };
    },
    setError: (state, action) => {
      const { key, error } = action.payload;
      state[key] = { ...state[key], error };
    },
  },
});

export const { setLoading, setError } = globalSlice.actions;
export default globalSlice.reducer;
