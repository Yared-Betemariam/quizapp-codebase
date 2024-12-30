import mongoose, { Document, Model } from "mongoose";

export interface Question extends Document {
  info: string;
  question: string;
  incorrect_answer: string[];
  correct_answer: string;
}

const questionSchema = new mongoose.Schema<Question>({
  info: {
    type: String,
    required: true,
    trim: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  incorrect_answer: {
    type: [String],
    required: true,
    validate: {
      validator: (value: string[]) => value.length > 0,
      message: "There must be at least one incorrect answer.",
    },
  },
  correct_answer: {
    type: String,
    required: true,
    trim: true,
  },
});

const Questions: Model<Question> =
  mongoose.models?.Question || mongoose.model("Question", questionSchema);

export default Questions;
