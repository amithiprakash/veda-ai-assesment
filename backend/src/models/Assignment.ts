import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  type: String,
  count: Number,
  marks: Number,
});

const AssignmentSchema = new mongoose.Schema({
  dueDate: String,
  instructions: String,
  questions: [QuestionSchema],
  output: Object,
});

export default mongoose.model("Assignment", AssignmentSchema);