import { Router } from "express";
import {
  DestroyQuestion,
  editQuestion,
  getQuestions,
  getSingleQuestion,
  setQuestion,
} from "../controllers/questionController.js";
import { adminMiddleware, protectMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @routes POST /api/questions
 * @desc save Questions
 */
router.post("/",protectMiddleware, adminMiddleware, setQuestion);

/**
 * @routes GET /api/questions
 * @desc get Questions
 */
router.get("/", getQuestions);

/**
 * @routes GET /api/questions/:id
 * @desc get single Questions
 */
router.get("/:id", getSingleQuestion);

/**
 * @routes PUT /api/questions/:id
 * @desc update single Questions
 */
router.put("/:id", editQuestion);

/**
 * @routes DELETE /api/questions/:id
 * @desc delete single Questions
 */
router.delete("/:id", DestroyQuestion);

export default router;
