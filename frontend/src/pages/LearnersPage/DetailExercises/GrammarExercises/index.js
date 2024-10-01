import { Input, Row } from "antd";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import InputCustom from "../../../../components/Input";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import ButtonCustom from "../../../../components/Button";
import { PART_TYPE } from "../../../../constants";

export default function GrammarExercises() {
  const [exercises, setExercises] = useState(null); // Initialize with null
  const [userAnswers, setUserAnswers] = useState({});
  const { exerciseType, exerciseId } = useParams();
  const [userScore, setUserScore] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState({});
  const [answerStatus, setAnswerStatus] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:9999/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setExercises(data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [exerciseId, exerciseType]);

  const handleInputChange = useCallback((partId, questionId, inputIndex, value) => {
    const key = `${partId}-${questionId}-${inputIndex}`;
    console.log("input key: ", key);

    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [key]: value, // Gán giá trị người dùng nhập vào trạng thái
    }));
  }, []);

  const handleToggleAnswerDetail = useCallback((questionId) => {
    setToggleAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  });

  const renderInputField = (partKey, questionId, subIndex, question, isCompleted) => {
    const userAnswerKey = `${partKey}-${questionId}-${subIndex}`;
    const userAnswer = userAnswers[userAnswerKey] || "";
    const correctAnswer = question.answer;
    const isCorrect = typeof correctAnswer === "string" && userAnswer?.toLowerCase() === correctAnswer?.toLowerCase();

    return (
      <InputCustom
        style={{
          width: "150px",
          marginRight: "8px",
          borderColor: isCompleted ? (isCorrect ? "green" : "red") : "",
        }}
        value={userAnswer}
        onChange={(e) => handleInputChange(partKey, questionId, subIndex, e.target.value)}
        disabled={isCompleted}
      />
    );
  };

  const renderPart = useCallback(
    (currentPart, partKey) => (
      <div>
        {currentPart?.questions?.map((question, index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            <TextCustom style={{ fontWeight: "bold" }}>Câu {question.id}:</TextCustom>
            <div style={{ marginTop: "20px" }}>
              {Array.isArray(question.question) ? (
                question.question.map((subQuestion, subIndex) => (
                  <div key={`${partKey}-${question.id}-${subIndex}`} style={{ marginBottom: "10px" }}>
                    {subQuestion.includes("___") ? (
                      subQuestion.split("___").map((text, i) => (
                        <span key={`${partKey}-${question.id}-${subIndex}-${i}`}>
                          {i > 0 && renderInputField(partKey, question.id, subIndex, question, isCompleted)}
                          {text}
                        </span>
                      ))
                    ) : (
                      <span>{subQuestion}</span>
                    )}
                  </div>
                ))
              ) : question.question.includes("___") ? (
                question.question.split("___").map((text, i) => (
                  <span key={`${partKey}-${index}-${i}`}>
                    {i > 0 && renderInputField(partKey, question.id, i, question, isCompleted)}
                    {text}
                  </span>
                ))
              ) : (
                <span>{question.question}</span>
              )}
              {isCompleted && userAnswers[`${partKey}-${question.id}-0`] !== question.answer && (
                <div style={{paddingTop: '10px'}}>
                  <TextCustom style={{ color: "red" }}>Đáp án: {Array.isArray(question.answer) ? question.answer.join(" - ") : question.answer}</TextCustom>
                </div>
              )}
              {isCompleted && (
                <div style={{paddingTop: '20px' }}>
                  <ButtonCustom buttonType="primary" onClick={() => handleToggleAnswerDetail(question.id)}>
                    Đáp án chi tiết
                  </ButtonCustom>
                  {toggleAnswerDetail[question.id] && (
                    <div>
                      <TextCustom style={{ color: "blue" }}>
                        {question?.answerDetail.split("\n").map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </TextCustom>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    ),
    [isCompleted, toggleAnswerDetail, userAnswers, handleInputChange, handleToggleAnswerDetail],
  );

  const totalQuestions = useMemo(() => exercises?.parts?.reduce((acc, part) => acc + part.questions.length, 0), [exercises]);

  const handleSubmit = useCallback(() => {
    let score = 0;
    const submissionDate = new Date().toISOString();
    const submissionAnswers = [];
    const newAnswerStatus = {};
    exercises.parts.forEach((part) => {
      part.questions.forEach((question) => {
        const questionId = question.id;
        const correctAnswers = Array.isArray(question.answer) ? question.answer : [question.answer];

        const userAnswer = correctAnswers.map((_, index) => {
          const key = `${part.id}-${question.id}-${index + 1}`;
          console.log("user answer key: ", key);
          return userAnswers[key] || "";
        });

        const isCorrect = userAnswer.every((answer, index) => {
          const correctAnswer = correctAnswers[index];
          return answer?.toString().toLowerCase() === correctAnswer?.toString().toLowerCase();
        });

        if (isCorrect) {
          score++;
        }

        submissionAnswers.push({
          questionId: questionId,
          userAnswer: userAnswer.join(", "),
          correctAnswer: correctAnswers.join(", "),
          isCorrect: isCorrect,
        });
      });
    });

    const markValue = Math.round((score / totalQuestions) * 100);
    setUserScore(markValue);
    setIsCompleted(true);
    setAnswerStatus(newAnswerStatus);
    const submissionData = {
      exerciseId: exercises.id,
      submissionDate: submissionDate,
      score: `${markValue}%`,
      submissionAnswers: submissionAnswers,
      isCompleted: true,
    };

    fetch(`http://localhost:9999/exercises/${exercises?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: true,
        score: `${markValue}%`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("http://localhost:9999/exercisesSubmission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("grammar result: ", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [exercises, userAnswers, totalQuestions]);

  // Ensure exercises is set and has parts before trying to access them
  const currentPart = useMemo(() => exercises?.parts?.[currentPartIndex], [exercises, currentPartIndex]);

  const handleRetry = useCallback(() => {
    setUserScore(0);
    setCurrentPartIndex(0);
    setUserAnswers({});
    setIsCompleted(false);
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises?.title || "Loading..."}
      </TitleCustom>
      <div style={{ textAlign: "center" }}>
        {isCompleted && (
          <>
            <TextCustom>Điểm: </TextCustom>
            <span style={{ color: "red" }}>{userScore}%</span>
          </>
        )}
      </div>
      {currentPart && (
        <>
          <TextCustom style={{ color: "red", fontWeight: "bold" }}>{currentPart.partName}</TextCustom>
          {currentPart.partType === PART_TYPE.FILL_IN_THE_BLANK && renderPart(currentPart, currentPartIndex + 1)}
        </>
      )}
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <ButtonCustom buttonType="secondary" style={{ padding: "23px" }} onClick={() => setCurrentPartIndex((prev) => prev - 1)} disabled={currentPartIndex === 0}>
          Phần trước
        </ButtonCustom>
        <ButtonCustom
          buttonType="secondary"
          style={{ padding: "23px", marginLeft: "30px" }}
          onClick={() => setCurrentPartIndex((prev) => prev + 1)}
          disabled={!exercises || currentPartIndex === exercises.parts.length - 1}
        >
          Phần tiếp theo
        </ButtonCustom>
        {isCompleted ? (
          <>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleRetry}>
              Làm lại bài tập này
            </ButtonCustom>
            <ButtonCustom
              buttonType="secondary"
              style={{ padding: "23px", marginLeft: "30px" }}
              // onClick={handleNextExercise}
            >
              Chuyển sang bài tập tiếp theo
            </ButtonCustom>
          </>
        ) : (
          <>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleSubmit} disabled={!(currentPartIndex === exercises?.parts?.length - 1)}>
              Nộp bài
            </ButtonCustom>
          </>
        )}
      </div>
    </div>
  );
}
