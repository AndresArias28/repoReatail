import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { Recommendations } from './components/Recommendations';
import { UploadData } from './components/UploadData';
import { SalesMonth } from './components/SalesMonth';
import { Settings } from './components/Settings';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'sales':
        return <SalesMonth />;
      case 'inventory':
        return <Inventory />;
      case 'recommendations':
        return <Recommendations />;
      case 'upload':
        return <UploadData />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#ECEFF1]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
