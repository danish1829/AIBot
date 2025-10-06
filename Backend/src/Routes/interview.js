const express = require('express');
const interviewRouter = express.Router();
const InterviewSession = require("../models/interviewSession");
const OpenAI = require("openai");
require('dotenv').config();
const authValidation = require('../middleware/authValidation');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interviewRouter.post("/interview/start", authValidation, async (req, res) => {
  try {
    const { field } = req.body;
    const userId = req.user.id; // assuming JWT middleware adds `req.user`

    if (!field) {
      return res.status(400).json({ error: "Field is required" });
    }

    // Call OpenAI API to generate interview questions
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Generate 5 challenging and realistic interview questions for a ${field} interview. 
          Each question should be short, numbered, and without explanations.`,
        },
      ],
    });

    // Extract questions safely
    const content = response?.choices?.[0]?.message?.content || "";
    const questions = content
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0 && /\d/.test(q)); // filters empty lines & keeps numbered questions only

    if (questions.length === 0) {
      return res
        .status(500)
        .json({ error: "Failed to generate questions. Try again." });
    }

    // Save session
    const session = await InterviewSession.create({
      user: userId,
      field,
      questions,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: "Interview started successfully",
      session,
    });
  } catch (error) {
    console.error("Error starting interview:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

interviewRouter.post(
  "/interview/answer",
  authValidation,
  async (req, res) => {
    try {
      const { sessionId, question, answer } = req.body;
      const userId = req.user.id;

      if (!sessionId || !question || !answer) {
        return res.status(400).json({ error: "sessionId, question and answer are required" });
      }

      // Find the interview session
      const session = await InterviewSession.findOne({ _id: sessionId, user: userId });
      if (!session) {
        return res.status(404).json({ error: "Interview session not found" });
      }

      // Send question + answer to OpenAI for evaluation
      const aiResponse = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Evaluate this answer: "${answer}" for the interview question: "${question}". 
                      Provide constructive feedback, a score out of 10, and suggestions to improve. 
                      Keep the response concise.`,
          },
        ],
      });

      const feedback = aiResponse?.choices?.[0]?.message?.content || "No feedback received";

      // Save answer and feedback in session
      session.answers.push(answer);
      session.feedback.push(feedback);
      await session.save();

      res.status(200).json({
        message: "Answer recorded and feedback received",
        feedback,
      });
    } catch (error) {
      console.error("Error in /interview/answer:", error);
      res.status(500).json({ error: error.message });
    }
  }
);


interviewRouter.get("/interview/history", authValidation, async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = interviewRouter;