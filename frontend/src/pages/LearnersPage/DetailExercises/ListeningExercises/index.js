import React, { useEffect, useState } from "react";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { Col, Row, message } from "antd";
import ButtonCustom from "../../../../components/Button";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { useParams } from "react-router-dom";
import demo1_1 from '../../../../assets/listeningExercises/1_1.png';
import demo1_2 from '../../../../assets/listeningExercises/1_2.png';
import demo1_3 from '../../../../assets/listeningExercises/1_3.png';
import demo2_1 from '../../../../assets/listeningExercises/2_1.png';
import demo2_2 from '../../../../assets/listeningExercises/2_2.png';
import demo2_3 from '../../../../assets/listeningExercises/2_3.png';
import demo3_1 from '../../../../assets/listeningExercises/3_1.png';
import demo3_2 from '../../../../assets/listeningExercises/3_2.png';
import demo3_3 from '../../../../assets/listeningExercises/3_3.png';

export default function ListeningExercise() {
  const [exercises, setExercises] = useState(null);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const { exerciseType, exerciseId } = useParams();

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

  useEffect(() => {
    if (exerciseId) {
      fetch(`http://localhost:9999/exercises/${exerciseId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setExercises(data);
          }
        })
        .catch((err) => console.error("Error fetching exercise data", err));
    }
  }, [exerciseType, exerciseId]);

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedAnswers((prevSelected) => ({
      ...prevSelected,
      [questionId]: optionId,
    }));
  };

  const handleNextPart = () => {
    if (exercises && currentPartIndex < exercises.parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };

  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = () => {
    fetch(`http://localhost:9999/exercises/${exerciseId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedAnswers }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmittedAnswers(selectedAnswers);
        message.success("Nộp bài thành công!");
        console.log("Submission successful", data);
      })
      .catch((err) => {
        console.error("Submission error", err);
        message.error("Nộp bài thất bại. Vui lòng thử lại.");
      });
  };

  if (!exercises?.parts) {
    return <div>Loading...</div>;
  }

  const currentPart = exercises.parts[currentPartIndex];

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises.title}
      </TitleCustom>
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
                const isSelected = selectedAnswers[question.id] === option.id;
                const isSubmitted = submittedAnswers[question.id] === option.id;
                return (
                  <Col key={option.id} span={8}>
                    <ButtonCustom
                      buttonType="primary"
                      onClick={() => handleOptionSelect(question.id, option.id)}
                      style={{
                        backgroundColor: isSelected ? "blue" : undefined,
                        fontWeight: isSubmitted ? "bold" : "normal",
                      }}
                      disabled={Object.keys(submittedAnswers).length > 0}
                    >
                      {option.id}. {option.text}
                    </ButtonCustom>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      ))}

      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <ButtonCustom
          buttonType="secondary"
          style={{ marginRight: "100px", padding: "23px" }}
          onClick={handlePreviousPart}
          disabled={currentPartIndex === 0 || Object.keys(submittedAnswers).length > 0}
        >
          Phần trước
        </ButtonCustom>
        <ButtonCustom
          buttonType="secondary"
          style={{ marginRight: "100px", padding: "23px" }}
          onClick={handleNextPart}
          disabled={currentPartIndex === exercises.parts.length - 1 || Object.keys(submittedAnswers).length > 0}
        >
          Next
        </ButtonCustom>
        <ButtonCustom
          buttonType="secondary"
          style={{ marginLeft: "23px", padding: "23px" }}
          onClick={handleSubmit}
          disabled={Object.keys(submittedAnswers).length > 0}
        >
          Nộp bài
        </ButtonCustom>
      </div>
    </div>
  );
}
