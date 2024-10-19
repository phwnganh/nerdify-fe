import React, { useCallback, useEffect, useMemo, useState } from "react";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { useParams } from "react-router-dom";
import ButtonCustom from "../../../../components/Button";
import { BASE_SERVER, PART_TYPE } from "../../../../constants";
import demo_part2_6_1 from "../../../../assets/readingExercises/demo_part2_6_1.png";
import demo_part2_6_2 from "../../../../assets/readingExercises/demo_part2_6_2.png";
import demo_part2_7_1 from "../../../../assets/readingExercises/demo_part2_7_1.png";
import demo_part2_7_2 from "../../../../assets/readingExercises/demo_part2_7_2.png";
import demo_part2_8_1 from "../../../../assets/readingExercises/demo_part2_8_1.png";
import demo_part2_8_2 from "../../../../assets/readingExercises/demo_part2_8_2.png";
import demo_part2_9_1 from "../../../../assets/readingExercises/demo_part2_9_1.png";
import demo_part2_9_2 from "../../../../assets/readingExercises/demo_part2_9_2.png";
import demo_part2_10_1 from "../../../../assets/readingExercises/demo_part2_10_1.png";
import demo_part2_10_2 from "../../../../assets/readingExercises/demo_part2_10_2.png";

import demo_part3_1 from "../../../../assets/readingExercises/demo_part3_1.png";
import demo_part3_2 from "../../../../assets/readingExercises/demo_part3_2.png";
import demo_part3_3 from "../../../../assets/readingExercises/demo_part3_3.png";
import demo_part3_4 from "../../../../assets/readingExercises/demo_part3_4.png";
import demo_part3_5 from "../../../../assets/readingExercises/demo_part3_5.png";

//A2 exercises
import { Col, Row } from "antd";

const imgReadingArr = {
  demo_part2_6_1,
  demo_part2_6_2,
  demo_part2_7_1,
  demo_part2_7_2,
  demo_part2_8_1,
  demo_part2_8_2,
  demo_part2_9_1,
  demo_part2_9_2,
  demo_part2_10_1,
  demo_part2_10_2,
  demo_part3_1,
  demo_part3_2,
  demo_part3_3,
  demo_part3_4,
  demo_part3_5,
};

