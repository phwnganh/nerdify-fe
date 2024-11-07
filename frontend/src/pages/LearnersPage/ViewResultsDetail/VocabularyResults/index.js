import { useEffect, useState } from "react";
import demo_1_1 from "../../../../assets/vocabExercises/1_1.png";
import demo_1_2 from "../../../../assets/vocabExercises/1_2.png";
import demo_1_3 from "../../../../assets/vocabExercises/1_3.png";
import demo_2_1 from "../../../../assets/vocabExercises/2_1.png";
import demo_2_2 from "../../../../assets/vocabExercises/2_2.png";
import demo_2_3 from "../../../../assets/vocabExercises/2_3.png";
import demo_3_1 from "../../../../assets/vocabExercises/3_1.png";
import demo_3_2 from "../../../../assets/vocabExercises/3_2.png";
import demo_3_3 from "../../../../assets/vocabExercises/3_3.png";
import demo_4_1 from "../../../../assets/vocabExercises/4_1.png";
import demo_4_2 from "../../../../assets/vocabExercises/4_2.png";
import demo_4_3 from "../../../../assets/vocabExercises/4_3.png";
import demo_5_1 from "../../../../assets/vocabExercises/5_1.png";
import demo_5_2 from "../../../../assets/vocabExercises/5_2.png";
import demo_5_3 from "../../../../assets/vocabExercises/5_3.png";

import { PART_TYPE } from "../../../../constants";
import ButtonCustom from "../../../../components/Button";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { Col, Radio, Row } from "antd";
import InputCustom from "../../../../components/Input";
import { submitExercise } from "../../../../services/LearnerService";

const vocabImg = {
  demo_1_1: demo_1_1,
  demo_1_2: demo_1_2,
  demo_1_3: demo_1_3,
  demo_2_1: demo_2_1,
  demo_2_2: demo_2_2,
  demo_2_3: demo_2_3,
  demo_3_1,
  demo_3_2,
  demo_3_3,
  demo_4_1,
  demo_4_2,
  demo_4_3,
  demo_5_1,
  demo_5_2,
  demo_5_3,
};

