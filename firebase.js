// firebase.js for DavintoReads

// Import the functions you need from the SDKs you need import { initializeApp } from "firebase/app"; import { getAuth } from "firebase/auth"; import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration const firebaseConfig = { apiKey: "AIzaSyAm9EEBQu4uKoSwIxvpMY8-tbGdSE4KPLk", authDomain: "davintoreads-f34b6.firebaseapp.com", projectId: "davintoreads-f34b6", storageBucket: "davintoreads-f34b6.firebasestorage.app", messagingSenderId: "96533460754", appId: "1:96533460754:web:ca07eed54c6843cfc865cb" };

// Initialize Firebase const app = initializeApp(firebaseConfig); const auth = getAuth(app); const db = getFirestore(app);

export { auth, db };
