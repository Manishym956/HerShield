import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Maps from './pages/Maps';
import WalkieTalkie from './pages/WalkieTalkie';
import Settings from './pages/Settings';
import AIHelper from './pages/AIHelper';

function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'maps':
        return <Maps />;
      case 'walkieTalkie':
        return <WalkieTalkie />;
      case 'settings':
        return <Settings />;
      case 'aiHelper':
        return <AIHelper />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex flex-col">
      <div className="flex-1 overflow-auto pb-16">
        {renderPage()}
      </div>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}

export default App;