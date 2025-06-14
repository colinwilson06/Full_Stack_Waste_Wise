import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import.meta.env.VITE_API_URL;

export default function CommentSection() {
  const { id: videoId } = useParams(); 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/${videoId}`);
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comments`, {
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
        const refresh = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/${videoId}`);
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
    <div className="w-full max-w-4xl px-4 sm:px-6 md:px-8 mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Comment</h2>

      {/* Form komentar */}
      <div className="bg-gray-100 rounded-md p-2 mb-6 flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="add your comment.."
              className="w-full flex-grow bg-white px-3 py-2 rounded-md text-sm text-gray-700 border border-gray-300 focus:outline-none"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
            />
            <button
              onClick={handlePostComment}
              className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-greem-600 w-full sm:w-auto"
            >
              Post
            </button>
          </div>
        </div>


      {/* Daftar komentar */}
      {comments.map((comment, index) => (
        <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
            <div>
              <p className="text-sm font-semibold">@{comment.username}</p>
              <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <p className="italic text-gray-800 text-sm sm:text-base">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}
