import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import.meta.env.VITE_API_URL

export default function RecommedVid2({ material }) {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!material) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/videos?material=${material}`)
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error('Failed to fetch videos:', err));
  }, [material]);

  const handleWatchNow = (id) => {
    navigate(`/watch/${id}`);
  };

  return (
    <div className="space-y-4 pr-2">
      {videos.map((video) => (
        <div
          key={video.id}
          className="bg-white rounded-lg shadow p-3 overflow-hidden max-w-full"
        >
          <p className="text-xs text-gray-500 mb-1 break-words">Uploaded by {video.uploader}</p>
          <p className="text-xs text-gray-400 mb-2">{video.date}</p>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="rounded mb-2 w-full h-auto max-h-48 object-cover"
          />
          <p className="text-sm font-semibold break-words">{video.title}</p>
          <p className="text-xs text-gray-600 mb-1 break-words">Material: {video.material}</p>
          <div className="flex items-center justify-between mt-2">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
              onClick={() => handleWatchNow(video.id)}
            >
              Watch Now
            </button>
            <span className="text-sm text-yellow-500">⭐ {video.rating}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
