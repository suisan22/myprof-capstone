import { useState, useEffect } from "react";

export default function Contact({ token }) {
  const [showContact, setShowContact] = useState(false);
  const [profile, setProfile] = useState(null);
  
  // Form State for Visitors
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${name}! Your message has been submitted successfully.`);
    setName("");
    setEmail("");
    setMessage("");
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0 16px 0",
    border: "1px solid #f8bbd0",
    borderRadius: "8px",
    boxSizing: "border-box"
  };

  return (
    <div style={{ padding: "40px 15px", maxWidth: "550px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: "16px", border: "1px solid #f8bbd0", boxShadow: "0 4px 15px rgba(216, 27, 96, 0.08)" }}>
        
        {token ? (
          /* ADMIN CONTACT VIEW: SHOW CONTACT BUTTON */
          <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "#d81b60", margin: "0 0 15px 0" }}>ADMIN CONTACT VIEW</h1>
            <p style={{ color: "#555", marginBottom: "20px" }}>Toggle to inspect stored admin contact information.</p>
            <button
              onClick={() => setShowContact(!showContact)}
              style={{ backgroundColor: "#d81b60", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" }}
            >
              {showContact ? "Hide Contact" : "Show Contact"}
            </button>

            {showContact && (
              <div style={{ marginTop: "20px", padding: "18px", backgroundColor: "#fce4ec", borderRadius: "10px" }}>
                <p style={{ margin: 0, fontWeight: "bold", color: "#d81b60" }}>
                  Official Email: {profile ? profile.email : "san@gmail.com"}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* PUBLIC VISITOR VIEW: CONTACT ME FORM */
          <div>
            <h1 style={{ color: "#d81b60", textAlign: "center", margin: "0 0 20px 0" }}>CONTACT ME</h1>
            <form onSubmit={handleSubmit}>
              <label style={{ fontSize: "14px", fontWeight: "bold", color: "#444" }}>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" style={inputStyle} required />

              <label style={{ fontSize: "14px", fontWeight: "bold", color: "#444" }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" style={inputStyle} required />

              <label style={{ fontSize: "14px", fontWeight: "bold", color: "#444" }}>Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows="4" placeholder="Write your message here..." style={inputStyle} required></textarea>

              <button type="submit" style={{ width: "100%", background: "linear-gradient(135deg, #d81b60, #8e24aa)", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                Send Message
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}