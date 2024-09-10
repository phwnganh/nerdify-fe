import { Input, Row } from "antd";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import InputCustom from "../../../../components/Input";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonCustom from "../../../../components/Button";
import { PART_TYPE } from "../../../../constants";

export default function GrammarExercises() {
  const [exercises, setExercises] = useState(null); // Initialize with null
  const [userAnswers, setUserAnswers] = useState({});
  const { exerciseType, exerciseId } = useParams();
  const [userScore, setUserScore] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState({});
  const [partResults, setPartResults] = useState({
    part1: null,
    part2: null,
    part3: null
  })

  useEffect(() => {
    fetch(
      `http://localhost:9999/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setExercises(data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [exerciseId, exerciseType]);

  const handleInputChange = (
    partKey,
    questionIndex,
    subQuestionIndex,
    value
  ) => {
    setUserAnswers({
      ...userAnswers,
      [`${partKey}-${questionIndex}-${subQuestionIndex}`]: value,
    });
  };

  const handleToggleAnswerDetail = (questionId) => {
    setToggleAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  const renderPart = (currentPart, partKey) => {
    return (
      <div>
        {currentPart?.questions?.map((question, index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            <TextCustom style={{ fontWeight: "bold" }}>
              Câu {question.id}:{" "}
            </TextCustom>
            <div style={{ marginTop: "20px" }}>
              {Array.isArray(question.question) ? (
                question.question.map((subQuestion, subIndex) => (
                  <div key={subIndex} style={{ marginBottom: "10px" }}>
                    {subQuestion.includes("___") ? (
                      subQuestion.split("___").map((text, i) => (
                        <span key={i}>
                          {i > 0 && (
                            <InputCustom
                              style={{ width: "150px", marginRight: "8px" }}
                              value={
                                userAnswers[
                                  `${partKey}-${index}-${subIndex}`
                                ] || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  partKey,
                                  index,
                                  subIndex,
                                  e.target.value
                                )
                              }
                            />
                          )}
                          {text}
                        </span>
                      ))
                    ) : (
                      <span>{subQuestion}</span>
                    )}
                  </div>
                ))
              ) : question.question.includes("___") ? (
                question.question.split("___").map((text, i) => (
                  <span key={i}>
                    {i > 0 && (
                      <InputCustom
                        style={{ width: "150px", marginRight: "8px" }}
                        value={userAnswers[`${partKey}-${index}-0`] || ""}
                        onChange={(e) =>
                          handleInputChange(partKey, index, 0, e.target.value)
                        }
                      />
                    )}
                    {text}
                  </span>
                ))
              ) : (
                <span>{question.question}</span>
              )}
            </div>
          </div>
        ))}
        <Row justify={"end"}>
        {!partResults[`part${currentPartIndex + 1}`] && (
              <ButtonCustom
                buttonType="secondary"
                // onClick={() =>
                //   handleSubmitPart(
                //     `part${currentPartIndex + 1}`,
                //     currentPart.questions
                //   )
                // }
              >
                Nộp bài
              </ButtonCustom>
            )}
        </Row>
      </div>
    );
  };

  // Ensure exercises is set and has parts before trying to access them
  const currentPart = exercises?.parts?.[currentPartIndex];

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises?.title || "Loading..."}
      </TitleCustom>
      {currentPart && (
        <>
          <TextCustom style={{ color: "red", fontWeight: "bold" }}>
            {currentPart.partName}
          </TextCustom>
          {currentPart.partType === PART_TYPE.FILL_IN_THE_BLANK &&
            renderPart(currentPart, `part${currentPartIndex + 1}`)}
        </>
      )}
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <ButtonCustom
          buttonType="secondary"
          style={{ padding: "23px" }}
          onClick={() => setCurrentPartIndex((prev) => prev - 1)}
          disabled={currentPartIndex === 0}
        >
          Phần trước
        </ButtonCustom>
        <ButtonCustom
          buttonType="secondary"
          style={{ padding: "23px", marginLeft: "30px" }}
          onClick={() => setCurrentPartIndex((prev) => prev + 1)}
          disabled={
            !exercises || currentPartIndex === exercises.parts.length - 1
          }
        >
          Phần tiếp theo
        </ButtonCustom>
        <ButtonCustom
          buttonType="secondary"
          style={{ padding: "23px", marginLeft: "30px" }}
          // onClick={handleSubmit}
        >
          Hoàn thành
        </ButtonCustom>
      </div>
    </div>
  );
}
