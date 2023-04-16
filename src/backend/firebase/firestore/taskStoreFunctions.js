import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase";
export async function addTaskToStore(task){
    const taskRef = doc(collection(db,"tasks"));
    const data = await setDoc(taskRef, {
        ...task,
        id:taskRef.id,
    })
    .then(()=>{
        return Promise.resolve({
            status:0,
            docId:taskRef.id,
        });
    })
    .catch(error=>{
        return Promise.reject({
            status:1,
            error:error,
        })
    });
    return data;
}

export async function readTasksFromStore() {
    const q = query(collection(db, "tasks"), where("id", "!=", ""));
    const tasks = await getDocs(q)
        .then(querySnapshot => {
            const documents = querySnapshot.docs.map((doc) => doc.data());
            return {
                status:0,
                data:documents,
            }
        })
        .catch(error=>{
            return {
                status:1,
                error:error,
            }
        });
        return tasks;
}

export async function findTaskByIdFromStore(id) {
    const task = await getDoc(doc(db, 'tasks', id))
        .then(res=>{
            if(res.data()){
                return {
                    status:0,
                    data:res.data()
                }
            }else{
                return{
                    status:1,
                    error:'Not Found',
                }
            }
        });
    return Promise.resolve(task);
  }

  export async function updateTaskInStore(task) {
    const taskRef = doc(db, "tasks", task.id);
    try{
        await updateDoc(taskRef,task);
        return Promise.resolve(0);
    }catch(err){
       return Promise.reject(err);
    }
}

export async function deleteTaskInStore(taskId) {
    const taskRef = doc(db, "tasks", taskId);
    try{
        await deleteDoc(taskRef);
        return Promise.resolve(0);
    }catch(err){
       return Promise.reject(err);
    }
}