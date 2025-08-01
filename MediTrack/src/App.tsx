import { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './dashbord/Dashboard';
import Inventory from './dashbord/Inventory';
import Vehicles from './dashbord/Vehicles';
import Users from './dashbord/Users';

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard />;
            case 'inventory':
                return <Inventory />;
            case 'vehicles':
                return <Vehicles />;
            case 'users':
                return <Users />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            {renderContent()}
        </div>
    );
}

export default App;