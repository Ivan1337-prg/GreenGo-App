import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login({ setUserEmail })
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) =>
    {
        e.preventDefault();
        if (!email) 
        {
            return alert("Please fill in all fields!");
        }
        if (!password) 
        {
            return alert("Please fill in all fields!");
        }
        if (!email.endsWith("@my.unt.edu"))
        {
            return alert("Only @my.unt.edu emails allowed!");
        }

        try
        {
            const response = await fetch("http://localhost:5100/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            alert(data.message);
            if (response.ok)
            {
                localStorage.setItem("userEmail", email);
                setUserEmail(email);
                navigate("/ride", { state: { email } });
            }
        }
        catch (error)
        {
            console.error("Error:", error);
            alert("Server connection error");
        }
    };

    return (
        <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-3">GreenGo Login</h3>
        <form onSubmit={handleLogin}>
            <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
                type="email"
                className="form-control"
                placeholder="example@my.unt.edu"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Password</label>
            <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit" className="btn btn-primary w-100">
            Login
            </button>
        </form>
        </div>
    );
}
export default Login;
