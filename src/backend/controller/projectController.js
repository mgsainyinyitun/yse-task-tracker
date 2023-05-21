import { addProjects, deleteProjects, updateProjects } from "../../redux/reducers/projectSlice";
import { addProjectToStore, deleteProjectInStore, readAllProjectRelatedDepartmentFromStore, readProjectsFromStore, updateProjectInStore } from "../firebase/firestore/projectStoreFunctions";
import { addTaskToStore } from "../firebase/firestore/taskStoreFunctions";
import { addProjectsDataToLocal, getProjectsDatafromLocal, updateProjectsDataInLocal } from "../localstorage/projects";
import { store } from "../../redux/store";
import { findProject } from "../../utils/commonFunctions";
import { timestampToIsoString } from "../../utils/dateFunction";
import { deleteTaskInStore } from "../firebase/firestore/taskStoreFunctions";
import { addTasks, deleteTasks } from "../../redux/reducers/taskSlice";
import { deleteProjectInLocal } from "../localstorage/projects";
import { addTasksDataToLocal, deleteTaskInLocal } from "../localstorage/tasks";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";


let readProjectUnsubscribe = null;
export function onSnapshotProjectStore() {
    const q = query(collection(db, "projects"), where("departments", "==", "All"));
    if (readProjectUnsubscribe) {
        return;
    }
    readProjectUnsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log("added data");
                let project = change.doc.data();
                let prep_project = {
                    ...project,
                    startDate: project.startDate ? timestampToIsoString(project.startDate) : null,
                    endDate: project.endDate ? timestampToIsoString(project.endDate) : null,
                }
                delete prep_project.createdAt;
                delete prep_project.updatedAt;

                store.dispatch(addProjects(prep_project));
                addProjectsDataToLocal(prep_project);
            }
            if (change.type === "modified") {
                let project = change.doc.data();
                let prepPjt = {
                    ...project,
                    startDate: project.startDate ? timestampToIsoString(project.startDate) : null,
                    endDate: project.endDate ? timestampToIsoString(project.endDate) : null,
                }
                delete prepPjt.createdAt;
                delete prepPjt.updatedAt;
                store.dispatch(updateProjects(prepPjt));
                updateProjectsDataInLocal(prepPjt);
            }
            if (change.type === "removed") {
                console.log("Removed data: ", change.doc.data());
                let project = change.doc.data();
                store.dispatch(deleteProjects(project.id));
                deleteProjectInLocal(project.id);
                // Remove Project's tasks form firestore
                for (const taskId of project.tasks) {
                    store.dispatch(deleteTasks(taskId))
                    deleteTaskInLocal(taskId);
                }
            }
        });
    });
    return readProjectUnsubscribe;
}

let readDepartmentProjectUnsubscribe = null;
export function onSnapshotDepartmentProjectStore(departmentId) {
    const q = query(collection(db, "projects"), where("departments.id", "==", departmentId));
    if (readDepartmentProjectUnsubscribe) {
        return;
    }
    readDepartmentProjectUnsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log("added data");
                let project = change.doc.data();
                let prep_project = {
                    ...project,
                    startDate: project.startDate ? timestampToIsoString(project.startDate) : null,
                    endDate: project.endDate ? timestampToIsoString(project.endDate) : null,
                }
                delete prep_project.createdAt;
                delete prep_project.updatedAt;

                store.dispatch(addProjects(prep_project));
                addProjectsDataToLocal(prep_project);
            }
            if (change.type === "modified") {
                let project = change.doc.data();
                let prepPjt = {
                    ...project,
                    startDate: project.startDate ? timestampToIsoString(project.startDate) : null,
                    endDate: project.endDate ? timestampToIsoString(project.endDate) : null,
                }
                delete prepPjt.createdAt;
                delete prepPjt.updatedAt;
                store.dispatch(updateProjects(prepPjt));
                updateProjectsDataInLocal(prepPjt);
            }
            if (change.type === "removed") {
                console.log("Removed data: ", change.doc.data());
                let project = change.doc.data();
                store.dispatch(deleteProjects(project.id));
                deleteProjectInLocal(project.id);
                // Remove Project's tasks form firestore
                for (const taskId of project.tasks) {
                    store.dispatch(deleteTasks(taskId))
                    deleteTaskInLocal(taskId);
                }
            }
        });
    });
    return readDepartmentProjectUnsubscribe;
}

