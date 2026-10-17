const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technology: { type: String, required: true },
  githubLink: { type: String, default: "" },
  projectImage: { type: String, default: "" }
});

module.exports = mongoose.model("Project", projectSchema);