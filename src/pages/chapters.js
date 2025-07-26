// src/pages/Chapters.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Chapters = () => {
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const chaptersRef = collection(db, 'novels', id, 'chapters');
      const querySnapshot = await getDocs(chaptersRef);
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChapters(list);
    };
    fetchChapters();
  }, [id]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chapters</h2>
      {chapters.map(ch => (
        <div key={ch.id} className="mb-2 p-2 border rounded">
          <Link to={`/read/${id}/${ch.id}`} className="text-blue-600 hover:underline">{ch.title}</Link>
        </div>
      ))}
      <Link to={`/add-chapter/${id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">+ Add Chapter</Link>
    </div>
  );
};

export default Chapters;
