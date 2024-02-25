import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// get user form local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// register new user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

// login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
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

// logout user
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// add anime to favourites list
export const addAnimeToFavourites = createAsyncThunk(
  'auth/favoutites-add',
  async (favourite, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.addToFavourites(favourite, token);
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
  'auth/favourites-delete',
  async (mal_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.removeFromFavoutires(mal_id, token);
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

export const authSlice = createSlice({
  name: 'auth',
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
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(addAnimeToFavourites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAnimeToFavourites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user.favouriteAnime = action.payload;
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
        state.user.favouriteAnime = action.payload;
        state.message = 'Anime removed from favourites';
      })
      .addCase(removeAnimeFromFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