export default function VocabularyResults({ exerciseResults }) {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  const exercises = exerciseResults.exerciseId;
  const submissionData = exerciseResults;
  
  const handleNextPart = () => {
    if (currentPartIndex < exercises?.parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };

  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (!exercises) {
    return <div>Loading...</div>;
  }

  const renderPart1 = (part) => {
    const totalQuestion = submissionData?.partLengths[0];
    return (
      <>
        <Row gutter={[16, 16]} style={{ paddingTop: "25px", display: "flex", justifyContent: "center" }}>
          <Col span={8}>
            <Radio.Group>
              {submissionData.submissionAnswer.slice(0, totalQuestion).map(
                (submission, index) =>
                  submission.userAnswer && (
                    <Row key={index} align="middle">
                      <Col span={24} style={{ paddingBottom: "24px", paddingLeft: "12px" }}>
                        <Radio.Button
                          value={submission.questionId._id}
                          style={{
                            backgroundColor: "#ff855d",
                            borderRadius: "100px",
                            border: "none",
                            color: "white",
                            pointerEvents: "none",
                          }}
                        >
                          <p style={{ margin: "0", whiteSpace: "nowrap", userSelect: "none" }}>
                            {submission.questionId.question}
                          </p>
                        </Radio.Button>
                      </Col>
                    </Row>
                  ),
              )}
            </Radio.Group>
          </Col>
          <Col span={8}>
            <Radio.Group>
              {submissionData.submissionAnswer.slice(0, totalQuestion).map(
                (submission, index) =>
                  submission.userAnswer && (
                    <Row key={index} align="middle">
                      <Col span={24} style={{ paddingBottom: "24px", paddingLeft: "12px" }}>
                        <Radio.Button
                          value={submission.questionId._id}
                          style={{
                            backgroundColor: "#ff855d",
                            borderRadius: "100px",
                            border: "none",
                            color: "white",
                            pointerEvents: "none",
                          }}
                        >
                          <p style={{ margin: "0", whiteSpace: "nowrap", userSelect: "none" }}>
                            {submission.userAnswer}
                          </p>
                        </Radio.Button>
                      </Col>
                    </Row>
                  ),
              )}
            </Radio.Group>
          </Col>
          <Col span={4}>
            {submissionData.submissionAnswer.slice(0, totalQuestion).map(
              (submission, index) =>
                submission.userAnswer && (
                  <Row key={submission._id} style={{ color: submission.isCorrect ? "rgb(95, 216, 85)" : "red" }}>
                    <Col
                      style={{
                        paddingBottom: "24px",
                        paddingLeft: "12px",
                        height: "56px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {submission.isCorrect ? (
                        "Đúng"
                      ) : (
                        <p style={{ margin: "0", whiteSpace: "nowrap", userSelect: "none", width: "100%" }}>
                          Đáp án:
                          <br /> {submission.questionId.question} - {submission.questionId.options[0].text}
                        </p>
                      )}
                    </Col>
                  </Row>
                ),
            )}
          </Col>
        </Row>
      </>
    );
  };

  const renderPart2 = (exercise) => {
    return (
      <div>
        {exercise.questions.map((question, index) => {
          const submission = submissionData?.submissionAnswer.find((answer) => answer.questionId._id === question._id);
          return (
            <Row key={index} gutter={[16, 16]} style={{ paddingTop: "25px", paddingLeft: "40px", paddingRight: "40px" }}>
              <Col span={24} style={{ paddingBottom: "24px" }}>
                <TextCustom style={{ fontWeight: "bold" }}>
                  Câu {index + 1}: {question.question}
                </TextCustom>
                <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                  {question.questionImage &&
                    question.questionImage.map((image, index) => (
                      <Col key={index} span={8} style={{ textAlign: "center" }}>
                        <img src={vocabImg[image]} width={"50%"} alt={`Question ${question._id}`} />
                      </Col>
                    ))}
                  {question.options.map((option, index) => {
                    const isSelected = submission?.userAnswer === option._id;
                    const isCorrect = option.isTrue;
                    return (
                      <Col span={8} key={index} style={{ textAlign: "center" }}>
                        <ButtonCustom
                          buttonType="primary"
                          style={{
                            backgroundColor: isSelected && isCorrect ? "rgb(95, 216, 85)" : isSelected ? "red" : isCorrect ? "rgb(95, 216, 85)" : "",
                            pointerEvents: "none",
                          }}
                        >
                          {option.text}
                        </ButtonCustom>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  };

  const renderPart3 = (part) => {
    const { questions } = part;
    const totalQuestion = submissionData?.partLengths[2];
    return (
      <div style={{ marginLeft: "80px", marginRight: "80px" }}>
        <Row gutter={[16, 16]} style={{ paddingTop: "25px" }}>
          <Col span={24}>
            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
              {submissionData?.submissionAnswer.slice(-totalQuestion).map((submission, index) => (
                <Col span={6} key={index} style={{ paddingBottom: "24px" }}>
                  <TextCustom style={{ color: "" }}>{submission.questionId.question}</TextCustom>
                  <InputCustom
                    value={submission.userAnswer}
                    style={{
                      borderColor: submission.isTrue ? "rgb(95, 216, 85)" : "red",
                    }}
                    disabled
                  />
                  {!submission.isTrue && <TextCustom style={{ color: "red" }}>{submission.questionId.options[0].text}</TextCustom>}
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

  const renderPart = () => {
    const currentPart = exercises.parts[currentPartIndex];
    switch (currentPart.partType) {
      case PART_TYPE.MATCHING:
        return renderPart1(currentPart);
      case PART_TYPE.MULTIPLE_CHOICE:
        return renderPart2(currentPart);
      case PART_TYPE.FILL_IN_THE_BLANK:
        return renderPart3(currentPart);
      default:
        return <div>No valid part type found.</div>;
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold", paddingLeft: "40px" }}>
        {exercises?.title}
      </TitleCustom>
      <div style={{ textAlign: "center" }}>
        <TextCustom>
          Điểm:&nbsp;<span style={{ color: "red" }}>{submissionData?.score}%</span>
        </TextCustom>
      </div>
      <div>
        <TextCustom style={{ color: "red", fontWeight: "bold", paddingLeft: "40px" }}>
          {exercises.parts[currentPartIndex].partName}
        </TextCustom>
        {renderPart()}
      </div>
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <ButtonCustom
          buttonType="secondary"
          style={{ marginRight: "100px", padding: "23px" }}
          onClick={handlePreviousPart}
          disabled={currentPartIndex === 0}
        >
          Phần trước
        </ButtonCustom>
        <ButtonCustom
          buttonType="secondary"
          style={{ padding: "23px" }}
          onClick={handleNextPart}
          disabled={currentPartIndex === exercises.parts.length - 1}
        >
          Phần tiếp theo
        </ButtonCustom>
      </div>
    </div>
  );
}
