import { Router } from "express";
import {
  AllUser,
  destroyUser,
  LoginUser,
  RegisterUser,
  userProfile,
} from "../controllers/authController.js";
import {
  adminMiddleware,
  protectMiddleware,
} from "../middleware/authMiddleware.js";

const router = Router();

// Auth APIs

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", RegisterUser);

/**
 * @route POST /api/auth/login
 * @desc Login User
 */
router.post("/login", LoginUser);

/**
 * @route GET /api/auth/profile
 * @desc User Details
 */
router.get("/profile", protectMiddleware, userProfile);

/**
 * @route GET /api/auth/users
 * @desc All Users
 */
router.get("/users", protectMiddleware, adminMiddleware, AllUser);

/**
 * @route DELETE /api/auth/users
 * @desc All Users
 */

router.delete("/users/:id", protectMiddleware, destroyUser);

export default router;
