import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { localStorageMiddleware } from "./localStorageMiddleware";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log("Error loading state:", err);
    return undefined;
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
