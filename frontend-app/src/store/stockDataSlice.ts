import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StockData } from '../types';

interface StockDataState {
  data: StockData[];
}

const initialState: StockDataState = {
  data: [],
};

const stockDataSlice = createSlice({
  name: 'stockData',
  initialState,
  reducers: {
    setStockData(state, action: PayloadAction<StockData[]>) {
      state.data = action.payload;
    },
    addStockData(state, action: PayloadAction<StockData>) {
      state.data.unshift(action.payload); // Add new data at the beginning
      state.data = state.data.slice(0, 20); // Keep only the latest 20 entries
    },
  },
});

export const { setStockData, addStockData } = stockDataSlice.actions;
export default stockDataSlice.reducer;
