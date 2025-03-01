import React, { useState, useRef } from 'react';
import { Mic, MicOff, User, Phone, PhoneOff, Volume2, VolumeX } from 'lucide-react';

const WalkieTalkie: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference for the siren audio

  const contacts = [
    { id: 1, name: 'Emergency Services', status: 'Available' },
    { id: 2, name: 'Sarah (Sister)', status: 'Available' },
    { id: 3, name: 'Mom', status: 'Offline' },
    { id: 4, name: 'Campus Security', status: 'Available' },
  ];

  const handlePlaySiren = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Play the siren audio
    }
    setIsConnected(true);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-luxe-onyx">Help Siren</h1>
      </header>

      <audio ref={audioRef} src=".bolt/warning-buzzer-the-foundation-4-4-00-16.mp3" /> {/* Audio element */}

      {isConnected ? (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
          <div className="w-20 h-20 bg-luxe-emerald rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-luxe-onyx mb-1">Connected</h2>
          <p className="text-sm text-luxe-onyx mb-6">Connected - 00:32</p>

          <div className="flex justify-center space-x-6 mb-6">
            <button
              className={`p-4 rounded-full ${isMuted ? 'bg-luxe-champagne' : 'bg-luxe-emerald'}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <MicOff className="h-6 w-6 text-luxe-onyx" />
              ) : (
                <Mic className="h-6 w-6 text-white" />
              )}
            </button>

            <button className="p-4 rounded-full bg-red-100" onClick={() => setIsConnected(false)}>
              <PhoneOff className="h-6 w-6 text-red-600" />
            </button>

            <button
              className={`p-4 rounded-full ${isSpeakerOn ? 'bg-luxe-emerald' : 'bg-luxe-champagne'}`}
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            >
              {isSpeakerOn ? (
                <Volume2 className="h-6 w-6 text-white" />
              ) : (
                <VolumeX className="h-6 w-6 text-luxe-onyx" />
              )}
            </button>
          </div>

          <p className="text-sm text-luxe-onyx italic"></p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold text-luxe-onyx mb-3">Click to play Siren</h2>
            <button
              className="w-full bg-luxe-emerald hover:bg-luxe-emerald-dark text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              onClick={handlePlaySiren} // Play the siren and connect
            >
              <Phone className="h-5 w-5 mr-2" />
              SIREN
            </button>
          </div>

          
        </>
      )}
    </div>
  );
};

export default WalkieTalkie;
