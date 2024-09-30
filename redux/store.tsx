import { configureStore } from '@reduxjs/toolkit';
// import layoutReducer from "./layoutSlice";
import walletReducer from './walletSlice';

const store = configureStore({
  reducer: {
    // layout: layoutReducer,
    wallet: walletReducer
  }
});

export default store;
