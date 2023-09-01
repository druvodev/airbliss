import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userInfo: {},
}

export const usersSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
    }
})

export const { setUserInfo } = usersSlice.actions;
export default usersSlice.reducer;