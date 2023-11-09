import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  enums: {},
  error: null,
  status: "idle",
};

export const getEnums = createAsyncThunk(
  "enum/get",
  async ({ axios }, thunkApi) => {
    try {
      const response = await axios.get("/api/enums");
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error?.response?.data;
      throw error?.message;
    }
  }
);

const enumSlice = createSlice({
  name: "enum",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEnums.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEnums.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.enums = action?.payload?.enums || {};
      })
      .addCase(getEnums.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default enumSlice.reducer;