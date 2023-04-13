import { addProjects } from "../../redux/reducers/projectSlice";
import { addProjectToStore } from "../firebase/firestore/projectStoreFunctions";
import { addTaskToStore } from "../firebase/firestore/taskStoreFunctions";
import { addProjectsDataToLocal } from "../localstorage/projects";

export async function addProject(project, tasks,dispatch) {
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
                dispatch(addProjects({ ...project, tasks: res_tasks }));
                addProjectsDataToLocal({ ...project, tasks: res_tasks });
                return Promise.resolve(0);
            } else {
                console.log(res);
                return Promise.reject(1);
            }
        });
    return res;
}