export default function ReadingExercises() {
  const { exerciseType, exerciseId } = useParams();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [exerciseResults, setExerciseResults] = useState({});
  const [exercises, setExercises] = useState(null);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState({});
  const [userScore, setUserScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    fetch(`${BASE_SERVER}/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setExercises(data[0]);
        }
      })
      .catch((err) => console.error("error", err));
  }, [exerciseType, exerciseId]);

  const handleSelectOptions = useCallback((questionId, optionId) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  }, []);

  //function toggle answer detail/explanation
  const handleToggleAnswerDetail = useCallback((questionId) => {
    setToggleAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  }, []);

  //function hien thi cau hoi va ket qua sau khi nop bai
  const renderPart = (currentPart) => {
    return (
      <>
        {currentPart?.questionParagraph && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                backgroundColor: "#f9fafb",
                padding: "20px",
                borderRadius: "10px",
                margin: "20px 0 20px 0",
                width: "fit-content",
              }}
            >
              {currentPart?.questionParagraph.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {currentPart.questions.map((question) => (
          <div key={question.id} style={{ marginBottom: "30px" }}>
            {/* Display the question label */}
            <TextCustom style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Câu {question.id}: {question.question}
            </TextCustom>

            {/* Display images if present */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
              {Array.isArray(question.questionImage) && question.questionImage.length > 0 ? (
                question.questionImage.map((image, index) => {
                  const option = question.options[index];
                  const userSelected = userAnswers[question.id] === option?.id;
                  const correctAnswer = question?.answer;
                  const isCorrect = option?.id === correctAnswer;
                  const isUserSelectedWrong = userSelected && !isCorrect;

                  // Determine button background color based on user selection and correctness
                  let backgroundColor = userSelected ? "#A8703E" : "";
                  if (isCompleted) {
                    if (isCorrect) {
                      backgroundColor = "#5FD855";
                    } else if (isUserSelectedWrong) {
                      backgroundColor = "red";
                    }
                  }

                  return (
                    <div
                      key={index}
                      style={{
                        textAlign: "center",
                        margin: "10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img src={imgReadingArr[image]} style={{ padding: "10px" }} alt="question-part" />
                      {/* Display answer button below the image */}
                      <ButtonCustom
                        key={`button-${index}`}
                        buttonType="primary"
                        onClick={() => handleSelectOptions(question.id, option?.id)}
                        style={{ marginTop: "10px", backgroundColor }}
                        disabled={isCompleted}
                      >
                        {option?.text}
                      </ButtonCustom>
                    </div>
                  );
                })
              ) : (
                // If no image is present, render answer buttons in a row layout
                <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
                  {question.options.map((option, index) => {
                    const userSelected = userAnswers[question.id] === option.id;
                    const correctAnswer = question?.answer;
                    const isCorrect = option.id === correctAnswer;
                    const isUserSelectedWrong = userSelected && !isCorrect;

                    // Determine button background color based on user selection and correctness
                    let backgroundColor = userSelected ? "#A8703E" : "";
                    if (isCompleted) {
                      if (isCorrect) {
                        backgroundColor = "#5FD855";
                      } else if (isUserSelectedWrong) {
                        backgroundColor = "red";
                      }
                    }

                    return (
                      <div>
                        <ButtonCustom
                          key={`button-no-image-${index}`}
                          buttonType="primary"
                          onClick={() => handleSelectOptions(question.id, option.id)}
                          style={{ marginTop: "10px", width: "200px", marginRight: "180px", backgroundColor }}
                          disabled={isCompleted}
                        >
                          {option.text}
                        </ButtonCustom>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Show detailed answers after submission */}
            {isCompleted && (
              <div style={{ padding: "20px" }}>
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
        ))}
      </>
    );
  };

  const handleRetry = useCallback(() => {
    setUserAnswers({});
    setExerciseResults({});
    setUserScore(0);
    setIsCompleted(false);
    setCurrentPartIndex(0);
  }, []);

  const totalQuestions = useMemo(() => exercises?.parts.reduce((acc, part) => acc + part.questions.length, 0), [exercises]);

  const handleSubmit = useCallback(() => {
    let score = 0;
    const submissionDate = new Date().toISOString();
    const partResultsData = {};
    const submissionAnswers = exercises?.parts.flatMap((part, index) =>
      part?.questions?.map((question) => {
        const userAnswer = userAnswers[question.id];
        const correctAnswer = question?.answer;

        const isCorrect = userAnswer === correctAnswer;
        if (!partResultsData[`part${index + 1}`]) {
          partResultsData[`part${index + 1}`] = [];
        }
        partResultsData[`part${index + 1}`].push({
          questionId: question.id,
          userAnswer,
          correctAnswer,
          isCorrect,
        });
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
    setUserScore(markValue);
    setIsCompleted(true);
    setExerciseResults(partResultsData);
    const submissionData = {
      submissionDate: submissionDate,
      score: `${markValue}%`,
      submissionAnswers: submissionAnswers,
      exerciseId: exercises?.id,
      isCompleted: true,
    };

    fetch(`${BASE_SERVER}/exercises/${exercises?.id}`, {
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

    fetch(`${BASE_SERVER}/exercisesSubmission`, {
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
  }, [userAnswers, totalQuestions, exercises]);

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
        {/* part name  */}
        <TextCustom style={{ color: "red", fontWeight: "bold" }}>{currentPart.partName}</TextCustom>
        {/* content  */}
        {currentPart.partType === PART_TYPE.MULTIPLE_CHOICE && renderPart(currentPart, `part${currentPartIndex + 1}`)}
        {/* button control */}
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
              <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleSubmit} disabled={!(currentPartIndex === exercises.parts.length - 1)}>
                Nộp bài
              </ButtonCustom>
            </>
          )}
        </div>
      </div>
    </div>
  );
}