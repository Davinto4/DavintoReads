// src/pages/ReadChapter.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ReadChapter = () => {
  const { id, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const chapterRef = doc(db, 'novels', id, 'chapters', chapterId);
        const chapterSnap = await getDoc(chapterRef);
        if (chapterSnap.exists()) {
          setChapter(chapterSnap.data());
        }
      } catch (error) {
        console.error('Failed to load chapter', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [id, chapterId]);

  if (loading) return <p>Loading...</p>;
  if (!chapter) return <p>Chapter not found.</p>;

  return (
    <div className="container">
      <h2>{chapter.title}</h2>
      <div>{chapter.body}</div>
    </div>
  );
};

export default ReadChapter;
