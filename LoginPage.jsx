import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [role, setRole] = useState("student");
  const [id, setId] = useState("4NI24CI000");
  const navigate = useNavigate();

  function handleLogin() {
    if (role === "student") navigate("/student");
    else navigate("/manager");
  }

  return (
    <div className="page-wrap" style={{ maxWidth: 420, marginTop: "3rem" }}>
      <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🍽️</div>
        <p className="meal-title" style={{ fontSize: 22, marginBottom: 4 }}>Mess Management</p>
        <p className="sub-text" style={{ marginBottom: "2rem" }}>NIE Hostel — Select your role to continue</p>

        <div className="role-grid">
          <div className={`role-card ${role === "student" ? "selected" : ""}`} onClick={() => { setRole("student"); setId("CS21B1001"); }}>
            <div className="role-icon">🎓</div>
            <p className="role-name">Student</p>
            <p className="role-desc">Vote for meals, view menu</p>
          </div>
          <div className={`role-card ${role === "manager" ? "selected" : ""}`} onClick={() => { setRole("manager"); setId("MESS_MGR_01"); }}>
            <div className="role-icon">👨‍🍳</div>
            <p className="role-name">Manager</p>
            <p className="role-desc">Manage stock, view votes</p>
          </div>
        </div>

        <input className="input-field" placeholder="Roll number / Employee ID" value={id} onChange={e => setId(e.target.value)} />
        <input className="input-field" type="password" placeholder="Password" defaultValue="12345678" />
        <button className="btn btn-primary btn-full" onClick={handleLogin}>Sign in →</button>
      </div>
    </div>
  );
}