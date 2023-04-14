import { createSlice } from "@reduxjs/toolkit";


export const taskSlice = createSlice({
    name:'task',
    initialState:{
        data:[],
    },
    reducers:{
        addTasks:(state,actions)=>{
            const existing = state.data.find(item=>item.id === actions.payload.id);
            if(!existing){
                state.data.push(actions.payload);
            }
        }
    }
});
export const {addTasks} = taskSlice.actions;
export default taskSlice.reducer;