import React from 'react';
import { Shield, Bell, Users, Phone } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-purple-800">HerShield</h1>
        <p className="text-gray-600">Your personal safety companion</p>
      </header>

      <div className="bg-white rounded-xl shadow-md p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Safety Status</h2>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Safe
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Your location is being shared with your trusted contacts.
        </p>
        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
          SOS Emergency
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
          <div className="bg-purple-100 p-3 rounded-full mb-2">
            <Shield className="h-6 w-6 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Safety Tips</span>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
          <div className="bg-blue-100 p-3 rounded-full mb-2">
            <Bell className="h-6 w-6 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Alerts</span>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full mb-2">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Trusted Contacts</span>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
          <div className="bg-orange-100 p-3 rounded-full mb-2">
            <Phone className="h-6 w-6 text-orange-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Emergency Call</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="bg-gray-100 rounded-full p-2 mr-3">
              <Bell className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Safety check completed</p>
              <p className="text-xs text-gray-500">Today, 2:30 PM</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-gray-100 rounded-full p-2 mr-3">
              <Users className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Added new trusted contact</p>
              <p className="text-xs text-gray-500">Yesterday, 6:15 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;