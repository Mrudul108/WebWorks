import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Question",   // links this answer to a specific Question
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  tags: [String],            // optional, if you want to categorize answers
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Export the Answer model
export default mongoose.model("Answer", answerSchema);
