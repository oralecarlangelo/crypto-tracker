import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import marketReducer from "../features/Market/marketSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    market: marketReducer,
  },
});
