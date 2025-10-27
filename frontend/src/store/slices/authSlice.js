import { createSlice } from "@reduxjs/toolkit";
import { loginUser, loginUserFetch, loginUserGetMe } from "../../api/auth.api";

const initialValues = {
  loading: false,
  isError: false,
  isSuccess: false,
  userInfo: null,
  user: [],
  isloggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialValues,
  reducers: {
    logOut: () => initialValues,
  },
  extraReducers: (builder) => {
    // loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isError = true;
        state.userInfo = null;
      });

    // loginUserFetch
    builder
      .addCase(loginUserFetch.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(loginUserFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
        state.isloggedIn = true;
      })
      .addCase(loginUserFetch.rejected, (state) => {
        state.loading = false;
        state.isError = true;
        state.userInfo = null;
      });

    builder
      .addCase(loginUserGetMe.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(loginUserGetMe.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUserGetMe.rejected, (state) => {
        state.loading = false;
        state.isError = true;
        state.user = null;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
