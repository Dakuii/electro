// middleware/adminMiddleware.js
const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied: Admins only" });
    }
  };
  
  module.exports = { admin };
  