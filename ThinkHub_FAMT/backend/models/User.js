import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        if (this.role === "student") {
          return /^[a-zA-Z0-9._%+-]+@famt\.ac\.in$/.test(email);
        }
        return true; // teacher can have any email (for now)
      },
      message: "Invalid email. Students must use college email (e.g. td250000@famt.ac.in)."
    }
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
