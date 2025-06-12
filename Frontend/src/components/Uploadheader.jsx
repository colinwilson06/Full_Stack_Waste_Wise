import React from 'react';

export default function UploadHeader() {
  return (
    <div className="bg-green-100 rounded-xl p-6 mx-auto mt-10 max-w-5xl shadow-md flex items-center justify-between">
      <div className="flex-1 pr-8">
        <h2 className="text-4xl font-extrabold text-black mb-2">Share Your Green Creation</h2>
        <p className="text-green-800 text-lg">
          Upload your eco-friendly project and inspire others to turn waste into wonder.
          Add a photo, describe your process, and help our community grow greener—one idea at a time.
        </p>
      </div>
      <div className="flex-shrink-0">
        <img src="recycle 1.svg" alt="Earth Recycle Icon" className="w-48 h-48 object-contain" />
      </div>
    </div>
  );
}