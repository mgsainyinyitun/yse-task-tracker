import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase";

export async function addProjectToStore(project) {
    const projRef = doc(collection(db, "projects"));
    const data = await setDoc(projRef, {
        ...project,
        id: projRef.id,
    })
        .then(() => {
            return Promise.resolve({
                status: 0,
                docId: projRef.id,
            });
        })
        .catch(error => {
            console.log(error);
            return Promise.reject({
                status: 1,
                error: error,
            });
        });
    return data;
}

export async function readProjectsFromStore() {
    const q = query(collection(db, "projects"), where("id", "!=", ""));
    const projects = await getDocs(q)
        .then(querySnapshot => {
            const documents = querySnapshot.docs.map((doc) => doc.data());
            return {
                status: 0,
                data: documents,
            }
        })
        .catch(error => {
            return {
                status: 1,
                error: error,
            }
        });
    return projects;
}


export async function addProjectTaskId(projectId, taskId) {
    const projRef = doc(db, "projects", projectId);
    try {
        await updateDoc(projRef, { tasks: arrayUnion(taskId) });
        return Promise.resolve(0);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function removeProjectTaskId(projectId, taskId) {
    const projRef = doc(db, "projects", projectId);
    try {
        await updateDoc(projRef, { tasks: arrayRemove(taskId) });
        return Promise.resolve(0);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function updateProjectInStore(project) {
    const projectRef = doc(db, "projects", project.id);
    try {
        await updateDoc(projectRef, project);
        return Promise.resolve(0);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function deleteProjectInStore(projectId) {
    const projectRef = doc(db, "projects", projectId);
    try{
        let res = await deleteDoc(projectRef);
        return Promise.resolve(0);
    }catch(err){
        console.error("Error removing document: ", err);
        return Promise.reject(err);
    }
}

// export const deleteProjectInStore = async (projectId) => {
//     const documentRef = doc(db, 'projects', projectId);
//     deleteDoc(documentRef)
//         .then(() => {
//             console.log('Document successfully deleted!');
//             return Promise.resolve(0);
//         })
//         .catch((error) => {
//             console.error('Error deleting document: ', error);
//             return Promise.reject(error);
//         });
// };
