import { Router } from "express";
import {
  getAllQuiz,
  getSingleQuiz,
  setQuiz,
  startQuiz,
  submitQuiz,
} from "../controllers/quizController.js";
import {
  adminMiddleware,
  protectMiddleware,
} from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @routes POST /api/Quiz
 * @desc Set Quiz
 */
router.post("/", protectMiddleware, adminMiddleware, setQuiz);

/**
 * @routes GET /api/Quiz
 * @desc get all Quiz
 */
router.get("/", getAllQuiz);

/**
 * @routes GET /api/Quiz/:id
 * @desc get single Quiz
 */
router.get("/:id", getSingleQuiz);

/**
 * @routes POST /api/Quiz/start/:id
 * @desc start Quiz
 */
router.post("/start/:id", startQuiz);

/**
 * @routes POST /api/Quiz/submit
 * @desc start Quiz
 */
router.post("/submit",protectMiddleware, submitQuiz);
export default router;
