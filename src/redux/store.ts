import { configureStore } from "@reduxjs/toolkit";
import { getReportCMP } from "./reportCMP";

export const store = configureStore({
  reducer: {
    [getReportCMP.reducerPath]: getReportCMP.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getReportCMP.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
