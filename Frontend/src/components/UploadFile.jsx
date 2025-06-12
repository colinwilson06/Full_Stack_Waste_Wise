import React, { useState, useRef } from 'react';

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [error, setError] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailName, setThumbnailName] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [thumbnailError, setThumbnailError] = useState('');
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);

  const fileInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const allowedTypes = ['image/png', 'image/jpeg', 'video/mp4'];
  const allowedThumbnailTypes = ['image/png', 'image/jpeg'];

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (selected && allowedTypes.includes(selected.type)) {
      setFile(selected);
      setFileName(selected.name);
      setError('');
      setIsUploadingVideo(true);

      const data = new FormData();
      data.append("file", selected);
      data.append("upload_preset", "Upload WasteWise");
      data.append("cloud_name", "di3vo0a6e");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/di3vo0a6e/video/upload", {
          method: "POST",
          body: data
        });

        const result = await res.json();
        setVideoURL(result.secure_url);
      } catch (error) {
        setError('Failed to upload file. Please try again.');
      } finally {
        setIsUploadingVideo(false);
      }
    } else {
      setFile(null);
      setFileName('');
      setError('File type not supported. Only PNG, JPEG, or MP4 files allowed.');
    }
  };

  const handleThumbnailChange = async (e) => {
    const selected = e.target.files[0];
    if (selected && allowedThumbnailTypes.includes(selected.type)) {
      setThumbnail(selected);
      setThumbnailName(selected.name);
      setThumbnailError('');
      setIsUploadingThumbnail(true);

      const data = new FormData();
      data.append("file", selected);
      data.append("upload_preset", "Upload WasteWise");
      data.append("cloud_name", "di3vo0a6e");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/di3vo0a6e/image/upload", {
          method: "POST",
          body: data
        });

        const result = await res.json();
        setThumbnailURL(result.secure_url);
      } catch (error) {
        setThumbnailError('Failed to upload thumbnail. Please try again.');
      } finally {
        setIsUploadingThumbnail(false);
      }
    } else {
      setThumbnail(null);
      setThumbnailName('');
      setThumbnailError('Only PNG and JPEG images are allowed for thumbnails.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const selected = e.dataTransfer.files[0];
    if (selected && allowedTypes.includes(selected.type)) {
      setFile(selected);
      setFileName(selected.name);
      setError('');
    } else {
      setFile(null);
      setFileName('');
      setError('File type not supported. Only PNG, JPEG, or MP4 files allowed.');
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();
  const triggerThumbnailInput = () => thumbnailInputRef.current.click();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploadingVideo) {
    setError('Video is still uploading. Please wait...');
    return;
    }

    if (!videoURL) {
    setError('Video upload failed or not completed yet.');
    return;
    }

    if (isUploadingThumbnail) {
    setThumbnailError('Thumbnail is still uploading. Please wait...');
    return;
    }

    if (!thumbnailURL) {
    setThumbnailError('Please upload a thumbnail image.');
    return;
    }



    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          videoURL,
          thumbnailURL,
          thumbnailName,
          projectTitle,
          projectCategory,
          projectDescription
        })
      });

      if (!response.ok) throw new Error('Failed to save data to backend');

      const result = await response.json();
      alert('Upload berhasil!');
      console.log('Saved with ID:', result.id);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 mx-auto mt-8 shadow-lg max-w-5xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Upload Video</h3>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-10 mb-8 text-center bg-gray-50 flex flex-col items-center justify-center min-h-[200px]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-gray-600 text-lg mb-2">Drag files here to upload</p>
        <p className="text-gray-600 text-md mb-4">or</p>
        <input
          type="file"
          accept="image/png, image/jpeg, video/mp4"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          type="button"
          onClick={triggerFileInput}
          className="bg-green-700 text-white font-semibold px-6 py-2 rounded-xl hover:bg-green-800 transition"
        >
          Choose your files
        </button>
        {fileName && <p className="mt-4 text-green-700 font-medium">Selected file: {fileName}</p>}
      </div>
      {error && <p className="mt-2 text-red-600 text-sm text-center">{error}</p>}

      <div className="mb-8">
        <label className="block text-md font-medium text-gray-700 mb-2">Upload Thumbnail</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleThumbnailChange}
          ref={thumbnailInputRef}
          className="hidden"
        />
        <button
          type="button"
          onClick={triggerThumbnailInput}
          className="bg-green-700 text-white font-semibold px-6 py-2 rounded-xl hover:bg-green-800 transition"
        >
          Choose thumbnail image
        </button>
        {thumbnailName && <p className="mt-2 text-blue-700 font-medium">Thumbnail: {thumbnailName}</p>}
        {thumbnailURL && (
          <img src={thumbnailURL} alt="Thumbnail Preview" className="mt-4 max-h-48 object-contain rounded-lg shadow" />
        )}
        {thumbnailError && <p className="mt-2 text-red-600 text-sm">{thumbnailError}</p>}
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-4">Description</h3>
      <div className="space-y-4 mb-8">
        <div>
          <label htmlFor="projectTitle" className="block text-md font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            id="projectTitle"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., Upcycled Plastic Phone Stand"
          />
        </div>

        <div>
          <label htmlFor="projectCategory" className="block text-md font-medium text-gray-700 mb-1">Category</label>
          <select
            id="projectCategory"
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
          >
            <option value="" disabled>Select category</option>
            <option value="Plastic">Plastic</option>
            <option value="Paper">Paper</option>
            <option value="Glass">Glass</option>
            <option value="Wood">Wood</option>
            <option value="Electronic">Electronic</option>
            <option value="Fabric">Fabric</option>
            <option value="Iron">Iron</option>
            <option value="Rubber">Rubber</option>
          </select>
        </div>

        <div>
          <label htmlFor="projectDescription" className="block text-md font-medium text-gray-700 mb-1">Explain how you made this and what materials you used...</label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            rows="7"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
            placeholder="Explain how you made this and what materials you used..."
          ></textarea>
        </div>
      </div>

        <button
        type="submit"
        disabled={isUploadingVideo || isUploadingThumbnail}
        className={`w-full font-semibold px-6 py-3 rounded-xl text-lg transition ${
            isUploadingVideo || isUploadingThumbnail
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-700 text-white hover:bg-green-800'
        }`}
        >
        {isUploadingVideo || isUploadingThumbnail ? 'Uploading...' : 'Upload'}
        </button>

    </form>
  );
}
