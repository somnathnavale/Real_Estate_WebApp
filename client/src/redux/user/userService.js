import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../../api/axios";
import { asyncHandler } from "../../utils/helpers/asyncHandlers";
import {clearListingsState, clearMyListings} from "../listings/listingSlice";
import { clearFilters } from "../filter/filterSlice";

export const signUpUser = createAsyncThunk(
  "user/signup",
  asyncHandler(async (props) => {
    const userData = props;
    const response = await axiosPublic.post("/api/auth/signup", userData);
    return response.data;
  })
);

export const signInUser = createAsyncThunk(
  "user/signin",
  asyncHandler(async (props) => {
    const userData = props;
    const response = await axiosPublic.post("/api/auth/signin", userData);
    return response.data;
  })
);

export const updateUser = createAsyncThunk(
  "user/update",
  asyncHandler(async (props) => {
    const { id, userData, axios } = props;
    const response = await axios.put(`/api/user/update/${id}`, userData);
    return response.data;
  })
);

export const generateToken = createAsyncThunk(
  "user/token",
  asyncHandler(async () => {
    const response = await axiosPublic.get(`/api/auth/token`);
    return response.data;
  })
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  asyncHandler(async (props, thunkAPI) => {
    const { id, axios } = props;
    const {dispatch}=thunkAPI;
    const response = await axios.delete(`/api/user/delete/${id}`);
    dispatch(clearMyListings());
    return response.data;
  })
);

export const logout = createAsyncThunk(
  "user/logout",
  asyncHandler(async (props, thunkAPI) => {
    const {dispatch}=thunkAPI;
    const response = await axiosPublic.get(`/api/auth/logout`);
    dispatch(clearListingsState());
    dispatch(clearFilters());
    return response.data;
  })
);
