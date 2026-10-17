import { useState, useEffect } from "react";

export default function Dashboard({ token }) {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile / Home / About / Skills State
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    bio: "",
    email: "",
    degree: "",
    college: "",
    careerObjective: "",
    skills: "",
    githubUrl: "",
    linkedinUrl: ""
  });

  // Projects State
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technology, setTechnology] = useState("");
  const [githubLink, setGithubLink] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTechnology, setEditTechnology] = useState("");
  const [editGithubLink, setEditGithubLink] = useState("");

  useEffect(() => {
    // Fetch Profile Data
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));

    // Fetch Projects Data
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  };

  // Save Profile Changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(profile)
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to update profile");
        return res.json();
      })
      .then(() => alert("Profile details updated successfully!"))
      .catch((err) => alert(err.message));
  };

  // Add Project
  const handleAddProject = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title, description, technology, githubLink }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to add project");
        return res.json();
      })
      .then(() => {
        setTitle("");
        setDescription("");
        setTechnology("");
        setGithubLink("");
        fetchProjects();
      })
      .catch((err) => alert(err.message));
  };

  const startEditProject = (project) => {
    setEditingId(project._id);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditTechnology(project.technology || "");
    setEditGithubLink(project.githubLink || "");
  };

  const saveEditProject = (id) => {
    fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title: editTitle, description: editDescription, technology: editTechnology, githubLink: editGithubLink }),
    })
      .then(() => {
        setEditingId(null);
        fetchProjects();
      });
  };

  const deleteProject = (id) => {
    if (!window.confirm("Delete this project?")) return;
    fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    }).then(() => fetchProjects());
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "6px 0 14px 0",
    border: "1px solid #f8bbd0",
    borderRadius: "6px",
    boxSizing: "border-box"
  };

  const tabBtnStyle = (tabName) => ({
    padding: "10px 18px",
    backgroundColor: activeTab === tabName ? "#d81b60" : "#ffffff",
    color: activeTab === tabName ? "#ffffff" : "#d81b60",
    border: "1px solid #f8bbd0",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px"
  });

  return (
    <div style={{ padding: "40px 15px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: "16px", border: "1px solid #f8bbd0", boxShadow: "0 4px 15px rgba(216, 27, 96, 0.08)" }}>
        <h1 style={{ color: "#d81b60", textAlign: "center", fontSize: "26px", margin: "0 0 4px 0" }}>FULL PORTFOLIO ADMIN DASHBOARD</h1>
        <p style={{ textAlign: "center", color: "#2e7d32", fontWeight: "bold", marginBottom: "25px", fontSize: "14px" }}>● Logged in as san@gmail.com</p>

        {/* NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "25px" }}>
          <button style={tabBtnStyle("profile")} onClick={() => setActiveTab("profile")}>Edit Home & Bio</button>
          <button style={tabBtnStyle("about")} onClick={() => setActiveTab("about")}>Edit About & Education</button>
          <button style={tabBtnStyle("skills")} onClick={() => setActiveTab("skills")}>Edit Skills</button>
          <button style={tabBtnStyle("projects")} onClick={() => setActiveTab("projects")}>Manage Projects</button>
        </div>

        {/* TAB 1: EDIT HOME & PROFILE */}
        {activeTab === "profile" && (
          <form onSubmit={handleSaveProfile} style={{ backgroundColor: "#fce4ec", padding: "20px", borderRadius: "12px", border: "1px solid #f8bbd0" }}>
            <h3 style={{ color: "#d81b60", marginTop: 0 }}>Home Page & Bio Information</h3>
            
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>Full Name:</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} style={inputStyle} />

            <label style={{ fontSize: "12px", fontWeight: "bold" }}>Professional Role / Title:</label>
            <input type="text" value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })} style={inputStyle} />

            <label style={{ fontSize: "12px", fontWeight: "bold" }}>Short Introduction Bio:</label>
            <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows="3" style={inputStyle} />

            <label style={{ fontSize: "12px", fontWeight: "bold" }}>GitHub URL:</label>
            <input type="url" value={profile.githubUrl} onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })} style={inputStyle} />

            <label style={{ fontSize: "12px", fontWeight: "bold" }}>LinkedIn URL:</label>
            <input type="url" value={profile.linkedinUrl} onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })} style={inputStyle} />

            <button type="submit" style={{ backgroundColor: "#2e7d32", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", width: "100%" }}>
              Save Home & Bio Changes
            </button>
          </form>
        )}

        {/* TAB 2: EDIT ABOUT & EDUCATION */}
        {activeTab === "about" && (
          <form onSubmit={handleSaveProfile} style={{ backgroundColor: "#fce4ec", padding: "20px", borderRadius: "12px", border: "1px solid #f8bbd0" }}>
            <h3 style={{ color: "#d81b60", marginTop: 0 }}>About Page Details</h3>

            <label style={{ fontSize: "12px", fontWeight: "bold" }}>Degree / Program:</label>
            <input type="text" value={profile.degree} onChange={(e) => setProfile({ ...profile, degree: e.target.value })} style={inputStyle} />

            <label style={{ fontSize: "12px", fontWeight: "bold" }}>College / Institution:</label>
            <input type="text" value={profile.college} onChange={(e) => setProfile({ ...profile, college: e.target.value })} style={inputStyle} />

            <label style={{ fontSize: "12px", fontWeight: "bold" }}>Career Objective:</label>
            <textarea value={profile.careerObjective} onChange={(e) => setProfile({ ...profile, careerObjective: e.target.value })} rows="3" style={inputStyle} />

            <label style={{ fontSize: "12px", fontWeight: "bold" }}>Contact Email Address:</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} style={inputStyle} />

            <button type="submit" style={{ backgroundColor: "#2e7d32", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", width: "100%" }}>
              Save About Page Details
            </button>
          </form>
        )}

        {/* TAB 3: EDIT SKILLS */}
        {activeTab === "skills" && (
          <form onSubmit={handleSaveProfile} style={{ backgroundColor: "#fce4ec", padding: "20px", borderRadius: "12px", border: "1px solid #f8bbd0" }}>
            <h3 style={{ color: "#d81b60", marginTop: 0 }}>Technical Skills</h3>
            <p style={{ fontSize: "12px", color: "#666" }}>Separate skills with commas (e.g. React, Express, MongoDB, Python, Docker)</p>

            <textarea value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} rows="4" style={inputStyle} />

            <button type="submit" style={{ backgroundColor: "#2e7d32", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", width: "100%" }}>
              Save Technical Skills
            </button>
          </form>
        )}

        {/* TAB 4: MANAGE PROJECTS */}
        {activeTab === "projects" && (
          <div>
            <div style={{ backgroundColor: "#fce4ec", padding: "20px", borderRadius: "12px", marginBottom: "25px", border: "1px solid #f8bbd0" }}>
              <h3 style={{ color: "#d81b60", margin: "0 0 12px 0" }}>Add New Portfolio Project</h3>
              <form onSubmit={handleAddProject}>
                <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} required />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} required />
                <input type="text" placeholder="Technology Stack" value={technology} onChange={(e) => setTechnology(e.target.value)} style={inputStyle} required />
                <input type="url" placeholder="GitHub Repository URL" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} style={inputStyle} />
                <button type="submit" style={{ backgroundColor: "#2e7d32", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", width: "100%" }}>
                  + Add Project to Portfolio
                </button>
              </form>
            </div>

            <h3 style={{ color: "#d81b60" }}>Manage Existing Projects</h3>
            {projects.map((project) => (
              <div key={project._id} style={{ border: "1px solid #f8bbd0", padding: "16px", borderRadius: "10px", marginBottom: "14px", backgroundColor: "#fff" }}>
                {editingId === project._id ? (
                  <div>
                    <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={inputStyle} />
                    <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} style={inputStyle} />
                    <input type="text" value={editTechnology} onChange={(e) => setEditTechnology(e.target.value)} style={inputStyle} />
                    <input type="url" value={editGithubLink} onChange={(e) => setEditGithubLink(e.target.value)} style={inputStyle} />
                    <button onClick={() => saveEditProject(project._id)} style={{ backgroundColor: "#2e7d32", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", marginRight: "8px", fontWeight: "bold" }}>Save</button>
                    <button onClick={() => setEditingId(null)} style={{ backgroundColor: "#888", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", color: "#c2185b" }}>{project.title}</h4>
                    <p style={{ margin: "0 0 6px 0", color: "#555", fontSize: "14px" }}>{project.description}</p>
                    <span style={{ fontSize: "12px", color: "#d81b60", fontWeight: "bold" }}>Tech: {project.technology}</span>
                    <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                      <button onClick={() => startEditProject(project)} style={{ backgroundColor: "#d81b60", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Edit</button>
                      <button onClick={() => deleteProject(project._id)} style={{ backgroundColor: "#c62828", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}