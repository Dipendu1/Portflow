import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";


function AdminLogin() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Invalid username or password");
            }

            const data = await response.json();

            console.log("Login response:", data);

            // Save JWT
            localStorage.setItem("adminToken", data.token);

            // Save username
            localStorage.setItem("adminUsername", data.username);

            // Save role
            localStorage.setItem("adminRole", data.role);

            // Go to dashboard
            navigate("/admin/dashboard");

        } catch (err) {

            console.error("Login error:", err);

            setError(err.message);

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="admin-login">

            <div className="admin-login-card">

                <h1>Portflow</h1>

                <p className="admin-subtitle">
                    Admin Login
                </p>

                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AdminLogin;