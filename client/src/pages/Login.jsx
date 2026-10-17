import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isRegisterMode ? "/api/register" : "/api/login";

    fetch(`http://localhost:5000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Operation failed");
        return data;
      })
      .then((data) => {
        if (isRegisterMode) {
          alert("Admin registered successfully! Please click Login.");
          setIsRegisterMode(false);
        } else {
          alert("Logged in successfully as Admin!");
          onLoginSuccess(data.token);
        }
      })
      .catch((err) => alert(err.message));
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "8px 0 14px 0",
    border: "1px solid #f8bbd0",
    borderRadius: "6px",
    boxSizing: "border-box"
  };

  return (
    <div style={{ padding: "30px 15px" }}>
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "30px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f8bbd0" }}>
        <h2 style={{ color: "#d81b60", textAlign: "center", fontSize: "20px", marginBottom: "15px" }}>
          {isRegisterMode ? "REGISTER ADMIN" : "LOGIN TO ACCESS ADMIN PORTFOLIO"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>Admin Email Address:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="san@gmail.com" style={inputStyle} required />
          
          <label style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" style={inputStyle} required />
          
          <button type="submit" style={{ width: "100%", backgroundColor: "#d81b60", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
            {isRegisterMode ? "[ REGISTER ADMIN ]" : "[ LOGIN ]"}
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            style={{ background: "none", border: "none", color: "#d81b60", cursor: "pointer", textDecoration: "underline", fontSize: "13px" }}
          >
            {isRegisterMode ? "Already registered? Click to Login" : "Need to register Admin account? Click here"}
          </button>
        </div>
      </div>
    </div>
  );
}