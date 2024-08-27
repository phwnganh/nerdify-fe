import { useEffect, useState } from "react";
import StartExamModal from "./ModalBeforeDoingExam";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
import {
  ParagraphCustom,
  TextCustom,
  TitleCustom,
} from "../../../components/Typography";
import { Col, Row } from "antd";
import ButtonCustom from "../../../components/Button";
import demo_1_1 from "../../../assets/vocabExercises/1_1.png";
import demo_1_2 from "../../../assets/vocabExercises/1_2.png";
import demo_1_3 from "../../../assets/vocabExercises/1_3.png";
import demo_2_1 from "../../../assets/vocabExercises/2_1.png";
import demo_2_2 from "../../../assets/vocabExercises/2_2.png";
import demo_2_3 from "../../../assets/vocabExercises/2_3.png";

export default function FinalExam() {
  const [hasStarted, setHasStarted] = useState(false);
  const [exam, setExam] = useState([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentResultPartIndex, setCurrentResultPartIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [userAnswers, setUserAnswers] = useState({});
  const [userScore, setUserScore] = useState(0);
  const [examResults, setExamResults] = useState(null);

  const currentPart = exam.parts?.[currentPartIndex];
  const scoreResultCurrentPart = examResults?.[currentResultPartIndex];
  const imgArrVocab = [
    demo_1_1,
    demo_1_2,
    demo_1_3,
    demo_2_1,
    demo_2_2,
    demo_2_3,
  ];

  const handleStart = () => {
    setHasStarted(true);
  };

  useEffect(() => {
    fetch(`http://localhost:9999/finalexam/1`)
      .then((res) => res.json())
      .then((res) => {
        setExam(res);
      })
      .catch((err) => console.log("error", err));
  }, []);

  useEffect(() => {
    if (examResults) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleNextPart = () => {
    if (exam && currentPartIndex < exam.parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };

  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextResultPart = () => {
    if (examResults && currentResultPartIndex < examResults.length - 1) {
      setCurrentResultPartIndex(currentResultPartIndex + 1);
    }
  };

  const handlePreviousResultPart = () => {
    setCurrentResultPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (!exam?.parts) {
    return <div>Loading...</div>;
  }

  const handleSelectOptions = (questionId, optionId) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: optionId,
    });
  };

  const handleSubmit = () => {
    let score = 0;
    const results = exam.parts.map((part) => {
      return {
        ...part,
        questions: part.questions.map((question) => {
          const userAnswer = userAnswers[question.id];
          const correctAnswers = part.answers.find(
            (answer) => answer.id === question.id
          )?.answer;
          const isCorrect = userAnswer === correctAnswers;
          if (isCorrect) {
            score++;
          }
          return {
            ...question,
            userAnswer,
            correctAnswers,
            isCorrect,
          };
        }),
      };
    });
    setExamResults(results);
    setUserScore(score);
    clearInterval(window.timer);
  };

  const mark = (
    (userScore /
      exam.parts.reduce((acc, part) => acc + part.questions.length, 0)) *
    100
  ).toFixed(2);

  return (
    <div>
      {!hasStarted && <StartExamModal onStart={handleStart}></StartExamModal>}
      {hasStarted && (
        <div style={{ padding: "24px" }}>
          <BreadCrumbHome />
          <TitleCustom level={2} style={{ fontWeight: "bold" }}>
            {exam.title}
          </TitleCustom>
          <div style={{ textAlign: "center" }}>
            <TextCustom>
              Thời gian làm bài:{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {formattedTime(timeLeft)}
              </span>
            </TextCustom>
          </div>

          {!examResults ? (
            <div>
              <TextCustom
                style={{ color: "red", fontWeight: "bold", paddingTop: "20px" }}
              >
                {currentPart.partName}
              </TextCustom>
              {currentPart.questions.map((question, index) => (
                <div key={question.id}>
                  <TextCustom style={{ paddingTop: "20px" }}>
                    Câu {question.id}: {question.question}
                  </TextCustom>
                  {question.questionParagraph && (
                    <ParagraphCustom>
                      {question.questionParagraph}
                    </ParagraphCustom>
                  )}
                  <div style={{ marginTop: "20px" }}>
                    <Row gutter={[16, 16]} style={{ textAlign: "center" }}>
                      {question.options.map((option, index) => (
                        <Col key={index} span={8}>
                          <ButtonCustom
                            buttonType="primary"
                            onClick={() =>
                              handleSelectOptions(question.id, option.id)
                            }
                            style={{
                              backgroundColor:
                                userAnswers[question.id] === option.id
                                  ? "#A8703E"
                                  : "",
                            }}
                          >
                            {option.image ? (
                              <span>{option.id}</span>
                            ) : (
                              <div>
                                <span>
                                  {Array.isArray(option.text)
                                    ? `${option.id}. ${option.text.join(" - ")}`
                                    : `${option.id}. ${option.text}`}
                                </span>
                              </div>
                            )}
                          </ButtonCustom>
                        </Col>
                      ))}
                    </Row>
                    {question.options.some((option) => option.image) && (
                      <Row
                        gutter={[16, 16]}
                        style={{ marginTop: "20px", textAlign: "center" }}
                      >
                        {question.options
                          .filter((option) => option.image)
                          .map((option, index) => (
                            <Col key={index} span={8}>
                              <img
                                src={imgArrVocab[index]}
                                style={{ width: "50%" }}
                              />
                            </Col>
                          ))}
                      </Row>
                    )}
                  </div>
                </div>
              ))}
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
                  style={{ marginRight: "100px", padding: "23px" }}
                  onClick={handleNextPart}
                  disabled={currentPartIndex === exam.parts.length - 1}
                >
                  Phần tiếp theo
                </ButtonCustom>
                <ButtonCustom
                  buttonType="secondary"
                  style={{ padding: "23px" }}
                  onClick={handleSubmit}
                >
                  Nộp bài
                </ButtonCustom>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ textAlign: "center" }}>
                <TextCustom style={{ textAlign: "center" }}>
                  Điểm:&nbsp;
                  <span style={{ color: "red" }}>
                    {userScore}/
                    {exam.parts.reduce(
                      (acc, part) => acc + part.questions.length,
                      0
                    )}
                  </span>
                  <span style={{ color: "red", marginLeft: "10px", fontWeight: 'bold' }}>
                    ({mark}%)
                  </span>
                </TextCustom>
              </div>

              <div>
                <TextCustom
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    paddingTop: "20px",
                  }}
                >
                  {scoreResultCurrentPart.partName}
                </TextCustom>
                {scoreResultCurrentPart.questions.map((question) => (
                  <div key={question.id}>
                    <TextCustom style={{ paddingTop: "24px" }}>
                      Câu {question.id}: {question.question}
                    </TextCustom>
                    <div style={{ marginTop: "20px" }}>
                      <Row gutter={[16, 16]} style={{ textAlign: "center" }}>
                        {question.options.map((option, index) => {
                          const isCorrectOption =
                            option.id === question.correctAnswers;
                          const isUserSelected =
                            option.id === question.userAnswer;
                          const backgroundColor = isCorrectOption
                            ? "#5FD855"
                            : isUserSelected && !question.isCorrect
                            ? "red"
                            : "";

                          return (
                            <Col key={index} span={8}>
                              <ButtonCustom
                                buttonType="primary"
                                style={{ backgroundColor }}
                                disabled
                              >
                                {option.image ? (
                                  <span>{option.id}</span>
                                ) : (
                                  <div>
                                    <span>
                                      {Array.isArray(option.text)
                                        ? `${option.id}. ${option.text.join(
                                            " - "
                                          )}`
                                        : `${option.id}. ${option.text}`}
                                    </span>
                                  </div>
                                )}
                              </ButtonCustom>
                            </Col>
                          );
                        })}
                      </Row>
                      {question.options.some((option) => option.image) && (
                        <Row
                          gutter={[16, 16]}
                          style={{ marginTop: "20px", textAlign: "center" }}
                        >
                          {question.options
                            .filter((option) => option.image)
                            .map((option, index) => (
                              <Col key={index} span={8}>
                                <img
                                  src={imgArrVocab[index]}
                                  style={{ width: "50%" }}
                                />
                              </Col>
                            ))}
                        </Row>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", paddingTop: "50px" }}>
                <ButtonCustom
                  buttonType="secondary"
                  style={{ marginRight: "100px", padding: "23px" }}
                  onClick={handlePreviousResultPart}
                  disabled={currentResultPartIndex === 0}
                >
                  Phần trước
                </ButtonCustom>
                <ButtonCustom
                  buttonType="secondary"
                  style={{ marginRight: "100px", padding: "23px" }}
                  onClick={handleNextResultPart}
                  disabled={currentResultPartIndex === examResults.length - 1}
                >
                  Phần tiếp theo
                </ButtonCustom>
                {(userScore < 12 && mark < 60) ? (
                  <>
                    <ButtonCustom
                      buttonType="secondary"
                      style={{ marginRight: "100px", padding: "23px" }}
                    >
                      Làm lại bài kiểm tra
                    </ButtonCustom>
                    <ButtonCustom
                      buttonType="secondary"
                      style={{ marginRight: "100px", padding: "23px" }}
                    >
                      Quay về luyện tập
                    </ButtonCustom>
                  </>
                ) : (
                  <>
                    <ButtonCustom
                      buttonType="secondary"
                      style={{ marginRight: "100px", padding: "23px" }}
                    >
                      Nhận cúp
                    </ButtonCustom>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
