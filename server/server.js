const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/myprofile")
  .then(() => console.log("Connected to MongoDB Database"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/api", authRoutes);
app.use("/api/projects", projectRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));