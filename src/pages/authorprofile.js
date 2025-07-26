// src/pages/AuthorProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function AuthorProfile() {
  const { userId } = useParams();
  const [author, setAuthor] = useState(null);
  const [novels, setNovels] = useState([]);

  useEffect(() => {
    const fetchAuthor = async () => {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setAuthor({
          ...data,
          avatar: data.avatar || '/default-avatar.png',
          social: {
            twitter: data?.social?.twitter || '',
            website: data?.social?.website || '',
          },
        });
      }
    };

    const fetchNovels = async () => {
      const q = query(collection(db, 'novels'), where('authorId', '==', userId));
      const querySnapshot = await getDocs(q);
      setNovels(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchAuthor();
    fetchNovels();
  }, [userId]);

  if (!author) return <div className="text-center mt-6">Loading author...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <img
          src={author.avatar}
          alt="Author avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{author.displayName}</h1>
          <p className="text-gray-600 text-sm">{author.bio}</p>
          <div className="flex gap-4 mt-2 text-blue-600">
            {author.social.twitter && (
              <a href={author.social.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            )}
            {author.social.website && (
              <a href={author.social.website} target="_blank" rel="noopener noreferrer">
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Novels by {author.displayName}</h2>
        {novels.length === 0 ? (
          <p className="text-gray-500 italic">No novels published yet.</p>
        ) : (
          <ul className="space-y-2">
            {novels.map(novel => (
              <li key={novel.id}>
                <a
                  href={`/novel/${novel.id}`}
                  className="text-blue-700 hover:underline font-medium"
                >
                  {novel.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
