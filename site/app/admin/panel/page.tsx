"use client";

import {
  addQuestionToDB,
  deleteQuestion,
  getQuestions,
} from "@/actions/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, Loader2, Trash, X } from "lucide-react";
import { useState, ReactNode } from "react";

interface Question {
  _id: string;
  info: string;
  question: string;
  correct_answer: string;
  incorrect_answer: string[];
}

const Page = () => {
  const [activeTab, setActiveTab] = useState<"add" | "filter">("add");

  return (
    <div className="flex flex-col w-full gap-6 pb-8">
      <div className="flex gap-4 border-b border-color">
        <span
          onClick={() => setActiveTab("add")}
          className={cn(
            "hover:cursor-pointer",
            activeTab == "add"
              ? "font-semibold underline underline-offset-[6px]"
              : "opacity-75"
          )}
        >
          Add Question
        </span>
        <span
          onClick={() => setActiveTab("filter")}
          className={cn(
            "hover:cursor-pointer",
            activeTab == "filter"
              ? "font-semibold underline underline-offset-[6px]"
              : "opacity-75"
          )}
        >
          List Questions
        </span>
      </div>

      {activeTab === "add" && <AddQuestionTab />}
      {activeTab === "filter" && <FilterQuestionsTab />}
    </div>
  );
};

