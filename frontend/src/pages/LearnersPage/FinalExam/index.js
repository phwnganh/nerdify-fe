import React, { useEffect, useState } from "react";
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
import { getExerciseDetail, getFinalExamDetailByCourseId } from "../../../services/LearnerService";
export default function FinalExam() {
  const [hasStarted, setHasStarted] = useState(false);
  const [exam, setExam] = useState([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [userAnswers, setUserAnswers] = useState({});
  const [userScore, setUserScore] = useState(0);
  const [mark, setMark] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
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
    getExerciseDetail(examId).then(res => {
      console.log("exam id: ", res.data);
      
      setExam(res.data)
    }
      
    ).catch(err => {
      console.log(err);
    })
  }, [examId])

  useEffect(() => {
    if (isCompleted) return;
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

  if (!exam?.parts) {
    return <div>Loading...</div>;
  }

  const handleSelectOptions = (questionId, optionId) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: optionId,
    });
  };

  const totalQuestions = exam.parts.reduce((acc, part) => acc + part.questions.length, 0);

  const renderAllParts = (part) => {
    return (
      <div>
        {part?.paragraph && (
          <ParagraphCustom>
            {part.paragraph.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </ParagraphCustom>
        )}
  
        {part.questions.map((question, index) => {
          // Lấy answerOption.text từ câu hỏi nếu tồn tại
          const correctAnswer = question.answers?.answerOption?.text;
  
          return (
            <div key={question._id}>
              <TextCustom style={{ paddingTop: "20px", fontWeight: "bold" }}>
                Câu {index + 1}: {question.question}
              </TextCustom>
  
              {question?.mediaUrl && (
                <audio controls style={{ marginTop: "20px", width: "100%" }}>
                  <source src={audioArr[question?.mediaUrl]} type="audio/mp3" />
                  Trình duyệt của bạn không hỗ trợ phần tử audio.
                </audio>
              )}
  
              <div style={{ marginTop: "20px" }}>
                <Row gutter={[16, 16]} style={{ textAlign: "center" }}>
                  {question.options.map((option, optionIndex) => {
                    const userAnswer = userAnswers[question._id] === option._id;
                    const isCorrect = option._id === correctAnswer;
                    const isUserSelectedWrong = userAnswer && !isCorrect;
  
                    let backgroundColor = userAnswer ? "#A8703E" : ""; // màu nền khi người dùng chọn
                    if (isCompleted) {
                      if (isCorrect) {
                        backgroundColor = "#5FD855"; // màu nền cho câu trả lời đúng
                      } else if (isUserSelectedWrong) {
                        backgroundColor = "red"; // màu nền cho câu trả lời sai
                      }
                    }
  
                    return (
                      <Col key={optionIndex} span={8}>
                        <ButtonCustom
                          buttonType="primary"
                          onClick={() => handleSelectOptions(question._id, option._id)}
                          style={{
                            backgroundColor,
                          }}
                          disabled={!!isCompleted}
                        >
                          {option.optionImage ? (
                            <span>{option.text}</span>
                          ) : (
                            <div>
                              <span>{option.text}</span>
                            </div>
                          )}
                        </ButtonCustom>
                      </Col>
                    );
                  })}
                </Row>
  
                {question.options.some((option) => option.optionImage) && (
                  <Row gutter={[16, 16]} style={{ marginTop: "20px", textAlign: "center" }}>
                    {question.options
                      .filter((option) => option.optionImage)
                      .map((option, optionIndex) => (
                        <Col key={optionIndex} span={8}>
                          <img src={imgArrVocab[optionIndex]} style={{ width: "50%" }} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  

  const handleRetry = () => {
    setUserAnswers({});
    setUserScore(0);
    setIsCompleted(false);
    setCurrentPartIndex(0);
    setTimeLeft(20 * 60);
  };

  const handleSubmit = () => {
    let score = 0;

    const submissionDate = new Date().toISOString();
    const questionsArray = exam?.parts.flatMap((part) =>
      part.questions.map((question) => {
        const userAnswer = userAnswers[question.id];
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;
        if (isCorrect) {
          score++;
        }

        return {
          questionId: question.id,
          userAnswer,
          correctAnswer,
          isCorrect,
        };
      }),
    );

    const conditionStatus = score >= 12 ? "passed" : "not pass";
    const markValue = Math.round((score / totalQuestions) * 100);
    setMark(markValue);
    setIsCompleted(true);

    const submissionData = {
      submissionDate: submissionDate,
      score: `${markValue}%`,
      submissionAnswers: questionsArray,
      conditionStatus: conditionStatus,
      isCompleted: true,
      examId: exam.id,
    };

    fetch(`${BASE_SERVER}/finalExamSubmission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
      .then((res) => res.json())
      .then((data) => console.log("final exam: ", data));
    setUserScore(score);
    clearInterval(window.timer);
  };

  const handleAchieveTrophy = () => {
    navigate(CLIENT_URI.TROPHY, {
      state: { trophy: exam?.trophy, title: exam?.title },
    });
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
            {isCompleted && (
              <div style={{ textAlign: "center" }}>
                <TextCustom style={{ textAlign: "center" }}>
                  Điểm:&nbsp;
                  <span style={{ color: "red" }}>{mark}%</span>
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
              {!isCompleted ? (
                <ButtonCustom buttonType="secondary" style={{ padding: "23px" }} disabled={!(currentPartIndex === exam.parts.length - 1)} onClick={handleSubmit}>
                  Nộp bài
                </ButtonCustom>
              ) : (
                <>
                  {mark < 60 ? (
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
