import { useEffect, useState } from "react";
import demo_1_1 from "../../../../assets/vocabExercises/1_1.png";
import demo_1_2 from "../../../../assets/vocabExercises/1_2.png";
import demo_1_3 from "../../../../assets/vocabExercises/1_3.png";
import demo_2_1 from "../../../../assets/vocabExercises/2_1.png";
import demo_2_2 from "../../../../assets/vocabExercises/2_2.png";
import demo_2_3 from "../../../../assets/vocabExercises/2_3.png";
import { PART_TYPE } from "../../../../constants";
import { useParams } from "react-router-dom";
import ButtonCustom from "../../../../components/Button";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { Col, Radio, Row } from "antd";
import InputCustom from "../../../../components/Input";

const vocabImg = {
  demo_1_1: demo_1_1,
  demo_1_2: demo_1_2,
  demo_1_3: demo_1_3,
  demo_2_1: demo_2_1,
  demo_2_2: demo_2_2,
  demo_2_3: demo_2_3,
};

export default function VocabularyExercises() {
  const { exerciseId, exerciseType } = useParams();

  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [exercises, setExercises] = useState(null);
  // part 1: matching
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [shuffledMatchedQuestions, setShuffledMatchedQuestions] = useState([]);
  const [shuffleQuestions, setShuffleQuestions] = useState([]);
  const [selectedPairsPart1, setSelectedPairsPart1] = useState({});
  const [availablePairs, setAvailablePairs] = useState([{}]);
  //part hai multiple choice
  const [selectedAnswersPart2, setSelectedAnswersPart2] = useState({});
  //part 3 fill in the blank
  const [inputValuePart3, setInputValuePart3] = useState({});
  const [userScore, setUserScore] = useState(-1);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState({});

  //submit each part
  const [partResults, setPartResults] = useState({
    part1: -1,
    part2: -1,
    part3: -1,
  });

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

  //when select question, set question to available pairs and clear match question
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

  //when select match question, set match question to available pairs.
  // If question is already set, perform pairing
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

  // Handle pairing of questions and match questions at matching part and set available pairs to empty
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

  const markPart1 = (exercise) => {
    let score = 0;
    let n = 1;
    while (selectedPairsPart1[n]) {
      if (selectedPairsPart1[n] === n) {
        score++;
      }
      n++;
    }

    return score;
  };
  const handleSelectAnswersPart2 = (questionId, optionId) => {
    setSelectedAnswersPart2((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const markPart2 = (exercise) => {
    const { questions } = exercise;
    let score = 0;
    questions.map((question) => {
      if (selectedAnswersPart2[question.id] === question.answer) {
        score++;
      }
      return question;
    });

    return score;
  };

  const handleInputChangePart3 = (index, value) => {
    setInputValuePart3((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const markPart3 = (exercise) => {
    const { questions } = exercise;
    let score = 0;

    questions.map((question) => {
      if (
        inputValuePart3[question.id - 1] &&
        inputValuePart3[question.id - 1].toLowerCase() ===
          question.answer.toLowerCase()
      ) {
        score++;
      }
      return question;
    });

    return score;
  };

  //submit all part and calculate score
  const handleSubmit = () => {
    let score = 0;

    score += markPart1(exercises.parts[0]);

    score += markPart2(exercises.parts[1]);

    score += markPart3(exercises.parts[2]);

    setUserScore(score);
  };

  const totalQuestions = exercises.parts.reduce(
    (total, part) => total + part.questions.length,
    0
  );

  //redo exercises
  const handleDoAgain = () => {
    setUserScore(-1);
    setSelectedPairsPart1({});
    setSelectedQuestions([]);
    setSelectedMatches([]);
    setSelectedAnswersPart2({});
    setInputValuePart3({});
    setCurrentPartIndex(0);
    setPartResults({
      part1: -1,
      part2: -1,
      part3: -1,
    });
  };

  // dispaly detail answer for multiple choice
  const toggleButtonAnswerDetail = (questionId) => {
    setToggleAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  const renderPart1 = (part) => {
    return (
      <>
        <Row gutter={[16, 16]} style={{ paddingTop: "25px" }}>
          <Col span={12}>
            <Radio.Group onChange={onChangeQues}>
              {shuffleQuestions.map((ques) => (
                <Row key={ques.id} align="middle">
                  <Col
                    span={24}
                    style={{ paddingBottom: "24px", paddingLeft: "12px" }}
                  >
                    <Radio.Button
                      value={ques.id}
                      style={{
                        backgroundColor: "#ffa751",
                        borderRadius: "100px",
                        border: "none",
                        color: "white",
                        pointerEvents:
                          userScore > -1 || partResults.part1 > -1
                            ? "none"
                            : selectedQuestions.includes(ques.id)
                            ? "none"
                            : "auto",
                        opacity:
                          userScore > -1 || partResults.part1 > -1
                            ? 0.5
                            : selectedQuestions.includes(ques.id)
                            ? 0.5
                            : 1,
                      }}
                      onClick={() =>
                        handlePairSelectionPart1({
                          question: ques.id,
                          matchQuestion: selectedPairsPart1[ques.id] || "",
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
          <Col span={12}>
            <Radio.Group onChange={onChangeMatchQues}>
              {shuffledMatchedQuestions.map((matchQues) => (
                <Row key={matchQues.id} align="middle">
                  <Col
                    span={24}
                    style={{ paddingBottom: "24px", paddingLeft: "12px" }}
                  >
                    <Radio.Button
                      value={matchQues.id}
                      style={{
                        backgroundColor: "#ffa751",
                        borderRadius: "100px",
                        border: "none",
                        color: "white",
                        pointerEvents:
                          userScore > -1 || partResults.part1 > -1
                            ? "none"
                            : selectedMatches.includes(matchQues.id)
                            ? "none"
                            : "auto",
                        opacity:
                          userScore > -1 || partResults.part1 > -1
                            ? 0.5
                            : selectedMatches.includes(matchQues.id)
                            ? 0.5
                            : 1,
                      }}
                      onClick={() =>
                        handlePairSelectionPart1({
                          question: availablePairs.question,
                          matchQuestion: matchQues.id,
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
                        {matchQues.matchedQuestion}
                      </p>
                    </Radio.Button>
                  </Col>
                </Row>
              ))}
            </Radio.Group>
          </Col>
        </Row>

        {/* Display Selected Pairs */}
        <div style={{ marginTop: "30px" }}>
          <TitleCustom level={4}>Selected Pairs:</TitleCustom>
          {Object.entries(selectedPairsPart1).map(
            ([questionId, matchQuestionId]) => {
              const questionText = questions.find(
                (q) => q.id === parseInt(questionId)
              )?.question;
              const matchQuestionText = questions.find(
                (m) => m.id === parseInt(matchQuestionId)
              )?.matchedQuestion;

              return (
                <Row
                  key={`${questionId}-${matchQuestionId}`}
                  style={{
                    marginBottom: "10px",
                    color:
                      userScore > -1 || partResults.part1 > -1
                        ? questionId == matchQuestionId
                          ? "rgb(95, 216, 85)"
                          : "red"
                        : "",
                  }}
                >
                  <Col span={12}>Question: {questionText}</Col>
                  <Col span={12}>Match: {matchQuestionText}</Col>
                </Row>
              );
            }
          )}
        </div>
        {(userScore > -1 || partResults.part1 > -1) && (
          <div style={{ marginTop: "30px" }}>
            <TitleCustom level={4} style={{ color: "#ffa751" }}>
              Answer Pairs:
            </TitleCustom>

            {questions.map((question) => {
              return (
                <Row key={question.id} style={{ marginBottom: "10px" }}>
                  <Col span={12}>
                    <TextCustom>Question: {question.question}</TextCustom>
                  </Col>
                  <Col span={12}>
                    <TextCustom>Match: {question.matchedQuestion}</TextCustom>
                  </Col>
                </Row>
              );
            })}
          </div>
        )}
      </>
    );
  };

  const renderPart2 = (exercise) => {
    return (
      <div>
        {exercise.questions.map((question) => {
          return (
            <>
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
                      return (
                        <Col
                          span={8}
                          key={option.id}
                          style={{ textAlign: "center" }}
                        >
                          <ButtonCustom
                            buttonType="primary"
                            style={{
                              backgroundColor:
                                userScore > -1 || partResults.part2 > -1
                                  ? selectedAnswersPart2[question.id] ===
                                      question.answer &&
                                    option.id === question.answer
                                    ? "rgb(95, 216, 85)"
                                    : selectedAnswersPart2[question.id] ===
                                      option.id
                                    ? "red"
                                    : option.id === question.answer
                                    ? "rgb(95, 216, 85)"
                                    : ""
                                  : selectedAnswersPart2[question.id] ===
                                    option.id
                                  ? "#A8703E"
                                  : "",
                              pointerEvents:
                                userScore > -1 || partResults.part2 > -1
                                  ? "none"
                                  : "auto",
                            }}
                            onClick={() =>
                              handleSelectAnswersPart2(question.id, option.id)
                            }
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

              {(userScore > -1 || partResults.part2 > -1) && (
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <ButtonCustom
                    buttonType="primary"
                    onClick={() => toggleButtonAnswerDetail(question.id)}
                    style={{ marginRight: "12px" }}
                  >
                    Đáp án chi tiết
                  </ButtonCustom>
                  <div>
                    {toggleAnswerDetail[question.id] && (
                      <TextCustom
                        style={{
                          color: "blue",
                          display: "flex",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        {question.answer}
                      </TextCustom>
                    )}
                  </div>
                </Row>
              )}
            </>
          );
        })}
      </div>
    );
  };

  const renderPart3 = (exercise) => {
    const { questions } = exercise;

    return (
      <div style={{ marginLeft: "80px", marginRight: "80px" }}>
        <Row gutter={[16, 16]} style={{ paddingTop: "25px" }}>
          <Col span={24}>
            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
              {questions.map((question, index) => {
                return (
                  <Col
                    span={6}
                    key={question.id}
                    style={{ paddingBottom: "24px" }}
                  >
                    <InputCustom
                      placeholder={index === 0 ? "Jan..." : ""}
                      onChange={(e) =>
                        handleInputChangePart3(index, e.target.value)
                      }
                      style={{
                        borderColor:
                          userScore > -1 || partResults.part3 > -1
                            ? inputValuePart3[
                                question.id - 1
                              ]?.toLowerCase() === question.answer.toLowerCase()
                              ? "rgb(95, 216, 85)"
                              : "red"
                            : "",
                      }}
                      disabled={userScore > -1 || partResults.part3 > -1}
                    />
                    {(userScore > -1 || partResults.part3 > -1) && (
                      <TextCustom style={{ color: "red" }}>
                        {inputValuePart3[question.id - 1]?.toLowerCase() ===
                        question.answer.toLowerCase()
                          ? ""
                          : question.answer}
                      </TextCustom>
                    )}
                  </Col>
                );
              })}
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
      <TitleCustom
        level={2}
        style={{ fontWeight: "bold", paddingLeft: "40px" }}
      >
        {exercises?.title}
      </TitleCustom>

      {/* sau khi nop bai */}

      {userScore > -1 && (
        <div style={{ textAlign: "center" }}>
          <TextCustom style={{ textAlign: "center" }}>
            Điểm:&nbsp;
            <span style={{ color: "red" }}>
              {userScore}/{totalQuestions}
            </span>
            <span
              style={{ color: "red", marginLeft: "10px", fontWeight: "bold" }}
            >
              {/* ({mark}%) */}
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
        {userScore > -1 ? (
          <>
            <ButtonCustom
              buttonType="secondary"
              style={{ padding: "23px", marginLeft: "100px" }}
            >
              Chuyển sang bài tập tiếp theo
            </ButtonCustom>
            <ButtonCustom
              buttonType="secondary"
              style={{ padding: "23px", marginLeft: "100px" }}
              onClick={handleDoAgain}
            >
              Làm lại
            </ButtonCustom>
          </>
        ) : (
          <ButtonCustom
            buttonType="secondary"
            style={{ padding: "23px", marginLeft: "100px" }}
            onClick={handleSubmit}
          >
            Hoàn thành
          </ButtonCustom>
        )}
      </div>
    </div>
  );
}
