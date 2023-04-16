import { addDepartments } from "../../redux/reducers/departmentSlice";
import { store } from "../../redux/store";
import { getDepartmentsFromStore } from "../firebase/firestore/departmentStoreFunctionns";
import { addDepartmentsDataToLocal, getDepartmentsDatafromLocal } from "../localstorage/departments";

export async function readDepartments() {
    let departments = [];
    // 1. Read form Redux store
    const reduxDepartments = store.getState().departments;
    if (reduxDepartments.data.length === 0) {
        // 2. Read form local storage
        const localstorageDepartments = getDepartmentsDatafromLocal();
        if (localstorageDepartments) {
            store.dispatch(addDepartments(localstorageDepartments))
            departments = {
                status: 0,
                data: localstorageDepartments,
            }
        } else {
            // 3. Read from firestore
            departments = await getDepartmentsFromStore()
                .then(res => {
                    return res;
                });
            if (departments.status === 0) {
                addDepartmentsDataToLocal(departments.data);
                store.dispatch(addDepartments(departments.data));
            } else {
                return Promise.reject(departments);
            }
        }
    } else {
        departments = {
            status: 0,
            data: reduxDepartments.data
        };
    }
    return Promise.resolve(departments);
}