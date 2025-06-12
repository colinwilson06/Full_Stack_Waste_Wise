import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function RecommendVid({ isLatestTutorials }) {
  const [videos, setVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // hanya tampilkan 3 awalnya

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/videos/top-rated');
        const data = await response.json();

        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Failed to fetch recommended videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleViewMore = () => {
    setVisibleCount(videos.length); // tampilkan semua
  };

  const visibleVideos = videos.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {visibleVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 pb-2">
              <p className="text-xs text-gray-500 mb-1 flex justify-between">
                <span>Uploaded by {video.uploader}</span>
                <span>{video.date}</span>
              </p>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-md font-semibold text-gray-800 mb-1">{video.title}</h3>
              <p className="text-xs text-gray-600 mb-3">Material: {video.material}</p>
              <div className="flex items-center justify-between">
                <Link to={`/video/${video.id}`}>
                  <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition">
                    Watch Now
                  </button>
                </Link>
                <span className="text-sm text-yellow-500 font-bold">⭐ {video.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < videos.length && (
        <div className="text-center">
          <button
            onClick={handleViewMore}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-800 transition"
          >
            View More
          </button>
        </div>
      )}
    </>
  );
}
