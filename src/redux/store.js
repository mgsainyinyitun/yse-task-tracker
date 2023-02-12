import {configureStore} from '@reduxjs/toolkit';
import leftMenuReducer from './reducers/leftMenuSlice';

export const store = configureStore({
    reducer:{
        leftmenu:leftMenuReducer,
    }
});