import { createSlice } from "@reduxjs/toolkit";
import { fetchPortfolio } from "../../api/portfolio.api";

const initialValues = {
  loading: false,
  isError: false,
  isSuccess: false,
  userInfo: null,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: initialValues,
  reducers: {
    resetPortfolio: (state) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = false;
      state.portfolioData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(fetchPortfolio.rejected, (state) => {
        state.loading = false;
        state.isError = true;
        state.userInfo = null;
      });
  },
});

export const { resetPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
