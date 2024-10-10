import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { ParagraphCustom, TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";
import { CLIENT_URI } from "../../../../constants";

// Import images
import demo_1_1 from "../../../../assets/vocabExercises/1_1.png";
import demo_1_2 from "../../../../assets/vocabExercises/1_2.png";
import demo_1_3 from "../../../../assets/vocabExercises/1_3.png";
import demo_2_1 from "../../../../assets/vocabExercises/2_1.png";
import demo_2_2 from "../../../../assets/vocabExercises/2_2.png";
import demo_2_3 from "../../../../assets/vocabExercises/2_3.png";
// a2

import part2_ques7 from "../../../../assets/listeningExercises/teil 2-07.mp3";
import part2_ques8 from "../../../../assets/listeningExercises/teil 2-08.mp3";
import part2_ques9 from "../../../../assets/listeningExercises/teil 2-09.mp3";
import part2_ques10 from "../../../../assets/listeningExercises/teil 2-10.mp3";

// audio a2
import part2_ques7_2 from "../../../../assets/listeningExercises/02- teil 2-07.mp3";
import part2_ques8_2 from "../../../../assets/listeningExercises/02- teil 2-08.mp3";
import part2_ques9_2 from "../../../../assets/listeningExercises/02- teil 2-09.mp3";
import part2_ques10_2 from "../../../../assets/listeningExercises/02- teil 2-10.mp3";
import { StartQuizModal } from "../../LevelDetailPage";

export default function ReadingExercises() {
  const { exerciseType, exerciseId } = useParams();
  const navigate = useNavigate();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [exercises, setExercises] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [userAnswers, setUserAnswers] = useState({});
  const [userScore, setUserScore] = useState(-1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState({});
  const [conditionStatus, setConditionStatus] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const imgArrVocab = [demo_1_1, demo_1_2, demo_1_3, demo_2_1, demo_2_2, demo_2_3];
  const audioArr = {
    part2_ques7,
    part2_ques8,
    part2_ques9,
    part2_ques10,
    part2_ques7_2,
    part2_ques8_2,
    part2_ques9_2,
    part2_ques10_2,
  };

  useEffect(() => {
    if (!hasStarted) {
      fetch(`http://localhost:9999/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setExercises(data[0]);
          }
        })
        .catch((err) => console.error("error", err));
    }
  }, [exerciseType, exerciseId, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
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
  }, [timeLeft, isCompleted, hasStarted]);

  const handleSelectOptions = useCallback((questionId, optionId) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  }, []);

  // const handleStart = () => {
  //   setHasStarted(true);
  // };

  const formattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const totalQuestions = useMemo(() => exercises?.parts.reduce((acc, part) => acc + part.questions.length, 0), [exercises]);

  const handleSubmit = useCallback(() => {
    let score = 0;
    const submissionDate = new Date().toISOString();
    const questionsArray = exercises?.parts.flatMap((part) =>
      part.questions.map((question) => {
        const userAnswer = userAnswers[question.id];
        const correctAnswer = question?.answer;
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

    const markValue = Math.round((score / totalQuestions) * 100);
    const newConditionStatus = markValue >= 50 ? "passed" : "not pass";
    setConditionStatus(newConditionStatus);
    setUserScore(markValue);
    setIsCompleted(true);

    const submissionData = {
      submissionDate: submissionDate,
      score: `${markValue}%`,
      submissionAnswers: questionsArray,
      conditionStatus: newConditionStatus,
      exerciseId: exercises.id,
      isCompleted: true,
    };

    fetch(`http://localhost:9999/exercises/${exercises.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: true,
        score: `${markValue}%`,
        conditionStatus: newConditionStatus,
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
        console.log("data: ", data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [exercises, userAnswers, totalQuestions]);

  const handleRetry = useCallback(() => {
    setUserAnswers({});
    setUserScore(-1);
    setIsCompleted(false);
    setCurrentPartIndex(0);
    setTimeLeft(15 * 60);
    setConditionStatus("");
  }, []);

  const renderPart = (part) => (
    <>
      {part.questions.map((question) => (
        <div key={question.id}>
          <TextCustom style={{ paddingTop: "20px", fontWeight: "bold" }}>
            Câu {question.id}: {question.question}
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
          {question?.audioUrl && (
            <audio controls style={{ marginTop: "20px", width: "100%" }}>
              <source src={audioArr[question?.audioUrl]} type="audio/mp3" />
              Trình duyệt của bạn không hỗ trợ phần tử audio.
            </audio>
          )}
          <div style={{ marginTop: "20px" }}>
            <Row gutter={[16, 16]} style={{ textAlign: "center" }}>
              {question.options.map((option, index) => {
                const userSelected = userAnswers[question.id] === option.id;
                const correctAnswer = question?.answer;
                const isCorrect = option.id === correctAnswer;
                const isUserSelectedWrong = userSelected && !isCorrect;

                let backgroundColor = userSelected ? "#A8703E" : "";

                if (isCompleted) {
                  if (isCorrect) {
                    backgroundColor = "#5FD855";
                  } else if (isUserSelectedWrong) {
                    backgroundColor = "red";
                  }
                }

                return (
                  <Col key={index} span={8}>
                    <ButtonCustom
                      buttonType="primary"
                      onClick={() => handleSelectOptions(question.id, option.id)}
                      style={{
                        backgroundColor,
                      }}
                      disabled={isCompleted}
                    >
                      {option.optionImage ? (
                        <span>{option.id}</span>
                      ) : (
                        <div>
                          <span>{Array.isArray(option.text) ? `${option.id}. ${option.text.join(" - ")}` : `${option.id}. ${option.text}`}</span>
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
                  .map((option, index) => (
                    <Col key={index} span={8}>
                      <img src={imgArrVocab[index]} style={{ width: "50%" }} alt={`Option ${option.id}`} />
                    </Col>
                  ))}
              </Row>
            )}
          </div>
        </div>
      ))}
    </>
  );

  if (!exercises?.parts) {
    return <div>Loading...</div>;
  }

  const currentPart = exercises.parts[currentPartIndex];

  return (
    <div>
      {!hasStarted && <StartQuizModal exerciseId={exerciseId} onClose={() => setHasStarted(!hasStarted)}></StartQuizModal>}
      {hasStarted && (
        <div style={{ padding: "24px" }}>
          <BreadCrumbHome />
          <TitleCustom level={2} style={{ fontWeight: "bold" }}>
            {exercises.title}
          </TitleCustom>
          <div style={{ textAlign: "center" }}>
            {!isCompleted ? (
              <TextCustom>
                Thời gian làm bài: <span style={{ color: "red", fontWeight: "bold" }}>{formattedTime(timeLeft)}</span>
              </TextCustom>
            ) : (
              <>
                <TextCustom>
                  Điểm: <span style={{ color: "red" }}>{userScore}%</span>
                </TextCustom>
                {/* <TextCustom>
              Kết quả: <span style={{ color: conditionStatus === "passed" ? "green" : "red" }}>
                {conditionStatus === "passed" ? "Đạt" : "Không đạt"}
              </span>
            </TextCustom> */}
              </>
            )}
          </div>

          <div>
            <TextCustom style={{ color: "red", fontWeight: "bold", paddingTop: "20px" }}>{currentPart.partName}</TextCustom>
            {renderPart(currentPart)}
            <div style={{ textAlign: "center", paddingTop: "50px" }}>
              <ButtonCustom buttonType="secondary" style={{ padding: "23px" }} onClick={() => setCurrentPartIndex((prev) => prev - 1)} disabled={currentPartIndex === 0}>
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
                  {conditionStatus === "not pass" ? (
                    <>
                      <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleRetry}>
                        Làm lại bài tập này
                      </ButtonCustom>
                      <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={() => navigate(-1)}>
                        Quay về luyện tập
                      </ButtonCustom>
                    </>
                  ) : (
                    <ButtonCustom
                      buttonType="secondary"
                      style={{ padding: "23px", marginLeft: "30px" }}
                      // onClick={handleAchieveTrophy}
                    >
                      Chuyển sang phase tiếp theo
                    </ButtonCustom>
                  )}
                </>
              ) : (
                <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleSubmit} disabled={!(currentPartIndex === exercises.parts.length - 1)}>
                  Nộp bài
                </ButtonCustom>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
