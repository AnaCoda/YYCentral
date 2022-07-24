import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
   name: "app",
   initialState: {
      event: undefined,
      
   },
   reducers: {
      setEvent: (state, action) => {
         state.event = action.payload;
      },
   },
});

export const { setEvent } = appSlice.actions;

export const selectEvent = (state) => state.app.event;

export default appSlice.reducer;