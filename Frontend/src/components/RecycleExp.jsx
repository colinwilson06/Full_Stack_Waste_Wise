import React from 'react';

export default function RecycleExp() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-10 mb-20">
      {/* Section Title */}
      <div className="flex justify-center mb-10">
        <h2 className="text-[32px] sm:text-[38px] md:text-[45px] font-bold relative text-shadow-lg text-center">
          Why Must Recycle?
          <span className="block w-[200px] sm:w-[300px] md:w-[410px] h-[4px] bg-[#AED581] mt-1 mx-auto"></span>
        </h2>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-2xl p-6 text-center hover:shadow-lg transition duration-300">
          <img src="Reduce.svg" alt="Reduce Waste" className="mx-auto mb-4 w-[180px] sm:w-[200px] md:w-[214px]" />
          <h3 className="text-lg font-bold text-[#252B42] mb-2">Reducing Waste</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Recycling helps minimize the amount of trash sent to landfills by giving discarded materials a second life.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-2xl p-6 text-center hover:shadow-lg transition duration-300">
          <img src="Saving.svg" alt="Saving Resources" className="mx-auto mb-4 w-[180px] sm:w-[200px] md:w-[214px]" />
          <h3 className="text-lg font-bold text-[#252B42] mb-2">Saving Resources</h3>
          <p className="text-sm sm:text-base text-gray-600">
            By reusing processed materials, we reduce the need for raw resources like water, energy, and raw minerals.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-2xl p-6 text-center hover:shadow-lg transition duration-300">
          <img src="SaveEnv.svg" alt="Save Environment" className="mx-auto mb-4 w-[180px] sm:w-[200px] md:w-[214px]" />
          <h3 className="text-lg font-bold text-[#252B42] mb-2">Save Environment</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Recycling lowers pollution, reduces carbon emissions, and lessens the environmental footprint of manufacturing.
          </p>
        </div>
      </div>
    </div>
  );
}
