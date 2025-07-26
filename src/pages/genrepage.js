import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const GenrePage = () => {
  const { name } = useParams();
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovels = async () => {
      setLoading(true);
      const q = query(collection(db, "novels"), where("genre", "==", name));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNovels(results);
      setLoading(false);
    };
    fetchNovels();
  }, [name]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">Genre: {name}</h1>

      {loading ? (
        <p className="text-gray-500">Loading novels...</p>
      ) : novels.length === 0 ? (
        <p className="text-gray-500">No novels found in this genre yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {novels.map((novel) => (
            <Link
              to={`/novel/${novel.id}`}
              key={novel.id}
              className="border rounded-xl p-4 shadow hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-purple-700">{novel.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{novel.description}</p>
              <p className="mt-2 text-xs text-gray-500">By {novel.authorName || "Unknown Author"}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenrePage;