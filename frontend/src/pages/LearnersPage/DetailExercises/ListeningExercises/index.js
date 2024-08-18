import React, { useEffect, useState } from "react";
import { TextCustom } from "../../../../components/Typography";
import { Col, Row } from "antd";
import ButtonCustom from "../../../../components/Button";
export default function ListeningExercises() {
  const [exercises, setExercises] = useState([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:9999/exercises")
      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
        console.log("exercise: ", data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleNextPart = () => {
    if (
      exercises.length > 0 &&
      currentPartIndex < exercises[0].parts.length - 1
    ) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };

  if (exercises.length === 0 || !exercises[0]?.parts) {
    return <div>Loading...</div>;
  }

  const currentPart = exercises[0].parts[currentPartIndex];

  return (
    <div>
      <TextCustom style={{ color: "red", fontWeight: "bold" }}>
        {currentPart.partName}
      </TextCustom>
      {currentPart.questions.map((question) => (
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
                      key={index}
                      src={image}
                      width={"80%"}
                      style={{ marginBottom: "12px" }}
                      alt={`Question ${question.id}`}
                    />
                  </Col>
                ))}
            </Row>
            <Row style={{ textAlign: "center", marginTop: "10px" }}>
              {question.options.map((option) => (
                <Col key={option.id} span={8}>
                  <ButtonCustom buttonType="primary">
                    {option.id}. {option.text}
                  </ButtonCustom>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ))}

      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <ButtonCustom
          buttonType="secondary"
          style={{ marginRight: "100px", padding: "23px" }}
          onClick={handleNextPart}
        >
          Next
        </ButtonCustom>
        <ButtonCustom
          buttonType="secondary"
          style={{ marginLeft: "23px", padding: "23px" }}
        >
          Nộp bài
        </ButtonCustom>
      </div>
    </div>
  );
}
