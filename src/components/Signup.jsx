import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

function Signup()
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) =>
  {
    e.preventDefault();
    if (!email || !password)
    {
        return alert("Please fill in all fields!");
    }
    if (!email.endsWith("@my.unt.edu"))
    {
        return alert("Only @my.unt.edu emails allowed!");
    }

    try
    {
      const response = await fetch(`${API_URL}/api/signup`,
      {
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
    catch (errors)
    {
      console.error("Error:", errors);
      alert("Server connection error");
    }
  };
  return (
    <div className="auth-page">
    <div className="card p-4 shadow-sm" style={{ maxWidth: "400px" }}>
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
  </div>
  );
}

export default Signup;
