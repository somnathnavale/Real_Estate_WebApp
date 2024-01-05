import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../../api/axios";
import { asyncHandler } from "../../utils/helpers/asyncHandlers";

export const getEnums = createAsyncThunk(
  "enum/get",
  asyncHandler(async () => {
    const response = await axiosPublic.get("/api/enums");
    return response.data;
  })
);
