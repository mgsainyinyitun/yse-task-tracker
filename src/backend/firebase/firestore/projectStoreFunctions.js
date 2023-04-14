import { collection, doc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
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
        return projects;
}

let readProjectUnsubscribe = null;
export function onSnapshotProjectStore() {
    let data = [];
    const q = query(collection(db, "projects"), where("id", "!=", ""));
    if (readProjectUnsubscribe) {
        return;
    }
    readProjectUnsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            console.log('change detected', change.doc.data());
            data.push(change.doc.data());
        });
    });
    return { unscribe: readProjectUnsubscribe, data: data };
}