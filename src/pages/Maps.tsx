import React, { useState } from 'react';
import { Search, Navigation, MapPin, Clock, Star } from 'lucide-react';

const Maps: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="relative h-full">
      {/* Map placeholder */}
      <div className="h-full bg-gray-200 relative">
        <img 
          src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
          alt="Map" 
          className="w-full h-full object-cover"
        />
        
        {/* Current location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="h-6 w-6 bg-purple-600 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-white rounded-full"></div>
            </div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-purple-600"></div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="absolute top-4 left-4 right-4">
        <div className="bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for safe locations..."
              className="bg-transparent border-none outline-none flex-1 text-gray-800"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Safe Routes</h3>
            <button className="bg-purple-100 p-2 rounded-full">
              <Navigation className="h-5 w-5 text-purple-600" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center p-2 bg-purple-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Safe Path to Home</p>
                <p className="text-xs text-gray-500">Via well-lit streets, 15 min</p>
              </div>
              <button className="bg-purple-600 p-2 rounded-full">
                <Navigation className="h-4 w-4 text-white" />
              </button>
            </div>
            
            <div className="flex items-center p-2 rounded-lg">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Recent: Work</p>
                <p className="text-xs text-gray-500">20 min via public transport</p>
              </div>
              <button className="bg-gray-200 p-2 rounded-full">
                <Star className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;