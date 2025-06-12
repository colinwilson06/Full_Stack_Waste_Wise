import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchAndHead() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const suggestions = ['plastic', 'glass', 'metal', 'paper', 'fabric', 'wood', 'rubber'];

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (material) => {
    setQuery('');
    setShowSuggestions(false);
    navigate('/searchmaterial', { state: { materialType: material } });
  };

  return (
    <div className="bg-white p-8 md:p-12 mb-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-left">
        Find Your New Recycling Idea
      </h1>

      <div className="w-[1200px] relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="What do you have in mind..."
          className="w-full py-3 pl-12 pr-4 rounded-full border-2 border-gray-300 focus:outline-none focus:border-green-500 text-lg shadow-sm"
        />
        <img
          src="search.svg"
          alt="Search Icon"
          className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />

        {/* Suggestion Dropdown */}
        {showSuggestions && query && (
          <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((material) => (
                <li
                  key={material}
                  onClick={() => handleSelect(material)}
                  className="px-4 py-2 cursor-pointer hover:bg-green-100"
                >
                  {material.charAt(0).toUpperCase() + material.slice(1)}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No suggestions</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
