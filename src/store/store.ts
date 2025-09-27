import { configureStore } from "@reduxjs/toolkit";

import todo from "./slices/todo";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    todo,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
