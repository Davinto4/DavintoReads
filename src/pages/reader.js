// src/pages/Reader.js import React, { useEffect, useState } from 'react'; import { useParams } from 'react-router-dom'; import { db, auth } from '../firebase'; import { doc, getDoc, collection, query, orderBy, addDoc, onSnapshot, serverTimestamp, updateDoc, deleteDoc, increment, } from 'firebase/firestore'; import { onAuthStateChanged } from 'firebase/auth'; import './Reader.css';

const Reader = () => { const { id, chapterId } = useParams(); const [chapter, setChapter] = useState(null); const [loading, setLoading] = useState(true); const [comments, setComments] = useState([]); const [commentText, setCommentText] = useState(''); const [user, setUser] = useState(null);

useEffect(() => { const unsubscribe = onAuthStateChanged(auth, (usr) => setUser(usr)); return () => unsubscribe(); }, []);

useEffect(() => { const fetchChapter = async () => { try { const chapterRef = doc(db, 'novels', id, 'chapters', chapterId); const chapterSnap = await getDoc(chapterRef); if (chapterSnap.exists()) { setChapter(chapterSnap.data()); } } catch (error) { console.error('Error loading chapter:', error); } setLoading(false); };

const commentsRef = collection(db, 'novels', id, 'chapters', chapterId, 'comments');
const q = query(commentsRef, orderBy('timestamp', 'asc'));
const unsubscribe = onSnapshot(q, (snapshot) => {
  setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});

fetchChapter();
return () => unsubscribe();

}, [id, chapterId]);

const postComment = async () => { if (!user || !commentText.trim()) return; await addDoc(collection(db, 'novels', id, 'chapters', chapterId, 'comments'), { text: commentText.trim(), userId: user.uid, username: user.displayName || 'Anonymous', timestamp: serverTimestamp(), likes: 0, }); setCommentText(''); };

const likeComment = async (commentId) => { const commentRef = doc(db, 'novels', id, 'chapters', chapterId, 'comments', commentId); await updateDoc(commentRef, { likes: increment(1), }); };

const deleteComment = async (commentId) => { if (!user) return; const commentRef = doc(db, 'novels', id, 'chapters', chapterId, 'comments', commentId); await deleteDoc(commentRef); };

if (loading) return <p>Loading...</p>; if (!chapter) return <p>Chapter not found.</p>;

return ( <div className="reader-container"> <h1>{chapter.title}</h1> <div className="reader-body">{chapter.body}</div>

<div className="comments-section">
    <h3>Comments</h3>
    {user && (
      <div className="comment-box">
        <textarea
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={postComment}>Post</button>
      </div>
    )}
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id}>
          <strong>{comment.username}</strong>
          <p>{comment.text}</p>
          <div className="comment-actions">
            <button onClick={() => likeComment(comment.id)}>❤️ {comment.likes}</button>
            {user?.uid === comment.userId && (
              <button onClick={() => deleteComment(comment.id)}>Delete</button>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>

); };

export default Reader;

