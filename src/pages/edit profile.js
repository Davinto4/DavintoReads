// src/pages/EditProfile.js
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const EditProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [form, setForm] = useState({
    displayName: '',
    avatar: '',
    bio: '',
    social: {
      twitter: '',
      website: ''
    }
  });

  useEffect(() => {
    const loadProfile = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setForm(docSnap.data());
    };
    loadProfile();
  }, [user.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('social.')) {
      const key = name.split('.')[1];
      setForm({ ...form, social: { ...form.social, [key]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSave = async () => {
    await setDoc(doc(db, 'users', user.uid), {
      ...form,
      uid: user.uid,
      createdAt: serverTimestamp(),
    }, { merge: true });
    alert('Profile updated!');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Your Profile</h2>
      <input name="displayName" placeholder="Display Name" className="input" value={form.displayName} onChange={handleChange} />
      <input name="avatar" placeholder="Avatar URL" className="input" value={form.avatar} onChange={handleChange} />
      <textarea name="bio" placeholder="Short bio" className="input" value={form.bio} onChange={handleChange} />
      <input name="social.twitter" placeholder="Twitter Link" className="input" value={form.social.twitter} onChange={handleChange} />
      <input name="social.website" placeholder="Website" className="input" value={form.social.website} onChange={handleChange} />
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Save</button>
    </div>
  );
};

export default EditProfile;
