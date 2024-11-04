import React, { useCallback, useEffect, useState } from "react";
import StartExamModal from "./ModalBeforeDoingExam";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
import { ParagraphCustom, TextCustom, TitleCustom } from "../../../components/Typography";
import { Col, Row } from "antd";
import ButtonCustom from "../../../components/Button";
import demo_1_1 from "../../../assets/vocabExercises/1_1.png";
import demo_1_2 from "../../../assets/vocabExercises/1_2.png";
import demo_1_3 from "../../../assets/vocabExercises/1_3.png";
import demo_2_1 from "../../../assets/vocabExercises/2_1.png";
import demo_2_2 from "../../../assets/vocabExercises/2_2.png";
import demo_2_3 from "../../../assets/vocabExercises/2_3.png";

import part2_ques7 from "../../../assets/listeningExercises/teil 2-07.mp3";

import { BASE_SERVER, CLIENT_URI, PART_TYPE } from "../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { getExerciseDetail, getFinalExamDetailByCourseId, getPhaseDetail, submitFinalExam } from "../../../services/LearnerService";
export default function FinalExam() {
  const [hasStarted, setHasStarted] = useState(false);
  const [exam, setExam] = useState([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [userAnswers, setUserAnswers] = useState({});
  const [userScore, setUserScore] = useState(0);
  const [mark, setMark] = useState(0);
  const [userSelected, setUserSelected] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const navigate = useNavigate();
  const { examId } = useParams();

  const imgArrVocab = [demo_1_1, demo_1_2, demo_1_3, demo_2_1, demo_2_2, demo_2_3];

  const audioArr = {
    part2_ques7,
  };

  const handleStart = () => {
    setHasStarted(true);
  };

  // useEffect(() => {
  //  getFinalExamDetailByCourseId(courseId)
  //     .then((res) => {
  //       setExam(res.data);
  //     })
  //     .catch((err) => console.log("error", err));
  // }, []);

  useEffect(() => {
    if (examId) {
      getPhaseDetail(examId)
        .then((resp) => {
          // console.log(resp);
          setExam(resp.data.exercises[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [examId]);

  useEffect(() => {
    if (isSubmitted) return;
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
  }, [timeLeft, isSubmitted]);

  const formattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleNextPart = () => {
    if (exam && currentPartIndex < exam.parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };

  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // const handleSelectOptions = (questionId, optionId) => {
  //   setUserAnswers({
  //     ...userAnswers,
  //     [questionId]: optionId,
  //   });
  // };

  const handleSelectOptions = useCallback(
    (questionId, optionId) => {
      if (!isSubmitted) {
        const foundQuestion = userSelected.some((selected) => selected.questionId === questionId);
        if (foundQuestion) {
          const newSelected = userSelected.map((userAnswers) => {
            if (userAnswers.questionId === questionId) {
              return {
                ...userAnswers,
                userAnswer: optionId,
              };
            }
            return userAnswers;
          });
          setUserSelected(newSelected);
        } else {
          setUserSelected((prev) => [
            ...prev,
            {
              questionId,
              userAnswer: optionId,
            },
          ]);
        }
      }
    },
    [isSubmitted, userSelected],
  );

  // const totalQuestions = exam.parts.reduce((acc, part) => acc + part.questions.length, 0);
  if (!exam?.parts) {
    return <div>Loading...</div>;
  }
  const renderAllParts = (part) => {
    return (
      <div>
        {part?.paragraph && (
          <ParagraphCustom>
            {part?.paragraph.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </ParagraphCustom>
        )}
        {part.questions.map((question, index) => (
          <div key={index}>
            <TextCustom style={{ paddingTop: "20px", fontWeight: "bold" }}>
              Câu {index + 1}: {question.question}
            </TextCustom>
            {question.questionParagraph && (
              <ParagraphCustom>
                {question?.questionParagraph.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </ParagraphCustom>
            )}
            {question?.mediaUrl && (
              <audio controls style={{ marginTop: "20px", width: "100%" }}>
                <source src={audioArr[question?.mediaUrl]} type="audio/mp3" />
                Trình duyệt của bạn không hỗ trợ phần tử audio.
              </audio>
            )}
            <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "space-between" }}>
              {question?.questionImage &&
                question?.questionImage.map((image, index) => (
                  <div key={index} style={{ flex: "1 1 auto", marginRight: index !== question.questionImage.length - 1 ? "12px" : "0" }}>
                    <img src={imgArrVocab[index]} width="80%" style={{ marginBottom: "12px" }} alt={`Question ${question._id}`} />
                  </div>
                ))}
            </div>

            <div style={{ marginTop: "20px" }}>
              <Row gutter={[16, 16]} style={{ textAlign: "center" }}>
                {question.options.map((option, index) => {
                  const isUserSelected = userSelected.some((selected) => selected.questionId === question._id && selected.userAnswer === option._id);
                  let backgroundColor = isUserSelected ? "#A8703E" : "";

                  if (isSubmitted && submissionData.score >= 60) {
                    const foundQuestion = submissionData.submissionAnswer?.find((answer) => answer.userAnswer == option._id && answer.isCorrect);
                    if (foundQuestion) {
                      backgroundColor = "#5FD855";
                    } else if (isUserSelected) {
                      backgroundColor = "red";
                    }
                  }

                  return (
                    <Col key={index} span={8}>
                      <ButtonCustom
                        buttonType="primary"
                        onClick={() => handleSelectOptions(question._id, option._id)}
                        style={{
                          backgroundColor,
                        }}
                        disabled={isSubmitted}
                      >
                        <div>
                          <span>{Array.isArray(option.text) ? `${index + 1}. ${option.text.join(" - ")}` : `${option.text}`}</span>
                        </div>
                      </ButtonCustom>
                    </Col>
                  );
                })}
              </Row>
              {/* {question.options.some((option) => option.optionImage) && (
                <Row gutter={[16, 16]} style={{ marginTop: "20px", textAlign: "center" }}>
                  {question.options
                    .filter((option) => option.optionImage)
                    .map((option, index) => (
                      <Col key={index} span={8}>
                        <img src={imgArrVocab[index]} style={{ width: "50%" }} alt={`Option ${option._id}`} />
                      </Col>
                    ))}
                </Row>
              )} */}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleRetry = () => {
    setUserSelected([]);
    setUserScore(0);
    setIsSubmitted(false);
    setCurrentPartIndex(0);
    setTimeLeft(20 * 60);
  };

  const handleSubmit = () => {
    submitFinalExam({
      exerciseId: exam._id,
      userSelected,
    })
      .then((res) => {
        setSubmissionData(res.data);
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
    clearInterval(window.timer);
  };

  const handleAchieveTrophy = () => {
    if (submissionData.score >= 60) {
      navigate(CLIENT_URI.TROPHY, {
        state: { examId: examId, title: exam?.title },
      });
    }
  };
  const currentPart = exam.parts?.[currentPartIndex];
  return (
    <div>
      {!hasStarted && <StartExamModal onStart={handleStart}></StartExamModal>}
      {hasStarted && (
        <div style={{ padding: "24px" }}>
          <BreadCrumbHome />
          <TitleCustom level={2} style={{ fontWeight: "bold" }}>
            {exam.title}
          </TitleCustom>
          <div style={{ textAlign: "center" }}>
            <TextCustom>
              Thời gian làm bài: <span style={{ color: "red", fontWeight: "bold" }}>{formattedTime(timeLeft)}</span>
            </TextCustom>
          </div>

          <div>
            <TextCustom style={{ color: "red", fontWeight: "bold", paddingTop: "20px" }}>{currentPart.partName}</TextCustom>
            {isSubmitted && (
              <div style={{ textAlign: "center" }}>
                <TextCustom style={{ textAlign: "center" }}>
                  Điểm:&nbsp;
                  <span style={{ color: "red" }}>{Math.round(submissionData?.score).toFixed(2)}%</span>
                </TextCustom>
              </div>
            )}

            {renderAllParts(currentPart, `part${currentPartIndex + 1}`)}
            <div style={{ textAlign: "center", paddingTop: "50px" }}>
              <ButtonCustom buttonType="secondary" style={{ marginRight: "100px", padding: "23px" }} onClick={handlePreviousPart} disabled={currentPartIndex === 0}>
                Phần trước
              </ButtonCustom>
              <ButtonCustom buttonType="secondary" style={{ marginRight: "100px", padding: "23px" }} onClick={handleNextPart} disabled={currentPartIndex === exam.parts.length - 1}>
                Phần tiếp theo
              </ButtonCustom>
              {!isSubmitted ? (
                <ButtonCustom buttonType="secondary" style={{ padding: "23px" }} disabled={!(currentPartIndex === exam.parts.length - 1)} onClick={handleSubmit}>
                  Nộp bài
                </ButtonCustom>
              ) : (
                <>
                  {submissionData?.score < 60 ? (
                    <>
                      <ButtonCustom buttonType="secondary" style={{ marginRight: "100px", padding: "23px" }} onClick={handleRetry}>
                        Làm lại bài kiểm tra
                      </ButtonCustom>
                      <ButtonCustom buttonType="secondary" style={{ marginRight: "100px", padding: "23px" }} onClick={() => navigate(-1)}>
                        Quay về luyện tập
                      </ButtonCustom>
                    </>
                  ) : (
                    <>
                      <ButtonCustom buttonType="secondary" style={{ marginRight: "100px", padding: "23px" }} onClick={handleAchieveTrophy}>
                        Nhận cúp
                      </ButtonCustom>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}
