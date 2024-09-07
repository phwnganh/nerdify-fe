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
  const [correctPairs, setCorrectPairs] = useState([]);
  const [shuffledMatchedQuestions, setShuffledMatchedQuestions] = useState([]);
  const [shuffleQuestions, setShuffleQuestions] = useState([]);
  const [selectedAnswersPart2, setSelectedAnswersPart2] = useState({});
  const [inputValuePart3, setInputValuePart3] = useState({});
  const [userScore, setUserScore] = useState(0);
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
        setShuffledMatchedQuestions(shuffleArray(currentPart.questions));
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
                  <ButtonCustom buttonType="primary" style={{}}>
                    {question.question}
                  </ButtonCustom>
                </Col>
              </Row>
            ))}
          </Col>
          <Col span={12}>
            {shuffledMatchedQuestions.map((matchedQuestion) => (
              <Row key={matchedQuestion.id} align="middle">
                <Col
                  span={12}
                  style={{ paddingBottom: "24px", paddingLeft: "12px" }}
                >
                  <ButtonCustom buttonType="primary" style={{}}>
                    {matchedQuestion?.matchedQuestion}
                  </ButtonCustom>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
        <Row justify={"end"}>
          <ButtonCustom buttonType="secondary">Nộp bài</ButtonCustom>
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
                    return (
                      <Col
                        span={8}
                        key={option.id}
                        style={{ textAlign: "center" }}
                      >
                        <ButtonCustom buttonType="primary" style={{}}>
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
        <Row justify={"end"}>
          <ButtonCustom buttonType="secondary">Nộp bài</ButtonCustom>
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

  const renderPart3 = (part) => {
    const { questions } = part;

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
                    {index === 0 ? (
                      <InputCustom
                        placeholder="Januar"
                        readOnly
                        style={{ backgroundColor: "#D9D9D9" }}
                      />
                    ) : (
                      <InputCustom
                        placeholder={index === 1 ? "Feb..." : ""}
                        onChange={(e) =>
                          handleInputChangePart3(index, e.target.value)
                        }
                        style={{}}
                      />
                    )}
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        <Row justify={"end"}>
          <ButtonCustom buttonType="secondary">Nộp bài</ButtonCustom>
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

  // const mark = ((userScore / totalQuestions) * 100).toFixed(2);

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

      {/* { && (
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
      )} */}

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
          Hoàn thành
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
