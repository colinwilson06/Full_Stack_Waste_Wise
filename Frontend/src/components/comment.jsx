import React from 'react';

export default function CommentSection() {
  const comments = [
    {
      id: 1,
      username: '@EcoCrafts101',
      date: '10 days ago',
      text: 'Nggak nyangka plastik kresek bisa jadi dompet sekeren ini! Tutorialnya jelas banget, makasih!',
      likes: 120,
      avatar: 'avatar2.svg',
    },
    {
      id: 2,
      username: '@CraftyNadia',
      date: '18 days ago',
      text: 'Boleh banget nih dipakai untuk gift buatan tangan. Video ini bener-bener inspiratif!',
      likes: 140,
      avatar: 'avatar1.svg',
    },
  ];

  return (
    <div className="w-[820px] mx-22 p-4">
      <h2 className="text-2xl font-bold mb-4">Comment</h2>
      <div className="bg-gray-100 rounded-md flex items-center p-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
        <input
          type="text"
          placeholder="add your comment.."
          className="flex-grow bg-transparent focus:outline-none text-gray-700"
        />
      </div>

      {comments.map(comment => (
        <div key={comment.id} className="bg-white shadow-md rounded-md p-4 mb-4">
          <div className="flex items-center mb-2">
            <img src={comment.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <p className="text-sm font-semibold">{comment.username}</p>
              <p className="text-xs text-gray-500">{comment.date}</p>
            </div>
          </div>
          <p className="italic text-gray-800 mb-2">{comment.text}</p>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-1">🤍</span> {comment.likes}
            <button className="ml-6 hover:underline">Reply</button>
          </div>
        </div>
      ))}
    </div>
  );
}
