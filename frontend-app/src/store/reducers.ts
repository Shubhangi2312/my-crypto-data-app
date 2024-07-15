import { combineReducers } from '@reduxjs/toolkit';
import stockDataReducer from './stockDataSlice';

const rootReducer = combineReducers({
  stockData: stockDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
