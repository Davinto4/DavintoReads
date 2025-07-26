import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const Home = () => {
  const [featuredNovels, setFeaturedNovels] = useState([]);

  useEffect(() => {
    const fetchNovels = async () => {
      const q = query(collection(db, "novels"), orderBy("createdAt", "desc"), limit(6));
      const snapshot = await getDocs(q);
      const novels = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeaturedNovels(novels);
    };
    fetchNovels();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Hero */}
      <section className="text-center my-10">
        <h1 className="text-4xl font-bold text-purple-700">📚 Welcome to DavintoReads</h1>
        <p className="text-gray-600 mt-2">Read, write, and share amazing web novels.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/novels" className="bg-purple-600 text-white px-5 py-2 rounded-xl shadow hover:bg-purple-700">
            Browse Novels
          </Link>
          <Link to="/add-novel" className="border border-purple-600 text-purple-600 px-5 py-2 rounded-xl hover:bg-purple-100">
            Start Writing
          </Link>
        </div>
      </section>

      {/* Featured Novels */}
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🔥 Featured Novels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredNovels.map((novel) => (
            <Link to={`/novel/${novel.id}`} key={novel.id} className="border rounded-xl p-4 shadow hover:shadow-lg">
              <h3 className="text-lg font-bold text-purple-700">{novel.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{novel.description}</p>
              <p className="mt-2 text-xs text-gray-500">By {novel.authorName || "Unknown Author"}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="my-10">
        <h2 className="text-xl font-semibold mb-4">🎭 Explore Genres</h2>
        <div className="flex flex-wrap gap-3">
          {["Fantasy", "Romance", "Action", "Drama", "Comedy", "Sci-Fi"].map((genre) => (
            <Link
              to={`/genres/${genre.toLowerCase()}`}
              key={genre}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
            >
              {genre}
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-16 border-t pt-4">
        © {new Date().getFullYear()} DavintoReads. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;