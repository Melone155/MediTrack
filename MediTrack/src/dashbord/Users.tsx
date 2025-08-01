import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Shield, User } from 'lucide-react';

const Users: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const users = [
        { id: 1, name: 'Dr. Sarah Mueller', email: 'sarah.mueller@meditrack.de', role: 'Admin', status: 'active', lastLogin: '2025-07-30' },
        { id: 2, name: 'Max Mustermann', email: 'max.mustermann@meditrack.de', role: 'User', status: 'active', lastLogin: '2024-07-29' },
        { id: 3, name: 'Anna Schmidt', email: 'anna.schmidt@meditrack.de', role: 'User', status: 'active', lastLogin: '2024-07-28' }, ,
        { id: 5, name: 'Lisa Johnson', email: 'lisa.johnson@meditrack.de', role: 'User', status: 'inactive', lastLogin: '2024-07-15' },
        { id: 6, name: 'Michael Brown', email: 'michael.brown@meditrack.de', role: 'User', status: 'active', lastLogin: '2024-07-30' },
    ];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'Admin': return 'bg-red-100 text-red-800 border-red-200';
            case 'Supervisor': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getRoleIcon = (role: string) => {
        if (role === 'Admin' || role === 'Supervisor') {
            return <Shield className="w-4 h-4" />;
        }
        return <User className="w-4 h-4" />;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Benutzerverwaltung</h1>
                        <p className="text-gray-600 mt-2">Benutzer anlegen, bearbeiten und verwalten</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Neuer Benutzer</span>
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="relative max-w-md">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                        type="text"
                        placeholder="Benutzer suchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Benutzer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rolle
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Letzter Login
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Aktionen
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <User className="w-5 h-5 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {getRoleIcon(user.role)}
                        <span className="ml-1">{user.role}</span>
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(user.lastLogin).toLocaleDateString('de-DE')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <User className="w-8 h-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Gesamt Benutzer</p>
                            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <Shield className="w-8 h-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Aktive Benutzer</p>
                            <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <User className="w-8 h-8 text-red-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Administratoren</p>
                            <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'Admin').length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;