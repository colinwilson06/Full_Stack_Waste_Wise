import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecommedVid2({ material }) {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!material) return;

    fetch(`http://localhost:5000/api/videos?material=${material}`)
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error('Failed to fetch videos:', err));
  }, [material]); // refetch setiap material berubah

  const handleWatchNow = (id) => {
    navigate(`/watch/${id}`);
  };

  return (
    <div className="pl-4 border-gray-400 mt-20 mr-30 -mx-15">
      {videos.map((video) => (
        <div key={video.id} className="bg-white rounded-lg shadow p-2 mb-4">
          <p className="text-xs text-gray-500 mb-1">Uploaded by {video.uploader}</p>
          <p className="text-xs text-gray-400 mb-2">{video.date}</p>
          <img src={video.thumbnail} alt={video.title} className="rounded mb-2 w-full h-auto" />
          <p className="text-sm font-semibold">{video.title}</p>
          <p className="text-xs text-gray-600">Material: {video.material}</p>
          <div className="flex items-center justify-between mt-2">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded text-xs"
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
