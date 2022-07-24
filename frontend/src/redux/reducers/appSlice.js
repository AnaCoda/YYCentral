import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        event: undefined,
        redirectedEvent: null,
    },
    reducers: {
        setEvent: (state, action) => {
            state.event = action.payload;
        },
        setRedirectedEvent: (state, action) => {
            state.redirectedEvent = action.payload;
        },
        removeRedirectedEvent: (state) => {
            state.redirectedEvent = null;
        },
    },
});

export const { setEvent, setRedirectedEvent, removeRedirectedEvent } =
    appSlice.actions;

export const selectEvent = (state) => state.app.event;

export default appSlice.reducer;
