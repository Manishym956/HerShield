import React, { useState, Suspense } from 'react';
import Navbar from './components/Navbar';

const Home = React.lazy(() => import('./pages/Home'));
const Maps = React.lazy(() => import('./pages/Maps'));
const WalkieTalkie = React.lazy(() => import('./pages/WalkieTalkie'));
const Settings = React.lazy(() => import('./pages/Settings'));
const AIHelper = React.lazy(() => import('./pages/AIHelper'));

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
    <div className="min-h-screen bg-gradient-to-b from-luxe-ivory to-luxe-champagne flex flex-col">
      <div className="flex-1 overflow-auto pb-16">
        <Suspense fallback={<div className="text-luxe-sapphire">Loading...</div>}>
          {renderPage()}
        </Suspense>
      </div>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}

export default App;
