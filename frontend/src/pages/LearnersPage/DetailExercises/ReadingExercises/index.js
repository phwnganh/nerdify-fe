import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionsList } from "./questions/questionsList";
import NavigateButton from "./navigateButton";

export default function ReadingExercises() {
  const { exerciseType, exerciseId } = useParams();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [exercises, setExercises] = useState(null);
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
    exercises.parts.forEach((part) => {
      part.questions.forEach((question) => {
        const userAnswer = userAnswers[question.id];
        const correctAnswer = part.answers.find(
          (answer) => answer.id === question.id
        )?.answer;
        if (userAnswer === correctAnswer) {
          score++;
        }
      });
    });
    setUserScore(score);
  };

  if (!exercises?.parts) {
    return <div>Loading...</div>;
  }

  const currentPart = exercises.parts[currentPartIndex];
  const totalQuestions = exercises.parts.reduce(
    (acc, part) => acc + part.questions.length,
    0
  );
  const mark = (userScore / totalQuestions) * 100;

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      {!(userScore > -1) ? (
        <>
          <QuestionsList
            exercises={exercises}
            currentPart={currentPart}
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
            userAnswers={userAnswers}
            userScore={userScore}
            mark={mark}
          />
          <NavigateButton
            currentPartIndex={currentPartIndex}
            totalParts={exercises.parts.length}
            onPrevious={handlePreviousPart}
            onNext={handleNextPart}
            mark={mark}
            isCheckpointQuiz={exerciseType === "checkpoint"}
          />
        </>
      )}
    </div>
  );
}