export async function addProject(project, tasks, dispatch) {
    /** Add tasks to firebase                         */
    /** Add projects with task id                    */
    /** Updat project's tasks (add task id lists)   */
    let res_tasks = [];
    if (tasks.length > 0) {
        for (const task of tasks) {
            await addTaskToStore(task)
                .then(res => {
                    let prepTask = {
                        ...task,
                        id: res.docId,
                        startDate: task.startDate ? task.startDate.toISOString() : null,
                        dueDate: task.dueDate ? task.dueDate.toISOString() : null,
                    }
                    delete prepTask.createdAt;
                    delete prepTask.updatedAt;
                    try {
                        store.dispatch(addTasks(prepTask))
                    } catch (err) {
                        console.log(err);
                    }
                    addTasksDataToLocal(prepTask);
                    console.log(res);
                    res_tasks.push(res.docId);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    const res = await addProjectToStore({ ...project, tasks: res_tasks })
        .then((res) => {
            if (res.status === 0) {
                let prep_project = {
                    ...project,
                    tasks: res_tasks,
                    id: res.docId,
                    startDate: project.startDate ? project.startDate.toISOString() : null,
                    endDate: project.endDate ? project.endDate.toISOString() : null,
                }
                delete prep_project.createdAt;
                delete prep_project.updatedAt;

                dispatch(addProjects(prep_project));
                addProjectsDataToLocal(prep_project);
                return Promise.resolve(0);
            } else {
                console.log(res);
                return Promise.reject(1);
            }
        });
    return res;
}
export async function readProjects() {
    /** 1. Read from Redux (if not)         */
    /** 2. Read from LocalStore (if not)    */
    /** 3. Read from firestore              */

    let projects = [];
    // 1. Read form Redux store
    const reduxProjects = store.getState().projects;
    if (reduxProjects.data.length === 0) {
        // 2. Read form local storage
        const localstorageProjects = getProjectsDatafromLocal();
        if (localstorageProjects) {
            console.log('read from localstorage');
            localstorageProjects.forEach(project => {
                store.dispatch(addProjects(project));
            });
            projects = {
                status: 0,
                data: localstorageProjects,
            }
        } else {
            // 3. Read from firestore

            // 1. Get Department
            // 2. read 'All' project and department

            // projects = await readProjectsFromStore()
            //     .then(res => {
            //         return res;
            //     });
            const department = store.getState().users.user.department;

            projects = await readAllProjectRelatedDepartmentFromStore(department.id)
                .then(res => {
                    return res;
                });

            let prepPjts = [];
            projects.data.forEach(project => {
                let prepPjt = {
                    ...project,
                    startDate: project.startDate ? timestampToIsoString(project.startDate) : null,
                    endDate: project.endDate ? timestampToIsoString(project.endDate) : null,
                }
                prepPjts.push(prepPjt);
                addProjectsDataToLocal(prepPjt);
            });
            projects.data = prepPjts;
        }
    } else {
        projects = {
            status: 0,
            data: reduxProjects.data
        };
    }
    return Promise.resolve(projects);
}

export async function findProjectById(id) {
    let project = null;
    const reduxProjects = store.getState().projects;
    if (reduxProjects.data.length === 0) {
        // 2. Read form local storage
        const localstorageProjects = getProjectsDatafromLocal();
        if (localstorageProjects) {
            localstorageProjects.forEach(project => {
                store.dispatch(addProjects(project));
            });
            project = {
                status: 0,
                data: findProject(id, localstorageProjects),
            }
        } else {
            // 3. Read from firestore
            // To-do
        }
    } else {
        project = {
            status: 0,
            data: findProject(id, reduxProjects.data),
        };
    }
    return Promise.resolve(project);
}

export async function updateProject(project) {
    let result = await updateProjectInStore(project)
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
        let prepPjt = {
            ...project,
            startDate: project.startDate ? project.startDate.toISOString() : null,
            endDate: project.endDate ? project.endDate.toISOString() : null,
        }
        delete prepPjt.updatedAt;
        console.log('prepare project', prepPjt)
        try {
            store.dispatch(updateProjects(prepPjt));
            updateProjectsDataInLocal(prepPjt);
        } catch (err) {
            console.log(err);
        }
        return Promise.resolve(result);
    } else {
        return Promise.reject(result);
    }
}

export async function removeProject(project) {
    // Remove Projects From firestore
    let result = await deleteProjectInStore(project.id)
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
    console.log(result);
    if (result.status === 0) {
        store.dispatch(deleteProjects(project.id));
        deleteProjectInLocal(project.id);
        // Remove Project's tasks form firestore
        for (const taskId of project.tasks) {
            await deleteTaskInStore(taskId)
                .then(res => {
                    if (res === 0) {
                        store.dispatch(deleteTasks(taskId))
                        deleteTaskInLocal(taskId);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    } else {
        return Promise.reject(result);
    }
    return Promise.resolve(result);
}