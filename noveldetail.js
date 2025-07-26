// src/pages/NovelDetail.js import React, { useEffect, useState } from 'react'; import { useParams, Link } from 'react-router-dom'; import { db } from '../firebase'; import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'; import { useAuth } from '../hooks/useAuth';

const NovelDetail = () => { const { id } = useParams(); const [novel, setNovel] = useState(null); const [chapters, setChapters] = useState([]); const { user } = useAuth();

useEffect(() => { const fetchNovel = async () => { const docRef = doc(db, 'novels', id); const docSnap = await getDoc(docRef); if (docSnap.exists()) { setNovel({ id: docSnap.id, ...docSnap.data() }); } };

const fetchChapters = async () => {
  const q = query(collection(db, 'chapters'), where('novelId', '==', id));
  const querySnap = await getDocs(q);
  setChapters(querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
};

fetchNovel();
fetchChapters();

}, [id]);

if (!novel) return <p>Loading...</p>;

return ( <div className="p-6 max-w-4xl mx-auto"> <img src={novel.coverUrl} alt={novel.title} className="w-full max-h-96 object-cover rounded" /> <h1 className="text-4xl font-bold mt-4">{novel.title}</h1> <p className="text-gray-600">By {novel.authorName}</p> <p className="mt-4">{novel.description}</p>

{user?.uid === novel.authorId && (
    <div className="my-4">
      <Link
        to={`/add-chapter/${novel.id}`}
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add Chapter
      </Link>
    </div>
  )}

  <h2 className="text-2xl font-semibold mt-6">Chapters</h2>
  <ul className="mt-2 space-y-2">
    {chapters.map((ch, index) => (
      <li key={ch.id}>
        <Link
          to={`/read/${novel.id}/${ch.id}`}
          className="text-blue-500 hover:underline"
        >
          Chapter {index + 1}: {ch.title}
        </Link>
      </li>
    ))}
  </ul>
</div>

); };

export default NovelDetail;

