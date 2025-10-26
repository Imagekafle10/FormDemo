import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomApi, postApi } from "../lib/axiosInstance";
import toast from "react-hot-toast";
export const fetchPortfolio = createAsyncThunk(
  "portfolio/fetch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getRandomApi({
        url: `https://jsonplaceholder.typicode.com/posts`,
        body: data,
      });
      //   toast.success(response.message || "Data Sucessfull");
      return response;
    } catch (error) {
      toast.error(error.response.data || "Data not Found");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
