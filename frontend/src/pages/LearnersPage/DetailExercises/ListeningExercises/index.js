import React, { useEffect, useRef, useState } from "react";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { Col, Row, Tabs } from "antd";
import ButtonCustom from "../../../../components/Button";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { useParams } from "react-router-dom";
import QuestionLayout from "./Question";
import audio from "../../../../assets/listeningExercises/sd1_modellsatz_01.mp4";
export default function ListeningExercise() {
  const [exercises, setExercises] = useState(null);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentResultPartIndex, setCurrentResultPartIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [userScore, setUserScore] = useState(-1);
  const [exerciseResults, setExerciseResults] = useState(null);
  const { exerciseType, exerciseId } = useParams();
  const [mark, setMark] = useState(0);
  const { TabPane } = Tabs;

  const videoRef = useRef(null);

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

  const totalQuestions = exercises?.parts.reduce(
    (acc, part) => acc + part.questions.length,
    0
  );
  // const handleSubmit = () => {
  //   let score = 0;
  //   const submissionDate = new Date().toISOString();
  //   const questionsArray = exercises?.parts.flatMap((part) =>
  //     part.questions.map((question) => {
  //       const userAnswer = selectedAnswers[question.id];
  //       const correctAnswer = question?.answer;
  //       const isCorrect = userAnswer === correctAnswer;
  //       if (isCorrect) {
  //         score++;
  //       }
  //       return {
  //         questionId: question.id,
  //         userAnswer,
  //         correctAnswer,
  //         isCorrect,
  //       };
  //     })
  //   );
  //   const markValue = ((score / totalQuestions) * 100).toFixed(2);
  //   setMark(markValue);
  //   const submissionData = {
  //     submissionDate: submissionDate,
  //     score: `${markValue}%`,
  //     submissionAnswers: questionsArray,
  //     exerciseId: exercises.id,
  //   };
  //   fetch("http://localhost:9999/listeningExercisesSubmission", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(submissionData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("lis data: ", data))
  //     .catch((err) => console.log(err));

  //   const results = exercises.parts.map((part) => {
  //     return {
  //       ...part,
  //       questions: part.questions.map((question) => {
  //         const userAnswer = selectedAnswers[question.id];
  //         const answerDetail = question?.answerDetail;
  //         const correctAnswer = question?.answer;
  //         const isCorrect = userAnswer === correctAnswer;
  //         return {
  //           ...question,
  //           userAnswer,
  //           correctAnswer,
  //           isCorrect,
  //           answerDetail,
  //         };
  //       }),
  //     };
  //   });
  //   setExerciseResults(results);
  //   setUserScore(score);
  // };

  const handleSubmit = () => {
    
  }

  if (!exercises?.parts) {
    return <div>Loading...</div>;
  }

  const currentPart = exercises.parts[currentPartIndex];
  const currentResultPart = exerciseResults?.[currentResultPartIndex];

  const handleTabChange = (key) => {};

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises.title}
      </TitleCustom>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <video ref={videoRef} width={"100%"} controls>
          <source src={audio} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

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
                  style={{
                    color: "red",
                    marginLeft: "10px",
                    fontWeight: "bold",
                  }}
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
              <div style={{ paddingLeft: "40px", paddingRight: "30px" }}></div>
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
                  disabled={
                    currentResultPartIndex === exercises.parts.length - 1
                  }
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
          {exerciseResults ? (
            exercises.transcript
          ) : (
            <div>Bạn phải hoàn thành bài tập này</div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}
