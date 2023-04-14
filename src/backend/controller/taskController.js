import { findTaskByIdFromStore, readTasksFromStore } from "../firebase/firestore/taskStoreFunctions";
import { getProjectsDatafromLocal } from "../localstorage/projects";
import { store } from "../../redux/store";
import { addTasksDataToLocal, getTasksDatafromLocal } from "../localstorage/tasks";
import taskSlice, { addTasks } from "../../redux/reducers/taskSlice";
import { findTask } from "../../utils/commonFunctions";
export async function addTask(project, task, dispatch) {
    /** Add task to firebase                         */
    /** Update project with task id (append task)    */
    /** Updat project's tasks (add task id lists)    */
}

export async function readTasks() {
    /** 1. Read from Redux (if not)         */
    /** 2. Read from LocalStore (if not)    */
    /** 3. Read from firestore              */

    let tasks = [];
    // 1. Read form Redux store
    const reduxTasks = store.getState().tasks;
    if (reduxTasks.data.length === 0) {
        // 2. Read form local storage
        const localstorageTasks = getTasksDatafromLocal();
        if (localstorageTasks) {
            localstorageTasks.forEach(task => {
                store.dispatch(addTasks(task));
            });
            tasks = {
                status: 0,
                data: localstorageTasks,
            }
        } else {
            // 3. Read from firestore
            tasks = await readTasksFromStore()
                .then(res => {
                    return res;
                });

            tasks.data.forEach(task => {
                addTasksDataToLocal(task);
                store.dispatch(addTasks(task));
            });
        }
    } else {
        tasks = {
            status: 0,
            data: reduxTasks.data
        };
    }
    return Promise.resolve(tasks);
}

export async function findTasks(task_ids){
    let tasks = [];
    for(const id of task_ids){
        let task = await findTaskById(id);
        tasks.push(task.data);
    }
   return Promise.resolve(tasks);
}

export async function findTaskById(id){
    /** 1. find inside Redux (if not)         */
    /** 2. find inside LocalStore (if not)    */
    /** 3. find from firestore                */
    let task = null;
    let found = false;
    const reduxTasks = store.getState().tasks;

    // 1. find inside redux store
    if (reduxTasks.data.length > 0) {
        let foundTask = findTask(id, reduxTasks.data)
        if (foundTask) {
            task = {
                status: 0,
                data: foundTask,
            }
            found = true;
            return Promise.resolve(task);
        }
    }

    // 2. find inside LocalStore 
    if (!found) {
        const localstorageProjects = getProjectsDatafromLocal();
        if (localstorageProjects) {
            let foundTask = findTask(id, localstorageProjects);
            if (foundTask) {
                task = {
                    status: 0,
                    data: foundTask,
                }
                found = true;
                return Promise.resolve(task);
            }
        }
    }

    // 3. find inside firebase store
    if (!found) {
        task = await findTaskByIdFromStore(id)
            .then(res => {
                if (res.status === 0) {
                    return {
                        status: 0,
                        data: res.data,
                    }
                } else {
                    return {
                        status: 1,
                        error: res.error,
                    }
                }
            })
    }
    return Promise.resolve(task);
}