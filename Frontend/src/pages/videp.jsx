import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VidAndHead from "../components/VidAndHead";
import Desc from "../components/Desc";
import RecommedVid2 from '../components/RecommedVid2';
import Comment from '../components/comment';

export default function Videp() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/videos/${id}`)
      .then(res => res.json())
      .then(data => setVideoData(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!videoData) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-10 px-4 md:px-10 py-8">
      {/* Kiri: video utama + deskripsi + komentar */}
      <div className="flex-1 w-full">
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            ← Back
          </button>
        </div>
        <VidAndHead data={videoData} />
        <Desc data={videoData} />
        <Comment />
      </div>

      {/* Divider hanya muncul di desktop */}
      <div className="hidden lg:block w-[2px] bg-gray-400 mx-6 self-stretch" />

      {/* Kanan: Rekomendasi Video */}
      <div className="w-full lg:w-[400px]">
        <h3 className="text-lg font-semibold mb-4">Recommended Videos</h3>
        <RecommedVid2 material={videoData.material} />
      </div>
    </div>
  );
}
