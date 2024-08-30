import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import InputCustom from "../../../../components/Input";
import ButtonCustom from "../../../../components/Button";
import demo_1_1 from "../../../../assets/vocabExercises/1_1.png";
import demo_1_2 from "../../../../assets/vocabExercises/1_2.png";
import demo_1_3 from "../../../../assets/vocabExercises/1_3.png";
import demo_2_1 from "../../../../assets/vocabExercises/2_1.png";
import demo_2_2 from "../../../../assets/vocabExercises/2_2.png";
import demo_2_3 from "../../../../assets/vocabExercises/2_3.png";

export default function VocabularyExercises() {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [exercises, setExercises] = useState(null);
  const { exerciseId, exerciseType } = useParams();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctPairs, setCorrectPairs] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [shuffleQuestions, setShuffleQuestions] = useState([]);
  const [selectedAnswersPart2, setSelectedAnswersPart2] = useState({});
  const [submittedPart2, setSubmittedPart2] = useState({});
  const [inputValuePart3, setInputValuePart3] = useState({});
  const [submittedPart3, setsubmittedPart3] = useState({});
  const [userScore, setUserScore] = useState(0);
  const [part2andPart3Submitted, setPart2andPart3Submitted] = useState(false);
  const [submittedPart1, setSubmittedPart1] = useState(false);
  useEffect(() => {
    fetch(
      `http://localhost:9999/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res && res.length > 0) {
          setExercises(res[0]);
        }
      });
  }, [exerciseId, exerciseType]);

  const vocabImg = {
    demo_1_1: demo_1_1,
    demo_1_2: demo_1_2,
    demo_1_3: demo_1_3,
    demo_2_1: demo_2_1,
    demo_2_2: demo_2_2,
    demo_2_3: demo_2_3,
  };
  const handleResetSelections = () => {
    setSelectedQuestion(null);
    setSelectedAnswer(null);
  };

  const checkMatch = (question, answer) => {
    if(!submittedPart1 && question && answer){
      if (question && answer) {
        if (question.id === answer.id) {
          setCorrectPairs((prev) => [...prev, question.id]);
          setUserScore((prevScore) => prevScore++);
          handleResetSelections();
        } else {
          setTimeout(() => {
            handleResetSelections();
          }, 500);
        }
      }
    }
  };

  const handleSubmitPart1 = () => {
    setSubmittedPart1(true);
    setUserScore(prevScore => prevScore + 1); 
    setPart2andPart3Submitted(true);
  }

  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
    checkMatch(question, selectedAnswer);
  };

  const handleSelectAnswers = (answer) => {
    setSelectedAnswer(answer);
    checkMatch(selectedQuestion, answer);
  };

  const handleNextPart = () => {
    if (exercises && currentPartIndex < exercises.parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };

  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  useEffect(() => {
    if (exercises) {
      const currentPart = exercises.parts[currentPartIndex];
      if (currentPart && currentPart.partType === "type_1") {
        setShuffledAnswers(shuffleArray(currentPart.answers));
        setShuffleQuestions(shuffleArray(currentPart.questions));
      }
    }
  }, [exercises, currentPartIndex]);

  const shuffleArray = (array) => {
    return array
      .map((value) => ({
        value,
        sort: Math.random(),
      }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const renderPart1 = (part) => {
    return (
      <>
            <Row gutter={[16, 16]} style={{ paddingTop: "25px" }}>
        <Col span={12}>
          {shuffleQuestions.map((question) => (
            <Row key={question.id} align="middle">
              <Col
                span={12}
                style={{ paddingBottom: "24px", paddingLeft: "12px" }}
              >
                <ButtonCustom
                  buttonType="primary"
                  onClick={() => handleSelectQuestion(question)}
                  style={{
                    backgroundColor: correctPairs.includes(question.id)
                      ? "#5FD855"
                      : selectedQuestion?.id === question.id
                      ? "#A8703E"
                      : "",
                  }}
                >
                  {question.question}
                </ButtonCustom>
              </Col>
            </Row>
          ))}
        </Col>
        <Col span={12}>
          {shuffledAnswers.map((answer) => (
            <Row key={answer.id} align="middle">
              <Col
                span={12}
                style={{ paddingBottom: "24px", paddingLeft: "12px" }}
              >
                <ButtonCustom
                  buttonType="primary"
                  onClick={() => handleSelectAnswers(answer)}
                  style={{
                    backgroundColor: correctPairs.includes(answer.id)
                      ? "#5FD855"
                      : selectedAnswer?.id === answer.id
                      ? "#A8703E"
                      : "",
                  }}
                >
                  {answer?.answer}
                </ButtonCustom>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
      <Row align={"bottom"} justify={"end"} style={{marginTop: '30px'}}>
      <ButtonCustom buttonType="secondary" onClick={handleSubmitPart1}>
          Check đáp án
        </ButtonCustom>
      </Row>
      </>

    );
  };

  const handleSelectAnswersPart2 = (questionId, optionId) => {
    setSelectedAnswersPart2((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmitPart2 = () => {
    let scorePart2 = 0;
    const updatedSubmittedPart2 = {};
    exercises.parts[currentPartIndex].questions.forEach((question) => {
      const correctAnswer = question.options.find(
        (option) => option.id === question.answer
      );
      const userAnswer = selectedAnswersPart2[question.id];
      const isCorrect = userAnswer === correctAnswer.id;
      if (isCorrect) {
        scorePart2++;
      }
      updatedSubmittedPart2[question.id] = {
        isCorrect: isCorrect,
        selectedAnswer: userAnswer,
      };
    });
    setSubmittedPart2(updatedSubmittedPart2);
    setUserScore((prevScore) => prevScore + scorePart2);
    setPart2andPart3Submitted(true);
  };

  const renderPart2 = (part) => {
    return (
      <div>
        {part.questions.map((question) => {
          return (
            <Row
              key={question.id}
              gutter={[16, 16]}
              style={{
                paddingTop: "25px",
                paddingLeft: "40px",
                paddingRight: "40px",
              }}
            >
              <Col span={24} style={{ paddingBottom: "24px" }}>
                <TextCustom style={{ fontWeight: "bold" }}>
                  {question.questionText}
                </TextCustom>
                <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                  {question.options.map((option) => {
                    const isCorrectOption = option.id === question.answer;
                    const isUserSelected =
                      option.id === selectedAnswersPart2[question.id];
                    const backgroundColor = submittedPart2[question.id]
                      ? isCorrectOption
                        ? "#5FD855"
                        : isUserSelected
                        ? "red"
                        : ""
                      : isUserSelected
                      ? "#A8703E"
                      : "";

                    return (
                      <Col
                        span={8}
                        key={option.id}
                        style={{ textAlign: "center" }}
                      >
                        <ButtonCustom
                          buttonType="primary"
                          onClick={() =>
                            !submittedPart2[question.id] &&
                            handleSelectAnswersPart2(question.id, option.id)
                          }
                          style={{ backgroundColor }}
                          disabled={!!submittedPart2[question.id]}
                        >
                          {option.id}
                        </ButtonCustom>
                        <img
                          src={vocabImg[option.optionImage]}
                          alt={`Option ${option.id}`}
                          style={{ width: "50%" }}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          );
        })}
        <Row align={"bottom"} justify="end" style={{ marginTop: "30px" }}>
          <ButtonCustom buttonType="secondary" onClick={handleSubmitPart2}>
            Check đáp án
          </ButtonCustom>
        </Row>
      </div>
    );
  };

  const handleInputChangePart3 = (index, value) => {
    setInputValuePart3((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmitPart3 = () => {
    let scorePart3 = 0;
    const updatedSubmittedPart3 = {};
    const correctAnswers = exercises.parts[currentPartIndex]?.answers || [];

    correctAnswers.forEach((correctAnswer, index) => {
      const userAnswer = inputValuePart3[index];
      const isCorrect =
        userAnswer?.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
      if (isCorrect) {
        scorePart3++;
      }
      updatedSubmittedPart3[index] = {
        isCorrect: isCorrect,
        selectedAnswer: userAnswer,
      };
    });

    setsubmittedPart3(updatedSubmittedPart3);
    setUserScore((prevScore) => prevScore + scorePart3);
    setPart2andPart3Submitted(true);
  };

  const renderPart3 = (part) => {
    const months = Array(12).fill("");

    return (
      <div style={{ marginLeft: "80px", marginRight: "80px" }}>
        <Row gutter={[16, 16]} style={{ paddingTop: "25px" }}>
          <Col span={24}>
            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
              {months.map((_, index) => {
                const isSubmitted = submittedPart3[index];
                const borderColor =
                  isSubmitted && isSubmitted.isCorrect
                    ? "#5FD855"
                    : isSubmitted
                    ? "red"
                    : "";
                const textColor =
                  isSubmitted && isSubmitted.isCorrect
                    ? "#5FD855"
                    : isSubmitted
                    ? "red"
                    : "";
                return (
                  <>
                    <Col span={6} key={index} style={{ paddingBottom: "24px" }}>
                      {index === 0 ? (
                        <>
                          <InputCustom
                            placeholder="Januar"
                            readOnly
                            style={{ backgroundColor: "#D9D9D9" }}
                          />
                        </>
                      ) : (
                        <>
                          <InputCustom
                            placeholder={index === 1 ? "Feb..." : ""}
                            onChange={(e) =>
                              handleInputChangePart3(index, e.target.value)
                            }
                            style={{ borderColor: borderColor }}
                            disabled={isSubmitted}
                          />
                          {isSubmitted && (
                            <TextCustom style={{ color: textColor }}>
                              {part?.answers[index]}
                            </TextCustom>
                          )}
                        </>
                      )}
                    </Col>
                  </>
                );
              })}
            </Row>
          </Col>
        </Row>
        <Row align={"bottom"} justify={"end"}>
          <ButtonCustom buttonType="secondary" onClick={handleSubmitPart3}>
            Check đáp án
          </ButtonCustom>
        </Row>
      </div>
    );
  };

  const renderPart = () => {
    const currentPart = exercises.parts[currentPartIndex];
    switch (currentPart.partType) {
      case "type_1":
        return renderPart1(currentPart);

      case "type_2":
        return renderPart2(currentPart);

      case "type_3":
        return renderPart3(currentPart);

      default:
        return <div>No valid part type found.</div>;
    }
  };

  if (!exercises) {
    return <div>Loading...</div>;
  }

  const totalQuestions = exercises?.parts.reduce((acc, part) => {
    if (part.questions) {
      return acc + part.questions.length;
    }
    if (part.answers) {
      return acc + part.answers.length - 1;
    }
    return acc;
  }, 0);
  const mark = ((userScore / totalQuestions) * 100).toFixed(2);
  

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom
        level={2}
        style={{ fontWeight: "bold", paddingLeft: "40px" }}
      >
        {exercises?.title}
      </TitleCustom>

      {part2andPart3Submitted && (
        <div style={{ textAlign: "center" }}>
          <TextCustom style={{ textAlign: "center" }}>
            Điểm:&nbsp;
            <span style={{ color: "red" }}>
              {userScore}/{totalQuestions}
            </span>
            <span
              style={{ color: "red", marginLeft: "10px", fontWeight: "bold" }}
            >
              ({mark}%)
            </span>
          </TextCustom>
        </div>
      )}

      <div>
        <TextCustom
          style={{ color: "red", fontWeight: "bold", paddingLeft: "40px" }}
        >
          {exercises?.parts[currentPartIndex]?.partName}
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
        <ButtonCustom
          buttonType="secondary"
          style={{ padding: "23px", marginLeft: "100px" }}
        >
          Chuyển sang bài tập tiếp theo
        </ButtonCustom>
      </div>
    </div>
  );
}
