import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../../api/axios";
import { asyncHandler } from "../../utils/helpers/asyncHandlers";

export const signUpUser = createAsyncThunk(
  "user/signup",
  asyncHandler(async (props, thunkAPI) => {
    const userData = props;
    const response = await axiosPublic.post("/api/auth/signup", userData);
    return response.data;
  })
);

export const signInUser = createAsyncThunk(
  "user/signin",
  asyncHandler(async (props, thunkAPI) => {
    const userData = props;
    const response = await axiosPublic.post("/api/auth/signin", userData);
    return response.data;
  })
);

export const updateUser = createAsyncThunk(
  "user/update",
  asyncHandler(async (props, thunkAPI) => {
    const { id, userData, axios } = props;
    const response = await axios.put(`/api/user/update/${id}`, userData);
    return response.data;
  })
);

export const generateToken = createAsyncThunk(
  "user/token",
  asyncHandler(async (props, thunkAPI) => {
    const response = await axiosPublic.get(`/api/auth/token`);
    return response.data;
  })
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  asyncHandler(async (props, thunkAPI) => {
    const { id, axios } = props;
    const response = await axios.delete(`/api/user/delete/${id}`);
    return response.data;
  })
);

export const logout = createAsyncThunk(
  "user/logout",
  asyncHandler(async (props, thunkAPI) => {
    const response = await axiosPublic.get(`/api/auth/logout`);
    return response.data;
  })
);
