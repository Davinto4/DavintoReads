import { auth, db, ref, set, push, onValue, get, update } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

const novelsContainer = document.getElementById("novels");
const communityContainer = document.getElementById("community-posts");
const postForm = document.getElementById("post-form");
const novelForm = document.getElementById("novel-form");

// Fetch and show novels
function loadNovels() {
  onValue(ref(db, 'novels'), (snapshot) => {
    novelsContainer.innerHTML = "";
    snapshot.forEach(novelSnap => {
      const novel = novelSnap.val();
      const novelEl = document.createElement("div");
      novelEl.className = "bg-white p-4 rounded shadow";
      novelEl.innerHTML = `
        <h3 class="font-bold text-lg">${novel.title}</h3>
        <p class="text-sm text-gray-500">${novel.genre}</p>
        <p>${novel.description}</p>
        <a href="novel.html?id=${novelSnap.key}" class="text-indigo-600 hover:underline">Read More</a>
      `;
      novelsContainer.appendChild(novelEl);
    });
  });
}

// Handle posting in community
if (postForm) {
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = postForm.querySelector("input");
    const content = input.value.trim();
    const user = auth.currentUser;
    if (!user || !content) return;
    const postRef = push(ref(db, "posts"));
    await set(postRef, {
      uid: user.uid,
      content,
      createdAt: Date.now()
    });
    input.value = "";
  });
}

// Load community posts
if (communityContainer) {
  onValue(ref(db, "posts"), (snapshot) => {
    communityContainer.innerHTML = "";
    snapshot.forEach(postSnap => {
      const post = postSnap.val();
      const div = document.createElement("div");
      div.className = "bg-gray-100 p-2 rounded";
      div.textContent = post.content;
      communityContainer.appendChild(div);
    });
  });
}

// Save new novel + chapters
if (novelForm) {
  novelForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Login required");
    const [titleInput, contentInput] = novelForm.querySelectorAll("input, textarea");
    const novelRef = push(ref(db, "novels"));
    await set(novelRef, {
      title: titleInput.value,
      description: contentInput.value.slice(0, 100),
      genre: "General",
      uid: user.uid,
      createdAt: Date.now()
    });
    const chapterRef = push(ref(db, `chapters/${novelRef.key}`));
    await set(chapterRef, {
      title: "Chapter 1",
      content: contentInput.value,
      isLocked: false,
      createdAt: Date.now()
    });
    alert("Novel published!");
    titleInput.value = "";
    contentInput.value = "";
  });
}

// Auto login check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("Not logged in");
  } else {
    console.log("Logged in:", user.email);
  }
});

loadNovels();
