import React, { useEffect, useState } from "react";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { Col, Row, Tabs } from "antd";
import ButtonCustom from "../../../../components/Button";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { useParams } from "react-router-dom";
import QuestionLayout from "./Question";

export default function ListeningExercise() {
  const [exercises, setExercises] = useState(null);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentResultPartIndex, setCurrentResultPartIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [userScore, setUserScore] = useState(-1);
  const [exerciseResults, setExerciseResults] = useState(null);
  const { exerciseType, exerciseId} = useParams();
  const {TabPane} = Tabs;

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
      .catch((err) => console.error("Error fetching exercise data", err));
  }, [exerciseType, exerciseId]);

  useEffect(() => {
    setSelectedAnswers({});
    setUserScore(-1);
    setExerciseResults(null);
    setCurrentPartIndex(0);
    setCurrentResultPartIndex(0);
  }, [exerciseId])

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  const handleNextPart = () => {
    if (exercises && currentPartIndex < exercises.parts.length - 1) {
      setCurrentPartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextResultPart = () => {
    if (exercises && currentResultPartIndex < exercises.parts.length - 1) {
      setCurrentResultPartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousResultPart = () => {
    setCurrentResultPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = () => {
    let score = 0;
    const results = exercises.parts.map((part) => {
      return {
        ...part,
        questions: part.questions.map((question) => {
          const userAnswer = selectedAnswers[question.id];
          const answerDetail = part.answers.find(
            (answer) => answer.id === question.id
          )?.answerDetail;
          const correctAnswer = part.answers.find(
            (answer) => answer.id === question.id
          )?.answer;
          const isCorrect = userAnswer === correctAnswer;
          if (isCorrect) {
            score++;
          }
          return {
            ...question,
            userAnswer,
            correctAnswer,
            isCorrect,
            answerDetail,
          };
        }),
      };
    });
    setExerciseResults(results);
    setUserScore(score);
  };

  if (!exercises?.parts) {
    return <div>Loading...</div>;
  }

  const currentPart = exercises.parts[currentPartIndex];
  const currentResultPart = exerciseResults?.[currentResultPartIndex];
  const totalQuestions = exercises?.parts.reduce(
    (acc, part) => acc + part.questions.length,
    0
  );
  const mark = ((userScore / totalQuestions) * 100).toFixed(2);

  const handleTabChange = (key) => {

  }
  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises.title}
      </TitleCustom>

    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
      <TabPane tab="Questions and Answers" key={"questionsAnswers"}>
      {exerciseResults && (
        <div style={{ textAlign: "center" }}>
          <TextCustom style={{ textAlign: "center" }}>
            Điểm: &nbsp;
            <span style={{ color: "red" }}>
              {userScore}/{totalQuestions}
            </span>
            <span
              style={{ color: "red", marginLeft: "10px", fontWeight: "bold" }}
            >
              ({mark}%)
            </span>
          </TextCustom>
        </div>
      )}

      <QuestionLayout
        part={exerciseResults ? currentResultPart : currentPart}
        selectedAnswers={selectedAnswers}
        handleOptionSelect={handleOptionSelect}
        exerciseResults={exerciseResults}
      />
      {!exerciseResults ? (
        <div>
          <div style={{ textAlign: "center", paddingTop: "50px" }}>
            <ButtonCustom
              buttonType="secondary"
              style={{ marginRight: "100px", padding: "23px" }}
              onClick={handlePreviousPart}
              disabled={currentPartIndex === 0}
            >
              Phần trước
            </ButtonCustom>
            <ButtonCustom
              buttonType="secondary"
              style={{ marginRight: "100px", padding: "23px" }}
              onClick={handleNextPart}
              disabled={currentPartIndex === exercises.parts.length - 1}
            >
              Phần sau
            </ButtonCustom>
            <ButtonCustom
              buttonType="secondary"
              style={{ marginLeft: "23px", padding: "23px" }}
              onClick={handleSubmit}
            >
              Nộp bài
            </ButtonCustom>
          </div>
        </div>
      ) : (
        <>
          <div style={{ paddingLeft: "40px", paddingRight: "30px" }}>
          </div>
          <div style={{ textAlign: "center", paddingTop: "50px" }}>
            <ButtonCustom
              buttonType="secondary"
              style={{ marginRight: "100px", padding: "23px" }}
              onClick={handlePreviousResultPart}
              disabled={currentResultPartIndex === 0}
            >
              Phần trước
            </ButtonCustom>
            <ButtonCustom
              buttonType="secondary"
              style={{
                marginLeft: "23px",
                marginRight: "100px",
                padding: "23px",
              }}
              onClick={handleNextResultPart}
              disabled={currentResultPartIndex === exercises.parts.length - 1}
            >
              Phần sau
            </ButtonCustom>
            <ButtonCustom
              buttonType="secondary"
              style={{
                marginLeft: "23px",
                padding: "23px",
                marginRight: "100px",
              }}
            >
              Làm lại bài tập
            </ButtonCustom>
            <ButtonCustom
              buttonType="secondary"
              style={{ marginLeft: "23px", padding: "23px" }}
            >
              Chuyển sang bài tập tiếp theo
            </ButtonCustom>
          </div>
        </>
      )}
      </TabPane>
      <TabPane tab="Transcripts" key={"transcripts"}>
        {exerciseResults ? exercises.transcript : (<div>Bạn phải hoàn thành bài tập này</div>)}
      </TabPane>
    </Tabs>
      
    </div>
  );
}
