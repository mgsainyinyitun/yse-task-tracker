import { addTaskToStore, findTaskByIdFromStore, readTasksFromStore, updateTaskInStore } from "../firebase/firestore/taskStoreFunctions";
import { getProjectsDatafromLocal } from "../localstorage/projects";
import { store } from "../../redux/store";
import { addTasksDataToLocal, getTasksDatafromLocal, updateTasksDataInLocal } from "../localstorage/tasks";
import { addTasks, updateTasks } from "../../redux/reducers/taskSlice";
import { findTask } from "../../utils/commonFunctions";
import { addProjectTaskId } from "../firebase/firestore/projectStoreFunctions";
import { addProjectTask } from "../../redux/reducers/projectSlice";
import { timestampToIsoString } from "../../utils/dateFunction";

export async function addTask(projectID, task) {
    /** Add task to firebase  => id                  */
    /** Update project with task id (append task)    */
    /** Updat project's tasks (add task id lists)    */
    let result = await addTaskToStore(task)
        .then(res => {
            return res;
        })
        .catch(err => {
            return {
                status: 1,
                error: err,
            }
        });

    if (result.status === 0) {
        return await addProjectTaskId(projectID, result.docId)
            .then(res => {
                try {
                    let prepTask = {
                        ...task,
                        id: result.docId,
                        startDate: task.startDate ? task.startDate.toISOString() : null,
                        dueDate: task.dueDate ? task.dueDate.toISOString() : null,
                    }
                    delete prepTask.createdAt;
                    delete prepTask.updatedAt;
                    store.dispatch(addTasks(prepTask))
                    store.dispatch(addProjectTask(projectID, result.docId));
                    addTasksDataToLocal(prepTask);

                } catch (err) {
                    console.log(err);
                }
                return Promise.resolve({
                    status: 0,
                    data: res,
                })
            })
            .catch(err => {
                return Promise.reject({
                    status: 1,
                    error: err,
                })
            });
    }
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
            let prepTasks = [];
            tasks.data.forEach(task => {
                let prepTask = {
                    ...task,
                    startDate: task.startDate ? timestampToIsoString(task.startDate) : null,
                    dueDate: task.dueDate ? timestampToIsoString(task.dueDate) : null,
                    finishedDate: task.finishedDate ? timestampToIsoString(task.finishedDate) : null,
                }
                delete prepTask.createdAt;
                delete prepTask.updatedAt;

                prepTasks.push(prepTask);
                addTasksDataToLocal(prepTask);
                store.dispatch(addTasks(prepTask));
            });
            tasks = [...prepTasks];
        }
    } else {
        tasks = {
            status: 0,
            data: reduxTasks.data
        };
    }
    return Promise.resolve(tasks);
}

export async function findTasks(task_ids) {
    let tasks = [];
    for (const id of task_ids) {
        let task = await findTaskById(id);
        tasks.push(task.data);
    }
    return Promise.resolve(tasks);
}

export async function findTaskById(id) {
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

export async function updateTask(task) {
    let result = await updateTaskInStore(task)
        .then(res => {
            console.log('update success in store', res)
            return { status: res, };
        })
        .catch(err => {
            return {
                status: 1,
                error: err,
            }
        });
    if (result.status === 0) {
        let prepTask = {
            ...task,
            startDate: task.startDate ? task.startDate.toISOString() : null,
            dueDate: task.dueDate ? task.dueDate.toISOString()  : null,
            finishedDate: task.finishedDate ? task.finishedDate.toISOString(): null,
        }
        delete prepTask.updatedAt;
        console.log('prepare task',prepTask)
        try {
            store.dispatch(updateTasks(prepTask));
            updateTasksDataInLocal(prepTask);
        } catch (err) {
            console.log(err);
        }
        return Promise.resolve(result);
    } else {
        return Promise.reject(result);
    }
}