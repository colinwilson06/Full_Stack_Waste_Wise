import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CommentSection() {
  const { id: videoId } = useParams(); 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const token = localStorage.getItem('token'); 

  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/comments/${videoId}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error('Failed to fetch comments', err);
      }
    };

    if (videoId) fetchComments();
  }, [videoId]);

  
  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ videoId, comment: newComment }),
      });

      if (res.ok) {
        setNewComment('');
        const updated = await res.json();
        console.log(updated.message);
        const refresh = await fetch(`http://localhost:5000/api/comments/${videoId}`);
        const data = await refresh.json();
        setComments(data);
      } else {
        console.error('Failed to post comment');
      }
    } catch (err) {
      console.error('Error posting comment', err);
    }
  };

  return (
    <div className="w-[820px] mx-22 p-4">
      <h2 className="text-2xl font-bold mb-4">Comment</h2>
      <div className="bg-gray-100 rounded-md flex items-center p-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
        <input
          type="text"
          placeholder="add your comment.."
          className="flex-grow bg-transparent focus:outline-none text-gray-700"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
        />
        <button
          onClick={handlePostComment}
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post
        </button>
      </div>

      {comments.map((comment, index) => (
        <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
            <div>
              <p className="text-sm font-semibold">@{comment.username}</p>
              <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <p className="italic text-gray-800 mb-2">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}
