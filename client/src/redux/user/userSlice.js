import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic } from "../../api/axios";

const initialState = {
  user: null,
  error: null,
  status: "idle",
};

export const signUpUser = createAsyncThunk("user/signup", async (userData) => {
  try {
    const response = await axiosPublic.post("/api/auth/signup", userData);
    return response.data;
  } catch (error) {
    if (error?.response?.data) throw error?.response?.data;
    throw error?.message;
  }
});

export const signInUser = createAsyncThunk("user/signin", async (userData) => {
  try {
    const response = await axiosPublic.post("/api/auth/signin", userData);
    return response.data;
  } catch (error) {
    if (error?.response?.data) throw error?.response?.data;
    throw error?.message;
  }
});

export const updateUser = createAsyncThunk(
  "user/update",
  async ({id, userData, axios }, thunkApi) => {
    try {
      const response = await axios.put(
        `/api/user/update/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error?.response?.data;
      throw error?.message;
    }
  }
);

export const generateToken = createAsyncThunk("user/token", async () => {
  try {
    const response = await axiosPublic.get(`/api/auth/token`);
    return response.data;
  } catch (error) {
    if (error?.response?.data) throw error?.response?.data;
    throw error?.message;
  }
});

export const deleteUser = createAsyncThunk(
  "user/delete",
  async ({id,axios}, thunkApi) => {
    try {
      const response = await axios.delete(`/api/user/delete/${id}`);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error?.response?.data;
      throw error?.message;
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axiosPublic.get(`/api/auth/logout`);
    return response.data;
  } catch (error) {
    if (error?.response?.data) throw error?.response?.data;
    throw error?.message;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.user = { ...action.payload };
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(generateToken.fulfilled, (state, action) => {
        state.user.accessToken = action.payload.token;
      })
      .addCase(generateToken.rejected, (state, action) => {
        state.user = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = null;
        state.status='idle'
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.status='idle'
      })
      .addCase(logout.rejected, (state, action) => {
        state.status='failed';
        state.error = action.error.message;
      });
  },
});

export const { updateStatus } = userSlice.actions;
export default userSlice.reducer;
