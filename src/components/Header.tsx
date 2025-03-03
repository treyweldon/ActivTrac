import React from 'react';
import { WholeWord as GolfHole, Bike, Waves } from 'lucide-react';

interface HeaderProps {
  activeTab: 'form' | 'history';
  setActiveTab: (tab: 'form' | 'history') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex space-x-2 mr-2">
              <GolfHole className="h-6 w-6" />
              <Waves className="h-6 w-6" />
              <Bike className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">Activity Tracker</h1>
          </div>
          
          <nav>
            <ul className="flex space-x-1">
              <li>
                <button
                  onClick={() => setActiveTab('form')}
                  className={`px-4 py-2 rounded-md transition ${
                    activeTab === 'form'
                      ? 'bg-white text-indigo-600 font-medium'
                      : 'text-white hover:bg-indigo-500'
                  }`}
                >
                  Track Activity
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-2 rounded-md transition ${
                    activeTab === 'history'
                      ? 'bg-white text-indigo-600 font-medium'
                      : 'text-white hover:bg-indigo-500'
                  }`}
                >
                  Activity History
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;