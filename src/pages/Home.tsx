import React from 'react';
import { Shield, Bell, Users, Phone } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-luxe-sapphire">HerShield</h1>
        <p className="text-luxe-onyx">Your personal safety companion</p>
      </header>

      <div className="bg-luxe-ivory rounded-xl shadow-md p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-luxe-onyx">Safety Status</h2>
          <span className="px-3 py-1 bg-luxe-emerald text-white rounded-full text-sm font-medium">
            Safe
          </span>
        </div>
        <p className="text-luxe-onyx text-sm mb-4">
          Your location is being shared with your trusted contacts.
        </p>
        <button className="w-full bg-luxe-gold hover:bg-luxe-sapphire text-white font-bold py-3 px-4 rounded-lg transition-colors">
          SOS Emergency
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-luxe-champagne p-4 rounded-xl shadow-sm flex flex-col items-center">
          <div className="bg-luxe-cream p-3 rounded-full mb-2">
            <Shield className="h-6 w-6 text-luxe-gold" />
          </div>
          <span className="text-sm font-medium text-luxe-onyx">Safety Tips</span>
        </div>
        
        <div className="bg-luxe-champagne p-4 rounded-xl shadow-sm flex flex-col items-center">
          <button className="bg-luxe-ivory p-3 rounded-full mb-2">
            <Bell className="h-6 w-6 text-luxe-sapphire" />
          </button>
   
          <span className="text-sm font-medium text-luxe-onyx">Help Siren</span>
     
          
        </div>
        
        <div className="bg-luxe-champagne p-4 rounded-xl shadow-sm flex flex-col items-center">
          <div className="bg-luxe-emerald p-3 rounded-full mb-2">
            <Users className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm font-medium text-luxe-onyx">Trusted Contacts</span>
        </div>
        
        <div className="bg-luxe-champagne p-4 rounded-xl shadow-sm flex flex-col items-center">
          <div className="bg-luxe-gold p-3 rounded-full mb-2">
            <Phone className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm font-medium text-luxe-onyx">Emergency Call</span>
        </div>
      </div>

     
        </div>
     
  );
};

export default Home;
