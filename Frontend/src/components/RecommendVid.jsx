import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import.meta.env.VITE_API_URL

export default function RecommendVid({ isLatestTutorials }) {
  const [videos, setVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk melacak status login
  const navigate = useNavigate(); // Inisialisasi useNavigate

  useEffect(() => {
    // Cek token saat komponen dimuat atau ada perubahan
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // !!token akan menjadi true jika token ada, false jika null/undefined
  }, []); // Hanya jalankan sekali saat komponen dimuat

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/videos/top-rated`);
        const data = response.data;

        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error('Expected an array but got:', data);
          setVideos([]);
        }
      } catch (error) {
        console.error('Failed to fetch recommended videos:', error);
        setVideos([]);
      }
    };

    fetchVideos();
  }, []);

  const handleViewMore = () => {
    setVisibleCount(videos.length);
  };

  // Fungsi untuk menangani klik tombol "Watch Now"
  const handleWatchNowClick = (videoId) => {
    if (isLoggedIn) {
      navigate(`/watch/${videoId}`); // Arahkan ke halaman video jika sudah login
    } else {
      alert('You must be logged in to watch videos.'); // Tampilkan alert jika belum login
      // Opsional: Anda bisa mengarahkan ke halaman login setelah alert
      // navigate('/login');
    }
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
                {/* Menggunakan button dan fungsi handleWatchNowClick */}
                {/* Pastikan rute Anda di App.jsx untuk video detail adalah /watch/:id */}
                <button
                  onClick={() => handleWatchNowClick(video.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition"
                >
                  Watch Now
                </button>
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