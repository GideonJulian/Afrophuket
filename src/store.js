// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slice/cartSlice";
import currencyReducer from './Slice/currencySlice'
const store = configureStore({
  reducer: {
    cart: cartReducer,
     currency: currencyReducer,
  }
});

export default store;
