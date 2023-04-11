import { createSlice } from "@reduxjs/toolkit";


export const taskSlice = createSlice({
    name:'task',
    initialState:{
        data:[],
    },
    reducers:{
        addTask:(state,actions)=>{
            return [state,actions.payload];
        }
    }
});
export const {addTask} = taskSlice.actions;
export default taskSlice.reducer;