import React from 'react';
import { Home, Map, Radio, Settings, Bot } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'maps', label: 'Maps', icon: Map, link: 'https://golden-lamington-c3e5f0.netlify.app/' },
    { id: 'walkieTalkie', label: 'Walkie Talkie', icon: Radio },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'aiHelper', label: 'AI Helper', icon: Bot },
  ];

  const handleClick = (item: { id: string; link?: string }) => {
    if (item.link) {
      // If the item has a link, open it in a new tab
      window.open(item.link, '_blank');
    } else {
      // Otherwise, set the active page for internal navigation
      setActivePage(item.id);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-luxe-ivory shadow-lg rounded-t-xl">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-luxe-emerald' : 'text-luxe-onyx'
              }`}
              onClick={() => handleClick(item)}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'stroke-luxe-emerald' : 'stroke-luxe-onyx'}`} />
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
