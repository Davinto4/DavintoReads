// src/pages/AuthorProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AuthorProfile = () => {
  const { userId } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAuthor(docSnap.data());
      }
    };
    fetchAuthor();
  }, [userId]);

  if (!author) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center space-x-4">
        <img src={author.avatar} alt="avatar" className="w-24 h-24 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold">{author.displayName}</h2>
          <p className="text-sm text-gray-600">{author.bio}</p>
          <div className="flex space-x-4 mt-2 text-blue-500">
            {author.social?.twitter && <a href={author.social.twitter}>Twitter</a>}
            {author.social?.website && <a href={author.social.website}>Website</a>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
