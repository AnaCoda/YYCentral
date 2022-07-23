import appReducer from "./reducers/appSlice.js";
import {configureStore} from "@reduxjs/toolkit";

//Main redux state store
export const store = configureStore({
   reducer:{
      app: appReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   }),
});