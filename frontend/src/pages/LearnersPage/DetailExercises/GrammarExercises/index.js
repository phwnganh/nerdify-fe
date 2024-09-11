import { useEffect, useState } from "react";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { useParams } from "react-router-dom";
import ButtonCustom from "../../../../components/Button";
import { Row, Input } from "antd";

export default function GrammarExercises() {
  const { exerciseType, exerciseId } = useParams();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [partResults, setPartResults] = useState({
    part1: null,
    part2: null,
    part3: null,
  });
  const [exercises, setExercises] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:9999/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setExercises(data[0]);
        }
      })
      .catch((err) => console.error("error", err));
  }, [exerciseType, exerciseId]);

  const handleInputChange = (questionId, inputIndex, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [inputIndex]: value,
      },
    }));
  };

  const handleSubmitPart = (partType, partData) => {
    const results = partData.map((question) => {
      const userAnswerString = userAnswers[question.id]?.[0] || '';
      const correctAnswer = question.answer;
  
      const normalizedUserAnswer = userAnswerString
        .split(',')
        .map(ans => ans.trim().toLowerCase());
  
      const normalizedCorrectAnswer = Array.isArray(correctAnswer)
        ? correctAnswer.map(ans => ans.toLowerCase())
        : [correctAnswer.toLowerCase()];
  
      const isCorrect = normalizedUserAnswer.every(ans => normalizedCorrectAnswer.includes(ans));
  
      return {
        ...question,
        userAnswer: userAnswerString,
        correctAnswer: normalizedCorrectAnswer.join(', '),
        isCorrect,
      };
    });
  
    return results;
  };
  

  const handleCompleted = () => {
    const allResults = exercises.parts.map((part, index) => {
      return handleSubmitPart(`part${index + 1}`, part.questions);
    });

    const totalScore =
      (allResults
        .flat()
        .filter((result) => result.isCorrect).length /
        allResults.flat().length) *
      100;

    setUserScore(Math.round(totalScore));

    const newPartResults = allResults.reduce((acc, result, index) => {
      acc[`part${index + 1}`] = result;
      return acc;
    }, {});

    setPartResults(newPartResults);
    setIsCompleted(true);
  };

  const renderPart = (currentPart) => {
    return (
      <>
        {currentPart.questions.map((question) => {
          const questionText = Array.isArray(question.question)
            ? question.question.join(' ') 
            : question.question; 
  
          return (
            <div key={question.id} style={{ marginBottom: "20px" }}>
              <TextCustom>{questionText}</TextCustom>
              <div style={{ marginBottom: "16px" }}>
                <Input
                  value={userAnswers[question.id]?.[0] || ""}
                  onChange={(e) =>
                    handleInputChange(question.id, 0, e.target.value)
                  }
                  disabled={isCompleted}
                />
              </div>
  
              {isCompleted && (
                <>
                  <TextCustom style={{ color: "green", display: "block" }}>
                    Câu trả lời của bạn: {userAnswers[question.id]?.[0]}
                  </TextCustom>
  
                  <TextCustom style={{ color: "blue", display: "block" }}>
                  Đáp án:{" "}
                  {Array.isArray(question.answer)
                    ? question.answer.join(", ")
                    : question.answer}
                </TextCustom>
                </>
              )}
            </div>
          );
        })}
      </>
    );
  };
  

  const handleRetry = () => {
    setUserAnswers({});
    setPartResults({
      part1: null,
      part2: null,
      part3: null,
    });
    setUserScore(0);
    setIsCompleted(false);
    setCurrentPartIndex(0);
  };

  if (!exercises?.parts) return <div>Loading...</div>;

  const currentPart = exercises?.parts[currentPartIndex];

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises.title}
      </TitleCustom>
      <div style={{ textAlign: "center" }}>
        {isCompleted && (
          <>
            <TextCustom>Điểm: </TextCustom>
            <span style={{ color: "red" }}>{userScore}%</span>
          </>
        )}
      </div>
      <div>
        <TextCustom style={{ color: "red", fontWeight: "bold" }}>
          {currentPart.partName}
        </TextCustom>
        {renderPart(currentPart)}
        <div style={{ textAlign: "center", paddingTop: "50px" }}>
          <ButtonCustom
            buttonType="secondary"
            style={{ padding: "23px" }}
            onClick={() => setCurrentPartIndex((prev) => prev - 1)}
            disabled={currentPartIndex === 0}
          >
            Phần trước
          </ButtonCustom>
          <ButtonCustom
            buttonType="secondary"
            style={{ padding: "23px", marginLeft: "30px" }}
            onClick={() => setCurrentPartIndex((prev) => prev + 1)}
            disabled={currentPartIndex === exercises.parts.length - 1}
          >
            Phần tiếp theo
          </ButtonCustom>
          {isCompleted ? (
            <>
              <ButtonCustom
                buttonType="secondary"
                style={{ padding: "23px", marginLeft: "30px" }}
                onClick={handleRetry}
              >
                Làm lại bài tập này
              </ButtonCustom>
              <ButtonCustom
                buttonType="secondary"
                style={{ padding: "23px", marginLeft: "30px" }}
              >
                Chuyển sang bài tập khác
              </ButtonCustom>
            </>
          ) : (
            <ButtonCustom
              buttonType="secondary"
              style={{ padding: "23px", marginLeft: "30px" }}
              onClick={handleCompleted}
            >
              Hoàn thành
            </ButtonCustom>
          )}
        </div>
      </div>
    </div>
  );
}
