import React from 'react';

export default function DescUpload() {
  return (
    <div className="mx-10 mt-8 max-w-3xl bg-white p-6 rounded-xl shadow-md border border-green-200">
      <h3 className="text-2xl font-bold text-green-900 mb-4">Upload Guidelines</h3>
      <ul className="list-disc list-inside space-y-2 text-green-800 text-lg">
        <li>Upload images (PNG, JPEG) or videos (MP4) of your eco-friendly projects.</li>
        <li>Make sure your files are under 10MB to ensure smooth upload.</li>
        <li>Provide clear visuals showcasing your project details and process.</li>
        <li>Avoid copyrighted materials or inappropriate content.</li>
        <li>Write a short description about your project to inspire others.</li>
      </ul>
    </div>
  );
}
