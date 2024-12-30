"use client";

import { addQuestionToDB } from "@/actions/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Loader2, X } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [info, setInfo] = useState("");
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [incorrectAnswer, setIncorrectAnswer] = useState(["", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    addQuestionToDB({
      info,
      question,
      incorrect_answer: incorrectAnswer,
      correct_answer: correctAnswer,
    })
      .then((data) => {
        if (data.success) {
          setSuccess(`question successfully created, id=${data.id}`);
        } else {
          setError("Invalid username and password.");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="flex gap-10 pb-20 pt-8">
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
            Inorrect answer
          </label>
          <Input
            value={incorrectAnswer[0]}
            onChange={(e) => handleIncorrectChange(0, e.target.value)}
            id="ia"
            placeholder="Blue"
          />
          <Input
            value={incorrectAnswer[1]}
            onChange={(e) => handleIncorrectChange(1, e.target.value)}
            id="ia"
            placeholder="Green"
          />
          <Input
            value={incorrectAnswer[2]}
            onChange={(e) => handleIncorrectChange(2, e.target.value)}
            id="ia"
            placeholder="None"
          />
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
            size={"sm"}
            className="w-fit"
          >
            {isLoading && <Loader2 className="size-4 mr-2 inline" />}
            Create
          </Button>
          <Button
            onClick={handleOnClear}
            variant={"outline"}
            size={"sm"}
            className="w-fit"
          >
            clear
          </Button>
        </div>
      </div>
      <div className="flex max-w-md flex-col text-sm">
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
        <span>the first 2 indicate the subject so </span>
        <ul className="list-disc grid grid-cols-4 gap-x-6 list-inside">
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
    </section>
  );
};
export default Page;
