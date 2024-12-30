import BackButton from "@/components/BackButton";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { questions as allQuestions } from "@/constants/questions";
import icons from "@/constants/icons";
import { getSubjectFromId } from "@/lib";

const Quiz = () => {
  const { info } = useLocalSearchParams();
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false); // Ready page control

  // Store pre-randomized choices
  const [randomizedChoices, setRandomizedChoices] = useState<string[][]>([]);

  // Filter questions by info and randomize choices
  useEffect(() => {
    const filtered = allQuestions.filter((q) => q.info === info);
    setFilteredQuestions(filtered);
    setTimer(filtered.length * 30); // Set timer: 30 seconds per question

    // Pre-randomize choices for each question
    const choices = filtered.map((q) =>
      [q.correctAnswer, ...q.incorrectAnswer].sort(() => Math.random() - 0.5)
    );
    setRandomizedChoices(choices);
  }, [info]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && quizStarted && !isQuizCompleted) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && quizStarted) {
      handleQuizCompleted();
    }
  }, [timer, quizStarted, isQuizCompleted]);

  // Handle answer selection
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);

    const currentQuestion = filteredQuestions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestionIndex < filteredQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        handleQuizCompleted();
      }
    }, 1000); // Delay to show selected answer feedback
  };

  const handleQuizCompleted = () => {
    setIsQuizCompleted(true);
    saveResults();
  };

  const saveResults = async () => {
    try {
      const results = {
        info,
        correctCount,
        totalQuestions: filteredQuestions.length,
        date: new Date().toISOString(),
      };

      const existingData = await AsyncStorage.getItem("quizResults");
      const parsedData = existingData ? JSON.parse(existingData) : [];
      parsedData.push(results);

      await AsyncStorage.setItem("quizResults", JSON.stringify(parsedData));
    } catch (error) {
      console.error("Error saving results:", error);
    }
  };

  if (!quizStarted) {
    const subjectInfo = getSubjectFromId(
      (typeof info === "string" ? info.split(",")[0] : undefined)!
    );
    return (
      <SafeAreaView className="h-full bg-white">
        <BackButton />
        <View className="flex-1 py-8 px-6">
          <Text className="text-4xl mb-6 font-hankenGrotesk-extrabold">
            Get Ready!
          </Text>
          <View className="gap-1 mb-4 border-b border-gray-200/75 pb-4">
            <Text className="font-hankenGrotesk text-lg text-gray-500">
              Subject
            </Text>
            <Text className="text-xl font-hankenGrotesk-semibold">
              {subjectInfo.title}
            </Text>
          </View>
          <View className="gap-1 mb-4 border-b border-gray-200/75 pb-4">
            <Text className="font-hankenGrotesk text-lg text-gray-500">
              Grade/Chapter
            </Text>
            <Text className="text-xl font-hankenGrotesk-semibold">
              {typeof info === "string" ? info.split(",")[1] : ""}th Grade /
              Chapter {typeof info === "string" ? info.split(",")[2] : ""}
            </Text>
          </View>
          <View className="gap-1 mb-4 border-b border-gray-200/75 pb-4">
            <Text className="font-hankenGrotesk text-lg text-gray-500">
              Total Questions
            </Text>
            <Text className="text-xl font-hankenGrotesk-semibold">
              {filteredQuestions.length}
            </Text>
          </View>
          <View className="gap-1 mb-4 pb-4">
            <Text className="font-hankenGrotesk text-lg text-gray-500">
              Time to complete
            </Text>
            <Text className="text-xl font-hankenGrotesk-semibold">
              {filteredQuestions.length * 30} seconds
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setQuizStarted(true)}
            className="bg-teal-600 px-6 py-3 rounded-md flex-row items-center justify-between"
          >
            <Text className="text-white text-xl font-hankenGrotesk-medium">
              Start Quiz
            </Text>
            <Image
              source={icons.backArrow}
              className="size-6 rotate-180"
              tintColor={"white"}
            />
          </TouchableOpacity>
          <CancelButton label="Cancel" />
        </View>
      </SafeAreaView>
    );
  }

  if (isQuizCompleted) {
    return (
      <SafeAreaView className="h-full bg-white">
        <BackButton />
        <View className="flex-1 px-6 py-6">
          <Text className="text-3xl mb-6 py-3 font-hankenGrotesk-extrabold">
            <Text className="text-teal-600">Quiz </Text>Completed!
          </Text>
          <View className="gap-1 mb-4 border-b border-gray-200/75 pb-4">
            <Text className="font-hankenGrotesk text-lg text-gray-500">
              Correct answers
            </Text>
            <View className="flex-row items-center gap-3">
              <Text className="text-2xl font-hankenGrotesk-semibold">
                {correctCount}
              </Text>
              <Text className="opacity-50">/4</Text>
            </View>
          </View>
          <View className="gap-1 mb-4 border-b border-gray-200/75 pb-4">
            <Text className="font-hankenGrotesk text-lg text-gray-500">
              Incorrect answers
            </Text>
            <View className="flex-row items-center gap-3">
              <Text className="text-2xl font-hankenGrotesk-semibold">
                {filteredQuestions.length - correctCount}
              </Text>
              <Text className="opacity-50">/4</Text>
            </View>
          </View>
          <View className="gap-1 mb-4 pb-4">
            <Text className="font-hankenGrotesk text-lg text-gray-500">
              Total Questions
            </Text>
            <Text className="text-xl font-hankenGrotesk-semibold">
              {filteredQuestions.length}
            </Text>
          </View>
          <View className="flex-row gap-2 items-center py-1">
            <Image
              source={icons.check}
              tintColor={"#6b7280"}
              className="size-5"
            />
            <Text className="text-lg text-gray-500 font-hankenGrotesk">
              Results Saved
            </Text>
          </View>
          <CancelButton />
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <SafeAreaView className="h-full bg-white">
      <BackButton />
      <View className="gap-1 px-6 border-b border-gray-200/75 py-6">
        <Text className="font-hankenGrotesk text-lg text-gray-500">
          Time remaining
        </Text>
        <View className="flex-row text-teal-700 items-center gap-2">
          <Image
            source={icons.clock}
            className="size-8"
            tintColor={"#0f766e"}
          />
          <Text className="text-2xl font-hankenGrotesk-semibold">
            {Math.floor(timer / 60)}:{timer % 60}
          </Text>
        </View>
      </View>
      {currentQuestion && (
        <View className="p-6 gap-2">
          <Text className="font-hankenGrotesk text-lg text-gray-500">
            Question
          </Text>
          <Text className="text-2xl mb-4 font-hankenGrotesk-bold">
            {currentQuestion.question}
          </Text>
          <FlatList
            keyExtractor={(item) => item}
            data={randomizedChoices[currentQuestionIndex]} // Use pre-randomized choices
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`p-4 px-4 my-2 border border-zinc-900/5 rounded-lg ${
                  selectedAnswer === item
                    ? item === currentQuestion.correctAnswer
                      ? "bg-emerald-600"
                      : "bg-rose-600"
                    : "bg-gray-100"
                }`}
                onPress={() => handleAnswer(item)}
                disabled={selectedAnswer !== null}
              >
                <Text
                  className={`text-xl font-hankenGrotesk-medium ${
                    selectedAnswer === item ? "text-white" : "bg-gray-100"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const CancelButton = ({ label }: { label?: string }) => {
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="bg-gray-100 px-6 py-3 mt-4 rounded-md flex-row items-center justify-between"
    >
      <Text className="text-black text-xl font-hankenGrotesk-medium">
        {label || "Back"}
      </Text>
    </TouchableOpacity>
  );
};

export default Quiz;
