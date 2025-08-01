import React, { useState } from 'react';
import { Plus, Search, AlertTriangle, Package } from 'lucide-react';

const Inventory: React.FC = () => {
    const [selectedWarehouse, setSelectedWarehouse] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const warehouses = [
        { id: 'all', name: 'Alle Lager' },
        { id: 'main', name: 'Hauptlager' },
        { id: 'rtw-01', name: 'RTW-01' },
        { id: 'rtw-02', name: 'RTW-02' },
        { id: 'ktw-01', name: 'KTW-01' },
    ];

    const medications = [
        { id: 1, name: 'Morphin 10mg', warehouse: 'Hauptlager', current: 2, min: 5, unit: 'Ampullen', status: 'critical' },
        { id: 2, name: 'Glucose 40%', warehouse: 'Hauptlager', current: 6, min: 10, unit: 'Ampullen', status: 'warning' },
        { id: 3, name: 'Adrenalin 1mg/ml', warehouse: 'RTW-01', current: 8, min: 6, unit: 'Ampullen', status: 'ok' },
        { id: 4, name: 'Atropin 0.5mg', warehouse: 'RTW-01', current: 4, min: 8, unit: 'Ampullen', status: 'warning' },
        { id: 5, name: 'Midazolam 5mg', warehouse: 'RTW-02', current: 12, min: 10, unit: 'Ampullen', status: 'ok' },
        { id: 6, name: 'Prednisolon 250mg', warehouse: 'Hauptlager', current: 1, min: 3, unit: 'Ampullen', status: 'critical' },
        { id: 7, name: 'Furosemid 20mg', warehouse: 'KTW-01', current: 15, min: 8, unit: 'Ampullen', status: 'ok' },
        { id: 8, name: 'Metamizol 500mg', warehouse: 'RTW-01', current: 20, min: 15, unit: 'Ampullen', status: 'ok' },
    ];

    const filteredMedications = medications
        .filter(med =>
            (selectedWarehouse === 'all' || med.warehouse === warehouses.find(w => w.id === selectedWarehouse)?.name) &&
            med.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            // Kritische und Warnungen ganz oben
            if (a.status === 'critical' && b.status !== 'critical') return -1;
            if (b.status === 'critical' && a.status !== 'critical') return 1;
            if (a.status === 'warning' && b.status === 'ok') return -1;
            if (b.status === 'warning' && a.status === 'ok') return 1;
            return a.name.localeCompare(b.name);
        });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'critical': return 'bg-red-100 text-red-800 border-red-200';
            case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-green-100 text-green-800 border-green-200';
        }
    };

    const getStatusIcon = (status: string) => {
        if (status === 'critical' || status === 'warning') {
            return <AlertTriangle className="w-4 h-4" />;
        }
        return <Package className="w-4 h-4" />;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Lagerverwaltung</h1>
                        <p className="text-gray-600 mt-2">Medikamente und Materialien verwalten</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Neues Medikament</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lager</label>
                        <select
                            value={selectedWarehouse}
                            onChange={(e) => setSelectedWarehouse(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {warehouses.map(warehouse => (
                                <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Suche</label>
                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                            <input
                                type="text"
                                placeholder="Medikament suchen..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Medications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedications.map(medication => (
                    <div key={medication.id} className={`bg-white rounded-lg shadow-sm border-2 p-6 ${
                        medication.status === 'critical' ? 'border-red-200' :
                            medication.status === 'warning' ? 'border-yellow-200' : 'border-gray-200'
                    }`}>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                                <p className="text-sm text-gray-600">{medication.warehouse}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(medication.status)}`}>
                {getStatusIcon(medication.status)}
                                <span className="ml-1">
                  {medication.status === 'critical' ? 'Kritisch' :
                      medication.status === 'warning' ? 'Warnung' : 'OK'}
                </span>
              </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Aktueller Bestand:</span>
                                <span className="font-medium">{medication.current} {medication.unit}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Mindestbestand:</span>
                                <span className="font-medium">{medication.min} {medication.unit}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div
                                    className={`h-2 rounded-full transition-all ${
                                        medication.current < medication.min ? 'bg-red-500' :
                                            medication.current <= medication.min * 1.2 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${Math.min((medication.current / medication.min) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-4 flex space-x-2">
                            <button className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors">
                                Bearbeiten
                            </button>
                            <button className="flex-1 px-3 py-2 text-sm text-green-600 border border-green-200 rounded-md hover:bg-green-50 transition-colors">
                                Auffüllen
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;