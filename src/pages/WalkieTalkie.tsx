import React, { useState } from 'react';
import { Mic, MicOff, User, Phone, PhoneOff, Volume2, VolumeX } from 'lucide-react';

const WalkieTalkie: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  
  const contacts = [
    { id: 1, name: 'Emergency Services', status: 'Available' },
    { id: 2, name: 'Sarah (Sister)', status: 'Available' },
    { id: 3, name: 'Mom', status: 'Offline' },
    { id: 4, name: 'Campus Security', status: 'Available' },
  ];

  return (
    <div className="p-4 max-w-md mx-auto">
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-purple-800">Walkie Talkie</h1>
        <p className="text-gray-600">Quick voice communication with your trusted contacts</p>
      </header>

      {isConnected ? (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-10 w-10 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">Emergency Services</h2>
          <p className="text-sm text-gray-500 mb-6">Connected - 00:32</p>
          
          <div className="flex justify-center space-x-6 mb-6">
            <button 
              className={`p-4 rounded-full ${isMuted ? 'bg-gray-200' : 'bg-purple-100'}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? 
                <MicOff className="h-6 w-6 text-gray-600" /> : 
                <Mic className="h-6 w-6 text-purple-600" />
              }
            </button>
            
            <button 
              className="p-4 rounded-full bg-red-100"
              onClick={() => setIsConnected(false)}
            >
              <PhoneOff className="h-6 w-6 text-red-600" />
            </button>
            
            <button 
              className={`p-4 rounded-full ${isSpeakerOn ? 'bg-purple-100' : 'bg-gray-200'}`}
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            >
              {isSpeakerOn ? 
                <Volume2 className="h-6 w-6 text-purple-600" /> : 
                <VolumeX className="h-6 w-6 text-gray-600" />
              }
            </button>
          </div>
          
          <p className="text-sm text-gray-600 italic">
            "Your location is being shared during this call"
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Connect</h2>
            <button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              onClick={() => setIsConnected(true)}
            >
              <Phone className="h-5 w-5 mr-2" />
              Emergency Services
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Contacts</h2>
            <div className="space-y-3">
              {contacts.map(contact => (
                <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      contact.status === 'Available' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <User className={`h-5 w-5 ${
                        contact.status === 'Available' ? 'text-green-600' : 'text-gray-500'
                      }`} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">{contact.name}</p>
                      <p className={`text-xs ${
                        contact.status === 'Available' ? 'text-green-600' : 'text-gray-500'
                      }`}>{contact.status}</p>
                    </div>
                  </div>
                  {contact.status === 'Available' && (
                    <button 
                      className="p-2 bg-purple-100 rounded-full"
                      onClick={() => setIsConnected(true)}
                    >
                      <Phone className="h-4 w-4 text-purple-600" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WalkieTalkie;