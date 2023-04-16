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
        },
        updateTasks:(state,actions)=>{
            const task = actions.payload;
            let tsk = state.data.find(item => item.id === task.id);
            if (tsk) {
                state.data = state.data.filter(item => item.id !== tsk.id);
                state.data.push({...tsk,...task});
            }
        }
    }
});
export const {addTasks,updateTasks} = taskSlice.actions;
export default taskSlice.reducer;