const mongoose = require("mongoose");

const interviewSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  field: {
    type: String,
    enum: ["Web Development", "Data Science", "AI", "Cyber Security"],
    required: true,
  },
  questions: [String],
  answers: [String],
  feedback: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InterviewSession = mongoose.model("InterviewSession", interviewSessionSchema);
module.exports = InterviewSession;
