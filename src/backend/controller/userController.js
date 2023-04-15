import { addAllUser } from "../../redux/reducers/userSlice";
import { getAllUsers } from "../firebase/firestore/userStoreFunction";
import { getUsersDataInLocal, setUsersDataToLocal } from "../localstorage/user";
import {store} from "../../redux/store";

export async function readUsers() {
    /** 1. Read from Redux (if not)         */
    /** 2. Read from LocalStore (if not)    */
    /** 3. Read from firestore              */

    let users = [];
    // 1. Read form Redux store
    const reduxUsrs = store.getState().users;

    if (reduxUsrs.data.length === 0) {
        // 2. Read form local storage
        const localstorageUsrs = getUsersDataInLocal();
        if (localstorageUsrs) {
            store.dispatch(addAllUser(localstorageUsrs));
            users = {
                status: 0,
                data: localstorageUsrs,
            }
        } else {
            // 3. Read from firestore
            users = await getAllUsers()
                .then(res => {
                    setUsersDataToLocal(res);
                    return {
                        status: 0,
                        data: res,
                    };
                });
        }
    } else {
        console.log('read from redux');
        users = {
            status: 0,
            data: reduxUsrs.data
        };
    }
    return Promise.resolve(users);
}

