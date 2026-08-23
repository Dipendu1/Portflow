import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicApp from "./PublicApp";
import AdminApp from "./admin/AdminApp";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* =========================
                    PUBLIC PORTFOLIO
                ========================= */}

                <Route
                    path="/*"
                    element={<PublicApp />}
                />


                {/* =========================
                    ADMIN APPLICATION
                ========================= */}

                <Route
                    path="/admin/*"
                    element={<AdminApp />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;