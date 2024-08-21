import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import ButtonCustom from "../../../../components/Button";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import CardCustom from "../../../../components/Card";
import InputCustom from "../../../../components/Input";
import { Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {CLIENT_URI} from '../../../../constants/uri.constants'
export default function WritingExercises() {
  const [exercise, setExercise] = useState(null);
  const { exerciseType, exerciseId } = useParams();
  const [userAnswers, setUserAnswers] = useState({});
  const [exerciseResults, setExerciseResults] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      `http://localhost:9999/exercises?type=${exerciseType}&id=${exerciseId}`
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
    let score = 0;
    let totalQuestions = 0;
    let results = {};
    exercise.parts.forEach((part) => {
      if (part.answers) {
        totalQuestions += part.answers.length;
        const userResponses = Object.values(userAnswers[part.id] || {});

        results[part.id] = part.answers.map((correctAnswer) => {
          const isCorrect = userResponses.includes(correctAnswer.answer);
          if (isCorrect) {
            score++;
          }
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
      setExerciseResults(results);
    });
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
                      : exerciseResults && !exerciseResults[part.id][0].isCorrect
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
        {!exerciseResults && <ButtonCustom
          buttonType="secondary"
          onClick={handleSubmit}
          style={{ marginRight: "100px", padding: "23px" }}
          disabled={!!exerciseResults}
        >
          Nộp bài
        </ButtonCustom>}
        {exerciseResults && <ButtonCustom buttonType="secondary" onClick={() => navigate(CLIENT_URI.LEVEL_DETAIL)}>Chuyển sang bài tập tiếp theo</ButtonCustom>}
      </div>
    </div>
  );
}
