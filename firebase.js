// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child, update, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAm9EEBQu4uKoSwIxvpMY8-tbGdSE4KPLk",
  authDomain: "davintoreads-f34b6.firebaseapp.com",
  projectId: "davintoreads-f34b6",
  storageBucket: "davintoreads-f34b6.appspot.com",
  messagingSenderId: "96533460754",
  appId: "1:96533460754:web:ca07eed54c6843cfc865cb",
  databaseURL: "https://davintoreads-f34b6-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Export for use across site
export { auth, db, ref, set, push, get, child, update, onValue };
