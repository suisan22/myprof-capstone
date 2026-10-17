const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: { type: String, default: "Sansui Fernando" },
  role: { type: String, default: "Full Stack MERN Developer & Security Enthusiast" },
  bio: { type: String, default: "Welcome to my official portfolio! I specialize in building secure, end-to-end web applications." },
  email: { type: String, default: "san@gmail.com" },
  degree: { type: String, default: "B.E. Information Technology" },
  college: { type: String, default: "Don Bosco Institute of Technology (DBIT)" },
  careerObjective: { type: String, default: "To build scalable, production-grade MERN applications." },
  skills: { type: String, default: "React, Node.js, Express, MongoDB, JavaScript, TypeScript, Python, Docker, Git" },
  githubUrl: { type: String, default: "https://github.com" },
  linkedinUrl: { type: String, default: "https://linkedin.com" }
});

module.exports = mongoose.model("Profile", profileSchema);