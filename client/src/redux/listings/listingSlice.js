import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createFilterQuery } from "../../utils/helpers/listingsHelper";

const initialState={
    listings:[],
    listing:{},
    error:null,
    status:'idle'
}

export const addListing=createAsyncThunk('listing/add',async({axios,data},thunkApi)=>{
    try {
        const response=await axios.post('/api/listings',data);
        return response.data;
    } catch (error) {
        if (error?.response?.data) throw error?.response?.data;
        throw error?.message;
    }
})

export const getListings=createAsyncThunk('listing/getAll',async({axios},{getState})=>{
    try {
        const filter=getState().filter;
        const query=createFilterQuery(filter);
        console.log(query)
        const response=await axios.get('/api/listings',{
          params:query
        });
        console.log('response',response.data);
        return response.data;
    } catch (error) {
        if (error?.response?.data) throw error?.response?.data;
        throw error?.message;
    }
})

const listingSlice=createSlice({
    name:"listing",
    initialState,
    reducers:{
      updateListingStatus:(state,action)=>{
          state.status=action.payload;
      }
    },
    extraReducers:(builder)=>{
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
        state.listings=action.payload?.listings;
      })
      .addCase(getListings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    }
})

export const {updateListingStatus}=listingSlice.actions;
export default listingSlice.reducer;