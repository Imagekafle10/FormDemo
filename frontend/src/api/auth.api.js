import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi, postfileApi } from "../lib/axiosInstance";
import toast from "react-hot-toast";
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postfileApi({
        url: `api/v1/auth/post`,
        body: data,
      });
      toast.success(response.message || "Register Sucessfull");
      return response;
    } catch (error) {
      toast.error(error.message || "Register Unsucessfull");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUserFetch = createAsyncThunk(
  "auth/fetchUser",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await postApi({ url: `api/v1/auth/login`, body: data });
      dispatch(loginUserGetMe());

      toast.success(response.message || "Login Sucessfull");
      return response;
    } catch (error) {
      toast.error(error.message || "Login Unsucessfull");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUserGetMe = createAsyncThunk(
  "auth/getme",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getApi({ url: `api/v1/user/getme`, body: data });

      return response;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
