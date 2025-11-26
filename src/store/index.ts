import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/news/newsSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;