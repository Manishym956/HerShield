import React, { useState } from 'react';
import { Send, Bot, User, Mic, Image, MapPin } from 'lucide-react';

const AIHelper: React.FC = () => {
  const [message, setMessage] = useState('');
  
  const messages = [
    { id: 1, type: 'ai', text: 'Hello! I\'m your SafeGuardian AI assistant. How can I help you today?' },
    { id: 2, type: 'user', text: 'I\'m walking home alone tonight. Any safety tips?' },
    { id: 3, type: 'ai', text: 'Of course! Here are some tips for walking home safely:\n\n1. Stay in well-lit areas\n2. Share your location with a trusted contact\n3. Keep your phone charged and accessible\n4. Stay alert and avoid distractions like headphones\n5. Consider using the SafeGuardian\'s "Track My Journey" feature' },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // In a real app, we would add the message to the state
      // and send it to an AI service
      setMessage('');
    }
  };

  const suggestions = [
    "What should I do if I feel unsafe?",
    "How do I add emergency contacts?",
    "Safety tips for public transport",
    "How to use the SOS feature"
  ];

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-luxe-sapphire flex items-center">
          <Bot className="h-6 w-6 mr-2 text-luxe-sapphire" />
          AI Safety Assistant
        </h1>
        <p className="text-sm text-luxe-ivory">Ask me anything about personal safety</p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl p-3 ${
                msg.type === 'user' 
                  ? 'bg-luxe-sapphire text-luxe-ivory rounded-tr-none' 
                  : 'bg-luxe-ivory shadow-md rounded-tl-none'
              }`}
            >
              {msg.type === 'ai' && (
                <div className="flex items-center mb-1">
                  <Bot className="h-4 w-4 mr-1 text-luxe-sapphire" />
                  <span className="text-xs font-medium text-luxe-sapphire">SafeGuardian AI</span>
                </div>
              )}
              <p className={`text-sm whitespace-pre-line ${msg.type === 'user' ? 'text-luxe-ivory' : 'text-luxe-sapphire'}`}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 bg-white">
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {suggestions.map((suggestion, index) => (
              <button 
                key={index}
                className="px-3 py-2 bg-luxe-sapphire-10 text-luxe-sapphire rounded-full text-sm whitespace-nowrap"
                onClick={() => setMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center bg-luxe-ivory rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Ask me anything about safety..."
            className="bg-transparent border-none outline-none flex-1 text-luxe-sapphire text-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <div className="flex space-x-2">
            <button className="p-2 text-luxe-sapphire">
              <Mic className="h-5 w-5" />
            </button>
            <button className="p-2 text-luxe-sapphire">
              <Image className="h-5 w-5" />
            </button>
            <button className="p-2 text-luxe-sapphire">
              <MapPin className="h-5 w-5" />
            </button>
            <button 
              className={`p-2 rounded-full ${message.trim() ? 'bg-luxe-sapphire text-luxe-ivory' : 'text-luxe-ivory'}`}
              onClick={handleSend}
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHelper;
