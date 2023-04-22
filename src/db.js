// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHDyL4IzgV3WnyRlgs8DA4mEcxnxHnptI",
  authDomain: "task-manager-iteration5.firebaseapp.com",
  projectId: "task-manager-iteration5",
  storageBucket: "task-manager-iteration5.appspot.com",
  messagingSenderId: "352855629324",
  appId: "1:352855629324:web:6d512f1822096b3014d829"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;