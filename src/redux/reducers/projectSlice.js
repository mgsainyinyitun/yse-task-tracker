import { createSlice } from "@reduxjs/toolkit";

export const projecSlice = createSlice({
    name:'projectData',
    initialState:{
        data:[],
    },
    reducers:{
        addProjects:(state,action) => {
            state.data.push(action.payload);
        }
    }
});
export const {addProjects} = projecSlice.actions;
export default projecSlice.reducer;