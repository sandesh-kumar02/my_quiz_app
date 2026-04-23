import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      unique: true,
    },
    options: {
      type: [String],
      required: ["true", "Options are required"],
    },
    answer: {
      type: String,
      required: ["true", "Answer is required"],
    },
    marks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
export default mongoose.model("Question", QuestionSchema);
