import { configureStore } from "@reduxjs/toolkit";
import entityReducer from "@features/entity/entitySlice";

export const store = configureStore({
  reducer: {
    entities: entityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
