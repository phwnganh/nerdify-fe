import { useNavigate } from "react-router-dom";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import ButtonCustom from "../../../../components/Button";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { CLIENT_URI, PART_TYPE } from "../../../../constants";
import { useState } from "react";
import CardCustom from "../../../../components/Card";
import { Col, Input, Row } from "antd";
import InputCustom from "../../../../components/Input";

export default function WritingResults({ exerciseResults }) {
  const [isCompleted, setIsCompleted] = useState(true);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState([]);
  const navigate = useNavigate();

  console.log(exerciseResults);

  if (!exerciseResults?.exerciseId?.parts) {
    return <div>Loading...</div>;
  }

  const handleToggleAnswerDetail = (questionId) => {
    setToggleAnswerDetail((prevState) => {
      const isToggled = prevState.some((item) => item.questionId === questionId);
      if (isToggled) {
        return prevState.filter((item) => item.questionId !== questionId);
      } else {
        const questionAnswer = exerciseResults.submissionAnswer.find((answer) => answer.questionId._id === questionId);

        // const updatedState = prevState.filter((item) => item.questionId !== questionId);
        console.log(questionAnswer);
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
                        borderColor: isCompleted ? (exerciseResults.submissionAnswer.find((answer) => answer.questionId._id === question._id).isCorrect ? "green" : "red") : "initial", // Set to default if isCompleted is false
                      }}
                      placeholder={`Điền lỗi thứ ${index + 1} tại đây`}
                      autoSize={{ minRows: 1, maxRows: 5 }}
                      value={exerciseResults.submissionAnswer.find((answer) => answer.questionId._id === question._id)?.userAnswer}
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
                        borderColor: isCompleted ? (exerciseResults.submissionAnswer.find((answer) => answer.questionId._id === question._id).isCorrect ? "green" : "red") : "initial", // Set to default if isCompleted is false
                      }}
                      value={exerciseResults.submissionAnswer.find((answer) => answer.questionId._id === question._id)?.userAnswer}
                      disabled={true}
                    ></Input.TextArea>
                  )}
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
                </div>
              ))}
            </Col>
          </Row>
        </CardCustom>
      </div>
    );
  };

  return (
    <div style={{ padding: "30px", marginLeft: "70px", marginRight: "70px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exerciseResults?.exerciseId?.title}
      </TitleCustom>
      <div style={{ textAlign: "center" }}>
        {isCompleted && (
          <>
            <TextCustom>Điểm: </TextCustom>
            <span style={{ color: "red" }}>{Math.round(exerciseResults.score).toFixed(2)}%</span>
          </>
        )}
      </div>
      <div>
        {exerciseResults?.exerciseId.parts?.map((part, index) => (
          <div key={part.id}>
            <TextCustom style={{ color: "red", fontWeight: "bold", paddingTop: "16px" }}>{part.partName}</TextCustom>
            {renderPart1(part)}
          </div>
        ))}
      </div>
      {/* <div style={{ textAlign: "center", paddingTop: "50px" }}>
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
      </div> */}
    </div>
  );
}
