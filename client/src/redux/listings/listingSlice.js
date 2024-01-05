import { createSlice } from "@reduxjs/toolkit";

import {
  addListing,
  getListings,
  getCategoryWiseCount,
  getListing,
  getMyListing,
  deleteListing,
  updateListing,
} from "./listingService";
import {  STATUS } from "../../utils/constants/common";

const initialState = {
  listings: [],
  listing: {},
  mylistings: [],
  featuredListings: [],
  recentListings: [],
  error: null,
  status: STATUS.IDLE,
  count:0,
  cache:{}
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    clearListingsState:()=>{
      return structuredClone(initialState)
    },
    clearMyListings:(state)=>{
      state.mylistings=[];
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
        const newListing = action.payload.listing;
        state.recentListings = [newListing, ...state.recentListings].slice(
          0,
          6
        );
        state.mylistings = [newListing, ...state.mylistings];
        state.featuredListings = state.featuredListings.map((lis) =>
          lis.type === newListing.category
            ? { ...lis, count: lis.count + 1 }
            : lis
        );
      })
      .addCase(addListing.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.message;
      })
      .addCase(getListings.pending, (state) => {
        state.error = null;
        state.status = STATUS.LOADING;
      })
      .addCase(getListings.fulfilled, (state, action) => {
        const {listings,count,cacheKey}=action.payload;
        
        state.status = STATUS.IDLE;
        state.count=count;
        
        if(state.recentListings.length===0){           
          state.recentListings = listings.slice(0, 6);
        }
        
        state.cache[cacheKey]=listings;       //cacheing listings with key for better user experience
        state.listings=listings;                
      })
      .addCase(getListings.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.message;
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
        state.error = action.payload.message;
      })
      .addCase(getListing.pending, (state) => {
        state.listing = {};
        state.error = null;
        state.status = STATUS.LOADING;
      })
      .addCase(getListing.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.listing = action.payload?.listing;
        state.count=action.payload?.count;
      })
      .addCase(getListing.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.message;
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
        state.error = action.payload.message;
      })
      .addCase(deleteListing.pending, (state) => {
        state.error = null;
        state.status = STATUS.LOADING;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        const _id = action?.payload?.listing?._id;
        const category = action?.payload?.listing?.category;
        state.recentListings = state.recentListings
          .filter((lis) => lis._id !== _id)
          .slice(0, 6);
        state.mylistings = state.mylistings.filter((lis) => lis._id !== _id);
        state.featuredListings = state.featuredListings.map((lis) =>
          lis.type === category ? { ...lis, count: lis.count - 1 } : lis
        );
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.message;
      })
      .addCase(updateListing.pending, (state) => {
        state.error = null;
        state.status = STATUS.LOADING;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        const { _id, ...other } = action.payload.listing;
        state.recentListings = state.recentListings.map((lis) =>
          lis._id === _id ? { _id, ...other } : lis
        );
        state.mylistings = state.mylistings.map((lis) =>
          lis._id === _id ? { _id, ...other } : lis
        );
        if (state.listing.category !== other.category) {
          state.featuredListings = state.featuredListings.map((lis) => {
            if (lis.type === state.listing.category) {
              return { ...lis, count: lis.count - 1 };
            } else if (lis.type === other.category) {
              return { ...lis, count: lis.count + 1 };
            }
            return lis;
          });
        }
        state.listing={ _id, ...other };
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.message;
      });
  },
});

export const { clearListingsState,clearMyListings} = listingSlice.actions;
export default listingSlice.reducer;
