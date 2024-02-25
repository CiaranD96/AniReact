import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import favouritesReducer from '../favourites/favouritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favourites: favouritesReducer,
  },
});
