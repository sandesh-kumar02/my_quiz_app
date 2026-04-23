import QuestionModel from "../models/Question.js";
import QuizModel from "../models/Quiz.js";

export const setQuestion = async (req, res) => {
  try {
    const { question, options, answer, marks, quizId } = req.body;
    if (!question || !options || !answer || !marks || !quizId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const Questions = new QuestionModel({
      question,
      options,
      answer,
      marks,
    });
    await Questions.save();

    await QuizModel.findByIdAndUpdate(quizId, {
      $push: {
        questions: Questions._id,
      },
    });

    res.status(200).json({
      message: "Question added succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const Question = await QuestionModel.find({});
    if (!Question) {
      return res.status(400).json({ message: "question not available" });
    }
    res.status(200).json({
      message: "Question fetched successfull",
      Question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "getQuestions error" });
  }
};

export const getSingleQuestion = async (req, res) => {
  try {
    const questions = await QuestionModel.findById(req.params.id);
    if (!req.params.id) {
      return res.status(400).json({ message: "ID is required" });
    }
    if (!questions) {
      return res.status(500).json({
        message: "Question not found",
      });
    }
    res.status(200).json({
      message: "Question fetched successful",
      questions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export const editQuestion = async (req, res) => {
  try {
    const { question, options, marks, answer } = req.body;
    // validation
    if (!question || !options || !answer || !marks) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const updateQuestion = await QuestionModel.findByIdAndUpdate(
      req.params.id,
      {
        question,
        options,
        marks,
        answer,
      },
      { new: true },
    );
    if (!updateQuestion) {
      return res.status(500).json({ message: "Question not found" });
    }
    res.status(200).json({
      message: "Question updated successfully",
      updateQuestion,
    });
  } catch (error) {
    console.log(error);
  }
};

export const DestroyQuestion = async (req, res) => {
  try {
    const DestroyQuestion = await QuestionModel.findByIdAndDelete(
      req.params.id,
    );
    if (!DestroyQuestion) {
      return res.status(500).json({
        message: "Question not found",
      });
    }
    res.status(200).json({
      message: "question deleted successfully",
      DestroyQuestion,
    });
  } catch (error) {
    console.log(error);
  }
};
