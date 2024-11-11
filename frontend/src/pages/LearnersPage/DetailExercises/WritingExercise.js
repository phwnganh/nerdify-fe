import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
import ButtonCustom from "../../../../components/Button";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import CardCustom from "../../../../components/Card";
import InputCustom from "../../../../components/Input";
import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../constants/uri.constants";
import { PART_TYPE } from "../../../constants";
import { submitExercise } from "../../../services/LearnerService";

export default function WritingExercises({ exercises }) {
  const [userSelected, setUserSelected] = useState([]);
  const [submissionData, setSubmissionData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState([]);
  const navigate = useNavigate();

  if (!exercises?.parts) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (questionId, value) => {
    setUserSelected((prevAnswers) => {
      const questionIndex = prevAnswers.findIndex((answer) => answer.questionId === questionId);
      if (questionIndex > -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[questionIndex].userAnswer = value;
        return updatedAnswers;
      }
      return [
        ...prevAnswers,
        {
          questionId: questionId,
          userAnswer: value,
        },
      ];
    });
  };

  const handleToggleAnswerDetail = (questionId) => {
    setToggleAnswerDetail((prevState) => {
      const isToggled = prevState.some((item) => item.questionId === questionId);
      if (isToggled) {
        return prevState.filter((item) => item.questionId !== questionId);
      } else {
        const questionAnswer = submissionData.submissionAnswer.find((answer) => answer.questionId._id === questionId);

        if (questionAnswer) {
          return [
            ...prevState,
            {
              questionId: questionId,
              correctAnswer: questionAnswer.questionId.options[0]?.text,
              explanation: questionAnswer.questionId.explanation,
            },
          ];
        }
      }
      return prevState;
    });
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
                <div style={{ paddingBottom: "5px", marginTop: "10px" }} key={question.id}>
                  {part.partType === PART_TYPE.FILL_IN_THE_BLANK ? (
                    <InputCustom
                      key={question._id}
                      style={{
                        marginBottom: "10px",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderColor: isCompleted ? (submissionData.submissionAnswer.find((answer) => answer.questionId._id === question._id).isCorrect ? "green" : "red") : "initial", // Set to default if isCompleted is false
                      }}
                      placeholder={`Điền lỗi thứ ${index + 1} tại đây`}
                      autoSize={{ minRows: 1, maxRows: 5 }}
                      value={userSelected.find((answer) => answer.questionId === question._id)?.userAnswer || ""}
                      onChange={(e) => handleInputChange(question._id, e.target.value)}
                      disabled={isCompleted}
                    />
                  ) : (
                    <Input.TextArea
                      placeholder="Viết lại thành đoạn văn hoàn chỉnh"
                      autoSize={{ minRows: 10, maxRows: 15 }}
                      style={{
                        marginTop: "16px",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderColor: isCompleted ? (submissionData.submissionAnswer.find((answer) => answer.questionId._id === question._id).isCorrect ? "green" : "red") : "initial", // Set to default if isCompleted is false
                      }}
                      value={userSelected.find((answer) => answer.questionId === question._id)?.userAnswer || ""}
                      disabled={isCompleted}
                      onChange={(e) => handleInputChange(question._id, e.target.value)}
                    />
                  )}
                  {isCompleted && (
                    <div style={{ paddingTop: "20px" }}>
                      <ButtonCustom buttonType="primary" onClick={() => handleToggleAnswerDetail(question._id)}>
                        Đáp án chi tiết
                      </ButtonCustom>
                      {toggleAnswerDetail.some((item) => item.questionId === question._id) && (
                        <div>
                          {toggleAnswerDetail.find((item) => item.questionId === question._id)?.correctAnswer && (
                            <>
                              Đáp án:&nbsp;
                              {toggleAnswerDetail
                                .find((item) => item.questionId === question._id)
                                .correctAnswer.split("|")
                                .map((part, index) => (
                                  <TextCustom key={index} style={{ color: "blue" }}>
                                    {part}
                                    {index < toggleAnswerDetail.find((item) => item.questionId === question._id).correctAnswer.split("|").length - 1 && ", "}
                                  </TextCustom>
                                ))}{" "}
                              <br />
                              Giải thích: {toggleAnswerDetail.find((item) => item.questionId === question._id).explanation}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </Col>
          </Row>
        </CardCustom>
      </div>
    );
  };

  const handleSubmit = () => {
    submitExercise({
      exerciseId: exercises._id,
      userSelected: userSelected,
    })
      .then((resp) => {
        setSubmissionData(resp.data);
        setIsCompleted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRetry = () => {
    setUserSelected([]);
    setIsCompleted(false);
  };

  return (
    <div style={{ padding: "30px", marginLeft: "70px", marginRight: "70px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises?.title}
      </TitleCustom>
      <div style={{ textAlign: "center" }}>
        {isCompleted && (
          <>
            <TextCustom>Điểm: </TextCustom>
            <span style={{ color: "red" }}>{Math.round(submissionData.score).toFixed(2)}%</span>
          </>
        )}
      </div>
      <div>
        {exercises.parts?.map((part, index) => (
          <div key={part.id}>
            <TextCustom style={{ color: "red", fontWeight: "bold", paddingTop: "16px" }}>{part.partName}</TextCustom>
            {renderPart1(part)}
          </div>
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