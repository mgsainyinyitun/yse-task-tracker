import { collection, doc, setDoc } from "firebase/firestore";
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
        console.log(error);
        return Promise.reject({
            status:1,
            error:error,
        })
    });
    return data;
}