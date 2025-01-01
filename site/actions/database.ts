"use server";

import connectDB from "@/mongoose/db";
import Questions, { Question } from "@/mongoose/models/questions";

// check admin
export const adminAuth = async (username: string, password: string) => {
  if (
    username == process.env.ADMIN_USERNAME &&
    password == process.env.ADMIN_PASSWORD
  ) {
    return true;
  }
  return false;
};

// Questions
export const addQuestionToDB = async ({
  info,
  question,
  incorrect_answer,
  correct_answer,
}: {
  info: string;
  question: string;
  incorrect_answer: string[];
  correct_answer: string;
}) => {
  try {
    await connectDB();
    const Question = await Questions.create({
      info,
      correct_answer,
      incorrect_answer,
      question,
    });

    return {
      success: "Question added to db, tags updated, code added",
      id: String(Question._id),
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

// Questions
export const getQuestions = async (info_data?: string) => {
  try {
    await connectDB();
    const query: any = {};

    if (info_data) {
      query.info = { $in: info_data };
    }

    const QuestionsList = await Questions.find(query).lean<Question[]>().exec();

    return {
      success: "Fetching done!",
      data: JSON.parse(JSON.stringify(QuestionsList)),
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const getQuestion = async (QuestionId: string) => {
  try {
    await connectDB();
    const Question = await Questions.findById(QuestionId)
      .lean<Question>()
      .exec();
    return { success: "Fetching done!", data: Question };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteQuestion = async (QuestionId: string) => {
  try {
    await connectDB();
    await Questions.findByIdAndDelete(QuestionId).exec();
    return { success: "deleting done!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
