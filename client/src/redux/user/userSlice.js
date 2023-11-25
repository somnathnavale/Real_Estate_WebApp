import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, generateToken, logout, signInUser, signUpUser, updateUser } from "./userService";

const initialState = {
  user: null,
  error: null,
  status: "idle",
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.user = { ...action.payload };
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(generateToken.fulfilled, (state, action) => {
        state.user.accessToken = action.payload.token;
      })
      .addCase(generateToken.rejected, (state, action) => {
        state.user = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = null;
        state.status = "idle";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.status = "idle";
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateStatus } = userSlice.actions;
export default userSlice.reducer;
