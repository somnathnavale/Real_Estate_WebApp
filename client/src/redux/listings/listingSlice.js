import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFilterQuery } from "../../utils/helpers/listingsHelper";
import { axiosPublic } from "../../api/axios";
const initialState = {
  listings: [],
  listing: {},
  featuredListings:[],
  recentListings:[],
  error: null,
  status: "idle",
};

export const addListing = createAsyncThunk(
  "listing/add",
  async ({ axios, data }, thunkApi) => {
    try {
      const response = await axios.post("/api/listings", data);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error?.response?.data;
      throw error?.message;
    }
  }
);

export const getListings = createAsyncThunk(
  "listing/getAll",
  async (_, { getState }) => {
    try {
      const filter = getState().filter;
      const query = createFilterQuery(filter);
      const response = await axiosPublic.get("/api/listings", {
        params: query,
      });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error?.response?.data;
      throw error?.message;
    }
  }
);

export const getCategoryWiseCount = createAsyncThunk(
  "category/count",
  async () => {
    try {
      const response = await axiosPublic.get("/api/listings/category/count");
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error?.response?.data;
      throw error?.message;
    }
  }
);

export const getListing = createAsyncThunk(
  "listing/get",
  async ({id}) => {
    try {
      const response = await axiosPublic.get(`/api/listings/${id}`);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error?.response?.data;
      throw error?.message;
    }
  }
);

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    updateListingStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addListing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(addListing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getListings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getListings.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        if(state.recentListings.length===0)
          state.recentListings=action.payload?.listings.slice(0,6)
        state.listings = action.payload?.listings;
      })
      .addCase(getListings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getCategoryWiseCount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategoryWiseCount.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.featuredListings=action.payload?.categoryCounts;
      })
      .addCase(getCategoryWiseCount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getListing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getListing.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.featuredListings=action.payload?.listing;
      })
      .addCase(getListing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const { updateListingStatus } = listingSlice.actions;
export default listingSlice.reducer;   
