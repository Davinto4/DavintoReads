// src/pages/AddChapter.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddChapter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'novels', id, 'chapters'), {
        title,
        body,
        createdAt: serverTimestamp(),
        author: auth.currentUser?.uid || 'anonymous'
      });
      navigate(`/novel/${id}`);
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add New Chapter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Chapter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Chapter Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          required
        ></textarea>
        <button type="submit">Publish Chapter</button>
      </form>
    </div>
  );
};

export default AddChapter;
