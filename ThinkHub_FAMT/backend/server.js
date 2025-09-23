import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import questionRoutes from "./routes/questions.js";
import answerRoutes from "./routes/answers.js";
import authRoutes from "./routes/auth.js"; // path as per your project
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

app.get("/", (req, res) => {
  res.send("ThinkHub FAMT API is running!<br><a href='/api/questions'>Show Questions</a>");
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/thinkhub_famt", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.log(err));
