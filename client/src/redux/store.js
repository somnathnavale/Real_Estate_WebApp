import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import enumReducer from "./enum/enumSlice";
import listingReducer from './listings/listingSlice';
import filterReducer from "./filter/filterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    enum:enumReducer,
    listing:listingReducer,
    filter:filterReducer
  },
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
});
