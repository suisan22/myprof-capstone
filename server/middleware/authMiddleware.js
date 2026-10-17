const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No authorization token provided." });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const verified = jwt.verify(token, "MY_SECRET_KEY");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token." });
  }
};