import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { QuestionsList } from "./questions/questionsList";
import NavigateButton from "./navigateButton";

export default function ReadingExercises() {
  const { exerciseType, exerciseId } = useParams();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [exercises, setExercises] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [userAnswers, setUserAnswers] = useState({});
  const [userScore, setUserScore] = useState(-1);

  useEffect(() => {
    fetch(
      `http://localhost:9999/exercises?exerciseType=${exerciseType}&id=${exerciseId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setExercises(data[0]);
        }
      })
      .catch((err) => console.error("error", err));
  }, [exerciseType, exerciseId]);

  useEffect(() => {
    if (userScore !== -1) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNextPart = () => {
    if (exercises && currentPartIndex < exercises.parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };

  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSelectOptions = (questionId, optionId) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    exercises.parts.map((part) => {
      return {
        questions: part.questions.map((question) => {
          const userAnswer = userAnswers[question.id];
          // const correctAnswers = part.answers[question.id]?.answer;
          const correctAnswers = part.answers.find(
            (answer) => answer.id === question.id
          )?.answer;
          const isCorrect = userAnswer === correctAnswers;
          if (isCorrect) {
            score++;
          }
        }),
      };
    });
    setUserScore(score);
  };

  if (!exercises?.parts) {
    return <div>Loading...</div>;
  }

  const currentPart = exercises.parts[currentPartIndex];
  console.log(currentPart);

  console.log(exercises);
  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      {!(userScore > -1) ? (
        <>
          <QuestionsList
            exercises={exercises}
            currentPart={currentPart}
            timeLeft={timeLeft}
            onSelect={handleSelectOptions}
            userAnswers={userAnswers}
          />
          <NavigateButton
            currentPartIndex={currentPartIndex}
            totalParts={exercises.parts.length}
            onPrevious={handlePreviousPart}
            onNext={handleNextPart}
            onSubmit={handleSubmit}
          />
        </>
      ) : (
        <>
          <QuestionsList
            exercises={exercises}
            currentPart={currentPart}
            timeLeft={timeLeft}
            userAnswers={userAnswers}
            userScore={userScore}
          />
          <NavigateButton
            currentPartIndex={currentPartIndex}
            totalParts={exercises.parts.length}
            onPrevious={handlePreviousPart}
            onNext={handleNextPart}
          />
        </>
      )}
    </div>
  );
}
