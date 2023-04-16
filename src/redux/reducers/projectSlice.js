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
        addProjectTask: (state, actions) => {
            const { projectId, taskId } = actions.payload;
            let pjt = state.data.find(item => item.id === projectId);

            if (pjt) {
                if (pjt.tasks.indexOf(taskId) === -1) {
                    let updatedPjt = { ...pjt, tasks: [...pjt.tasks, taskId] }
                    state.data = state.data.filter(project => project.id !== projectId);
                    state.data.push(updatedPjt);
                } else {
                    console.log('alredy exits task id')
                }
            }
        },
        removeProjectTask: (state, actions) => {
            const { projectId, taskId } = actions.payload;
            console.log(projectId, taskId);
            let pjt = state.data.find(item => item.id === projectId);

            if (pjt) {
                if (pjt.tasks.indexOf(taskId) > 0) {
                    // remove task Id
                    let updatedTask = pjt.tasks.filter(arr => arr !== taskId);
                    let updatedPjt = { ...pjt, tasks: [...updatedTask] }
                    state.data = state.data.filter(project => project.id !== projectId);
                    state.data.push(updatedPjt);
                    console.log("updated:", updatedPjt)
                } else {
                    console.log('not exits task id')
                }
            }
        },
    }
});
export const { addProjects, addProjectTask,removeProjectTask } = projecSlice.actions;
export default projecSlice.reducer;