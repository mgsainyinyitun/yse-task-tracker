import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'userdata',
    initialState:{
        user:null,
        data:[],
    },
    reducers:{
        addUser: (state,actions) =>{
            return {
                ...state,user:actions.payload,
            }
        },
        addAllUser:(state,actions) => {
            return {
                ...state,data:actions.payload,
            }
        }
    }
});

export const {addUser,addAllUser} = userSlice.actions;
export default userSlice.reducer;