import React, { useState, useEffect } from 'react';

export default function Desc({ data }) {
  const [userRating, setUserRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    const ratedVideos = JSON.parse(localStorage.getItem('ratedVideos') || '{}');
    if (ratedVideos[data.id]) {
      setUserRating(ratedVideos[data.id]);
      setHasRated(true);
    }
  }, [data.id]);

  const handleRating = async (rating) => {
    if (hasRated) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to rate videos.');
      return;
    }

    setUserRating(rating);
    setHasRated(true);
    saveToLocalStorage(data.id, rating);
    await submitRating(rating, token);
  };

  const submitRating = async (rating, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ videoId: data.id, rating }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to submit rating: ${errorData.message}`);
        setHasRated(false);
        setUserRating(null);
        removeRatingFromLocalStorage(data.id);
      }
    } catch (error) {
      alert('Failed to submit rating due to network error.');
      setHasRated(false);
      setUserRating(null);
      removeRatingFromLocalStorage(data.id);
    }
  };

  const saveToLocalStorage = (videoId, rating) => {
    const ratedVideos = JSON.parse(localStorage.getItem('ratedVideos') || '{}');
    ratedVideos[videoId] = rating;
    localStorage.setItem('ratedVideos', JSON.stringify(ratedVideos));
  };

  const removeRatingFromLocalStorage = (videoId) => {
    const ratedVideos = JSON.parse(localStorage.getItem('ratedVideos') || '{}');
    delete ratedVideos[videoId];
    localStorage.setItem('ratedVideos', JSON.stringify(ratedVideos));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full max-w-4xl mx-auto">
      {/* Description Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 className="border-2 px-2 py-1 w-fit font-semibold rounded-lg text-[18px]">Description</h3>
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                onMouseEnter={() => !hasRated && setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                className="transition transform hover:scale-110"
                disabled={hasRated}
              >
                <img
                  src={
                    (hoverRating || userRating) >= star
                      ? '/star2.svg'
                      : '/starOut.svg'
                  }
                  alt={`Star ${star}`}
                  className="w-6 h-6"
                />
              </button>
            ))}
            {userRating && (
              <span className="ml-2 text-sm font-medium text-green-700">
                {userRating} / 5
              </span>
            )}
            {hasRated && (
              <span className="ml-2 text-xs text-gray-500">(You have rated)</span>
            )}
          </div>
        </div>
        <p className="text-gray-700 text-base">{data.description}</p>
      </div>

      {/* Uploader Section */}
      <div className="mb-6">
        <h3 className="border-2 px-4 py-1 w-fit font-semibold rounded-lg text-[18px] mb-2">Uploader</h3>
        <p className="font-medium text-gray-800">{data.uploader}</p>
      </div>
    </div>
  );
}
