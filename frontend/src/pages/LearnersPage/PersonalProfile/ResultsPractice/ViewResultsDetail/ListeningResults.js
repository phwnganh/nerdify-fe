import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Col, Row, Tabs } from "antd";
import BreadCrumbHome from "../../../../../components/BreadCrumb/BreadCrumbHome";
import { TextCustom, TitleCustom } from "../../../../../components/Typography/TypographyCustom";
import ButtonCustom from "../../../../../components/Button/ButtonCustom";
import { PART_TYPE } from "../../../../../constants";
import { submitExercise } from "../../../../../services/LearnerService";
import { CaretLeftOutlined } from "@ant-design/icons";


const { TabPane } = Tabs;

export default function ListeningResults({ exerciseResults }) {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState({});
  const navigate = useNavigate();
  const handleToggleAnswerDetail = useCallback((questionId) => {
    setToggleAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  }, []);


  const renderPart = (currentPart) => {
    return (
      <>
        {currentPart?.questions.map((question, index) => (
          <div key={question?._id}>
            <TextCustom style={{ paddingTop: "100px", fontWeight: "bold" }}>
              Câu {index + 1}: {question.question}
            </TextCustom>
            {question.mediaUrl && (
              <audio controls style={{ marginTop: "20px", width: "100%" }}>
                <source src={question.mediaUrl} type="audio/mp3" />
                Trình duyệt của bạn không hỗ trợ phần tử audio.
              </audio>
            )}

            <div style={{ marginTop: "20px" }}>
              <Row style={{ textAlign: "center" }}>
                {question.questionImage &&
                  question.questionImage.map((image, index) => (
                    <Col key={index} span={8}>
                      <img src={image} width={"80%"} style={{ marginBottom: "12px" }} alt={`Question ${question._id}`} />
                    </Col>
                  ))}
              </Row>
              <Row style={{ textAlign: "center", marginTop: "10px" }}>
                {question.options.map((option, index) => {
                  // Check if the option is selected by the user
                  const isUserSelected = exerciseResults?.userAnswer;
                  let backgroundColor = isUserSelected ? "#A8703E" : "";

                  const foundQuestion = exerciseResults.submissionAnswer?.find((answer) => answer.userAnswer == option._id && answer.isCorrect);
                  // if (isSubmitted) {
                    if (foundQuestion) {
                      backgroundColor = "#5FD855";
                    } else if (isUserSelected) {
                      backgroundColor = "red";
                    }
                  // }

                  return (
                    <Col key={option._id} span={8}>
                      <ButtonCustom buttonType="primary" style={{ backgroundColor }} disabled={true}>
                        {index + 1}. {option.text}
                      </ButtonCustom>
                    </Col>
                  );
                })}
              </Row>
            </div>
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

  const handleTabChange = (key) => {
    console.log("Tab changed to:", key);
  };

  if (!exerciseResults?.exerciseId?.parts) {
    return <div>Loading...</div>;
  }

  const currentPart = exerciseResults?.exerciseId?.parts[currentPartIndex];

  return (
    <div style={{ padding: "24px" }}>
            <ButtonCustom icon={<CaretLeftOutlined />} buttonType="primary" onClick={() => navigate(-1)}>Quay lại</ButtonCustom>

      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exerciseResults?.exerciseId?.title}
      </TitleCustom>

      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="Questions and Answers" key="questionsAnswers">
            <div style={{ textAlign: "center" }}>
              <TextCustom>
                Điểm: <span style={{ color: "red" }}>{exerciseResults?.score}%</span>
              </TextCustom>
            </div>
          <TextCustom style={{ color: "red", fontWeight: "bold" }}>{currentPart?.partName}</TextCustom>
          {currentPart?.mediaUrl && (
            <audio controls style={{ marginTop: "20px", width: "100%" }}>
              <source src={currentPart?.mediaUrl} type="audio/mp3" />
              Trình duyệt của bạn không hỗ trợ phần tử audio.
            </audio>
          )}
          {currentPart?.partType === PART_TYPE.MULTIPLE_CHOICE && renderPart(currentPart)}
          <div style={{ textAlign: "center", paddingTop: "50px" }}>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px" }} onClick={() => setCurrentPartIndex((prev) => Math.max(prev - 1, 0))} disabled={currentPartIndex === 0}>
              Phần trước
            </ButtonCustom>
            <ButtonCustom
              buttonType="secondary"
              style={{ padding: "23px", marginLeft: "30px" }}
              onClick={() => setCurrentPartIndex((prev) => Math.min(prev + 1, exerciseResults?.exerciseId?.parts.length - 1))}
              disabled={currentPartIndex === exerciseResults?.exerciseId?.parts.length - 1}
            >
              Phần tiếp theo
            </ButtonCustom>
              <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={() => navigate(-1)}>
                Quay lại
              </ButtonCustom>

          </div>
        </TabPane>
        <TabPane tab="Transcripts" key="transcripts">
          {
            exerciseResults?.exerciseId?.parts?.map((part, index) => (
              <React.Fragment key={index}>
                <div>
                  <TextCustom style={{ fontWeight: "bold" }}>{part?.partName}</TextCustom>
                </div>
                <div>
                  <TextCustom>
                    {part?.paragraph?.split("\n")?.map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </TextCustom>
                </div>
              </React.Fragment>
            ))}
        </TabPane>
      </Tabs>
    </div>
  );
}