import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch exchange rates (base: USD)
export const fetchRates = createAsyncThunk("currency/fetchRates", async () => {
  const res = await axios.get("https://api.exchangerate.host/latest?base=USD");
  return res.data.rates;
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
        state.rates = action.payload;
      })
      .addCase(fetchRates.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;