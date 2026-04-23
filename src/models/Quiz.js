import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: ["true", "Quiz title is required"],
    },
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Question",
      required: ["true", "Questions are required"],
    },
    timeLimit: {
      type: Number,
      required: ["true", "Time limit is required"],
    },
  },
  { timestamps: true },
);
export default mongoose.model("Quiz", QuizSchema);
