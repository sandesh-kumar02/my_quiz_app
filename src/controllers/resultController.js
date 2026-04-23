import ResultModel from "../models/Result.js";

export const createResult = async (req, res) => {
  try {
    const { score, total, answers } = req.body;

    if (!score || !total || !answers) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newResult = new ResultModel({
      userId: req.user.id,
      score,
      total,
      answers,
    });

    await newResult.save();

    res.status(201).json({
      message: "Result saved successfully",
      newResult,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserResultsForLoggedInUser = async (req, res) => {
  try {
    const userId = req.user.id; // JWT se
    const results = await ResultModel.find({ userId })
      .populate("userId", "username email")
      .populate("answers.questionId", "question options answer marks");

    if (!results.length) {
      return res.status(404).json({ message: "No results found" });
    }

    const latestResult = results[results.length - 1]; // latest
    res.status(200).json({ result: latestResult });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllResult = async (req, res) => {
  try {
    const result = await ResultModel.find().populate("userId", "username email");
    if (!result) {
      return res.status(400).json({ message: "Result not found" });
    }

    res.status(200).json({
      message: "Result fetched successfully",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await ResultModel.find()
      .populate("userId", "username email")
      .sort({ score: -1 })
      .limit(10);

    const rankedLeaderboard = leaderboard.map((result, index) => ({
      rank: index + 1,
      username: result.userId.username,
      email: result.userId.email,
      score: result.score,
      total: result.total,
    }));

    res.status(200).json({
      message: "Leaderboard fetched successfully",
      leaderboard: rankedLeaderboard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
