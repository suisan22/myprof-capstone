import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px 15px", maxWidth: "750px", margin: "0 auto" }}>
      <h1 style={{ color: "#d81b60", textAlign: "center", marginBottom: "8px" }}>PORTFOLIO PROJECTS</h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "30px", fontSize: "15px" }}>
        Dynamic project data rendered directly from MongoDB database.
      </p>

      {projects.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No projects found in database.</p>
      ) : (
        projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))
      )}
    </div>
  );
}