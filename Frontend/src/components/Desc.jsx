import React, { useState, useEffect } from 'react';

export default function Desc({ data }) {
  const [userRating, setUserRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    // Cek di localStorage apakah user sudah memberi rating untuk video ini
    const ratedVideos = JSON.parse(localStorage.getItem('ratedVideos') || '{}');
    if (ratedVideos[data.id]) {
      setUserRating(ratedVideos[data.id]);
      setHasRated(true);
    }
  }, [data.id]);

  const handleRating = async (rating) => {
    if (hasRated) return; // Tidak bisa rating lagi

    // Get the authentication token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to rate videos.');
      return;
    }

    setUserRating(rating);
    setHasRated(true);
    saveToLocalStorage(data.id, rating);
    await submitRating(rating, token); // Pass the token to submitRating
  };

  const submitRating = async (rating, token) => {
    try {
      const response = await fetch('http://localhost:5000/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the authorization token
        },
        body: JSON.stringify({
          videoId: data.id,
          rating,
        }),
      });

      if (!response.ok) {
        // Handle non-2xx responses
        const errorData = await response.json();
        console.error('Failed to submit rating:', errorData.message);
        alert(`Failed to submit rating: ${errorData.message}`);
        // Optionally revert local state if submission failed
        setHasRated(false);
        setUserRating(null);
        removeRatingFromLocalStorage(data.id);
      }
    } catch (error) {
      console.error('Failed to submit rating:', error);
      alert('Failed to submit rating due to network error.');
      // Optionally revert local state if submission failed
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
    <div className="p-5 ml-23">
      <div className="mb-3 w-[745px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="border-2 px-1.5 py-1 w-[120px] font-semibold rounded-lg text-[18px]">Description</h3>
          <div className="flex items-center gap-1">
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
        <p>{data.description}</p>
      </div>

      {/* New Uploader Box */}
      <div className="mb-3 w-[745px]">
        <h3 className="border-2 px-4 py-1 w-[120px] font-semibold rounded-lg text-[18px] mb-2">Uploader</h3>
        <p className="font-medium">{data.uploader}</p> {/* Display uploader's name */}
      </div>
    </div>
  );
}