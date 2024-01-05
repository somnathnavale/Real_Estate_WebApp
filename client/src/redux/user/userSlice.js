import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, generateToken, logout, signInUser, signUpUser, updateUser } from "./userService";
import { STATUS } from "../../utils/constants/common";

const initialState = {
  user: null,
  error: null,
  status: STATUS.IDLE,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error=null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.error = null;
        state.status = STATUS.IDLE;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.error=null;
        state.status = STATUS.LOADING;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.error = null;
        state.status = STATUS.IDLE;
        state.user = { ...action.payload };
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.error=null;
        state.status = STATUS.LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.status = STATUS.IDLE;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.message;
      })
      .addCase(generateToken.pending, (state) => {
        state.error=null;
        state.status=STATUS.LOADING
      })
      .addCase(generateToken.fulfilled, (state, action) => {
        state.user ={...state.user,...action.payload};
        state.status=STATUS.IDLE
      })
      .addCase(generateToken.rejected, (state) => {
        state.user = null;
        state.status=STATUS.FAILED;
      })
      .addCase(deleteUser.pending, (state) => {
        state.error=null;
        state.status = STATUS.LOADING;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
        state.status = STATUS.IDLE;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.message;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.message;
      });
  },
});

export default userSlice.reducer;
