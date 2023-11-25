import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../../api/axios";
import { asyncHandler } from "../../utils/helpers/asyncHandlers";
import { createFilterQuery } from "../../utils/helpers/listingsHelper";

export const addListing = createAsyncThunk(
  "listing/add",
  asyncHandler(async (props, thunkAPI) => {
    const { axios, data } = props;
    const response = await axios.post("/api/listings", data);
    return response.data;
  })
);

export const getListings = createAsyncThunk(
  "listing/getAll",
  asyncHandler(async (props, thunkAPI) => {
    const { getState } = thunkAPI;
    const filter = getState().filter;
    const query = createFilterQuery(filter);
    const response = await axiosPublic.get("/api/listings", {
      params: query,
    });
    return response.data;
  })
);

export const getCategoryWiseCount = createAsyncThunk(
  "category/count",
  asyncHandler(async (props, thunkAPI) => {
    const response = await axiosPublic.get("/api/listings/category/count");
    return response.data;
  })
);

export const getListing = createAsyncThunk(
  "listing/get",
  asyncHandler(async (props, thunkAPI) => {
    const { id } = props;
    const response = await axiosPublic.get(`/api/listings/${id}`);
    return response.data;
  })
);
