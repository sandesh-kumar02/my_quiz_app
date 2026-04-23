import jwt from "jsonwebtoken";

export const protectMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decode;
  next();
};

export const adminMiddleware = (req, res, next) => {
  try {
    // protectMiddleware ke baad req.user me token data aa jayega
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
