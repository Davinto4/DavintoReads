
// src/components/Replies.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const Replies = ({ chapterId, commentId, user }) => {
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'chapters', chapterId, 'comments', commentId, 'replies'),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      setReplies(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [chapterId, commentId]);

  const submitReply = async () => {
    if (!replyText.trim()) return;
    await addDoc(collection(db, 'chapters', chapterId, 'comments', commentId, 'replies'), {
      text: replyText,
      timestamp: new Date(),
      userId: user.uid,
      userName: user.displayName || 'Anonymous'
    });
    setReplyText('');
  };

  return (
    <div style={{ marginLeft: '1rem' }}>
      <h5>Replies</h5>
      <ul>
        {replies.map(reply => (
          <li key={reply.id}><strong>{reply.userName}:</strong> {reply.text}</li>
        ))}
      </ul>
      {user && (
        <div>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={submitReply}>Reply</button>
        </div>
      )}
    </div>
  );
};

export default Replies;
