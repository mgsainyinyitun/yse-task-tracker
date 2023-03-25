import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export async function addNewUser(userData) {
    try {
        const docRef = await addDoc(collection(db, "users"), userData);
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

export async function getUserById(uid) {
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "==", uid));
    const userSnapshot = await getDocs(q);
    if(!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        console.log(userData);
        return userData;
    }else{
        console.log('empyt user data');
        return null;
    }
}


