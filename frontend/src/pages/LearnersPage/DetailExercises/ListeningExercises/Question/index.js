import { Col, Row } from "antd";
import ButtonCustom from "../../../../../components/Button";
import { TextCustom } from "../../../../../components/Typography";
import demo1_1 from "../../../../../assets/listeningExercises/1_1.png";
import demo1_2 from "../../../../../assets/listeningExercises/1_2.png";
import demo1_3 from "../../../../../assets/listeningExercises/1_3.png";
import demo2_1 from "../../../../../assets/listeningExercises/2_1.png";
import demo2_2 from "../../../../../assets/listeningExercises/2_2.png";
import demo2_3 from "../../../../../assets/listeningExercises/2_3.png";
import demo3_1 from "../../../../../assets/listeningExercises/3_1.png";
import demo3_2 from "../../../../../assets/listeningExercises/3_2.png";
import demo3_3 from "../../../../../assets/listeningExercises/3_3.png";
import { useState } from "react";
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
export default function QuestionLayout({
  part,
  selectedAnswers,
  handleOptionSelect,
  exerciseResults,
}) {
  const [isAnswerDetail, setIsAnswerDetail] = useState({});
  const handleToggleAnswerDetail = (questionId) => {
    setIsAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };
  return (
    <>
      <TextCustom style={{ color: "red", fontWeight: "bold" }}>
        {part.partName}
      </TextCustom>
      {part.questions.map((question) => (
        <div key={question.id}>
          <TextCustom style={{ paddingTop: "100px" }}>
            Câu {question.id}: {question.question}
          </TextCustom>
          <div style={{ marginTop: "20px" }}>
            <Row style={{ textAlign: "center" }}>
              {question.questionImage &&
                question.questionImage.map((image, index) => (
                  <Col key={index} span={8}>
                    <img
                      src={imagesArr[image]}
                      width={"80%"}
                      style={{ marginBottom: "12px" }}
                      alt={`Question ${question.id}`}
                    />
                  </Col>
                ))}
            </Row>
            <Row style={{ textAlign: "center", marginTop: "10px" }}>
              {question.options.map((option) => {
                const isCorrectOption = exerciseResults &&  option.id === question.correctAnswer
                const isUserSelected =
                  option.id === selectedAnswers[question.id];
                const backgroundColor = exerciseResults
                  ? isCorrectOption
                    ? "#5FD855"
                    : isUserSelected && !question.isCorrect
                    ? "red"
                    : ""
                  : isUserSelected
                  ? "#A8703E"
                  : "";
                return (
                  <Col key={option.id} span={8}>
                    <ButtonCustom
                      buttonType="primary"
                      onClick={() =>
                        exerciseResults
                          ? null
                          : handleOptionSelect(question.id, option.id)
                      }
                      style={{ backgroundColor }}
                      disabled={!!exerciseResults}
                    >
                      {option.id}. {option.text}
                    </ButtonCustom>
                  </Col>
                );
              })}
            </Row>
            {exerciseResults && (
              <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                <ButtonCustom
                  buttonType="primary"
                  onClick={() => handleToggleAnswerDetail(question.id)}
                >
                  Đáp án chi tiết
                </ButtonCustom>
              </Row>
            )}

            {exerciseResults && isAnswerDetail[question.id] && (
              <div style={{ paddingLeft: "20px" }}>
                <TextCustom>Đáp án đúng: {question.correctAnswer}</TextCustom>
                <div>
                  <TextCustom>Lời giải: <span style={{color: 'blue'}}>{question.answerDetail}</span></TextCustom>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
