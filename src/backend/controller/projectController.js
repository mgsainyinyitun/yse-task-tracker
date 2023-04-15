import { addProjects } from "../../redux/reducers/projectSlice";
import { addProjectToStore, readProjectsFromStore } from "../firebase/firestore/projectStoreFunctions";
import { addTaskToStore } from "../firebase/firestore/taskStoreFunctions";
import { addProjectsDataToLocal, getProjectsDatafromLocal } from "../localstorage/projects";
import { store } from "../../redux/store";
import { findProject } from "../../utils/commonFunctions";
import { timestampToIsoString } from "../../utils/dateFunction";
export async function addProject(project, tasks, dispatch) {
    /** Add tasks to firebase                         */
    /** Add projects with task id                    */
    /** Updat project's tasks (add task id lists)   */
    let res_tasks = [];
    if (tasks.length > 0) {
        for (const task of tasks) {
            await addTaskToStore(task)
                .then(res => {
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
            projects = await readProjectsFromStore()
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