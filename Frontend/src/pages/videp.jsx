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
    fetch(`http://localhost:5000/api/videos/${id}`)
      .then(res => res.json())
      .then(data => setVideoData(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!videoData) return <p className="p-10">Loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row mb-20">
      {/* Kiri: video utama dan komentar */}
      <div className="flex-grow">
        <div className="p-5">
          <button
            onClick={() => navigate(-1)}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded mb-4"
          >
            ← Back
          </button>
        </div>
        <VidAndHead data={videoData} />
        <Desc data={videoData} />
        <Comment />
      </div>

      {/* Pemisah vertikal */}
      <div className="bg-gray-500 w-[3px] mr-20 h-auto hidden lg:block mt-10" />

      {/* Kanan: rekomendasi video */}
      <div className="w-full lg:w-[500px] mt-10 lg:mt-0">
        <RecommedVid2 material={videoData.material} />
      </div>
    </div>
  );
}
