import { createSlice } from "@reduxjs/toolkit";

export const projecSlice = createSlice({
    name: 'projectData',
    initialState: {
        data: [],
    },
    reducers: {
        addProjects: (state, action) => {
            const existing = state.data.find(item => item.id === action.payload.id);
            if (!existing) {
                state.data.push(action.payload);
            }
        }
    }
});
export const { addProjects } = projecSlice.actions;
export default projecSlice.reducer;