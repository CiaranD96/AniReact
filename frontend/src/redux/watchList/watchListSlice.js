import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import watchListService from "./watchListService";

const initialState = {
  watchList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAnimeWatchList = createAsyncThunk(
  "watchList/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await watchListService.getAnimeWatchList(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const addAnimeToWatchList = createAsyncThunk(
  "watchList/add",
  async (anime, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await watchListService.addAnimeToWatchList(anime, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnimeWatchList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnimeWatchList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchList = action.payload;
      })
      .addCase(getAnimeWatchList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Failed to get watch list";
      })
      .addCase(addAnimeToWatchList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAnimeToWatchList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.watchList = action.payload;
        state.message = "Successfully added anime to watch list";
      })
      .addCase(addAnimeToWatchList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = watchListSlice.actions;
export default watchListSlice.reducer;
