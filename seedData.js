// ✅ Import Firebase ESM functions
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAm9EEBQu4uKoSwIxvpMY8-tbGdSE4KPLk",
  authDomain: "davintoreads-f34b6.firebaseapp.com",
  projectId: "davintoreads-f34b6",
  storageBucket: "davintoreads-f34b6.firebasestorage.app",
  messagingSenderId: "96533460754",
  appId: "1:96533460754:web:ca07eed54c6843cfc865cb"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Sample data
const novels = [
  {
    title: "The Solariin Heir",
    description: "In a futuristic empire powered by solar tech...",
    genre: "Sci-Fi",
    uid: "keixSselsegUlzmJkBFRCdcmox53",
    chapters: [
      { title: "Prologue", content: "The sky shimmered with energy...", isLocked: false },
      { title: "Solar Blood", content: "The chamber of ancestors spoke...", isLocked: true }
    ]
  },
  {
    title: "Tides of Desire",
    description: "Two strangers, a stormy island...",
    genre: "Romance",
    uid: "keixSselsegUlzmJkBFRCdcmox53",
    chapters: [
      { title: "Washed Ashore", content: "She woke up to the scent of salt...", isLocked: false },
      { title: "The Kiss", content: "Lightning struck as their lips met...", isLocked: true }
    ]
  },
  {
    title: "Shadows in Lagos",
    description: "Detective Eze faces his darkest case yet...",
    genre: "Thriller",
    uid: "keixSselsegUlzmJkBFRCdcmox53",
    chapters: [
      { title: "The First Symbol", content: "The body lay cold in the gutter...", isLocked: false },
      { title: "Eze's Nightmare", content: "He hadn’t dreamt in years...", isLocked: true }
    ]
  }
];

// ✅ Seeder function
(async () => {
  for (const novel of novels) {
    const novelRef = await addDoc(collection(db, "novels"), {
      title: novel.title,
      description: novel.description,
      genre: novel.genre,
      uid: novel.uid,
      createdAt: serverTimestamp()
    });

    for (const chapter of novel.chapters) {
      await addDoc(collection(db, "chapters"), {
        novelId: novelRef.id,
        title: chapter.title,
        content: chapter.content,
        isLocked: chapter.isLocked,
        createdAt: serverTimestamp(),
        author: novel.uid,
        unlockedBy: []
      });
    }
  }
  console.log("✅ Sample novels and chapters added.");
})();
