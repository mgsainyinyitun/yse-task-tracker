import { createSlice } from "@reduxjs/toolkit";

export const departmentSlice = createSlice({
    name: 'departmentData',
    initialState: {},
    reducers: {
        addDepartments: (state, actions) => {
            return {
                ...state, data: actions.payload,
            }
        }
    }
});

export const { addDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;