// CommentSection.js
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function CommentSection({ novelId, chapterId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => setUser(u));
    const q = query(collection(db, 'novels', novelId, 'chapters', chapterId, 'comments'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, [novelId, chapterId]);

  const handlePost = async () => {
    if (!newComment || !user) return;
    await addDoc(collection(db, 'novels', novelId, 'chapters', chapterId, 'comments'), {
      text: newComment,
      uid: user.uid,
      displayName: user.displayName,
      timestamp: serverTimestamp()
    });
    setNewComment('');
  };

  const handleDelete = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, 'novels', novelId, 'chapters', chapterId, 'comments', id));
  };

  return (
    <div className="p-4 border-t mt-6">
      <h3 className="text-xl font-semibold">Comments</h3>
      <div className="my-2">
        {user && (
          <div className="flex gap-2 mb-4">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 p-2 border rounded"
            />
            <button onClick={handlePost} className="bg-blue-500 text-white px-4 py-2 rounded">Post</button>
          </div>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className="p-2 border-b">
            <p className="font-medium">{comment.displayName || 'Anonymous'}</p>
            <p>{comment.text}</p>
            {user?.uid === comment.uid && (
              <button onClick={() => handleDelete(comment.id)} className="text-red-500 text-sm">Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
