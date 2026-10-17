import { useState, useEffect } from "react";

export default function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) return <p style={{ textAlign: "center", padding: "40px", color: "#d81b60" }}>Loading About Details...</p>;

  const boxStyle = {
    backgroundColor: "#ffffff",
    padding: "22px",
    borderRadius: "12px",
    border: "1px solid #f8bbd0",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(216, 27, 96, 0.04)"
  };

  return (
    <div style={{ padding: "40px 15px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ color: "#d81b60", textAlign: "center", marginBottom: "25px" }}>ABOUT ME</h1>

      <div style={boxStyle}>
        <h3 style={{ color: "#c2185b", marginTop: 0 }}>Personal Information</h3>
        <p style={{ color: "#444", lineHeight: "1.7" }}>
          <strong>Full Name:</strong> {profile.name}<br />
          <strong>Degree:</strong> {profile.degree}<br />
          <strong>Contact Email:</strong> {profile.email}
        </p>
      </div>

      <div style={boxStyle}>
        <h3 style={{ color: "#c2185b", marginTop: 0 }}>Education</h3>
        <p style={{ color: "#444", lineHeight: "1.7" }}>
          <strong>{profile.degree}</strong> — {profile.college}
        </p>
      </div>

      <div style={boxStyle}>
        <h3 style={{ color: "#c2185b", marginTop: 0 }}>Career Objective</h3>
        <p style={{ color: "#444", lineHeight: "1.7" }}>
          {profile.careerObjective}
        </p>
      </div>
    </div>
  );
}