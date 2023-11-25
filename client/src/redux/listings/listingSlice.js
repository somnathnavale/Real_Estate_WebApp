import { createSlice } from "@reduxjs/toolkit";

import {
  addListing,
  getListings,
  getCategoryWiseCount,
  getListing,
  getMyListing,
} from "./listingService";

const initialState = {
  listings: [],
  listing: {},
  mylistings:[],
  featuredListings: [],
  recentListings: [],
  error: null,
  status: "idle",
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    updateListingStatus: (state, action) => {
      state.status = action.payload;
    },
    updateMylistings:(state,action)=>{
      const {flag,data}=action.payload;
      if(flag==='clear')
        state.mylistings=[];
      else if(flag==='add')
        state.mylistings=[...state.mylistings,data];
    }
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
        if (state.recentListings.length === 0)
          state.recentListings = action.payload?.listings.slice(0, 6);
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
        state.featuredListings = action.payload?.categoryCounts;
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
        state.listing = action.payload?.listing;
      })
      .addCase(getListing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMyListing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMyListing.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.mylistings = action.payload?.listings;
      })
      .addCase(getMyListing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateListingStatus,updateMylistings } = listingSlice.actions;
export default listingSlice.reducer;
