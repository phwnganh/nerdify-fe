import React, { useCallback, useEffect, useMemo, useState } from "react";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { useNavigate, useParams } from "react-router-dom";
import ButtonCustom from "../../../../components/Button";
import { PART_TYPE } from "../../../../constants";
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
import { submitExercise } from "../../../../services/LearnerService";
import { CaretLeftOutlined } from "@ant-design/icons";

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

export default function ReadingResults({ exerciseResults }) {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState({});
  const navigate = useNavigate();
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
        {currentPart?.paragraph && (
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
              {currentPart?.paragraph.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {currentPart.questions.map((question, index) => (
          <div key={index + 1} style={{ marginBottom: "30px" }}>
            {/* Display the question label */}
            <TextCustom style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Câu {index + 1}: {question.question}
            </TextCustom>

            {/* Render Images */}
            {Array.isArray(question.questionImage) && question.questionImage.length > 0 && (
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {question.questionImage.map((image, index) => (
                  <img key={index} src={image} style={{ padding: "10px 0px" }} alt={`question-part-${index}`} />
                ))}
              </div>
            )}

            {/* Render Options */}
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              {question.options.map((option, index) => {
                const isUserSelected = exerciseResults?.userAnswer;
                let backgroundColor = isUserSelected ? "#A8703E" : "";

                const foundQuestion = exerciseResults?.submissionAnswer?.find((answer) => answer.userAnswer == option._id && answer.isCorrect);
                if (foundQuestion) {
                  backgroundColor = "#5FD855";
                } else if (isUserSelected) {
                  backgroundColor = "red";
                }

                return (
                  <div>
                    <ButtonCustom key={option._id} buttonType="primary" style={{ marginTop: "10px", width: "200px", backgroundColor }} disabled={true}>
                      {index + 1}. {option?.text}
                    </ButtonCustom>
                  </div>
                );
              })}
            </div>

            {/* Show detailed answers after submission */}
            <div style={{ padding: "20px" }}>
              <ButtonCustom buttonType="primary" onClick={() => handleToggleAnswerDetail(question._id)}>
                Đáp án chi tiết
              </ButtonCustom>
              {toggleAnswerDetail[question._id] && (
                <div>
                  <TextCustom style={{ color: "blue" }}>
                    {exerciseResults?.submissionAnswer?.map((answer, idx) => {
                      if (answer.questionId._id === question._id) {
                        return (
                          <React.Fragment key={idx}>
                            {question?.explanation?.split("\n").map((line, idx) => (
                              <React.Fragment key={idx}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </React.Fragment>
                        );
                      }
                    })}
                  </TextCustom>
                </div>
              )}
            </div>
          </div>
        ))}
      </>
    );
  };

  if (!exerciseResults?.exerciseId?.parts) {
    return <div>Loading...</div>;
  }

  const currentPart = exerciseResults?.exerciseId?.parts[currentPartIndex];

  return (
    <div style={{ padding: "24px" }}>
      {/* <BreadCrumbHome /> */}
      <ButtonCustom icon={<CaretLeftOutlined />} buttonType="primary" onClick={() => navigate(-1)}>Quay lại</ButtonCustom>

      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exerciseResults?.exerciseId?.title}
      </TitleCustom>
      <div style={{ textAlign: "center" }}>
          <>
            <TextCustom>Điểm: </TextCustom>
            <span style={{ color: "red" }}>{Math.round(exerciseResults?.score).toFixed(2)}%</span>
          </>
      </div>
      <div>
        {/* part name  */}
        <TextCustom style={{ color: "red", fontWeight: "bold" }}>{currentPart?.partName}</TextCustom>
        {/* content  */}
        {currentPart?.partType === PART_TYPE.MULTIPLE_CHOICE && renderPart(currentPart, `part${currentPartIndex + 1}`)}
        {/* button control */}
        <div style={{ textAlign: "center", paddingTop: "50px" }}>
          <ButtonCustom buttonType="secondary" style={{ padding: "23px" }} onClick={() => setCurrentPartIndex((prev) => prev - 1)} disabled={currentPartIndex === 0}>
            Phần trước
          </ButtonCustom>
          <ButtonCustom
            buttonType="secondary"
            style={{ padding: "23px", marginLeft: "30px" }}
            onClick={() => setCurrentPartIndex((prev) => prev + 1)}
            disabled={currentPartIndex === exerciseResults?.exerciseId?.parts.length - 1}
          >
            Phần tiếp theo
          </ButtonCustom>
          <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={() => navigate(-1)}>
            Quay lại
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
}
