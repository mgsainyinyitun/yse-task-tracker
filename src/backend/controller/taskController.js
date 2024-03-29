import { addTaskToStore, deleteTaskInStore, findTaskByIdFromStore, readTasksFromStore, readUserDepartmentTasksFromStore, readUserTasksFromStore, updateTaskInStore } from "../firebase/firestore/taskStoreFunctions";
import { addProjectTaskToLocal, getProjectsDatafromLocal, removeProjectTaskFromLocal } from "../localstorage/projects";
import { store } from "../../redux/store";
import { addTasksDataToLocal, getTasksDatafromLocal, updateTasksDataInLocal } from "../localstorage/tasks";
import { addTasks, updateTasks } from "../../redux/reducers/taskSlice";
import { findTask } from "../../utils/commonFunctions";
import { addProjectTaskId, removeProjectTaskId } from "../firebase/firestore/projectStoreFunctions";
import { addProjectTask } from "../../redux/reducers/projectSlice";
import { timestampToIsoString } from "../../utils/dateFunction";
import { deleteTaskInLocal } from "../localstorage/tasks";
import { deleteTasks } from "../../redux/reducers/taskSlice";
import { removeProjectTask } from "../../redux/reducers/projectSlice";
import { readProjects } from "./projectController";
import { ROLES } from "../../constant";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";



let readTasksUnsubscribe = null;
export function onSnapshotTaskStore(user) {

    const q = query(collection(db, "tasks"), where("consignee.department", "==", user.department.id));

    if (readTasksUnsubscribe) {
        return;
    }
    readTasksUnsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log('added data',change.doc.data());
                let task = change.doc.data();
                let prep_task = {
                    ...task,
                    startDate: task.startDate ? timestampToIsoString(task.startDate) : null,
                    dueDate: task.endDate ? timestampToIsoString(task.endDate) : null,
                    finishedDate: task.finishedDate ? timestampToIsoString(task.finishedDate) : null,
                }
                delete prep_task.createdAt;
                delete prep_task.updatedAt;
                store.dispatch(addTasks(prep_task));
                addTasksDataToLocal(prep_task);
            }
            if (change.type === "modified") {
                console.log('modify data',change.doc.data());
                let task = change.doc.data();
                let prep_task = {
                    ...task,
                    startDate: task.startDate ? timestampToIsoString(task.startDate) : null,
                    dueDate: task.endDate ? timestampToIsoString(task.endDate) : null,
                    finishedDate: task.finishedDate ? timestampToIsoString(task.finishedDate) : null,
                }
                delete prep_task.createdAt;
                delete prep_task.updatedAt;
                store.dispatch(updateTasks(prep_task));
                updateTasksDataInLocal(prep_task);
            }
            if (change.type === "removed") {
                console.log("Removed data: ", change.doc.data());
                let task = change.doc.data();
                store.dispatch(deleteTasks(task.id));
                deleteTaskInLocal(task.id);
            }
        });
    });
    return readTasksUnsubscribe;
}


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

                    try {
                        store.dispatch(addTasks(prepTask))
                        store.dispatch(addProjectTask({ projectId: projectID, taskId: result.docId }));
                    } catch (err) {
                        console.log(err);
                    }
                    addTasksDataToLocal(prepTask);
                    addProjectTaskToLocal(projectID, result.docId);

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

function findProject(projects, taskId) {
    let found = null;
    projects.forEach(project => {
        console.log(project.tasks[0])
        console.log(taskId);
        console.log(project.tasks.indexOf(taskId));
        if (project.tasks.indexOf(taskId) >= 0) {
            found = { ...project };
        }
    });
    console.log(found);
    return found;
}

export async function removeTask(taskId) {
    let projects = await readProjects()
        .then(res => {
            if (res.status === 0) {
                return res.data;
            } else {
                return [];
            }
        })
    let project = findProject(projects, taskId);
    if (project) {
        let projectId = project.id;
        let result = await deleteTaskInStore(taskId)
            .then(res => {
                return {
                    status: res,
                };
            })
            .catch(err => {
                return {
                    status: 1,
                    error: err,
                }
            });

        if (result.status === 0) {
            return await removeProjectTaskId(projectId, taskId)
                .then(res => {
                    try {
                        store.dispatch(deleteTasks(taskId))
                        store.dispatch(removeProjectTask({ projectId, taskId }));
                        deleteTaskInLocal(taskId);
                        removeProjectTaskFromLocal(projectId, taskId);
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
            const department = store.getState().users.user.department;
            const roles = store.getState().users.user.role;

            if (roles.includes(ROLES.ADMIN)) {
                console.log(`Read task (all)`);
                tasks = await readTasksFromStore()
                    .then(res => {
                        return res;
                    });
            } else {
                console.log(`read task (department)`);
                tasks = await readUserDepartmentTasksFromStore(department.id)
                    .then(res => {
                        return res;
                    })
            }

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
            dueDate: task.dueDate ? task.dueDate.toISOString() : null,
            finishedDate: task.finishedDate ? task.finishedDate.toISOString() : null,
        }
        delete prepTask.updatedAt;
        console.log('prepare task', prepTask)
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

export async function readUserTasks(uid) {
    let user_tasks = [];
    readUserTasksFromStore(uid)
        .then(res => {
            console.log(res);
        })

    return Promise.resolve(user_tasks);
}