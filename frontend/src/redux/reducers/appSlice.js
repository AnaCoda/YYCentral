import { createSlice } from "@reduxjs/toolkit";

// Desktop slice manages icons and buttons on the desktop
export const appSlice = createSlice({
   name: "desktop",
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

export const selectButtons = (state) => state.desktop.buttons;

export default appSlice.reducer;