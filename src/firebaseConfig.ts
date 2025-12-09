import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

/**
 * Firebase configuration object.
 * This object contains all the necessary credentials to connect to your Firebase project.
 * IMPORTANT: For a production application, these keys should be stored securely, 
 * for example, in environment variables, and not be hardcoded directly in the source code.
 */
const firebaseConfig = {
    // Your web app's Firebase API key
    apiKey: "AIzaSyB_jjJEXU7yvJv49aiPCJqEZgiyfJEJzrg",
    // The domain for Firebase authentication
    authDomain: "pmmdb-89a3f.firebaseapp.com",
    // The URL for the Firebase Realtime Database
    databaseURL: "https://pmmdb-89a3f-default-rtdb.firebaseio.com",
    // Your Firebase project ID
    projectId: "pmmdb-89a3f",
    // The storage bucket for Firebase Storage
    storageBucket: "pmmdb-89a3f.appspot.com",
    // The sender ID for Firebase Cloud Messaging
    messagingSenderId: "269517012553",
    // Your app's ID for Firebase
    appId: "1:269517012553:web:f596b9536963ae20148998",
    // The measurement ID for Google Analytics
    measurementId: "G-8LFX4M3PGS"
};

// Initialize the Firebase app with the provided configuration.
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database service.
// This instance will be used throughout the application to interact with the database.
export const db = getDatabase(app);
