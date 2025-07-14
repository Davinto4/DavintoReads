<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DavintoReads - Read, Write & Earn</title>
  <link rel="stylesheet" href="styles.css" />
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <script type="module">
    import { auth, db } from './firebase.js';
    import { onAuthStateChanged } from 'firebase/auth';
    import { doc, getDoc, collection, query, getDocs, orderBy } from 'firebase/firestore';window.userInfo = null;

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    document.getElementById("write").innerHTML = '<p class="text-center text-red-600">You must be logged in to write.</p>';
    document.getElementById("community").innerHTML += '<p class="text-center text-red-600">Login required to post in the community.</p>';
    return;
  }
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (userDoc.exists()) {
    window.userInfo = userDoc.data();
    if (userInfo.role === "writer") {
      const nav = document.querySelector("nav");
      const dashboardLink = document.createElement("a");
      dashboardLink.href = "dashboard.html";
      dashboardLink.className = "hover:text-indigo-600";
      dashboardLink.textContent = "Dashboard";
      nav.appendChild(dashboardLink);
    }
  }
});

// Load sample novels
const novelsEl = document.getElementById('novels');
const q = query(collection(db, "novels"), orderBy("createdAt", "desc"));
const querySnap = await getDocs(q);
querySnap.forEach(docSnap => {
  const data = docSnap.data();
  const card = document.createElement("a");
  card.href = `novel.html?id=${docSnap.id}`;
  card.className = "bg-white rounded shadow p-4 hover:shadow-lg transition";
  card.innerHTML = `
    <h3 class="text-xl font-semibold mb-2">${data.title}</h3>
    <p class="text-sm text-gray-600">${data.description?.slice(0, 80) || "No description."}</p>
  `;
  novelsEl.appendChild(card);
});

  </script>
</head>
<body class="bg-gray-100 text-gray-900">
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold text-indigo-600">DavintoReads</div>
      <nav class="space-x-4">
        <a href="#home" class="hover:text-indigo-600">Home</a>
        <a href="#explore" class="hover:text-indigo-600">Explore</a>
        <a href="#community" class="hover:text-indigo-600">Community</a>
        <a href="#write" class="hover:text-indigo-600">Write</a>
        <a href="login.html" class="hover:text-indigo-600">Login</a>
        <a href="profile.html" class="hover:text-indigo-600">Profile</a>
      </nav>
    </div>
  </header>  <section id="home" class="bg-indigo-600 text-white py-20 text-center">
    <h1 class="text-4xl font-bold mb-4">Read. Write. Earn.</h1>
    <p class="text-lg mb-6">Your stories deserve the world. Publish, earn coins, and reach readers globally.</p>
    <a href="#write" class="bg-white text-indigo-600 font-semibold px-6 py-2 rounded shadow hover:bg-gray-100">Start Writing</a>
  </section>  <section id="explore" class="py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">Popular Novels</h2>
      <div id="novels" class="grid grid-cols-2 md:grid-cols-4 gap-6"></div>
    </div>
  </section>  <section id="community" class="bg-white py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">Community Feed</h2>
      <div id="community-posts" class="space-y-4 mb-4"></div>
      <form id="post-form" class="flex space-x-2">
        <input type="text" class="flex-1 px-4 py-2 border rounded" placeholder="Share your thoughts..." required />
        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Post</button>
      </form>
    </div>
  </section>  <section id="write" class="py-12 px-4 bg-gray-50">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">Write a Novel</h2>
      <form id="novel-form" class="space-y-4">
        <input type="text" class="w-full px-4 py-2 border rounded" placeholder="Novel Title" required />
        <textarea class="w-full px-4 py-2 border rounded" placeholder="Start your story..." rows="10" required></textarea>
        <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Publish</button>
      </form>
    </div>
  </section>  <footer class="bg-white shadow-md py-6 mt-12">
    <div class="max-w-7xl mx-auto text-center">
      <p>© 2025 DavintoReads. Powered by Chimdindu MacDonald.</p>
    </div>
  </footer>  <script src="script.js" type="module"></script></body>
</html>
