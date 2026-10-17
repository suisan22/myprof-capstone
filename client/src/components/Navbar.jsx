import { Link } from "react-router-dom";

export default function Navbar({ token, onLogout }) {
  const styles = {
    nav: {
      background: "linear-gradient(135deg, #ffffff 0%, #fff0f5 100%)",
      padding: "16px 30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      borderBottom: "2px solid #f8bbd0",
      boxShadow: "0 4px 12px rgba(216, 27, 96, 0.08)",
      flexWrap: "wrap"
    },
    link: { color: "#d81b60", textDecoration: "none", fontWeight: "700", fontSize: "15px" },
    button: { backgroundColor: "#888888", color: "#ffffff", border: "none", padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontWeight: "600" }
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link> |
      <Link to="/about" style={styles.link}>About</Link> |
      <Link to="/skills" style={styles.link}>Skills</Link> |
      <Link to="/projects" style={styles.link}>Projects</Link> |
      <Link to="/contact" style={styles.link}>Contact</Link> |
      {!token ? (
        <Link to="/login" style={{ ...styles.link, color: "#c2185b" }}>Login</Link>
      ) : (
        <>
          <Link to="/dashboard" style={{ ...styles.link, color: "#2e7d32" }}>Admin Dashboard</Link> |
          <button onClick={onLogout} style={styles.button}>Logout</button>
        </>
      )}
    </nav>
  );
}