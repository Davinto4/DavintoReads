import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async user => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const snap = await getDoc(userRef);
        setUserData({ ...snap.data(), uid: user.uid });
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const handleFileChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!userData) return;
    let avatarURL = userData.avatarURL;

    if (newAvatar) {
      const fileRef = ref(storage, `avatars/${userData.uid}`);
      await uploadBytes(fileRef, newAvatar);
      avatarURL = await getDownloadURL(fileRef);
    }

    const userRef = doc(db, 'users', userData.uid);
    await updateDoc(userRef, {
      displayName: userData.displayName,
      bio: userData.bio,
      avatarURL
    });

    setEditMode(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>No user data</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <div className="mb-4">
        <img
          src={userData.avatarURL || '/default-avatar.png'}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        {editMode && <input type="file" onChange={handleFileChange} />}
      </div>

      <div className="mb-2">
        <label className="block font-semibold">Name</label>
        {editMode ? (
          <input
            type="text"
            value={userData.displayName}
            onChange={(e) => setUserData({ ...userData, displayName: e.target.value })}
            className="border p-2 w-full"
          />
        ) : (
          <p>{userData.displayName}</p>
        )}
      </div>

      <div className="mb-2">
        <label className="block font-semibold">Bio</label>
        {editMode ? (
          <textarea
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
            className="border p-2 w-full"
          />
        ) : (
          <p>{userData.bio || 'No bio'}</p>
        )}
      </div>

      <div className="mt-4">
        {editMode ? (
          <>
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save</button>
            <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)} className="bg-green-600 text-white px-4 py-2 rounded">Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
