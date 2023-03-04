import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'userdata',
    initialState:{
        user:null,
    },
    reducers:{
        addUser: (state,actions) =>{
            return {
                ...state,user:actions.payload,
            }
        }
    }
});

export const {addUser} = userSlice.actions;
export default userSlice.reducer;