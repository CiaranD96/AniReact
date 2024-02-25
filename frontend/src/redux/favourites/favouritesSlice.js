import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import favouritesService from './favouritesService';

const initialState = {
  favouriteAnime: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// get anime favourites list
export const getAnimeFavourites = createAsyncThunk(
  'favourites/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await favouritesService.getFavourites(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add anime to favourites list
export const addAnimeToFavourites = createAsyncThunk(
  'favoutites/add',
  async (favourite, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await favouritesService.addToFavourites(favourite, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// remove anime from favourites list
export const removeAnimeFromFavourites = createAsyncThunk(
  'favourites/delete',
  async (mal_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await favouritesService.removeFromFavoutires(mal_id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnimeFavourites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnimeFavourites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favouriteAnime = action.payload;
      })
      .addCase(getAnimeFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addAnimeToFavourites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAnimeToFavourites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favouriteAnime = action.payload;
        state.message = 'Anime added to favourites';
      })
      .addCase(addAnimeToFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeAnimeFromFavourites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeAnimeFromFavourites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favouriteAnime = action.payload;
        state.message = 'Anime removed from favourites';
      })
      .addCase(removeAnimeFromFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = favouritesSlice.actions;
export default favouritesSlice.reducer;