const AddQuestionTab = () => {
  const [info, setInfo] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [incorrectAnswer, setIncorrectAnswer] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleIncorrectChange = (index: number, value: string) => {
    setIncorrectAnswer((prev) =>
      prev.map((item, i) => (i === index ? value : item))
    );
  };

  const handleOnClear = () => {
    setQuestion("");
    setCorrectAnswer("");
    setIncorrectAnswer(["", "", ""]);
  };

  const handleCreate = async () => {
    setError("");
    setSuccess("");

    if (
      !question ||
      incorrectAnswer.length !== 3 ||
      !incorrectAnswer[0] ||
      !incorrectAnswer[1] ||
      !incorrectAnswer[2] ||
      !correctAnswer ||
      !info ||
      !info.includes(",") ||
      info.length < 5
    ) {
      setError("Invalid input please try again");
      return;
    }

    setIsLoading(true);
    try {
      const data = await addQuestionToDB({
        info,
        question,
        incorrect_answer: incorrectAnswer,
        correct_answer: correctAnswer,
      });

      if (data.success) {
        setSuccess(`Question successfully created, id=${data.id}`);
      } else {
        setError("Failed to add question.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-10 md:flex-row">
      <div className="flex flex-1 flex-col gap-2">
        <span>Add Questions</span>
        <div className="flex flex-col">
          <label htmlFor="info" className="text-sm opacity-50">
            Info
          </label>
          <Input
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            id="info"
            placeholder="xx,xx,xx"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="question" className="text-sm opacity-50">
            Question
          </label>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            id="question"
            placeholder="What is this color?"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ca" className="text-sm opacity-50">
            Correct answer
          </label>
          <Input
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            id="ca"
            placeholder="Red"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="ia" className="text-sm opacity-50">
            Incorrect answers
          </label>
          {incorrectAnswer.map((answer, index) => (
            <Input
              key={index}
              value={answer}
              onChange={(e) => handleIncorrectChange(index, e.target.value)}
              id={`ia-${index}`}
              placeholder={`Answer ${index + 1}`}
            />
          ))}
        </div>
        {error && (
          <p className="flex items-center gap-2 text-sm text-red-700">
            <X className="size-4 inline" /> {error}
          </p>
        )}
        {success && (
          <p className="flex items-center gap-2 text-sm text-green-700">
            <Check className="size-4 inline" /> {success}
          </p>
        )}
        <div className="flex gap-2">
          <Button
            disabled={isLoading}
            onClick={handleCreate}
            size="sm"
            className="w-fit"
          >
            {isLoading && <Loader2 className="size-4 mr-2 inline" />}
            Create
          </Button>
          <Button
            onClick={handleOnClear}
            variant="outline"
            size="sm"
            className="w-fit"
          >
            Clear
          </Button>
        </div>
        <div className="flex max-w-[20rem] flex-col text-sm">
          <span className="text-base text-yellow-600">Note</span>
          <span>
            Make sure the are not blank spaces at the begining and ending of an
            input below, and all the sentences should be written in capitalized
            form
          </span>
          <span>
            Then info input is composed of three parts separeted by{" "}
            <span className="font-bold">&quot;,&quot;</span>.
          </span>
          <span>the first 2 indicate the subject so </span>{" "}
          <ul className="list-disc grid grid-cols-4 gap-x-6 list-insid">
            <li>eng=1</li>
            <li>math=2</li>
            <li>che=3</li>
            <li>phy=4</li>
            <li>bio=5</li>
            <li>his=6</li>
            <li>ciz=7</li>
            <li>geo=8</li>
            <li>eco=9</li>
          </ul>
          <span>
            and the second is the grade level(9,10,11,12) and the last is the
            chapter number(1-12){" "}
          </span>
        </div>
      </div>
    </section>
  );
};

const FilterQuestionsTab = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [infoFilter, setInfoFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuestions = async () => {
    if (infoFilter) {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await getQuestions(infoFilter);
        if (response.success) {
          setQuestions(response.data);
        } else {
          console.log("Failed to fetch questions.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }
  };

  const handleDelete = async (questionId: string) => {
    try {
      const response = await deleteQuestion(questionId);
      if (response.success) {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question._id !== questionId)
        );
        console.log(response.success);
      } else {
        console.log(response.error || "Failed to delete question.");
      }
    } catch (error) {
      console.log("Error deleting question:", error);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          value={infoFilter}
          onChange={(e) => setInfoFilter(e.target.value)}
          placeholder="xx,xx,xx"
        />
        <Button
          disabled={!infoFilter.includes(",") || loading}
          onClick={fetchQuestions}
        >
          Search
        </Button>
      </div>

      <div className="grid gap-1.5 overflow-auto max-h-[calc(100vh-14rem)] border rounded p-1.5 bg-gray-100/5">
        {!infoFilter ? (
          <span className="text-sm opacity-50">No info filter</span>
        ) : loading ? (
          <span className="text-sm opacity-50">Fetching questions...</span>
        ) : !questions.length ? (
          <span className="text-sm opacity-50">No questions</span>
        ) : (
          <>
            <span className="text-sm opacity-50">
              {questions.length} Search results
            </span>
            {questions.map((question, index) => (
              <div key={question._id} className="border p-4 rounded bg-white">
                <div className="flex justify-between items-center">
                  <span className="opacity-50">{index + 1}</span>
                  <Button
                    className="bg-destructive hover:bg-destructive/80"
                    size={"sm"}
                    onClick={() => handleDelete(question._id)} // Call handleDelete
                  >
                    <Trash className="inline mr-2 size-4" />
                    Delete
                  </Button>
                </div>
                <p>
                  <strong className="opacity-50 text-sm mr-2">Info</strong>
                  {question.info}
                </p>
                <p>
                  <strong className="opacity-50 text-sm mr-2">Question</strong>
                  {question.question}
                </p>
                <p>
                  <strong className="opacity-50 text-sm mr-2">
                    Correct Answer
                  </strong>
                  {question.correct_answer}
                </p>
                <p>
                  <strong className="opacity-50 text-sm mr-2">
                    Incorrect Answers
                  </strong>
                  {question.incorrect_answer.join(", ")}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;

// "use client";

// import { addQuestionToDB } from "@/actions/database";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Check, Loader2, X } from "lucide-react";
// import { useState } from "react";

// const Page = () => {
//   const [info, setInfo] = useState("");
//   const [question, setQuestion] = useState("");
//   const [correctAnswer, setCorrectAnswer] = useState("");
//   const [incorrectAnswer, setIncorrectAnswer] = useState(["", "", ""]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleIncorrectChange = (index: number, value: string) => {
//     setIncorrectAnswer((prev) =>
//       prev.map((item, i) => (i === index ? value : item))
//     );
//   };

//   const handleOnClear = () => {
//     setQuestion("");
//     setCorrectAnswer("");
//     setIncorrectAnswer(["", "", ""]);
//   };

//   const handleCreate = async () => {
//     setError("");
//     setSuccess("");

//     if (
//       !question ||
//       incorrectAnswer.length !== 3 ||
//       !incorrectAnswer[0] ||
//       !incorrectAnswer[1] ||
//       !incorrectAnswer[2] ||
//       !correctAnswer ||
//       !info ||
//       !info.includes(",") ||
//       info.length < 5
//     ) {
//       setError("Invalid input please try again");
//       return;
//     }

//     setIsLoading(true);
//     addQuestionToDB({
//       info,
//       question,
//       incorrect_answer: incorrectAnswer,
//       correct_answer: correctAnswer,
//     })
//       .then((data) => {
//         if (data.success) {
//           setSuccess(`question successfully created, id=${data.id}`);
//         } else {
//           setError("Invalid username and password.");
//         }
//       })
//       .catch((error) => console.log(error))
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <section className="flex flex-col gap-10 pb-20 pt-4 md:pt-8 md:flex-row">
//       <div className="flex flex-1 flex-col gap-2">
//         <span>Add Questions</span>
//         <div className="flex flex-col">
//           <label htmlFor="info" className="text-sm opacity-50">
//             Info
//           </label>
//           <Input
//             value={info}
//             onChange={(e) => setInfo(e.target.value)}
//             id="info"
//             placeholder="xx,xx,xx"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="question" className="text-sm opacity-50">
//             Question
//           </label>
//           <Input
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             id="question"
//             placeholder="What is this color?"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="ca" className="text-sm opacity-50">
//             Correct answer
//           </label>
//           <Input
//             value={correctAnswer}
//             onChange={(e) => setCorrectAnswer(e.target.value)}
//             id="ca"
//             placeholder="Red"
//           />
//         </div>
//         <div className="flex flex-col gap-0.5">
//           <label htmlFor="ia" className="text-sm opacity-50">
//             Inorrect answer
//           </label>
//           <Input
//             value={incorrectAnswer[0]}
//             onChange={(e) => handleIncorrectChange(0, e.target.value)}
//             id="ia"
//             placeholder="Blue"
//           />
//           <Input
//             value={incorrectAnswer[1]}
//             onChange={(e) => handleIncorrectChange(1, e.target.value)}
//             id="ia"
//             placeholder="Green"
//           />
//           <Input
//             value={incorrectAnswer[2]}
//             onChange={(e) => handleIncorrectChange(2, e.target.value)}
//             id="ia"
//             placeholder="None"
//           />
//         </div>
//         {error && (
//           <p className="flex items-center gap-2 text-sm text-red-700">
//             <X className="size-4 inline" /> {error}
//           </p>
//         )}
//         {success && (
//           <p className="flex items-center gap-2 text-sm text-green-700">
//             <Check className="size-4 inline" /> {success}
//           </p>
//         )}
//         <div className="flex gap-2">
//           <Button
//             disabled={isLoading}
//             onClick={handleCreate}
//             size={"sm"}
//             className="w-fit"
//           >
//             {isLoading && <Loader2 className="size-4 mr-2 inline" />}
//             Create
//           </Button>
//           <Button
//             onClick={handleOnClear}
//             variant={"outline"}
//             size={"sm"}
//             className="w-fit"
//           >
//             clear
//           </Button>
//         </div>
//       </div>
//       <div className="flex max-w-[20rem] flex-col text-sm">
//         <span className="text-base text-yellow-600">Note</span>
//         <span>
//           Make sure the are not blank spaces at the begining and ending of an
//           input below, and all the sentences should be written in capitalized
//           form
//         </span>
//         <span>
//           Then info input is composed of three parts separeted by{" "}
//           <span className="font-bold">&quot;,&quot;</span>.
//         </span>
//         <span>the first 2 indicate the subject so </span>
//         <ul className="list-disc grid grid-cols-4 gap-x-6 list-inside">
//           <li>eng=1</li>
//           <li>math=2</li>
//           <li>che=3</li>
//           <li>phy=4</li>
//           <li>bio=5</li>
//           <li>his=6</li>
//           <li>ciz=7</li>
//           <li>geo=8</li>
//           <li>eco=9</li>
//         </ul>
//         <span>
//           and the second is the grade level(9,10,11,12) and the last is the
//           chapter number(1-12){" "}
//         </span>
//       </div>
//     </section>
//   );
// };
// export default Page;
