export default function ProjectCard({ project }) {
  const cardStyle = {
    border: "1px solid #f8bbd0",
    borderRadius: "12px",
    padding: "22px",
    marginBottom: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 14px rgba(216, 27, 96, 0.06)",
    transition: "transform 0.2s"
  };

  return (
    <div style={cardStyle}>
      {project.projectImage && (
        <img
          src={project.projectImage}
          alt={project.title}
          style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "14px" }}
        />
      )}
      <h3 style={{ margin: "0 0 8px 0", color: "#c2185b", fontSize: "20px" }}>{project.title}</h3>
      <p style={{ margin: "0 0 12px 0", color: "#444", fontSize: "14px", lineHeight: "1.6" }}>{project.description}</p>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <span style={{ fontSize: "13px", color: "#d81b60", fontWeight: "700", backgroundColor: "#fce4ec", padding: "5px 12px", borderRadius: "15px" }}>
          Tech: {project.technology || "MERN Stack"}
        </span>

        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#d81b60", textDecoration: "none", fontSize: "13px", fontWeight: "700" }}
          >
            GitHub Repository →
          </a>
        )}
      </div>
    </div>
  );
}