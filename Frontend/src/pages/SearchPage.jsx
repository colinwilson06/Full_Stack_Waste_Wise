import React from 'react';
import SearchAndHead from '../components/SearchAndHead'; // Komponen Search dan Header
import BrowseByMaterial from '../components/BrowseByMaterial'; // Komponen Kategori Material
import RecommendVid from '../components/RecommendVid'; // Diadaptasi untuk Video Tutorials

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-5">
        <SearchAndHead />

        <BrowseByMaterial />

        <div className="container mx-auto mt-10">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Latest Video Tutorials</h2>
          <RecommendVid isLatestTutorials={true} />
        </div>
      </div>

    </div>
  );
}