import { useState, useEffect } from "react";

export default function Skills() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) return <p style={{ textAlign: "center", padding: "40px", color: "#d81b60" }}>Loading Skills...</p>;

  const skillCategoryStyle = {
    backgroundColor: "#ffffff",
    padding: "22px",
    borderRadius: "12px",
    border: "1px solid #f8bbd0",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(216, 27, 96, 0.04)"
  };

  const badgeStyle = {
    display: "inline-block",
    backgroundColor: "#fce4ec",
    color: "#d81b60",
    fontWeight: "bold",
    padding: "8px 16px",
    borderRadius: "20px",
    margin: "6px",
    fontSize: "14px"
  };

  const skillList = profile.skills ? profile.skills.split(",").map(s => s.trim()) : [];

  return (
    <div style={{ padding: "40px 15px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ color: "#d81b60", textAlign: "center", marginBottom: "25px" }}>TECHNICAL SKILLS</h1>

      <div style={skillCategoryStyle}>
        <h3 style={{ color: "#c2185b", marginTop: 0 }}>All Managed Skills</h3>
        <div>
          {skillList.length > 0 ? (
            skillList.map((skill, index) => (
              <span key={index} style={badgeStyle}>{skill}</span>
            ))
          ) : (
            <p style={{ color: "#888" }}>No skills added yet in Admin Dashboard.</p>
          )}
        </div>
      </div>
    </div>
  );
}