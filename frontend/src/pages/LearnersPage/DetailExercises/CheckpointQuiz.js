import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
import { ParagraphCustom, TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";

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
import { StartQuizModal } from "../LevelDetailPage/LevelDetailPage";
import { submitExercise } from "../../../services/LearnerService";

export default function CheckpointQuiz({ exercises }) {
  const navigate = useNavigate();
  
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [userSelected, setUserSelected] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

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
    if (!hasStarted) return;
    if (isSubmitted) return;
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
  }, [timeLeft, isSubmitted, hasStarted]);

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
  // const handleSelectOptions = useCallback(
  //   (questionId, optionId) => {
  //     if (!isSubmitted) {
  //       const foundQuestion = userSelected.some((selected) => selected.questionId === questionId);
  //       if (foundQuestion) {
  //         const newSelected = userSelected.map((userAnswers) => {
  //           if (userAnswers.questionId === questionId) {
  //             return {
  //               ...userAnswers,
  //               userAnswer: optionId,
  //             };
  //           }
  //           return userAnswers;
  //         });
  //         setUserSelected(newSelected);
  //       } else {
  //         setUserSelected((prev) => [
  //           ...prev,
  //           {
  //             questionId,
  //             userAnswer: optionId,
  //           },
  //         ]);
  //       }
  //     }
  //   },
  //   [isSubmitted, userSelected],
  // );

  const formattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSubmit = useCallback(() => {
    submitExercise({
      exerciseId: exercises._id,
      userSelected,
    }).then(
      (resp) => {
        setSubmissionData(resp.data);
        setIsSubmitted(true);
        submitExercise({
          exerciseId: exercises._id,
          userSelected,
        })
          .then((resp) => {
            setSubmissionData(resp.data);
            setIsSubmitted(true);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      [exercises, userSelected],
    );
  });

    const handleRetry =
      (() => {
        setUserSelected([]);
        setIsSubmitted(false);
        setUserSelected([]);
        setIsSubmitted(false);
        setCurrentPartIndex(0);
        setTimeLeft(15 * 60);
      },
      []);
    const renderPart = (part) => {
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
                  <source src={question?.mediaUrl} type="audio/mp3" />
                  Trình duyệt của bạn không hỗ trợ phần tử audio.
                </audio>
              )}
              <div style={{ marginTop: "20px" }}>
                <Row gutter={[16, 16]} style={{ textAlign: "center" }}>
                  {question.options.map((option, index) => {
                    const isUserSelected = userSelected.some((selected) => selected.questionId === question._id && selected.userAnswer === option._id);
                    let backgroundColor = isUserSelected ? "#A8703E" : "";

                    if (isSubmitted && submissionData.score >= 50) {
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
                          {option.optionImage ? (
                            <span>{index + 1}</span>
                          ) : (
                            <div>
                              <span>{Array.isArray(option.text) ? `${index + 1}. ${option.text.join(" - ")}` : `${option.text}`}</span>
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
                          <img src={option.optionImage} style={{ width: "50%" }} alt={`Option ${option._id}`} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    };

    if (!exercises?.parts) {
      return <div>Loading...</div>;
    }

    const currentPart = exercises.parts[currentPartIndex];

    
    return (
      <div>
        {!hasStarted && <StartQuizModal exerciseId={exercises._id} onClose={() => setHasStarted(!hasStarted)}></StartQuizModal>}
        {hasStarted && (
          <div style={{ padding: "24px" }}>
            <BreadCrumbHome />
            <TitleCustom level={2} style={{ fontWeight: "bold" }}>
              {exercises.title}
            </TitleCustom>
            <div style={{ textAlign: "center" }}>
              {!isSubmitted ? (
                <TextCustom>
                  Thời gian làm bài: <span style={{ color: "red", fontWeight: "bold" }}>{formattedTime(timeLeft)}</span>
                </TextCustom>
              ) : (
                <>
                  <TextCustom>
                    Điểm: <span style={{ color: "red" }}>{submissionData.score}%</span>
                  </TextCustom>
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
                {isSubmitted ? (
                  <>
                    {submissionData.score < 50 ? (
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
