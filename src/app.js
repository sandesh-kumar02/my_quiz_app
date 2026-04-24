import express from "express";
import cors from "cors";
const app = express();

import authRoutes from "./routes/authRoutes.js";
import QuestionRoutes from "./routes/questionRoutes.js";
import QuizRoutes from "./routes/quizRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://my-quiz-app-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CORS connected successfully",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/questions", QuestionRoutes);
app.use("/api/quiz", QuizRoutes);
app.use("/api/results", resultRoutes);
export default app;
