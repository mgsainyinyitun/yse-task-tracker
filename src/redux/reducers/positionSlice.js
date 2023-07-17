import { createSlice } from "@reduxjs/toolkit";

export const positionSlice = createSlice({
    name: 'positionData',
    initialState: {},
    reducers: {
        addPositions: (state, actions) => {
            return {
                ...state, data: actions.payload,
            }
        }
    }
});
export const {addPositions} = positionSlice.actions;
export default positionSlice.reducer;