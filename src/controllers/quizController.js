import QuizModel from "../models/Quiz.js";
import ResultModel from "../models/Result.js";

export const setQuiz = async (req, res) => {
  try {
    const { title, questions, timeLimit } = req.body;
    if (!title || !questions || !timeLimit) {
      return res.status(400).json({
        message: "Quiz all field required",
      });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        message: "At least one question is required",
      });
    }

    const newQuiz = new QuizModel({
      title,
      questions,
      timeLimit,
    });
    await newQuiz.save();
    res.status(200).json({
      message: "Quiz saved successfully",
      newQuiz,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllQuiz = async (req, res) => {
  try {
    const allQuiz = await QuizModel.find({});
    if (!allQuiz) {
      return res.status(400).json({
        message: "Quiz not found",
      });
    }
    res.status(200).json({
      message: "Quiz found",
      allQuiz,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.id).populate("questions");
    if (!quiz) {
      return res.status(401).json({
        message: "Quiz not found",
      });
    }
    res.status(200).json({
      message: "quize found successfully",
      quiz,
    });
  } catch (error) {
    console.log(error);
  }
};

export const startQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.id).populate(
      "questions",
      "-answer",
    );

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.status(200).json({
      message: "Quiz started",
      quiz,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId || !answers) {
      return res.status(400).json({
        message: "Quiz id and answers are required",
      });
    }

    const quiz = await QuizModel.findById(quizId).populate("questions");

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let totalMarks = 0;

    for (const question of quiz.questions) {
      totalMarks += question.marks;
    }

    for (const userAnswer of answers) {
      const question = quiz.questions.find(
        (q) => q._id.toString() === userAnswer.questionId,
      );

      if (!question) {
        continue;
      }

      if (question.answer === userAnswer.selectedAnswer) {
        score += question.marks;
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    }

    const savedResult = await ResultModel.create({
      userId: req.user.id,
      quiz: quizId,
      answers,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      wrongAnswers,
      total: totalMarks,
      score,
      percentage: (score / totalMarks) * 100,
      result: score >= totalMarks / 2 ? "Pass" : "Fail",
    });

    res.status(200).json({
      message: "Quiz submitted successfully",
      result: {
        score: savedResult.score,
        total: savedResult.total,
        correctAnswers: savedResult.correctAnswers,
        wrongAnswers: savedResult.wrongAnswers,
        percentage: savedResult.percentage,
        result: savedResult.result,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
