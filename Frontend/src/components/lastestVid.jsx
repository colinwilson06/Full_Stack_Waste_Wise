import React from 'react';

const videos = [
  {
    id: 1,
    title: 'Creative Plastic Bottle Upcycle',
    thumbnail: '/thumbnails/plastic-bottle.jpg',
    url: 'https://www.youtube.com/watch?v=abc123',
  },
  {
    id: 2,
    title: 'DIY Paper Recycling Tutorial',
    thumbnail: '/thumbnails/paper-recycle.jpg',
    url: 'https://www.youtube.com/watch?v=def456',
  },
  {
    id: 3,
    title: 'How to Make Metal Art from Scrap',
    thumbnail: '/thumbnails/metal-art.jpg',
    url: 'https://www.youtube.com/watch?v=ghi789',
  },
];

export default function LatestVid() {
  return (
    <section className="mx-10 my-12 max-w-6xl">
      <h2 className="text-4xl font-bold text-green-900 mb-8">Latest Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {videos.map(video => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-green-900">{video.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
