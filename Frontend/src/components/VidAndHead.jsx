import React from 'react';

export default function VidAndHead({ data }) {
  return (
    <div className='w-[900px] mx-10 px-4 md:px-20'>
      <div className="flex flex-col items-start -mb-2">
        <h2 className="text-[32px] md:text-[48px] font-bold relative text-black text-left">
          {data.title}
          <span className="block w-[290px] h-[4px] bg-[#AED581] -mt-1"></span>
        </h2>
        <span className="text-[14px] bg-gray-200 mx-159 px-3 py-1 rounded-md text-gray-700 mb-4">
          {data.date}
        </span>
      </div>

      <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden">
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

