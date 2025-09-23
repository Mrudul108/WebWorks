import express from "express";
import Question from "../models/Question.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ---------------- POST /questions ----------------
// Only logged-in users can post questions
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const newQuestion = new Question({
      title,
      description,
      tags,
      author: req.user.id, // logged-in user's ID
      createdAt: new Date()
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error("Post question error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- GET /questions ----------------
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email"); // optional: show who asked
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- GET /questions/:id ----------------
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id).populate("author", "name email");
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
