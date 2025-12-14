import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

// Initialize Firebase services
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

// Export services
export { auth, db, storage };
export { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
export { ref, set, get, update, remove } from 'firebase/database';
export { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
