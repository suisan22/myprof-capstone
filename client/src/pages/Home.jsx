import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) return <p style={{ textAlign: "center", padding: "40px", color: "#d81b60" }}>Loading Profile...</p>;

  return (
    <div style={{ padding: "40px 15px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{
        background: "linear-gradient(135deg, #ffffff 0%, #fce4ec 100%)",
        padding: "40px 30px",
        borderRadius: "16px",
        border: "1px solid #f8bbd0",
        boxShadow: "0 6px 20px rgba(216, 27, 96, 0.1)",
        textAlign: "center",
        marginBottom: "30px"
      }}>
        <div style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          backgroundColor: "#d81b60",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "42px",
          fontWeight: "bold",
          margin: "0 auto 20px auto",
          boxShadow: "0 4px 12px rgba(216, 27, 96, 0.2)"
        }}>
          {profile.name ? profile.name.split(" ").map(n => n[0]).join("") : "SF"}
        </div>

        <h1 style={{ color: "#d81b60", fontSize: "32px", margin: "0 0 8px 0" }}>{profile.name}</h1>
        <h3 style={{ color: "#8e24aa", fontSize: "20px", margin: "0 0 15px 0" }}>{profile.role}</h3>
        <p style={{ color: "#555", fontSize: "15px", lineHeight: "1.7", maxWidth: "600px", margin: "0 auto 25px auto" }}>
          {profile.bio}
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap", marginBottom: "25px" }}>
          {profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer" style={socialBtnStyle}>GitHub</a>}
          {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" style={socialBtnStyle}>LinkedIn</a>}
          {profile.email && <a href={`mailto:${profile.email}`} style={socialBtnStyle}>Email Me</a>}
        </div>

        <Link to="/projects">
          <button style={{
            background: "linear-gradient(135deg, #d81b60, #8e24aa)",
            color: "#ffffff",
            border: "none",
            padding: "12px 28px",
            borderRadius: "25px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(216, 27, 96, 0.25)"
          }}>
            Explore My Projects
          </button>
        </Link>
      </div>
    </div>
  );
}

const socialBtnStyle = {
  backgroundColor: "#ffffff",
  color: "#d81b60",
  border: "1px solid #f8bbd0",
  padding: "8px 18px",
  borderRadius: "20px",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: "bold",
  boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
};