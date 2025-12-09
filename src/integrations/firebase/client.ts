// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBawZl4SJz7drhzIrG0dnazSglyF6vmKCg",
  authDomain: "perfect-156b5.firebaseapp.com",
  databaseURL: "https://perfect-156b5-default-rtdb.firebaseio.com",
  projectId: "perfect-156b5",
  storageBucket: "perfect-156b5.firebasestorage.app",
  messagingSenderId: "435536634816",
  appId: "1:435536634816:web:2f480f6d627e032da1de25",
  measurementId: "G-H9WJWPEY59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

export { app, analytics, auth, db, rtdb };
