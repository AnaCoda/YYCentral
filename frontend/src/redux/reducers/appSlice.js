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
        filter: "",
    },
    reducers: {
        setPopup: (state, action) => {
            state.popup = action.payload;
        },
        setRedirectedEvent: (state, action) => {
            state.redirectedEvent = action.payload;
        },
        removeRedirectedEvent: (state) => {
            state.redirectedEvent = null;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
            console.log(state.filter);
        },
        removeFilter: (state) => {
            state.filter = "";
        },
    },
});

export const {
    setPopup,
    setRedirectedEvent,
    removeRedirectedEvent,
    setFilter,
    removeFilter,
} = appSlice.actions;

export const selectPopup = (state) => state.app.popup;

export default appSlice.reducer;
