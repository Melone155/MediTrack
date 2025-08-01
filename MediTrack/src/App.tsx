import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Dashboard from "./dashbord/Dashboard.tsx"
import UserManagement from "./dashbord/Users.tsx"
import Inventory from "./dashbord/Inventory.tsx"
import Vehicles from "./dashbord/Vehicles.tsx"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/management" element={<UserManagement />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/vehicles" element={<Vehicles />} />
            </Routes>
        </Router>
    )
}

export default App