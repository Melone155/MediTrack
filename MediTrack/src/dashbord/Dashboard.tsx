import React from 'react';
import { AlertTriangle, TrendingDown, Calendar, Package } from 'lucide-react';

const Dashboard: React.FC = () => {
    const criticalItems = [
        { name: 'Adrenalin 1mg/ml', location: 'RTW-02', type: 'Ablauf', days: -2, status: 'critical' },
        { name: 'Morphin 10mg', location: 'Hauptlager', type: 'Bestand', current: 2, min: 5, status: 'critical' },
        { name: 'Atropin 0.5mg', location: 'RTW-01', type: 'Ablauf', days: 3, status: 'warning' },
        { name: 'Glucose 40%', location: 'Hauptlager', type: 'Bestand', current: 6, min: 10, status: 'warning' },
    ];

    const stats = [
        { title: 'Kritische Bestände', value: '2', icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-50' },
        { title: 'Warnungen', value: '4', icon: TrendingDown, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
        { title: 'Abgelaufene Items', value: '1', icon: Calendar, color: 'text-red-600', bgColor: 'bg-red-50' },
        { title: 'Gesamt Artikel', value: '156', icon: Package, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Übersicht über kritische Bestände und Ablaufdaten</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Critical Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Kritische Hinweise</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {criticalItems.map((item, index) => (
                        <div key={index} className="px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={`w-3 h-3 rounded-full ${
                                    item.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                                }`}></div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-600">{item.location}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                {item.type === 'Ablauf' ? (
                                    <div>
                                        <p className={`text-sm font-medium ${
                                            item.days && item.days < 0 ? 'text-red-600' : 'text-yellow-600'
                                        }`}>
                                            {item.days && item.days < 0 ? `${Math.abs(item.days)} Tage überfällig` : `${item.days} Tage verbleibend`}
                                        </p>
                                        <p className="text-xs text-gray-500">Ablaufdatum</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className={`text-sm font-medium ${
                                            item.current && item.min && item.current < item.min ? 'text-red-600' : 'text-yellow-600'
                                        }`}>
                                            {item.current} / {item.min}
                                        </p>
                                        <p className="text-xs text-gray-500">Bestand / Minimum</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;