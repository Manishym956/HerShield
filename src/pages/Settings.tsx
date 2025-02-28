import React, { useState } from 'react';
import { Bell, Shield, Users, MapPin, Clock, Moon, ChevronRight, ToggleLeft, ToggleRight } from 'lucide-react';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [safetyChecks, setSafetyChecks] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { id: 'profile', label: 'Profile Information', icon: Users },
        { id: 'trusted', label: 'Trusted Contacts', icon: Users },
        { id: 'emergency', label: 'Emergency Contacts', icon: Users },
      ]
    },
    {
      title: 'Safety',
      items: [
        { 
          id: 'notifications', 
          label: 'Notifications', 
          icon: Bell,
          toggle: true,
          value: notifications,
          onChange: () => setNotifications(!notifications)
        },
        { 
          id: 'location', 
          label: 'Location Sharing', 
          icon: MapPin,
          toggle: true,
          value: locationSharing,
          onChange: () => setLocationSharing(!locationSharing)
        },
        { 
          id: 'safetyChecks', 
          label: 'Safety Check Reminders', 
          icon: Shield,
          toggle: true,
          value: safetyChecks,
          onChange: () => setSafetyChecks(!safetyChecks)
        },
        { id: 'safeZones', label: 'Safe Zones', icon: MapPin },
      ]
    },
    {
      title: 'App Settings',
      items: [
        { 
          id: 'darkMode', 
          label: 'Dark Mode', 
          icon: Moon,
          toggle: true,
          value: darkMode,
          onChange: () => setDarkMode(!darkMode)
        },
        { id: 'dataUsage', label: 'Data Usage', icon: Clock },
        { id: 'about', label: 'About & Help', icon: Shield },
      ]
    }
  ];

  return (
    <div className="p-4 max-w-md mx-auto">
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-purple-800">Settings</h1>
        <p className="text-gray-600">Customize your safety preferences</p>
      </header>

      {settingsSections.map((section, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">{section.title}</h2>
          <div className="space-y-2">
            {section.items.map(item => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <item.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{item.label}</span>
                </div>
                
                {item.toggle ? (
                  <button 
                    onClick={item.onChange}
                    className="focus:outline-none"
                  >
                    {item.value ? (
                      <ToggleRight className="h-6 w-6 text-purple-600" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-6 mb-4">
        <button className="text-red-500 font-medium">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;