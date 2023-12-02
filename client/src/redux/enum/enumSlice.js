import { createSlice } from "@reduxjs/toolkit";
import { getEnums } from "./enumService";
import { STATUS } from "../../utils/constants/common";

const initialState = {
  enums: {},
  enumConst: {},
  error: null,
  status: STATUS.IDLE,
};


const enumSlice = createSlice({
  name: "enum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnums.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getEnums.fulfilled, (state, action) => {
        state.error = null;
        state.status = STATUS.IDLE;
        state.enums = action?.payload?.enums || {};
        state.enumConst = action?.payload?.enumsConst || {};
      })
      .addCase(getEnums.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.message;
      });
  },
});

export default enumSlice.reducer;
