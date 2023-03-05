import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addUser } from "../redux/reducers/userSlice";


export async function signin(email,password,dispatch){
    let response = 
    await signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch(addUser(user));
            const data = {
                status:'success',
                user,
                error:null,
            }
            return data;
        })
        .catch((error) => {
            const data = {
                status:'error',
                user:null,
                error,
            }
            return data;
        });
        return response;
}


