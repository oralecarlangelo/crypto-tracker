import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../service/axios";

const initialState = {
  isLoading: false,
  marketList: [],
  marketChartResult: {},
  coinDetail: {},
  error: undefined,
};

export const getMarketList = createAsyncThunk(
  "market/getMarketList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("/coins/markets", {
        params: {
          vs_currency: "php",
        },
      });

      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getCoinDetail = createAsyncThunk(
  "market/getCoinDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("/coins/markets", {
        params: {
          vs_currency: "php",
          ids: data.id,
        },
      });

      return response.data[0];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getMarketChart = createAsyncThunk(
  "market/getMarketChart",
  async (data, { rejectWithValue }) => {
    try {
      const { id, days } = data;
      const results = await axios.get(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: "php",
          days,
        },
      });
      return results.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {},
  extraReducers: {
    [getMarketList.pending]: (state) => {
      state.isLoading = true;
    },
    [getMarketList.fulfilled]: (state, action) => {
      state.marketList = action.payload;
      state.isLoading = false;
    },
    [getMarketList.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [getMarketChart.pending]: (state) => {
      state.isLoading = true;
    },
    [getMarketChart.fulfilled]: (state, action) => {
      state.marketChartResult = action.payload;
      state.isLoading = false;
    },
    [getMarketChart.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [getCoinDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [getCoinDetail.fulfilled]: (state, action) => {
      state.coinDetail = action.payload;
      state.isLoading = false;
    },
    [getCoinDetail.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const marketSelect = (state) => state.market;
export default marketSlice.reducer;
