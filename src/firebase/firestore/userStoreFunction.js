import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export async function addNewUser(userData) {
    try {
        const docRef = await addDoc(collection(db, "users"),userData);
        return {
            status: 0,
            docId: docRef.id,
        }
    } catch (e) {
        return {
            status: 1,
            error: e,
        }
    }
}