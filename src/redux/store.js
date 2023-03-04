import {configureStore} from '@reduxjs/toolkit';
import leftMenuReducer from './reducers/leftMenuSlice';
import userReducer from './reducers/userSlice';

export const store = configureStore({
    reducer:{
        leftmenu:leftMenuReducer,
        user:userReducer,
    }
});