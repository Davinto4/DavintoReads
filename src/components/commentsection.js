// src/components/CommentSection.js
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Reactions from './Reactions';

const CommentSection = ({ chapterId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, 'chapters', chapterId, 'comments'),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(data);
    });
    return () => unsubscribe();
  }, [chapterId]);

  const handleSubmit = async () => {
    if (!user || !newComment.trim()) return;
    await addDoc(collection(db, 'chapters', chapterId, 'comments'), {
      text: newComment,
      timestamp: new Date(),
      userId: user.uid,
      userName: user.displayName || 'Anonymous',
      reactions: {},
      replies: []
    });
    setNewComment('');
  };

  const handleDelete = async (commentId) => {
    await deleteDoc(doc(db, 'chapters', chapterId, 'comments', commentId));
  };

  const handleReply = async (commentId, replyText) => {
    const commentRef = doc(db, 'chapters', chapterId, 'comments', commentId);
    const repliesCollection = collection(commentRef, 'replies');
    await addDoc(repliesCollection, {
      text: replyText,
      timestamp: new Date(),
      userId: user.uid,
      userName: user.displayName || 'Anonymous'
    });
  };

  const handleUpdate = async (commentId, newText) => {
    await updateDoc(doc(db, 'chapters', chapterId, 'comments', commentId), {
      text: newText
    });
  };

  return (
    <div>
      <h3>Comments</h3>
      {user && (
        <div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button onClick={handleSubmit}>Post</button>
        </div>
      )}
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p><strong>{comment.userName}:</strong> {comment.text}</p>
            <Reactions chapterId={chapterId} commentId={comment.id} reactions={comment.reactions} />
            {user?.uid === comment.userId && (
              <>
                <button onClick={() => handleDelete(comment.id)}>Delete</button>
                {/* Add edit input here if needed */}
              </>
            )}
            {/* Replies */}
            <Replies chapterId={chapterId} commentId={comment.id} user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
