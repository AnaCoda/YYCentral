import { createSlice } from "@reduxjs/toolkit";

export const PopupType = {
   event: "event",
   restaurant: "restaurant",
   park: "park",
   shopping: "shopping",
   transit: "transit",
   building: "building",
};

export const appSlice = createSlice({
   name: "app",
   initialState: {
      popup: undefined,
      redirectedEvent: null,
   },
   reducers: {
      setPopup: (state, action) => {
         state.popup = action.payload;
         console.log(action.payload);
      },
      setRedirectedEvent: (state, action) => {
         state.redirectedEvent = action.payload;
      },
      removeRedirectedEvent: (state) => {
         state.redirectedEvent = null;
      },
   },
});

export const { 
   setPopup, 
   setRedirectedEvent, 
   removeRedirectedEvent 
} = appSlice.actions;

export const selectPopup = (state) => state.app.popup;

export default appSlice.reducer;
