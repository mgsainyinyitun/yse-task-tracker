import { configureStore } from '@reduxjs/toolkit';
import leftMenuReducer from './reducers/leftMenuSlice';
import userReducer from './reducers/userSlice';
import departmentReducer from './reducers/departmentSlice';
import positionReducer from "./reducers/positionSlice";
import taskReducer from "./reducers/taskSlice";
import projectReducer from "./reducers/projectSlice";

export const store = configureStore({
    reducer: {
        leftmenu: leftMenuReducer,
        users: userReducer,
        departments: departmentReducer,
        positions: positionReducer,
        tasks: taskReducer,
        projects: projectReducer,
    },
});