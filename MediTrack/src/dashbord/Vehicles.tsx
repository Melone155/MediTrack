import React, { useState } from 'react';
import { Plus, Truck, Calendar, AlertTriangle } from 'lucide-react';

const Vehicles: React.FC = () => {
    const [selectedVehicle, setSelectedVehicle] = useState('rtw-01');

    const vehicles = [
        { id: 'rtw-01', model: 'Mercedes Sprinter RTW', plate: 'SEG-RT 01', type: 'RTW' },
        { id: 'rtw-02', model: 'VW Crafter RTW', plate: 'SEG-RT 02', type: 'RTW' },
        { id: 'ktw-01', model: 'Ford Transit KTW', plate: 'SEG-KT 01', type: 'KTW' },
        { id: 'nef-01', model: 'BMW X5 NEF', plate: 'SEG-NE 01', type: 'NEF' },
    ];

    const vehicleMedications = {
        'rtw-01': [
            { id: 1, name: 'Adrenalin 1mg/ml', quantity: 8, expiry: '2024-02-15', status: 'critical' },
            { id: 2, name: 'Atropin 0.5mg', quantity: 4, expiry: '2024-03-20', status: 'warning' },
            { id: 3, name: 'Midazolam 5mg', quantity: 6, expiry: '2024-06-10', status: 'ok' },
            { id: 4, name: 'Morphin 10mg', quantity: 3, expiry: '2024-05-15', status: 'ok' },
            { id: 5, name: 'Glucose 40%', quantity: 10, expiry: '2024-04-22', status: 'ok' },
        ],
        'rtw-02': [
            { id: 6, name: 'Adrenalin 1mg/ml', quantity: 6, expiry: '2024-01-28', status: 'critical' },
            { id: 7, name: 'Prednisolon 250mg', quantity: 2, expiry: '2024-03-15', status: 'warning' },
            { id: 8, name: 'Furosemid 20mg', quantity: 8, expiry: '2024-07-30', status: 'ok' },
        ],
        'ktw-01': [
            { id: 9, name: 'Metamizol 500mg', quantity: 12, expiry: '2024-04-10', status: 'ok' },
            { id: 10, name: 'Paracetamol 1000mg', quantity: 20, expiry: '2024-05-25', status: 'ok' },
        ],
        'nef-01': [
            { id: 11, name: 'Adrenalin 1mg/ml', quantity: 10, expiry: '2024-03-05', status: 'warning' },
            { id: 12, name: 'Atropin 0.5mg', quantity: 8, expiry: '2024-06-18', status: 'ok' },
            { id: 13, name: 'Midazolam 5mg', quantity: 12, expiry: '2024-04-30', status: 'ok' },
        ],
    };

    const currentVehicle = vehicles.find(v => v.id === selectedVehicle);
    const medications = vehicleMedications[selectedVehicle as keyof typeof vehicleMedications] || [];

    // Sortiere Medikamente: Kritische und Warnungen zuerst
    const sortedMedications = medications.sort((a, b) => {
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

    const getExpiryText = (expiry: string) => {
        const expiryDate = new Date(expiry);
        const today = new Date();
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return `${Math.abs(diffDays)} Tage überfällig`;
        } else if (diffDays <= 30) {
            return `${diffDays} Tage verbleibend`;
        } else {
            return `${Math.floor(diffDays / 30)} Monate verbleibend`;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Fahrzeugverwaltung</h1>
                        <p className="text-gray-600 mt-2">Medikamente in Fahrzeugen verwalten</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Neues Fahrzeug</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Vehicle Selection */}
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Fahrzeuge</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {vehicles.map(vehicle => (
                                <button
                                    key={vehicle.id}
                                    onClick={() => setSelectedVehicle(vehicle.id)}
                                    className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                                        selectedVehicle === vehicle.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                                    }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-lg ${
                                            selectedVehicle === vehicle.id ? 'bg-blue-100' : 'bg-gray-100'
                                        }`}>
                                            <Truck className={`w-5 h-5 ${
                                                selectedVehicle === vehicle.id ? 'text-blue-600' : 'text-gray-600'
                                            }`} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{vehicle.model}</p>
                                            <p className="text-sm text-gray-600">{vehicle.plate}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Vehicle Details */}
                <div className="lg:w-2/3">
                    {currentVehicle && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">{currentVehicle.model}</h2>
                                        <p className="text-gray-600">{currentVehicle.plate} • {currentVehicle.type}</p>
                                    </div>
                                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                                        <Plus className="w-4 h-4" />
                                        <span>Medikament hinzufügen</span>
                                    </button>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {sortedMedications.map(medication => (
                                    <div key={medication.id} className="px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-3 h-3 rounded-full ${
                                                    medication.status === 'critical' ? 'bg-red-500' :
                                                        medication.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                                                }`}></div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{medication.name}</h3>
                                                    <p className="text-sm text-gray-600">Menge: {medication.quantity} Stück</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <div className="text-right">
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm text-gray-600">{medication.expiry}</span>
                                                    </div>
                                                    <p className={`text-xs mt-1 ${
                                                        medication.status === 'critical' ? 'text-red-600' :
                                                            medication.status === 'warning' ? 'text-yellow-600' : 'text-green-600'
                                                    }`}>
                                                        {getExpiryText(medication.expiry)}
                                                    </p>
                                                </div>

                                                <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(medication.status)}`}>
                          {(medication.status === 'critical' || medication.status === 'warning') &&
                              <AlertTriangle className="w-3 h-3" />
                          }
                                                    <span>
                            {medication.status === 'critical' ? 'Abgelaufen' :
                                medication.status === 'warning' ? 'Läuft ab' : 'OK'}
                          </span>
                        </span>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex space-x-2">
                                            <button className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors">
                                                Bearbeiten
                                            </button>
                                            <button className="px-3 py-1 text-sm text-green-600 border border-green-200 rounded-md hover:bg-green-50 transition-colors">
                                                Austauschen
                                            </button>
                                            <button className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors">
                                                Entfernen
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Vehicles;