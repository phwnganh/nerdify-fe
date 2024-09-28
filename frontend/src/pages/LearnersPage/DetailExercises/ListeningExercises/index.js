import React, { useEffect, useRef, useState } from "react";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { Col, Row, Tabs } from "antd";
import ButtonCustom from "../../../../components/Button";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { useParams } from "react-router-dom";
import QuestionLayout from "./Question";
import demo1_1 from "../../../../assets/listeningExercises/1_1.png";
import demo1_2 from "../../../../assets/listeningExercises/1_2.png";
import demo1_3 from "../../../../assets/listeningExercises/1_3.png";
import demo2_1 from "../../../../assets/listeningExercises/2_1.png";
import demo2_2 from "../../../../assets/listeningExercises/2_2.png";
import demo2_3 from "../../../../assets/listeningExercises/2_3.png";
import demo3_1 from "../../../../assets/listeningExercises/3_1.png";
import demo3_2 from "../../../../assets/listeningExercises/3_2.png";
import demo3_3 from "../../../../assets/listeningExercises/3_3.png";
import part1_ques1 from "../../../../assets/listeningExercises/teil 1-01.mp3";
import part1_ques2 from "../../../../assets/listeningExercises/teil 1-02.mp3";
import part1_ques3 from "../../../../assets/listeningExercises/teil 1-03.mp3";
import part2_ques7 from "../../../../assets/listeningExercises/teil 2-07.mp3";
import part2_ques8 from "../../../../assets/listeningExercises/teil 2-08.mp3";
import part2_ques9 from "../../../../assets/listeningExercises/teil 2-09.mp3";
import part3_ques11 from "../../../../assets/listeningExercises/teil 3-11.mp3";
import part3_ques12 from "../../../../assets/listeningExercises/teil 3-12.mp3";
import part3_ques13 from "../../../../assets/listeningExercises/teil 3-13.mp3";
import { PART_TYPE } from "../../../../constants";
export default function ListeningExercise() {
  const [exercises, setExercises] = useState(null);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentResultPartIndex, setCurrentResultPartIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [userScore, setUserScore] = useState(0);
  const { exerciseType, exerciseId } = useParams();
  const [partResults, setPartResults] = useState({
    part1: null,
    part2: null,
    part3: null,
  });
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const imagesArr = {
    demo1_1,
    demo1_2,
    demo1_3,
    demo2_1,
    demo2_2,
    demo2_3,
    demo3_1,
    demo3_2,
    demo3_3,
  };

  const audioArr = {
    part1_ques1,
    part1_ques2,
    part1_ques3,
    part2_ques7,
    part2_ques8,
    part3_ques11,
    part3_ques12,
  };
  const { TabPane } = Tabs;

  const videoRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:9999/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          console.log("data listening: ", data[0]);
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

  const handleToggleAnswerDetail = (questionId) => {
    setToggleAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
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

  const renderPart = (currentPart) => {
    return (
      <>
        {currentPart.questions.map((question) => (
          <div key={question.id}>
            <TextCustom style={{ paddingTop: "100px", fontWeight: "bold" }}>
              Câu {question.id}: {question.question}
            </TextCustom>
            <audio controls style={{ marginTop: "20px", width: "100%" }}>
              <source src={audioArr[question.audioUrl]} type="audio/mp3" />
              Trình duyệt của bạn không hỗ trợ phần tử audio.
            </audio>
            <div style={{ marginTop: "20px" }}>
              <Row style={{ textAlign: "center" }}>
                {question.questionImage &&
                  question.questionImage.map((image, index) => (
                    <Col key={index} span={8}>
                      <img src={imagesArr[image]} width={"80%"} style={{ marginBottom: "12px" }} alt={`Question ${question.id}`} />
                    </Col>
                  ))}
              </Row>
              <Row style={{ textAlign: "center", marginTop: "10px" }}>
                {question.options.map((option) => {
                  // const isCorrectOption =
                  //   exerciseResults && option.id === question.correctAnswer;
                  // const isUserSelected =
                  //   option.id === selectedAnswers[question.id];
                  // const backgroundColor = exerciseResults
                  //   ? isCorrectOption
                  //     ? "#5FD855"
                  //     : isUserSelected && !question.isCorrect
                  //     ? "red"
                  //     : ""
                  //   : isUserSelected
                  //   ? "#A8703E"
                  //   : "";
                  return (
                    <Col key={option.id} span={8}>
                      <ButtonCustom
                        buttonType="primary"
                        // onClick={() =>
                        //   exerciseResults
                        //     ? null
                        //     : handleOptionSelect(question.id, option.id)
                        // }
                        // style={{ backgroundColor }}
                        // disabled={!!exerciseResults}
                      >
                        {option.id}. {option.text}
                      </ButtonCustom>
                    </Col>
                  );
                })}
              </Row>
            </div>
            {partResults[`part${currentPartIndex + 1}`] && (
              <>
                <ButtonCustom buttonType="primary" onClick={() => handleToggleAnswerDetail(question.id)}>
                  Đáp án chi tiết
                </ButtonCustom>
                {toggleAnswerDetail[question.id] && <TextCustom style={{ color: "blue" }}>{question.answerDetail}</TextCustom>}
              </>
            )}
          </div>
        ))}
        <Row justify={"end"}>
          {!partResults[`part${currentPartIndex + 1}`] && (
            <ButtonCustom
              buttonType="secondary"
              // onClick={() =>
              //   handleSubmitPart(
              //     `part${currentPartIndex + 1}`,
              //     currentPart.partDetail
              //   )
              // }
            >
              Nộp bài
            </ButtonCustom>
          )}
        </Row>
      </>
    );
  };

  const handleCompleted = () => {};

  if (!exercises?.parts) {
    return <div>Loading...</div>;
  }

  const currentPart = exercises.parts[currentPartIndex];

  console.log("current part: ", currentPart);

  const handleTabChange = (key) => {};

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises.title}
      </TitleCustom>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {/* <video ref={videoRef} width={"100%"} controls>
          <source src={audio} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>

      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="Questions and Answers" key={"questionsAnswers"}>
          {/* {exerciseResults && (
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
          )} */}
          <TextCustom style={{ color: "red", fontWeight: "bold" }}>{currentPart.partName}</TextCustom>
          {currentPart.partType === PART_TYPE.MULTIPLE_CHOICE && renderPart(currentPart, `part${currentPartIndex + 1}`)}
          <div style={{ textAlign: "center", paddingTop: "50px" }}>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px" }} onClick={handlePreviousPart} disabled={currentPartIndex === 0}>
              Phần trước
            </ButtonCustom>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleNextPart} disabled={currentPartIndex === exercises.parts.length - 1}>
              Phần tiếp theo
            </ButtonCustom>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleCompleted}>
              Hoàn thành
            </ButtonCustom>
          </div>
        </TabPane>
        <TabPane tab="Transcripts" key={"transcripts"}>
          {isCompleted ? (
            exercises?.parts?.map((part) => (
              <>
                <TextCustom>{part?.partName}</TextCustom>
                <TextCustom>{part?.transcript}</TextCustom>
              </>
            ))
          ) : (
            <div>Bạn phải hoàn thành bài tập này</div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}
