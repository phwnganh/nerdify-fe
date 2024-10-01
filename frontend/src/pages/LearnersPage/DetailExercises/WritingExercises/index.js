import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import ButtonCustom from "../../../../components/Button";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import CardCustom from "../../../../components/Card";
import InputCustom from "../../../../components/Input";
import { Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../../constants/uri.constants";
import { PART_TYPE } from "../../../../constants";

export default function WritingExercises() {
  const [exercise, setExercise] = useState(null);
  const { exerciseType, exerciseId } = useParams();
  const [userAnswers, setUserAnswers] = useState({});
  const [answerStatus, setAnswerStatus] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9999/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setExercise(data[0]);
        }
      })
      .catch((err) => console.error("error", err));
  }, [exerciseType, exerciseId]);

  if (!exercise?.parts) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (partId, answerId, value) => {
    console.log("Part ID:", partId, "Answer ID:", answerId, "Value:", value);
    setUserAnswers({
      ...userAnswers,
      [partId]: {
        ...userAnswers[partId],
        [answerId]: value,
      },
    });
  };

  const handleToggleAnswerDetail = (questionId) => {
    setToggleAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  const renderPart1 = (part) => {
    return (
      <div style={{ marginTop: "20px" }}>
        <CardCustom>
          <Row gutter={[16, 16]}>
            <Col span={9}>
              <TextCustom>{part.paragraph}</TextCustom>
            </Col>

            <Col span={15}>
              {part?.questions?.map((question, index) => (
                <>
                  <div style={{ paddingBottom: "5px", marginTop: "10px" }} key={question.id}>
                    <InputCustom
                      key={question.id}
                      style={{
                        marginBottom: "10px",
                        borderColor: isCompleted && answerStatus[question.id] === "correct" ? "#5FD855" : isCompleted && answerStatus[question.id] === "incorrect" ? "red" : "",
                      }}
                      placeholder={`Điền lỗi thứ ${index + 1} tại đây`}
                      autoSize={{ minRows: 1, maxRows: 5 }}
                      value={userAnswers[part.id]?.[question.id] || ""}
                      onChange={(e) => handleInputChange(part.id, question.id, e.target.value)}
                      disabled={isCompleted}
                    />
                  </div>
                  {isCompleted && (
                    <>
                      <TextCustom style={{ color: "red" }}>{question.answer}</TextCustom>
                    </>
                  )}
                  {isCompleted && (
                    <div style={{ paddingTop: "20px" }}>
                      <ButtonCustom buttonType="primary" onClick={() => handleToggleAnswerDetail(question.id)}>
                        Đáp án chi tiết
                      </ButtonCustom>
                      {toggleAnswerDetail[question.id] && (
                        <div>
                          <TextCustom style={{ color: "blue" }}>
                            {question?.explanation.split("\n").map((line, index) => (
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
                </>
              ))}
            </Col>
          </Row>
        </CardCustom>
      </div>
    );
  };

  const renderPart2 = (part) => {
    return (
      <Input.TextArea
        placeholder="Viết lại thành đoạn văn hoàn chỉnh"
        autoSize={{ minRows: 10, maxRows: 15 }}
        style={{
          marginTop: "16px",
          borderColor: isCompleted && answerStatus[`paragraph_${part.id}`] === "correct" ? "#5FD855" : isCompleted && answerStatus[`paragraph_${part.id}`] === "incorrect" ? "red" : "",
        }}
        value={userAnswers[`paragraph_${part.id}`]?.[0] || ""}
        disabled={isCompleted}
        onChange={(e) => handleInputChange(`paragraph_${part.id}`, 0, e.target.value)}
      ></Input.TextArea>
    );
  };
  const handleSubmit = () => {
    const submissionDate = new Date().toISOString();
    let correctCount = 0;
    const totalQuestions = 4;
    const newAnswerStatus = {};
    const questionsArray = [];
    exercise.parts.forEach((part) => {
      if (part.partType === PART_TYPE.FILL_IN_THE_BLANK) {
        part.questions.forEach((question) => {
          const userAnswer = userAnswers[part.id]?.[question.id]?.trim() || "";
          const correctAnswer = question.answer.trim();
          const isCorrect = userAnswer === correctAnswer;
          newAnswerStatus[question.id] = isCorrect ? "correct" : "incorrect";
          if (isCorrect) {
            console.log("new answer status: ", newAnswerStatus);

            correctCount++;
          }

          questionsArray.push({
            questionId: question.id,
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            isCorrect,
          });
        });
      } else if (part.partType === PART_TYPE.WRITE_PARAGRAPH) {
        const userAnswer = userAnswers[`paragraph_${part.id}`]?.[0]?.trim() || "";
        const correctAnswer = part.answer.trim();
        const isCorrect = userAnswer === correctAnswer;
        newAnswerStatus[`paragraph_${part.id}`] = isCorrect ? "correct" : "incorrect";
        if (isCorrect) {
          console.log("new answer status 2: ", newAnswerStatus);

          correctCount++;
        }
        questionsArray.push({
          questionId: `paragraph_${part.id}`,
          userAnswer: userAnswer,
          correctAnswer: correctAnswer,
          isCorrect,
        });
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    setAnswerStatus(newAnswerStatus);
    setUserScore(score);
    setIsCompleted(true);

    const submissionData = {
      submissionDate,
      score: `${score}%`,
      submissionAnswers: questionsArray,
      isCompleted: true,
      exerciseId,
    };

    fetch(`http://localhost:9999/exercises/${exercise?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: true,
        score: `${score}%`,
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
        console.log("writing submission: ", data);
      })
      .catch((err) => console.log(err));
  };

  const handleRetry = () => {
    setUserAnswers({});
    setAnswerStatus({});
    setIsCompleted(false);
    setUserScore(0);
  };

  return (
    <div style={{ padding: "30px", marginLeft: "70px", marginRight: "70px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercise?.title}
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
        {exercise.parts?.map((part, index) => (
          <>
            <TextCustom style={{ color: "red", fontWeight: "bold", paddingTop: "16px" }}>{part.partName}</TextCustom>
            {part.partType === PART_TYPE.FILL_IN_THE_BLANK && renderPart1(part)}
            {part.partType === PART_TYPE.WRITE_PARAGRAPH && renderPart2(part)}
          </>
        ))}
      </div>
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        {!isCompleted && (
          <ButtonCustom buttonType="secondary" onClick={handleSubmit} style={{ marginRight: "100px", padding: "23px" }} disabled={!!isCompleted}>
            Nộp bài
          </ButtonCustom>
        )}
        {isCompleted && (
          <>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleRetry}>
              Làm lại bài tập này
            </ButtonCustom>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={() => navigate(CLIENT_URI.LEVEL_DETAIL)}>
              Chuyển sang bài tập tiếp theo
            </ButtonCustom>
          </>
        )}
      </div>
    </div>
  );
}
