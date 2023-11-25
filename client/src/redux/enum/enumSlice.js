import { createSlice } from "@reduxjs/toolkit";
import { getEnums } from "./enumService";

const initialState = {
  enums: {},
  enumConst: {},
  error: null,
  status: "idle",
};


const enumSlice = createSlice({
  name: "enum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnums.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEnums.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.enums = action?.payload?.enums || {};
        state.enumConst = action?.payload?.enumsConst || {};
      })
      .addCase(getEnums.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default enumSlice.reducer;
