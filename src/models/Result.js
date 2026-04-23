import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    correctAnswers: {
      type: Number,
      required: true,
    },

    wrongAnswers: {
      type: Number,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },

    result: {
      type: String,
      enum: ["Pass", "Fail"],
      required: true,
    },

    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Result", ResultSchema);
