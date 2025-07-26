// src/pages/AddNovel.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddNovel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'novels'), {
        title,
        description,
        coverUrl,
        createdAt: serverTimestamp(),
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName || 'Anonymous'
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding novel:', error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Novel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" required></textarea>
        <input value={coverUrl} onChange={e => setCoverUrl(e.target.value)} placeholder="Cover Image URL" className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Novel</button>
      </form>
    </div>
  );
};

export default AddNovel;
