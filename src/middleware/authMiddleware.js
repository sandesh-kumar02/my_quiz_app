import jwt from "jsonwebtoken";

export const protectMiddleware = (req, res, next) => {
  try {
    console.log("HEADERS:", req.headers);

    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No or invalid token format",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("Middleware Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
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
