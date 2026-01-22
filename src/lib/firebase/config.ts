import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get, update, remove } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC_5TsXHPLloX80SzN9GQaaDL4EPlL-WSc",
    authDomain: "perfectmodels-4e5fa.firebaseapp.com",
    databaseURL: "https://perfectmodels-4e5fa-default-rtdb.firebaseio.com",
    projectId: "perfectmodels-4e5fa",
    storageBucket: "perfectmodels-4e5fa.firebasestorage.app",
    messagingSenderId: "1072431985374",
    appId: "1:1072431985374:web:55f7a7899d05e68fe5484f",
    measurementId: "G-CSP65WPY89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

// Export services
export { auth, db, storage };
export { signInWithEmailAndPassword, signOut, onAuthStateChanged };
export { ref, set, get, update, remove };
export { storageRef, uploadBytes, getDownloadURL, deleteObject };
