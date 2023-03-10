
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { addUser } from "../../redux/reducers/userSlice";
import { addNewUser } from "../firestore/userStoreFunction";

export async function signin(email, password, dispatch) {
    let response =
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(addUser(user));
                const data = {
                    status: 'success',
                    user,
                    error: null,
                }
                return data;
            })
            .catch((error) => {
                const data = {
                    status: 'error',
                    user: null,
                    error,
                }
                return data;
            });
    return response;
}

export async function signup(username, email, phone,address, department, position, password) {
    let response =
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            var userData = {
                uid: auth.currentUser.uid,
                username,
                phone,
                address,
                department,
                position,
            }
            updateProfile(auth.currentUser, { displayName: username })
                .then(() => {
                    /**create and store user data in firestore */
                    addNewUser(userData)
                        .then(response => {
                            if (response.status) {
                                return {
                                    status: 'error',
                                    error: response.error,
                                }
                            }
                            userData = {...auth.currentUser,...userData}
                            return {
                                status: 'success',
                                user: userData,
                            }
                        });
                })
                .catch((error) => {
                    /** update profile error */
                    const data = {
                        status: 'error',
                        user: userCredential.user,
                        error,
                    }
                    return data;
                })
            const data = {
                status: 'success',
                user:userData,
                error: null,
            }
            return data;
        })
        .catch((error) => {
            /** create new user error */
            const data = {
                status: 'error',
                user: null,
                error:error,
            }
            return data;
        });
    return response;
}

