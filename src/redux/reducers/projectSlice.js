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
        },
        addProjectTask: (state, action) => {
            const { projectId, taskId } = action.payload;
            let pjt = state.data.find(item => item.id === projectId);
            if (pjt) {
                let updatedPjt = { ...pjt, tasks: pjt.tasks.push(taskId) }
                state.data = state.data.filter(project => project.id !== projectId);
                state.data.push(updatedPjt);
                console.log("updated:",updatedPjt)
            }
           
        }
    }
});
export const { addProjects,addProjectTask } = projecSlice.actions;
export default projecSlice.reducer;