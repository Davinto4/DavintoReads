// src/pages/EditProfile.js
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function EditProfile() {
  const user = getAuth().currentUser;
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    avatar: '',
    social: { twitter: '', website: '' },
  });

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile(prev => ({
            ...prev,
            ...data,
            social: {
              twitter: data?.social?.twitter || '',
              website: data?.social?.website || '',
            },
          }));
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const key = name.split('.')[1];
      setProfile(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [key]: value,
        },
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, {
      ...profile,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    alert('Profile updated!');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="displayName"
          value={profile.displayName}
          onChange={handleChange}
          placeholder="Display Name"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Short bio..."
          className="w-full p-2 border rounded"
        />
        <input
          name="avatar"
          value={profile.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="w-full p-2 border rounded"
        />
        <input
          name="social.twitter"
          value={profile.social.twitter}
          onChange={handleChange}
          placeholder="Twitter URL"
          className="w-full p-2 border rounded"
        />
        <input
          name="social.website"
          value={profile.social.website}
          onChange={handleChange}
          placeholder="Website URL"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
            }
