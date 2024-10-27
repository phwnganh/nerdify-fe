import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import InputCustom from "../../../../components/Input";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import ButtonCustom from "../../../../components/Button";
import { PART_TYPE } from "../../../../constants";
import { submitExercise } from "../../../../services/LearnerService";

export default function GrammarExercises({ exercises }) {
  const [userSelected, setUserSelected] = useState([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState([]);
  const [submissionData, setSubmissionData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleInputChange = useCallback((questionId, inputIndex, value) => {
    setUserSelected((prevAnswers) => {
      const questionIndex = prevAnswers.findIndex((answer) => answer.questionId === questionId);
      if (questionIndex > -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[questionIndex].userAnswer[inputIndex] = value;
        return updatedAnswers;
      }
      return [
        ...prevAnswers,
        {
          questionId: questionId,
          userAnswer: new Array(inputIndex + 1).fill("").map((ans, idx) => (idx === inputIndex ? value : "")),
        },
      ];
    });
  }, []);

  const renderInputField = (questionId, subIndex, isCompleted) => {
    const questionData = userSelected.find((answer) => answer.questionId === questionId);
    const userAnswer = questionData?.userAnswer[subIndex] || "";

    let borderColor = "";

    if (isCompleted) {
      borderColor = submissionData.submissionAnswer.find((answer) => answer.questionId._id === questionId).isCorrect ? "green" : "red";
    }

    return (
      <InputCustom
        style={{
          width: "150px",
          marginRight: "8px",
          borderColor: borderColor,
          borderWidth: "2px",
          borderStyle: "solid",
        }}
        value={userAnswer}
        onChange={(e) => handleInputChange(questionId, subIndex, e.target.value)}
        disabled={isCompleted}
      />
    );
  };

  const handleToggleAnswerDetail = (questionId) => {
    setToggleAnswerDetail((prevState) => {
      const isToggled = prevState.some(item => item.questionId === questionId);
      if(isToggled){
        return prevState.filter(item => item.questionId !== questionId);
      }else{
        const questionAnswer = submissionData.submissionAnswer.find((answer) => answer.questionId._id === questionId);

        // const updatedState = prevState.filter((item) => item.questionId !== questionId);
  
        if (questionAnswer) {
          return [
            ...prevState,
            {
              questionId: questionId,
              correctAnswer: questionAnswer.questionId.options[0]?.text,
              explanation: questionAnswer.questionId.explanation,
            }
          ]
        }
      }
      return prevState;
    });
  };

  const renderPart = useCallback(
    (currentPart, partKey) => (
      <div>
        {currentPart?.questions?.map((question, index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            <TextCustom style={{ fontWeight: "bold" }}>Câu {index + 1}:</TextCustom>
            <div style={{ marginTop: "20px" }}>
              {question.question.includes("___") ? (
                question.question.split("___").map((text, indexBlank) => (
                  <span key={indexBlank}>
                    {indexBlank > 0 && renderInputField(question._id, indexBlank - 1, isCompleted)}
                    {text}
                  </span>
                ))
              ) : (
                <span>
                  {question.question}
                  {renderInputField(question._id, 0, isCompleted)}
                </span>
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
                          Đáp án:
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
          </div>
        ))}
      </div>
    ),
    [isCompleted, toggleAnswerDetail, userSelected, handleInputChange, handleToggleAnswerDetail],
  );

  const handleSubmit = async () => {
    submitExercise({
      exerciseId: exercises._id,
      userSelected,
    })
      .then((resp) => {
        setSubmissionData(resp.data);
        setIsCompleted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Ensure exercises is set and has parts before trying to access them
  const currentPart = useMemo(() => exercises?.parts?.[currentPartIndex], [exercises, currentPartIndex]);

  const handleRetry = useCallback(() => {
    setCurrentPartIndex(0);
    setUserSelected([]);
    setIsCompleted(false);
    setSubmissionData(null);
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises?.title || "Loading..."}
      </TitleCustom>
      <div style={{ textAlign: "center" }}>
        {isCompleted && (
          <>
            <TextCustom>Điểm: </TextCustom>
            <span style={{ color: "red" }}>{Math.round(submissionData.score).toFixed(2)}%</span>
          </>
        )}
      </div>
      {currentPart && (
        <>
          <TextCustom style={{ color: "red", fontWeight: "bold" }}>{currentPart.partName}</TextCustom>
          {currentPart.partType === PART_TYPE.FILL_IN_THE_BLANK && renderPart(currentPart, currentPartIndex + 1)}
        </>
      )}
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <ButtonCustom buttonType="secondary" style={{ padding: "23px" }} onClick={() => setCurrentPartIndex((prev) => prev - 1)} disabled={currentPartIndex === 0}>
          Phần trước
        </ButtonCustom>
        <ButtonCustom
          buttonType="secondary"
          style={{ padding: "23px", marginLeft: "30px" }}
          onClick={() => setCurrentPartIndex((prev) => prev + 1)}
          disabled={!exercises || currentPartIndex === exercises.parts.length - 1}
        >
          Phần tiếp theo
        </ButtonCustom>
        {isCompleted ? (
          <>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleRetry}>
              Làm lại bài tập này
            </ButtonCustom>
            <ButtonCustom
              buttonType="secondary"
              style={{ padding: "23px", marginLeft: "30px" }}
              // onClick={handleNextExercise}
            >
              Chuyển sang bài tập tiếp theo
            </ButtonCustom>
          </>
        ) : (
          <>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleSubmit} disabled={!(currentPartIndex === exercises?.parts?.length - 1)}>
              Nộp bài
            </ButtonCustom>
          </>
        )}
      </div>
    </div>
  );
}
