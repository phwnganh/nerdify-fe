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

import { PART_TYPE } from "../../../constants";
import ButtonCustom from "../../../../components/Button";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
import { Col, Radio, Row } from "antd";
import InputCustom from "../../../../components/Input";
import { submitExercise } from "../../../services/LearnerService";

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

export default function VocabularyExercises({ exercises }) {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [shuffledMatchedQuestions, setShuffledMatchedQuestions] = useState([]);
  const [shuffleQuestions, setShuffleQuestions] = useState([]);
  const [selectedPairsPart1, setSelectedPairsPart1] = useState({});
  const [availablePairs, setAvailablePairs] = useState([{}]);
  const [selectedAnswersPart2, setSelectedAnswersPart2] = useState({});
  const [inputValuePart3, setInputValuePart3] = useState(() => {
    const initialValues = {};
    exercises.parts[2].questions.forEach((question, index) => {
      initialValues[question._id] = index === 0 ? question.options[0].text : "";
    });
    return initialValues;
  });
  const [submissionData, setSubmissionData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log("exercises", exercises);
  console.log("submissionData", submissionData);
  console.log("questions", questions);

  const shuffleArray = (array) => {
    return array
      .map((value) => ({
        value,
        sort: Math.random(),
      }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  useEffect(() => {
    if (exercises) {
      const currentPart = exercises.parts[currentPartIndex];
      if (currentPart && currentPart.partType === "matching") {
        setShuffledMatchedQuestions(shuffleArray(currentPart.questions));
        setShuffleQuestions(shuffleArray(currentPart.questions));
        setQuestions(currentPart.questions);
      }
    }
  }, [exercises, currentPartIndex]);

  useEffect(() => {
    if (availablePairs.question && availablePairs.matchQuestion) {
      handlePairSelectionPart1(availablePairs);
    }
  }, [availablePairs]);

  const handleNextPart = () => {
    if (exercises && currentPartIndex < exercises.parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };

  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (!exercises) {
    return <div>Loading...</div>;
  }

  const onChangeQues = (e) => {
    const selectedQuestionId = e.target.value;
    setAvailablePairs((prev) => ({
      ...prev,
      question: selectedQuestionId,
    }));
    if (availablePairs.matchQuestion) {
      handlePairSelectionPart1({
        question: availablePairs.question,
        matchQuestion: selectedQuestionId,
      });
    }
  };

  const onChangeMatchQues = (e) => {
    const selectedMatchQuestionId = e.target.value;
    setAvailablePairs((prev) => ({
      ...prev,
      matchQuestion: selectedMatchQuestionId,
    }));
    if (availablePairs.question) {
      handlePairSelectionPart1({
        question: availablePairs.question,
        matchQuestion: selectedMatchQuestionId,
      });
    }
  };

  const handlePairSelectionPart1 = (pair) => {
    if (pair.question && pair.matchQuestion) {
      setSelectedPairsPart1((prev) => {
        const updatedPairs = { ...prev };

        updatedPairs[pair.question] = pair.matchQuestion;

        setSelectedQuestions((prev) => [...prev, pair.question]);
        setSelectedMatches((prev) => [...prev, pair.matchQuestion]);

        return updatedPairs;
      });

      setAvailablePairs((prev) => ({
        ...prev,
        question: "",
        matchQuestion: "",
      }));
    }
  };

  const handleSelectAnswersPart2 = (questionId, optionId) => {
    setSelectedAnswersPart2((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleInputChangePart3 = (index, value) => {
    setInputValuePart3((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = () => {
    const submissionAnswersPart1 = exercises.parts[0].questions.map((question) => {
      return {
        questionId: question._id,
        userAnswer: questions.find((q) => q._id === selectedPairsPart1[question._id])?.options[0].text,
      };
    });

    const submissionAnswersPart2 = exercises.parts[1].questions.map((question) => {
      return {
        questionId: question._id,
        userAnswer: selectedAnswersPart2[question._id],
      };
    });

    const submissionAnswersPart3 = exercises.parts[2].questions.map((question) => {
      return {
        questionId: question._id,
        userAnswer: inputValuePart3[question._id],
      };
    });

    submitExercise({
      exerciseId: exercises._id,
      userSelected: [...submissionAnswersPart1, ...submissionAnswersPart2, ...submissionAnswersPart3],
    })
      .then((resp) => {
        setSubmissionData(resp.data);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDoAgain = () => {
    setSelectedPairsPart1({});
    setSelectedQuestions([]);
    setSelectedMatches([]);
    setSelectedAnswersPart2({});
    setInputValuePart3({});
    setCurrentPartIndex(0);
    setIsSubmitted(false);
  };

  const renderPart1 = (part) => {
    const totalQuestion = isSubmitted && submissionData?.partLengths[0];
    return (
      <>
        {!isSubmitted && (
          <>
            <Row
              gutter={[16, 16]}
              style={{
                paddingTop: "25px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Col span={8}>
                <Radio.Group onChange={onChangeQues}>
                  {shuffleQuestions.map((ques, index) => (
                    <Row key={index} align="middle">
                      <Col span={24} style={{ paddingBottom: "24px", paddingLeft: "12px" }}>
                        <Radio.Button
                          value={ques._id}
                          style={{
                            backgroundColor: availablePairs.question === ques._id ? "#A8703E" : "#ffa751",
                            borderRadius: "100px",
                            border: "none",
                            color: "white",
                            pointerEvents: isSubmitted ? "none" : selectedQuestions.includes(ques._id) ? "none" : "auto",
                            opacity: isSubmitted ? 0.5 : selectedQuestions.includes(ques._id) ? 0.5 : 1,
                          }}
                          onClick={() =>
                            handlePairSelectionPart1({
                              question: ques._id,
                              matchQuestion: selectedPairsPart1[ques._id] || "",
                            })
                          }
                        >
                          <p
                            style={{
                              margin: "0",
                              whiteSpace: "nowrap",
                              userSelect: "none",
                            }}
                          >
                            {ques.question}
                          </p>
                        </Radio.Button>
                      </Col>
                    </Row>
                  ))}
                </Radio.Group>
              </Col>
              <Col span={8}>
                <Radio.Group onChange={onChangeMatchQues}>
                  {shuffledMatchedQuestions.map((matchQues, index) => (
                    <Row key={index} align="middle">
                      <Col span={24} style={{ paddingBottom: "24px", paddingLeft: "12px" }}>
                        <Radio.Button
                          value={matchQues._id}
                          style={{
                            backgroundColor: availablePairs.matchQuestion === matchQues._id ? "#A8703E" : "#ffa751",
                            borderRadius: "100px",
                            border: "none",
                            color: "white",
                            pointerEvents: isSubmitted ? "none" : selectedMatches.includes(matchQues._id) ? "none" : "auto",
                            opacity: isSubmitted ? 0.5 : selectedMatches.includes(matchQues._id) ? 0.5 : 1,
                          }}
                          onClick={() =>
                            handlePairSelectionPart1({
                              question: availablePairs.question,
                              matchQuestion: matchQues._id,
                            })
                          }
                        >
                          <p
                            style={{
                              margin: "0",
                              whiteSpace: "nowrap",
                              userSelect: "none",
                            }}
                          >
                            {matchQues.options[0].text}
                          </p>
                        </Radio.Button>
                      </Col>
                    </Row>
                  ))}
                </Radio.Group>
              </Col>
              <Col span={4}></Col>
            </Row>

            <div style={{ marginTop: "30px" }}>
              <TitleCustom level={4}>Selected Pairs:</TitleCustom>
              {Object.entries(selectedPairsPart1).map(([questionId, matchQuestionId]) => {
                const questionText = questions.find((q) => q._id === questionId)?.question;
                const matchQuestionText = questions.find((m) => m._id === matchQuestionId)?.options[0].text;

                return (
                  <Row
                    key={`${questionId}-${matchQuestionId}`}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <Col span={12}>Question: {questionText}</Col>
                    <Col span={12}>Match: {matchQuestionText}</Col>
                  </Row>
                );
              })}
            </div>
          </>
        )}

        {isSubmitted && (
          <>
            <Row
              gutter={[16, 16]}
              style={{
                paddingTop: "25px",
                display: "flex",
                justifyContent: "center",
              }}
            >
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
                              <p
                                style={{
                                  margin: "0",
                                  whiteSpace: "nowrap",
                                  userSelect: "none",
                                }}
                              >
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
                              <p
                                style={{
                                  margin: "0",
                                  whiteSpace: "nowrap",
                                  userSelect: "none",
                                }}
                              >
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
                      <Row
                        key={submission._id}
                        style={{
                          color: isSubmitted ? (submission.isCorrect ? "rgb(95, 216, 85)" : "red") : "",
                        }}
                      >
                        <Col
                          style={{
                            paddingBottom: "24px",
                            paddingLeft: "12px",
                            height: "56px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {isSubmitted ? (
                            submission.isCorrect ? (
                              "Đúng"
                            ) : (
                              <p
                                style={{
                                  margin: "0",
                                  whiteSpace: "nowrap",
                                  userSelect: "none",
                                  width: "100%",
                                }}
                              >
                                Đáp án:
                                <br /> {submission.questionId.question} - {submission.questionId.options[0].text}
                              </p>
                            )
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                    ),
                )}
              </Col>
            </Row>
          </>
        )}
      </>
    );
  };

  const renderPart2 = (exercise) => {
    return (
      <div>
        {exercise.questions.map((question, index) => {
          const submission = submissionData?.submissionAnswer.find((answer) => answer.questionId._id === question._id);
          return (
            <Row
              key={index}
              gutter={[16, 16]}
              style={{
                paddingTop: "25px",
                paddingLeft: "40px",
                paddingRight: "40px",
              }}
            >
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
                            backgroundColor: isSubmitted
                              ? isSelected && isCorrect
                                ? "rgb(95, 216, 85)"
                                : isSelected
                                ? "red"
                                : isCorrect
                                ? "rgb(95, 216, 85)"
                                : ""
                              : selectedAnswersPart2[question._id] === option._id
                              ? "#A8703E"
                              : "",
                            pointerEvents: isSubmitted ? "none" : "auto",
                          }}
                          onClick={() => handleSelectAnswersPart2(question._id, option._id)}
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
    const totalQuestion = isSubmitted && submissionData?.partLengths[2];

    return (
      <div style={{ marginLeft: "80px", marginRight: "80px" }}>
        <Row gutter={[16, 16]} style={{ paddingTop: "25px" }}>
          <Col span={24}>
            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
              {!isSubmitted &&
                questions.map((question, index) => {
                  return (
                    <Col span={6} key={index} style={{ paddingBottom: "24px" }}>
                      <TextCustom style={{ color: "" }}>{question.question}</TextCustom>
                      <InputCustom
                        //if first question => value = answer and disabled
                        value={index === 0 ? question.options[0].text : inputValuePart3[question._id]}
                        onChange={(e) => handleInputChangePart3(question._id, e.target.value)}
                        style={{
                          borderColor: index === 0 || (isSubmitted ? (inputValuePart3[question._id]?.toLowerCase() === question.options[0].text.toLowerCase() ? "rgb(95, 216, 85)" : "red") : ""),
                        }}
                        disabled={isSubmitted || index === 0}
                      />
                      {isSubmitted && (
                        <TextCustom style={{ color: "red" }}>
                          {index === 0 || inputValuePart3[question._id]?.toLowerCase() === question.options[0].text.toLowerCase() ? "" : question.options[0].text}
                        </TextCustom>
                      )}
                    </Col>
                  );
                })}
              {isSubmitted &&
                submissionData?.submissionAnswer.slice(-totalQuestion).map((submission, index) => {
                  return (
                    <Col span={6} key={index} style={{ paddingBottom: "24px" }}>
                      <TextCustom style={{ color: "" }}> {submission.questionId.question}</TextCustom>
                      <InputCustom
                        value={submission.userAnswer}
                        style={{
                          borderColor: submission.isCorrect ? "rgb(95, 216, 85)" : "red",
                        }}
                        disabled
                      />
                      {submission.isCorrect || <TextCustom style={{ color: "red" }}>{submission.questionId.options[0].text}</TextCustom>}
                    </Col>
                  );
                })}
            </Row>
          </Col>
        </Row>
      </div>
    );
  };
  // const renderPart3 = (part) => {
  //   const { questions } = part;
  //   return (
  //     <div style={{ marginLeft: "80px", marginRight: "80px" }}>
  //       <Row gutter={[16, 16]} style={{ paddingTop: "25px" }}>
  //         <Col span={24}>
  //           <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
  //             {questions.map((question, index) => {
  //               const submission = submissionData?.submissionAnswer.find((answer) => answer.questionId._id === question._id);
  //               const userAnswer = submission?.userAnswer || "";
  //               const correctAnswer = question.options[0].text;
  //               const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
  //               return (
  //                 <Col span={6} key={index} style={{ paddingBottom: "24px" }}>
  //                   <TextCustom style={{ color: "" }}>{question.question}</TextCustom>
  //                   <InputCustom
  //                     value={index === 0 ? question.options[0].text : inputValuePart3[question._id]}
  //                     onChange={(e) => handleInputChangePart3(question._id, e.target.value)}
  //                     style={{
  //                       borderColor: index === 0 || (isSubmitted ? (isCorrect ? "rgb(95, 216, 85)" : "red") : ""),
  //                     }}
  //                     disabled={isSubmitted || index === 0}
  //                   />
  //                   {isSubmitted && !isCorrect && <TextCustom style={{ color: "red" }}>{correctAnswer}</TextCustom>}
  //                 </Col>
  //               );
  //             })}
  //           </Row>
  //         </Col>
  //       </Row>
  //     </div>
  //   );
  // };

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

      {/* sau khi nop bai */}

      {isSubmitted && (
        <div style={{ textAlign: "center" }}>
          <TextCustom style={{ textAlign: "center" }}>
            Điểm:&nbsp;
            <span style={{ color: "red" }}>{submissionData.score}%</span>
          </TextCustom>
        </div>
      )}

      <div>
        <TextCustom style={{ color: "red", fontWeight: "bold", paddingLeft: "40px" }}>{exercises?.parts[currentPartIndex]?.partName}</TextCustom>
        {renderPart()}
      </div>

      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <ButtonCustom buttonType="secondary" style={{ marginRight: "100px", padding: "23px" }} onClick={handlePreviousPart} disabled={currentPartIndex === 0}>
          Phần trước
        </ButtonCustom>
        <ButtonCustom buttonType="secondary" style={{ padding: "23px" }} onClick={handleNextPart} disabled={currentPartIndex === exercises.parts.length - 1}>
          Phần tiếp theo
        </ButtonCustom>
        {isSubmitted ? (
          <>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "100px" }}>
              Chuyển sang bài tập tiếp theo
            </ButtonCustom>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "100px" }} onClick={handleDoAgain}>
              Làm lại
            </ButtonCustom>
          </>
        ) : (
          <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "100px" }} onClick={handleSubmit}>
            Nộp bài
          </ButtonCustom>
        )}
      </div>
    </div>
  );
}