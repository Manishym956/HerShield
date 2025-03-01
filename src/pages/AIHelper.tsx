// File: .env (create this in your project root)
REACT_APP_GOOGLE_CLOUD_PROJECT_ID=your-project-id
// Do NOT put your private key in .env files that might be committed to version control

// File: src/services/speechToText.ts
import axios from 'axios';

// Configure environment for Google Cloud client libraries
interface SpeechRecognitionConfig {
  encoding: string;
  sampleRateHertz: number;
  languageCode: string;
  model: string;
}

interface RecognitionRequest {
  config: SpeechRecognitionConfig;
  audio: {
    content: string;
  };
}

class SpeechToTextService {
  private apiUrl = 'https://speech.googleapis.com/v1/speech:recognize';
  
  // Method to get auth token - in a real app, this would call your secure backend
  private async getAuthToken() {
    // IMPORTANT: This should be handled by your backend
    // NEVER handle service account keys in frontend code
    try {
      // In production, call your own backend API that safely manages authentication
      const response = await axios.get('/api/get-google-auth-token');
      return response.data.token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      throw error;
    }
  }
  
  // Convert audio blob to base64
  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  
  // Recognize speech using Google Cloud Speech-to-Text API
  public async recognizeSpeech(audioBlob: Blob): Promise<string> {
    try {
      const token = await this.getAuthToken();
      const audioContent = await this.blobToBase64(audioBlob);
      
      const request: RecognitionRequest = {
        config: {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
          model: 'default'
        },
        audio: {
          content: audioContent
        }
      };
      
      const response = await axios.post(this.apiUrl, request, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.results && response.data.results.length > 0) {
        return response.data.results[0].alternatives[0].transcript;
      }
      
      return '';
    } catch (error) {
      console.error('Error recognizing speech:', error);
      throw error;
    }
  }
}

export default new SpeechToTextService();

// File: src/components/AIHelper.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Mic, Image, MapPin, Loader } from 'lucide-react';
import speechToTextService from '../services/speechToText';

// Define types for our component
interface Message {
  id: number;
  type: 'ai' | 'user';
  text: string;
}

const AIHelper: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'ai', text: 'Hello! I\'m your SafeGuardian AI assistant. How can I help you today?' },
    { id: 2, type: 'user', text: 'I\'m walking home alone tonight. Any safety tips?' },
    { id: 3, type: 'ai', text: 'Of course! Here are some tips for walking home safely:\n\n1. Stay in well-lit areas\n2. Share your location with a trusted contact\n3. Keep your phone charged and accessible\n4. Stay alert and avoid distractions like headphones\n5. Consider using the SafeGuardian\'s "Track My Journey" feature' },
  ]);
  
  // State for recording
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  // Start recording audio
  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        setIsProcessing(true);
        
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const transcription = await speechToTextService.recognizeSpeech(audioBlob);
          setMessage(transcription);
        } catch (error) {
          console.error('Error transcribing audio:', error);
        } finally {
          setIsProcessing(false);
          
          // Stop all tracks from the stream
          stream.getTracks().forEach(track => track.stop());
        }
      };
      
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };
  
  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };
  
  // Toggle recording
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      // Add user message to chat
      const newUserMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        text: message.trim()
      };
      
      setMessages([...messages, newUserMessage]);
      
      // In a real app, we would call the AI service here
      // For demo purposes, we'll add a mock response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          type: 'ai',
          text: `I've received your message: "${message.trim()}". In a full implementation, I would provide a relevant safety response.`
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
      
      setMessage('');
    }
  };

  const suggestions = [
    "What should I do if I feel unsafe?",
    "How do I add emergency contacts?",
    "Safety tips for public transport",
    "How to use the SOS feature"
  ];

  // Auto-scroll to bottom of messages
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-luxe-sapphire flex items-center">
          <Bot className="h-6 w-6 mr-2 text-luxe-sapphire" />
          AI Safety Assistant
        </h1>
        <p className="text-sm text-gray-500">Ask me anything about personal safety</p>
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
                  ? 'bg-luxe-sapphire text-white rounded-tr-none' 
                  : 'bg-gray-100 shadow-md rounded-tl-none'
              }`}
            >
              {msg.type === 'ai' && (
                <div className="flex items-center mb-1">
                  <Bot className="h-4 w-4 mr-1 text-luxe-sapphire" />
                  <span className="text-xs font-medium text-luxe-sapphire">SafeGuardian AI</span>
                </div>
              )}
              <p className={`text-sm whitespace-pre-line ${msg.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 bg-white">
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {suggestions.map((suggestion, index) => (
              <button 
                key={index}
                className="px-3 py-2 bg-blue-50 text-luxe-sapphire rounded-full text-sm whitespace-nowrap"
                onClick={() => setMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder={isRecording ? "Recording..." : isProcessing ? "Processing speech..." : "Ask me anything about safety..."}
            className="bg-transparent border-none outline-none flex-1 text-gray-800 text-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isRecording || isProcessing}
          />
          <div className="flex space-x-2">
            <button 
              className={`p-2 ${isRecording ? 'text-red-500 animate-pulse' : isProcessing ? 'text-amber-500' : 'text-luxe-sapphire'}`}
              onClick={toggleRecording}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : isRecording ? (
                <div className="relative">
                  <Mic className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </div>
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </button>
            <button className="p-2 text-luxe-sapphire">
              <Image className="h-5 w-5" />
            </button>
            <button className="p-2 text-luxe-sapphire">
              <MapPin className="h-5 w-5" />
            </button>
            <button 
              className={`p-2 rounded-full ${message.trim() ? 'bg-luxe-sapphire text-white' : 'text-gray-400 bg-gray-200'}`}
              onClick={handleSend}
              disabled={!message.trim() || isRecording || isProcessing}
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

// File: src/backend/authMiddleware.js (example backend code to handle authentication)
// This would be implemented on your server, not in your React app
const { GoogleAuth } = require('google-auth-library');

// Load credentials securely on the server
const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/cloud-platform'
});

const getAuthToken = async (req, res) => {
  try {
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    res.json({ token: token.token });
  } catch (error) {
    console.error('Error getting auth token:', error);
    res.status(500).json({ error: 'Failed to get authentication token' });
  }
};

// Export for use in your Express/Node.js routes
module.exports = { getAuthToken };