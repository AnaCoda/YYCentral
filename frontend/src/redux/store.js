import { appSlice } from "./reducers/appSlice";
import {configureStore} from "@reduxjs/toolkit";

//Main redux state store
export const store = configureStore({
   reducer:{
      app: appSlice,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   }),
});