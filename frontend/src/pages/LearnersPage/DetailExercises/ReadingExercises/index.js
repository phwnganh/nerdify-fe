import { useEffect, useState } from "react";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { useParams } from "react-router-dom";
import ButtonCustom from "../../../../components/Button";
import { PART_TYPE } from "../../../../constants";
import { Row } from "antd";
import demo_part2_1 from "../../../../assets/readingExercises/demo_part2_1.png";
import demo_part2_2 from "../../../../assets/readingExercises/demo_part2_2.png";
import demo_part3_1 from "../../../../assets/readingExercises/demo_part3_1.png";
import demo_part3_2 from "../../../../assets/readingExercises/demo_part3_2.png";

const imgReadingArr = {
  demo_part2_1,
  demo_part2_2,
  demo_part3_1,
  demo_part3_2,
};

export default function ReadingExercises() {
  const { exerciseType, exerciseId } = useParams();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [partResults, setPartResults] = useState({
    part1: null,
    part2: null,
    part3: null,
  });
  const [exercises, setExercises] = useState(null);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState({});
  const [userScore, setUserScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:9999/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setExercises(data[0]);
        }
      })
      .catch((err) => console.error("error", err));
  }, [exerciseType, exerciseId]);

  const handleSelectOptions = (questionId, optionId) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleToggleAnswerDetail = (questionId) => {
    setToggleAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  const handleSubmitPart = (partType, partData) => {
    console.log("partData: ", partData);
    let questions = [];

    if (Array.isArray(partData) && partData[0]?.questions) {
      questions = partData.flatMap((detail) => detail.questions);
    } else {
      questions = Array.isArray(partData) ? partData : [partData];
    }

    console.log("Extracted questions: ", questions);
    const results = questions.map((question) => {
      const userAnswer = userAnswers[question.id];
      const correctAnswer = question?.answer;
      const isCorrect = userAnswer === correctAnswer;

      return {
        ...question,
        userAnswer,
        correctAnswer,
        isCorrect,
        answerDetail: question?.answerDetail,
      };
    });

    console.log("results: ", results);

    const partScore = (results.filter((result) => result.isCorrect).length / results.length) * 100;

    const completedParts = Object.keys(partResults).filter((key) => partResults[key] !== null).length + 1;
    const totalScore = Object.keys(partResults).reduce((acc, key) => {
      const part = partResults[key];
      if (part) {
        const correctAnswers = part.filter((result) => result.isCorrect).length;
        const totalQuestions = part.length;
        return acc + (correctAnswers / totalQuestions) * 100;
      }
      return acc;
    }, partScore);

    // Tính điểm tích lũy trung bình
    const newCumulativeScore = Math.round(totalScore / completedParts);
    console.log(`Updated cumulative score: ${newCumulativeScore}`);
    setUserScore(newCumulativeScore);

    setPartResults((prev) => ({
      ...prev,
      [partType]: results,
    }));
  };

  const renderPart = (currentPart) => {
    if (Array.isArray(currentPart?.partDetail)) {
      return (
        <>
          {currentPart.partDetail.map((detail, detailIndex) => (
            <div key={detailIndex}>
              <TextCustom style={{}}>{detail.questionParagraph}</TextCustom>
              {detail.questions.map((question) => (
                <div key={question.id}>
                  <TextCustom style={{ fontWeight: "bold" }}>
                    Câu {question.id}: {question.question}
                  </TextCustom>
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    {question.options.map((option) => {
                      const userSelected = userAnswers[question.id] === option.id;
                      const partResultsData = partResults[`part${currentPartIndex + 1}`];
                      const isCorrect = partResultsData ? partResultsData.find((result) => result.id === question.id)?.correctAnswer === option.id : false;

                      let backgroundColor = userSelected ? "#A8703E" : "";

                      if (partResultsData) {
                        backgroundColor = isCorrect ? "#5FD855" : userSelected ? "red" : "";
                      }

                      return (
                        <ButtonCustom key={option.id} buttonType="primary" onClick={() => handleSelectOptions(question.id, option.id)} style={{ backgroundColor }} disabled={!!partResultsData}>
                          {option.text}
                        </ButtonCustom>
                      );
                    })}
                  </div>
                  {partResults[`part${currentPartIndex + 1}`] && (
                    <>
                      <ButtonCustom buttonType="primary" onClick={() => handleToggleAnswerDetail(question.id)}>
                        Đáp án chi tiết
                      </ButtonCustom>
                      {toggleAnswerDetail[question.id] && <TextCustom style={{ color: "blue" }}>{question.answerDetail}</TextCustom>}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
          <Row justify="end">
            {!partResults[`part${currentPartIndex + 1}`] && (
              <ButtonCustom buttonType="secondary" onClick={() => handleSubmitPart(`part${currentPartIndex + 1}`, currentPart.partDetail)}>
                Nộp bài
              </ButtonCustom>
            )}
          </Row>
        </>
      );
    }

    if (Array.isArray(currentPart?.questions)) {
      return (
        <>
          {currentPart.questions.map((question) => (
            <div key={question.id}>
              <TextCustom style={{ fontWeight: "bold" }}>
                Câu {question.id}: {question.question}
              </TextCustom>
              {Array.isArray(question.questionImage) && question.questionImage.length > 0 ? (
                question.questionImage.map((image, index) => <img key={index} src={imgReadingArr[image]} alt="question-part" />)
              ) : question.questionImage ? (
                <img src={imgReadingArr[question.questionImage]} alt="question-part" />
              ) : null}
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {question.options.map((option) => {
                  const userSelected = userAnswers[question.id] === option.id;
                  const partResultsData = partResults[`part${currentPartIndex + 1}`];
                  const isCorrect = partResultsData ? partResultsData.find((result) => result.id === question.id)?.correctAnswer === option.id : false;

                  let backgroundColor = userSelected ? "#A8703E" : "";

                  if (partResultsData) {
                    backgroundColor = isCorrect ? "#5FD855" : userSelected ? "red" : "";
                  }

                  return (
                    <ButtonCustom key={option.id} buttonType="primary" onClick={() => handleSelectOptions(question.id, option.id)} style={{ backgroundColor }} disabled={!!partResultsData}>
                      {option.text}
                    </ButtonCustom>
                  );
                })}
              </div>
              {partResults[`part${currentPartIndex + 1}`] && (
                <>
                  <ButtonCustom buttonType="primary" onClick={() => handleToggleAnswerDetail(question.id)}>
                    Đáp án chi tiết
                  </ButtonCustom>
                  {toggleAnswerDetail[question.id] && <TextCustom style={{ color: "blue" }}>{question.answerDetail}</TextCustom>}
                </>
              )}
            </div>
          ))}
          <Row justify="end">
            {!partResults[`part${currentPartIndex + 1}`] && (
              <ButtonCustom buttonType="secondary" onClick={() => handleSubmitPart(`part${currentPartIndex + 1}`, currentPart.questions)}>
                Nộp bài
              </ButtonCustom>
            )}
          </Row>
        </>
      );
    }
    return null;
  };

  const handleRetry = () => {
    setUserAnswers({});
    setPartResults({
      part1: null,
      part2: null,
      part3: null,
    });
    setUserScore(0);
    setIsCompleted(false);
    setCurrentPartIndex(0);
  };

  const handleCompleted = () => {
    const submissionParts = Object.keys(partResults).reduce((acc, partKey) => {
      const partData = partResults[partKey]?.map((result) => ({
        userAnswer: result.userAnswer,
        correctAnswer: result.correctAnswer,
        questionId: result.id,
        isCorrect: result.isCorrect,
      }));
      if (partData) {
        acc[partKey] = { submissionAnswers: partData };
      }
      return acc;
    }, {});

    const submissionData = {
      submissionDate: new Date().toISOString(),
      score: `${userScore}%`,
      submissionParts,
      exerciseId,
    };

    fetch(`http://localhost:9999/readingExercisesSubmission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Submission completed: ", data);
        setIsCompleted(true);
      })
      .catch((err) => console.error("Error submitting exercise", err));
  };

  if (!exercises?.parts) return <div>Loading...</div>;

  const currentPart = exercises?.parts[currentPartIndex];

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises.title}
      </TitleCustom>
      <div style={{ textAlign: "center" }}>
        {isCompleted && (
          <>
            <TextCustom>Điểm: </TextCustom>
            <span style={{ color: "red" }}>{userScore}%</span>
          </>
        )}
      </div>
      <div>
        <TextCustom style={{ color: "red", fontWeight: "bold" }}>{currentPart.partName}</TextCustom>
        {currentPart.partType === PART_TYPE.MULTIPLE_CHOICE && renderPart(currentPart, `part${currentPartIndex + 1}`)}
        <div style={{ textAlign: "center", paddingTop: "50px" }}>
          <ButtonCustom buttonType="secondary" style={{ padding: "23px" }} onClick={() => setCurrentPartIndex((prev) => prev - 1)} disabled={currentPartIndex === 0}>
            Phần trước
          </ButtonCustom>
          <ButtonCustom
            buttonType="secondary"
            style={{ padding: "23px", marginLeft: "30px" }}
            onClick={() => setCurrentPartIndex((prev) => prev + 1)}
            disabled={currentPartIndex === exercises.parts.length - 1}
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
              <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleCompleted}>
                Hoàn thành
              </ButtonCustom>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
