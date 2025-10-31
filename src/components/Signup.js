import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignup = async (e) =>
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
            const response = await fetch("http://localhost:5100/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            alert(data.message);
            if (response.ok)
            {
                navigate("/login");
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
        <h3 className="text-center mb-3">GreenGo Sign Up</h3>
        <form onSubmit={handleSignup}>
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
                placeholder="Create password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit" className="btn btn-success w-100">
            Sign Up
            </button>
        </form>
        </div>
    );
}

export default Signup;
