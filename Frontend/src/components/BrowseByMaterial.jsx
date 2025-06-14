import React from 'react';
import { Link } from 'react-router-dom';

export default function BrowseByMaterial() {
  const materials = [
    { name: 'Plastic', icon: 'Plastic.svg' },
    { name: 'Paper', icon: 'Paper.svg' },
    { name: 'Wood', icon: 'Wood.svg' },
    { name: 'Electronic', icon: 'Electronic.svg' },
    { name: 'Fabric', icon: 'Fabric.svg' },
    { name: 'Iron', icon: 'Iron.svg' },
    { name: 'Glass', icon: 'Glass.svg' },
    { name: 'Rubber', icon: 'Rubber.svg' },
  ];

  return (
    <div className="p-6 sm:p-8 md:p-10 -mt-20">
      <h2 className="bg-gray-700 rounded-3xl text-white text-lg sm:text-xl font-bold px-4 py-2 mb-8 inline-block">
        Browse by Material
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {materials.map((material) => (
          <Link
            key={material.name}
            to="/searchmaterial"
            state={{ materialType: material.name.toLowerCase() }}
            className="flex flex-col items-center w-full max-w-[206px] mx-auto p-2 hover:scale-105 transition-transform duration-200"
          >
            <img
              src={material.icon}
              alt={material.name}
              className="w-full object-contain"
            />
            <div className="py-2 mt-2 text-center border-2 rounded-2xl border-black font-semibold w-full">
              {material.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
