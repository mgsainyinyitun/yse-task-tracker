import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export async function addProjectToStore(project) {
    const projRef = doc(collection(db, "projects"));
    const data = await setDoc(projRef, { ...project, id: projRef.id })
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