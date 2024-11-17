import { useCallback, useEffect, useMemo, useState } from "react";
import ButtonCustom from "../../../../../components/Button/ButtonCustom";
import { TextCustom, TitleCustom } from "../../../../../components/Typography/TypographyCustom";
import BreadCrumbHome from "../../../../../components/BreadCrumb/BreadCrumbHome";
import { PART_TYPE } from "../../../../../constants";
import InputCustom from "../../../../../components/Input/InputCustom";
import { useNavigate } from "react-router-dom";

export default function GrammarResults({ exerciseResults }) {
  const [userSelected, setUserSelected] = useState([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState([]);
  const [isCompleted, setIsCompleted] = useState(true);
  const navigate = useNavigate();

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
    const userAnswer = exerciseResults?.submissionAnswer?.find((answer) => answer.questionId._id === questionId)?.userAnswer;

    let borderColor = "";

    if (isCompleted) {
      borderColor = exerciseResults.submissionAnswer.find((answer) => answer.questionId._id === questionId).isCorrect ? "green" : "red";
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

        return prevState;
      }
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
          </div>
        ))}
      </div>
    ),
    [isCompleted, toggleAnswerDetail, userSelected, handleInputChange, handleToggleAnswerDetail],
  );

  const handleSubmit = async () => {};

  // Ensure exerciseResults?.exerciseId is set and has parts before trying to access them
  const currentPart = useMemo(() => exerciseResults?.exerciseId?.parts?.[currentPartIndex], [exerciseResults?.exerciseId, currentPartIndex]);

  const handleRetry = useCallback(() => {
    setCurrentPartIndex(0);
    setUserSelected([]);
    // setIsCompleted(false);
  }, []);

  if (!exerciseResults) {
    return <>Loading</>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exerciseResults?.exerciseId?.title || "Loading..."}
      </TitleCustom>
      <div style={{ textAlign: "center" }}>
        {isCompleted && (
          <>
            <TextCustom>Điểm: </TextCustom>
            <span style={{ color: "red" }}>{Math.round(exerciseResults.score).toFixed(2)}%</span>
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
          disabled={!exerciseResults?.exerciseId || currentPartIndex === exerciseResults?.exerciseId.parts.length - 1}
        >
          Phần tiếp theo
        </ButtonCustom>
        <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={() => navigate(-1)}>
          Quay lại
        </ButtonCustom>
        {/* {isCompleted ? (
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
            <ButtonCustom
              buttonType="secondary"
              style={{ padding: "23px", marginLeft: "30px" }}
              onClick={handleSubmit}
              disabled={!(currentPartIndex === exerciseResults?.exerciseId?.parts?.length - 1)}
            >
              Nộp bài
            </ButtonCustom>
          </>
        )} */}
      </div>
    </div>
  );
}
