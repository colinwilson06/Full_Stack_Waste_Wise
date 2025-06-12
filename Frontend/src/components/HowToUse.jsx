import React from 'react'

export default function HowToUse() {
  return (
    <div className='bg-[#F8FFE7] mt-25 mb-10 pt-10 px-8'>
      <div className="bg-[#F8FFE7] py-10 px-6">
          <h2 className="text-[55px] font-bold inline-block relative mb-10 text-shadow-lg">
            How it Works?
            <span className="block w-[150px] h-[4px] bg-[#AED581] mt-1"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <div className="flex items-start space-x-4 p-4">
                {/* Circle Number */}
                <div className="flex-shrink-0 text-[30px] bg-[#333] text-white w-13 h-13 rounded-full flex items-center justify-center font-bold">
                    1
                </div>

                {/* Main Content */}
                <div>
                  {/* Badge Title */}
                  <h3 className="bg-[#2E7D32] text-white inline-block px-4 py-1 rounded-full text-[30px] font-bold mb-3">
                    Search for Materials
                  </h3>

                  {/* Image and Text with Divider */}
                  <div className="flex items-center">
                    {/* Image */}
                    <img src="HowSearch.svg" alt="Search" className="w-[189px]" />

                    {/* Divider */}
                    <div className="w-[5px] h-[150px] bg-gray-400 mx-1 mr-5"></div>

                    {/* Description */}
                    <p className="text-[24px] text-black font-medium w-[610px] leading-relaxed">
                      Choose the type of material you want to recycle, such as plastic or paper, from our categorized list.
                    </p>
                  </div>
                  </div>
            </div>
            {/* Step 3 */}
            <div className="flex items-start space-x-4 p-4">
                {/* Circle Number */}
                <div className="flex-shrink-0 bg-[#333] text-white text-[30px] w-13 h-13 rounded-full flex items-center justify-center font-bold">
                    3
                </div>

                {/* Main Content */}
                <div>
                  {/* Badge Title */}
                  <h3 className="bg-[#2E7D32] text-white inline-block px-4 py-1 rounded-full text-[30px] font-bold mb-3">
                    Join and Share
                  </h3>

                  {/* Image and Text with Divider */}
                  <div className="flex items-center">
                    {/* Image */}
                    <img src="Join&Share.svg" alt="Search" className="w-[189px] ml" />

                    {/* Divider */}
                    <div className="w-[5px] h-[150px] bg-gray-400 mx-1 mr-5"></div>

                    {/* Description */}
                    <p className="text-[24px] text-black font-medium w-[610px] leading-relaxed">
                      Upload your own tutorial videos, rate, and comment on others tutorials to help the community.
                    </p>
                  </div>
                  </div>
            </div>
            {/* Step 2 */}
            <div className="flex items-start space-x-4 p-4">
                {/* Circle Number */}
                <div className="flex-shrink-0 bg-[#333] text-white text-[30px] w-13 h-13 rounded-full flex items-center justify-center font-bold">
                    2
                </div>

                {/* Main Content */}
                <div>
                  {/* Badge Title */}
                  <h3 className="bg-[#2E7D32] text-white inline-block px-4 py-1 rounded-full text-[30px] font-bold mb-3">
                    Access Tutorials
                  </h3>

                  {/* Image and Text with Divider */}
                  <div className="flex items-center">
                    {/* Image */}
                    <img src="HowTutorial.svg" alt="Search" className="w-[189px] ml" />

                    {/* Divider */}
                    <div className="w-[5px] h-[150px] bg-gray-400 mx-1 mr-5"></div>

                    {/* Description */}
                    <p className="text-[24px] text-black font-medium w-[610px] leading-relaxed">
                      Browse through various tutorials that guide you on how to recycle items properly.
                    </p>
                  </div>
                  </div>
            </div>
            {/* Step 4 */}
            <div className="flex items-start space-x-4 p-4">
                {/* Circle Number */}
                <div className="flex-shrink-0 bg-[#333] text-white text-[30px] w-13 h-13 rounded-full flex items-center justify-center font-bold">
                    4
                </div>

                {/* Main Content */}
                <div>
                  {/* Badge Title */}
                  <h3 className="bg-[#2E7D32] text-white inline-block px-4 py-1 rounded-full text-[30px] font-bold mb-3">
                    Rating and Comment
                  </h3>

                  {/* Image and Text with Divider */}
                  <div className="flex items-center">
                    {/* Image */}
                    <img src="Rate&Comment.svg" alt="Search" className="w-[189px] ml" />

                    {/* Divider */}
                    <div className="w-[5px] h-[150px] bg-gray-400 mx-1 mr-5"></div>

                    {/* Description */}
                    <p className="text-[24px] text-black font-medium w-[610px] leading-relaxed">
                      Give feedback on tutorials and help others learn better.
                    </p>
                  </div>
                  </div>
            </div>




          </div>
        </div>

    </div>
  )
}
