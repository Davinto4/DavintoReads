// src/pages/AuthorProfile.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../firebase/firestore/userService";
import { getNovelsByAuthor } from "../firebase/firestore/novelService";

const AuthorProfile = () => {
  const { authorId } = useParams();
  const [profile, setProfile] = useState(null);
  const [novels, setNovels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userData = await getUserProfile(authorId);
      const authoredNovels = await getNovelsByAuthor(authorId);
      setProfile(userData);
      setNovels(authoredNovels);
    }
    fetchData();
  }, [authorId]);

  if (!profile) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex gap-4 items-center">
        <img
          src={profile.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.displayName}</h1>
          <p className="text-gray-500">{profile.bio}</p>
          <div className="flex space-x-4 mt-2 text-blue-600">
            {profile.social?.twitter && (
              <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            )}
            {profile.social?.website && (
              <a href={profile.social.website} target="_blank" rel="noopener noreferrer">
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        Novels by {profile.displayName}
      </h2>
      <ul className="grid grid-cols-2 gap-4 mt-4">
        {novels.map((novel) => (
          <li key={novel.id} className="border p-3 rounded hover:shadow">
            <a href={`/novel/${novel.id}`} className="font-bold text-blue-700">
              {novel.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorProfile;
