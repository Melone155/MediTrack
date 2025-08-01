"use client"

import React from 'react';
import { Package, Truck, Users, BarChart3, AlertTriangle } from 'lucide-react';

interface NavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'inventory', label: 'Lager', icon: Package },
        { id: 'vehicles', label: 'Fahrzeuge', icon: Truck },
        { id: 'users', label: 'Benutzer', icon: Users },
    ];

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">MediTrack</span>
                        </div>
                    </div>

                    <div className="flex space-x-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => onTabChange(tab.id)}
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;