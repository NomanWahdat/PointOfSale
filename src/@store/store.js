import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import editSlice from "./edit/editSlice";

import userSlice, { userActions } from "./user/userSlice";

const reduxLogger = createLogger();

export const RESET_STATE = "RESET_STATE";

const persistConfig = {
  key: "root",
  storage
};
const allReducers = combineReducers({
  user: userSlice,
  edit: editSlice
});
export const rootReducer = (state, action) => {
  if (action.type === userActions.logout.type) {
    storage.removeItem("persist:root");

    state = {};
  }

  return allReducers(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk, reduxLogger]
});

export const persistor = persistStore(store);
