import express from "express";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ---------------- POST /answers/:questionId ----------------
// Only logged-in users can post answers
router.post("/:questionId", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const { questionId } = req.params;

    if (!content) {
      return res.status(400).json({ error: "Answer content cannot be empty" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    const newAnswer = new Answer({
      questionId,
      content,
      author: req.user.id, // logged-in user ID
      createdAt: new Date()
    });

    await newAnswer.save();

    res.status(201).json(newAnswer);
  } catch (err) {
    console.error("Post answer error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- GET /answers/:questionId ----------------
router.get("/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    let { skip = 0, limit = 1 } = req.query;
    skip = parseInt(skip);
    limit = parseInt(limit);

    const answers = await Answer.find({ questionId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name email");

    res.json(answers);
  } catch (err) {
    console.error("Get answers error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
