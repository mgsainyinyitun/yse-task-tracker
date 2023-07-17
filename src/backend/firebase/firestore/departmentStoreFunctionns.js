import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { addDepartmentsDataToLocal } from "../../localstorage/departments";
import { addDepartments } from "../../../redux/reducers/departmentSlice";


export async function getDepartmentsFromStore() {
  const q = query(collection(db, "departments"), where("id", "!=", ""));
  const departments = await getDocs(q)
    .then(querySnapshot => {
      const documents = querySnapshot.docs.map((doc) => doc.data());
      return {
        status: 0,
        data: documents,
      }
    })
    .catch(error => {
      return {
        status: 1,
        error: error,
      }
    });
  return departments;
}


export const getDepartmentsData = (dispatch) => onSnapshot(
  collection(db, "departments"),
  (snapshots) => {
    let departments = [];
    snapshots.forEach(department => {
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