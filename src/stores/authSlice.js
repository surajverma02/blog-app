import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData : null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      console.log("user data stored in stores")
    },

    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
}); 

export const { login, logout } = authSlice.actions;

const authReducer = authSlice.reducer
export default authReducer;
