import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { addDepartmentsDataToLocal } from "../../localstorage/departments";
import { addDepartments } from "../../../redux/reducers/departmentSlice";

export const getDepartmentsData = (dispatch)=> onSnapshot(
  collection(db, "departments"), 
  (snapshots) => {
    let departments = [];
    snapshots.forEach(department=>{
        departments.push(department.data());
    });
    // Add to Local Storage
    addDepartmentsDataToLocal(departments);
    // Add to Redux Store
    dispatch(addDepartments(departments));
  },
  (error) => {
    console.log(error);
  });