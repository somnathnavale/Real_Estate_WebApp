import { createSlice } from "@reduxjs/toolkit";

import {
  addListing,
  getListings,
  getCategoryWiseCount,
  getListing,
  getMyListing,
  deleteListing,
} from "./listingService";
import { STATUS } from "../../utils/constants/common";

const initialState = {
  listings: [],
  listing: {},
  mylistings:[],
  featuredListings: [],
  recentListings: [],
  error: null,
  status: STATUS.IDLE,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    updateMylistings:(state,action)=>{
      const {flag}=action.payload;
      if(flag==='clear')
        state.mylistings=[]
    },
    updateListing:(state,action)=>{
      state.listing=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addListing.pending, (state) => {
        state.error = null;
        state.status = STATUS.LOADING;
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        const newListing=action.payload.listing;
        state.recentListings=[newListing,...state.recentListings].slice(0,6);
        state.mylistings=[newListing,...state.mylistings];
        state.featuredListings=state.featuredListings.map(lis=>lis.type===newListing.category ? {...lis,count:lis.count+1}:lis);
      })
      .addCase(addListing.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(getListings.pending, (state) => {
        state.error = null;
        state.status = STATUS.LOADING;
      })
      .addCase(getListings.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        if (state.recentListings.length === 0)
          state.recentListings = action.payload?.listings.slice(0, 6);
        state.listings = action.payload?.listings;
      })
      .addCase(getListings.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(getCategoryWiseCount.pending, (state) => {
        state.error = null;
        state.status = STATUS.LOADING;
      })
      .addCase(getCategoryWiseCount.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.featuredListings = action.payload?.categoryCounts;
      })
      .addCase(getCategoryWiseCount.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(getListing.pending, (state) => {
        state.error = null;
        state.status = STATUS.LOADING;
      })
      .addCase(getListing.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.listing = action.payload?.listing;
      })
      .addCase(getListing.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(getMyListing.pending, (state) => {
        state.error = null;
        state.status = STATUS.LOADING;
      })
      .addCase(getMyListing.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.mylistings = action.payload?.listings;
      })
      .addCase(getMyListing.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(deleteListing.pending, (state) => {
        state.error = null;
        state.status = STATUS.LOADING;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        const {_id,category}=action.payload?.listing;
        state.recentListings=state.recentListings.filter(lis=>lis._id!==_id).slice(0,6);
        state.mylistings=state.mylistings.filter(lis=>lis._id!==_id);
        state.featuredListings=state.featuredListings.map(lis=>lis.type===category ? {...lis,count:lis.count-1}:lis);
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export const {updateMylistings,updateListing} = listingSlice.actions;
export default listingSlice.reducer;
