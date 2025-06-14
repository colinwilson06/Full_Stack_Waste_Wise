import React from 'react';

export default function VidAndHead({ data }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
      {/* Judul & Tanggal */}
      <div className="flex flex-col items-start mb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold text-black relative text-left leading-tight">
          {data.title}
          <span className="block w-[180px] sm:w-[240px] md:w-[290px] h-[4px] bg-[#AED581] mt-1"></span>
        </h2>
        <span className="text-sm sm:text-base bg-gray-200 px-3 py-1 rounded-md text-gray-700 mt-2">
          {data.date}
        </span>
      </div>

      {/* Video */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
        <iframe
          className="w-full h-full"
          src={data.videoURL}
          title={data.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
