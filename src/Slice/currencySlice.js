// currencySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch exchange rates (base: USD)
export const fetchRates = createAsyncThunk("currency/fetchRates", async () => {
  const res = await axios.get("https://api.frankfurter.app/latest?from=USD");
  return res.data.rates; // returns { EUR: 0.92, GBP: 0.78, NGN: 1600, ... }
});

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    selected: "USD",
    rates: { USD: 1 },
    status: "idle",
  },
  reducers: {
    setCurrency: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.status = "succeeded";
        // add USD:1 since API only returns other currencies
        state.rates = { USD: 1, ...action.payload };
      })
      .addCase(fetchRates.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
