import React from 'react';
import UploadHeader from '../components/UploadHeader';
import UploadFile from '../components/UploadFile';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <UploadHeader />
      <UploadFile />
    </div>
  );
}