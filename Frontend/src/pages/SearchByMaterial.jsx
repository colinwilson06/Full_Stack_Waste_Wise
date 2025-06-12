import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SearchMaterial() {
  const location = useLocation();
  const materialType = location.state?.materialType || 'plastic';
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/api/videos?material=${materialType}`);
        const data = response.data;
        setVideos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setVideos([]);
      }
    };
    fetchVideos();
  }, [materialType]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
    } else {
      const filteredVideos = videos
        .filter((video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filteredVideos);
    }
  }, [searchQuery, videos]);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col mb-10">
      {/* Header dan Search Bar */}
      <div className="bg-white p-8 md:p-12 -mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-left">
          Material : {materialType.charAt(0).toUpperCase() + materialType.slice(1)}
        </h1>
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder={`Search ${materialType} videos...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-12 pr-4 rounded-full border-2 border-gray-300 focus:outline-none focus:border-green-500 text-lg shadow-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Dropdown suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 shadow-lg">
              {suggestions.map((video, idx) => (
                <li key={idx}>
                  <Link
                    to={`/watch/${video.id}`}
                    onClick={() => {
                      setSuggestions([]);
                      setSearchQuery('');
                    }}
                    className="block px-4 py-2 hover:bg-green-100 text-gray-800"
                  >
                    {video.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link to="/search" className="text-green-700 hover:underline mt-4 inline-block text-lg font-semibold">
          &lt; Browse by Material
        </Link>
      </div>

      {/* Daftar Video */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <div key={video._id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                  <Link to={`/watch/${video.id}`}>
                    <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition">
                      Watch Now
                    </button>
                  </Link>
                  <span className="text-sm text-yellow-500 font-bold">
                    ⭐ {video.rating?.toFixed(1) ?? '-'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dummy Pagination */}
        <div className="flex justify-center mt-10 space-x-2">
          {[1, 2, 3, '...', 6, 7].map((page, index) => (
            <button
              key={`page-${index}`}
              className={`px-4 py-2 rounded-lg ${
                page === 1 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
