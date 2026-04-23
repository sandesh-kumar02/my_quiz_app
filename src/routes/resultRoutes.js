import { Router } from "express";
import { protectMiddleware,adminMiddleware } from "../middleware/authMiddleware.js";
import {
  createResult,
  getAllResult,
  getLeaderboard,
  getUserResultsForLoggedInUser,
} from "../controllers/resultController.js";

const router = Router();

/**
 * @route POST /api/results
 * @desc creating Result
 */
router.post("/", protectMiddleware, createResult);

/**
 * @router GET /api/results
 * @desc find all results
 */
router.get("/", protectMiddleware, adminMiddleware, getAllResult);

/**
 * @ GET /api/leaderboard
 * @desc leaderboard
 */
router.get("/leaderboard", getLeaderboard);

/**
 * @route GET /api/results/:userId
 * @desc geting specific Result
 */
router.get("/my-results", protectMiddleware, getUserResultsForLoggedInUser);

export default router;
