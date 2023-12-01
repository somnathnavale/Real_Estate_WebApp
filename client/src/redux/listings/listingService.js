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

    const {cache,count}=getState().listing;
    const filter = getState().filter;
    
    const query = createFilterQuery(filter);
    const cacheKey=JSON.stringify({query,count});         
    
    if(cache[cacheKey]){            //cheking whether for same query cache data is present
      const newCount=JSON.parse(cacheKey).count;
      return {listings:cache[cacheKey],count:newCount,cacheKey}
    }

    const response = await axiosPublic.get("/api/listings", {
      params: query,
    });
    return {listings:response.data.listings,count:response.data.count,cacheKey};
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

export const getMyListing = createAsyncThunk(
  "listing/getMy",
  asyncHandler(async (props, thunkAPI) => {
    const { userId } = props;
    const response = await axiosPublic.get("/api/listings", {
      params: {
        userId,
      },
    });
    return response.data;
  })
);

export const deleteListing = createAsyncThunk(
  "listing/delete",
  asyncHandler(async (props, thunkAPI) => {
    const { axios, id } = props;
    const response = await axios.delete(`/api/listings/${id}`);
    return response.data;
  })
);

export const updateListing = createAsyncThunk(
  "listing/update",
  asyncHandler(async (props, thunkAPI) => {
    const { axios, data } = props;
    const response = await axios.put(`/api/listings/${data._id}`, data);
    return response.data;
  })
);