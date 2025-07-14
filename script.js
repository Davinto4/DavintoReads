// DavintoReads: script.js

document.addEventListener("DOMContentLoaded", () => { const novelForm = document.getElementById("novel-form"); const postForm = document.getElementById("post-form"); const novelsContainer = document.getElementById("novels"); const communityPosts = document.getElementById("community-posts");

// Dummy data for popular novels const novels = [ { title: "Rise of the Solariin", author: "Omeka Velar" }, { title: "Twilight Empire", author: "Zantria Rex" }, { title: "Chronicles of Light", author: "Nova Lune" }, { title: "Whispers of Code", author: "Dev Sage" }, ];

novels.forEach((novel) => { const div = document.createElement("div"); div.className = "p-4 bg-white rounded shadow hover:shadow-lg"; div.innerHTML = <h3 class='font-bold text-lg'>${novel.title}</h3><p class='text-sm text-gray-600'>by ${novel.author}</p>; novelsContainer.appendChild(div); });

// Community Post Logic postForm.addEventListener("submit", (e) => { e.preventDefault(); const input = postForm.querySelector("input"); const content = input.value.trim(); if (!content) return; const p = document.createElement("p"); p.className = "bg-gray-100 px-4 py-2 rounded shadow"; p.textContent = content; communityPosts.prepend(p); input.value = ""; });

// Novel Form Logic novelForm.addEventListener("submit", (e) => { e.preventDefault(); const [titleInput, contentInput] = novelForm.querySelectorAll("input, textarea"); const title = titleInput.value.trim(); const story = contentInput.value.trim(); if (!title || !story) return; alert(Your novel \"${title}\" has been submitted!); titleInput.value = ""; contentInput.value = ""; }); });

