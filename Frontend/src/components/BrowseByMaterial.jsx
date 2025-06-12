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
    <div className="p-10 -mt-20"> 
      <h2 className="bg-gray-700 rounded-4xl text-white text-xl font-bold px-4 py-2 mb-8 inline-block text-left">
        Browse by Material
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {materials.map((material) => (
          <Link
            key={material.name}
            to="/searchmaterial"
            state={{ materialType: material.name.toLowerCase() }}
            className="w-[206px] flex flex-col justify-between"
          >
            <img
              src={material.icon}
              alt={material.name}
              className=""
            />
            <div className="py-2 mt-2 text-center border-3 rounded-4xl border-black font-semibold">
              {material.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
