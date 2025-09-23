import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    // required: true, 
    default: "" 
  },
  tags: { 
    type: [String], 
    default: [] 
  },
  author: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("Question", questionSchema);
