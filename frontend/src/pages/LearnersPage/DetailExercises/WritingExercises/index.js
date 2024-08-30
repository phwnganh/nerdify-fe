import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import ButtonCustom from "../../../../components/Button";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import CardCustom from "../../../../components/Card";
import InputCustom from "../../../../components/Input";
import { Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../../constants/uri.constants";

export default function WritingExercises() {
  const [exercise, setExercise] = useState(null);
  const { exerciseType, exerciseId } = useParams();
  const [userAnswers, setUserAnswers] = useState({});
  const [exerciseResults, setExerciseResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `http://localhost:9999/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`
    )
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
    setUserAnswers({
      ...userAnswers,
      [partId]: {
        ...userAnswers[partId],
        [answerId]: value,
      },
    });
  };

  const handleSubmit = () => {
    const submissionDate = new Date().toISOString();
    let correctCount = 0;
    const questionsArray = [];
    exercise.parts.forEach((part) => {
      part.answers?.forEach((correctAnswer) => {
        const userResponse =
          userAnswers[part.id] && userAnswers[part.id][correctAnswer.id];
        const isCorrect = userResponse?.trim() === correctAnswer.answer.trim();
        if (isCorrect) {
          correctCount++;
        }
          questionsArray.push({
            userResponse,
            correctAnswer: correctAnswer.answer,
            isCorrect,
            questionId: correctAnswer.id,
          });

      });
    });

    const score = Math.round((correctCount / questionsArray.length) * 100);

    const submissionData = {
      submissionDate,
      score: `${score}%`,
      submissionAnswers: questionsArray,
      exerciseId,
    };

    fetch("http://localhost:9999/writingExercisesSubmission", {
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

    let results = {};

    exercise.parts.forEach((part) => {
      if (part.answers) {
        results[part.id] = part.answers.map((correctAnswer, index) => {
          const userResponse =
            userAnswers[part.id] && userAnswers[part.id][correctAnswer.id];
          const isCorrect =
            userResponse?.trim() === correctAnswer.answer.trim();
          console.log("useranswer: ", userAnswers[part.id][correctAnswer.id]);
          console.log("is correct: ", isCorrect);

          return {
            ...correctAnswer,
            isCorrect,
          };
        });
      } else if (part.answer) {
        const userAnswer = userAnswers[part.id]?.[0] || "";
        const isCorrect = userAnswer.trim() === part.answer.trim();
        results[part.id] = [{ isCorrect }];
      }
    });

    setExerciseResults(results);
  };

  return (
    <div style={{ padding: "30px", marginLeft: "70px", marginRight: "70px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercise.title}
      </TitleCustom>
      <div>
        {exercise.parts?.map((part, index) => (
          <>
            <TextCustom
              style={{ color: "red", fontWeight: "bold", paddingTop: "16px" }}
            >
              {part.partName} {part.error}
            </TextCustom>
            {part.paragraph ? (
              <div style={{ marginTop: "20px" }}>
                <CardCustom>
                  <Row gutter={[16, 16]}>
                    <Col span={9}>
                      <TextCustom>{part.paragraph}</TextCustom>
                    </Col>
                    <Col span={15}>
                      {part.answers?.map((answer, index) => (
                        <div key={answer.id} style={{ marginBottom: "20px" }}>
                          <Input.TextArea
                            key={answer.id}
                            style={{
                              marginBottom: "20px",
                              borderColor:
                                exerciseResults &&
                                exerciseResults[part.id][index].isCorrect
                                  ? "#5FD855"
                                  : exerciseResults &&
                                    !exerciseResults[part.id][index].isCorrect
                                  ? "red"
                                  : "",
                            }}
                            placeholder={`Điền lỗi thứ ${index + 1} tại đây`}
                            autoSize={{ minRows: 1, maxRows: 5 }}
                            onChange={(e) =>
                              handleInputChange(
                                part.id,
                                answer.id,
                                e.target.value
                              )
                            }
                            disabled={!!exerciseResults}
                          />
                          {exerciseResults && (
                            <TextCustom
                              style={{
                                marginTop: "8px",
                                color: exerciseResults[part.id][index].isCorrect
                                  ? "#5FD855"
                                  : "red",
                              }}
                            >
                              Đáp án chi tiết:{" "}
                              {exerciseResults[part.id][index].explanation}
                            </TextCustom>
                          )}
                        </div>
                      ))}
                    </Col>
                  </Row>
                </CardCustom>
              </div>
            ) : (
              <Input.TextArea
                placeholder="Viết lại thành đoạn văn hoàn chỉnh"
                autoSize={{ minRows: 10, maxRows: 15 }}
                style={{
                  marginTop: "16px",
                  borderColor:
                    exerciseResults && exerciseResults[part.id][0].isCorrect
                      ? "#5FD855"
                      : exerciseResults &&
                        !exerciseResults[part.id][0].isCorrect
                      ? "red"
                      : "",
                }}
                disabled={!!exerciseResults}
                onChange={(e) => handleInputChange(part.id, 0, e.target.value)}
              ></Input.TextArea>
            )}
          </>
        ))}
      </div>
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        {!exerciseResults && (
          <ButtonCustom
            buttonType="secondary"
            onClick={handleSubmit}
            style={{ marginRight: "100px", padding: "23px" }}
            disabled={!!exerciseResults}
          >
            Nộp bài
          </ButtonCustom>
        )}
        {exerciseResults && (
          <ButtonCustom
            buttonType="secondary"
            onClick={() => navigate(CLIENT_URI.LEVEL_DETAIL)}
          >
            Chuyển sang bài tập tiếp theo
          </ButtonCustom>
        )}
      </div>
    </div>
  );
}
