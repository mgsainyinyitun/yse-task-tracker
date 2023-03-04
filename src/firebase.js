// Import the functions as needed
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDLc6X492DIaYMZGs3yb1gXe0nq7TCPO3s",
  authDomain: "ysetasktracker.firebaseapp.com",
  projectId: "ysetasktracker",
  storageBucket: "ysetasktracker.appspot.com",
  messagingSenderId: "710194422476",
  appId: "1:710194422476:web:c88613d5bc050f60545869",
  measurementId: "G-0998GV1H24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
