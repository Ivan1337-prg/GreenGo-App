import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

function Login({ setUserEmail })
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) =>
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
      const response = await fetch(`${API_URL}/api/login`,
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
    catch (errors)
    {
      console.error("Error:", errors);
      alert("Server connection error");
    }
  };

  return (
    <div className="auth-page">
    <div className="card p-4 shadow-sm" style={{ maxWidth: "400px" }}>
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
  </div>
  );
}
export default Login;
