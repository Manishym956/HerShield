import React from 'react';
import { Home, Map, Radio, Settings, Bot } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'maps', label: 'Maps', icon: Map },
    { id: 'walkieTalkie', label: 'Walkie Talkie', icon: Radio },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'aiHelper', label: 'AI Helper', icon: Bot },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-purple-600' : 'text-gray-500'
              }`}
              onClick={() => setActivePage(item.id)}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'stroke-purple-600' : 'stroke-gray-500'}`} />
              <span className={`text-xs mt-1 ${isActive ? 'font-medium' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;