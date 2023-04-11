import { addProjectToStore } from "../firebase/firestore/projectStoreFunctions";

export async function addProject(project){
    /** Add project to firebase                  */
    /** Add task with project id                 */
    /** Updat project's tasks (add task id lists)*/
    addProjectToStore(project)
        .then((res)=>{
            if (res.status === 0) {
                let projectId = res.docId;
                
            } else {
                console.log(res);
            }
        });
}