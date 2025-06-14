import React from 'react';

export default function HowToUse() {
  return (
    <div className="bg-[#F8FFE7] mt-20 mb-10 pt-10 px-4 sm:px-6 lg:px-8">
      <div className="py-10">
        <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[55px] font-bold inline-block relative mb-10 text-shadow-lg">
          How it Works?
          <span className="block w-[100px] sm:w-[120px] md:w-[150px] h-[4px] bg-[#AED581] mt-1"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              number: 1,
              title: 'Search for Materials',
              img: 'HowSearch.svg',
              text: 'Choose the type of material you want to recycle, such as plastic or paper, from our categorized list.',
            },
            {
              number: 2,
              title: 'Access Tutorials',
              img: 'HowTutorial.svg',
              text: 'Browse through various tutorials that guide you on how to recycle items properly.',
            },
            {
              number: 3,
              title: 'Join and Share',
              img: 'Join&Share.svg',
              text: 'Upload your own tutorial videos, rate, and comment on others tutorials to help the community.',
            },
            {
              number: 4,
              title: 'Rating and Comment',
              img: 'Rate&Comment.svg',
              text: 'Give feedback on tutorials and help others learn better.',
            },
          ].map((step) => (
            <div key={step.number} className="flex items-start space-x-4 p-4">
              {/* Circle Number */}
              <div className="flex-shrink-0 text-[20px] sm:text-[26px] md:text-[30px] bg-[#333] text-white w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold">
                {step.number}
              </div>

              {/* Main Content */}
              <div className="w-full">
                {/* Title Badge */}
                <h3 className="bg-[#2E7D32] text-white inline-block px-4 py-1 rounded-full text-lg sm:text-xl md:text-[26px] font-bold mb-3">
                  {step.title}
                </h3>

                {/* Image & Text */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4">
                  {/* Image */}
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-[160px] sm:w-[180px] md:w-[189px] mb-4 sm:mb-0"
                  />

                  {/* Divider */}
                  <div className="hidden sm:block w-[4px] h-[150px] bg-gray-400 mr-2"></div>

                  {/* Description */}
                  <p className="text-base sm:text-lg md:text-xl lg:text-[24px] text-black font-medium leading-relaxed w-full max-w-[610px]">
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
