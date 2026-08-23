import { Routes, Route } from "react-router-dom";

import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function AdminApp() {

    return (
        <Routes>

            <Route
                path="/"
                element={<AdminLogin />}
            />

            <Route
                path="/dashboard"
                element={<AdminDashboard />}
            />

        </Routes>
    );
}

export default AdminApp;