import { createSlice } from "@reduxjs/toolkit";


export const leftMenuSlice = createSlice({
    name: 'leftmenu',
    initialState: {
        collapse:false
    },
    reducers: {
        toggleCollapse: (state) => {
            state.collapse = !state.collapse;
        }
    }
});

export const { toggleCollapse } = leftMenuSlice.actions;
export default leftMenuSlice.reducer;