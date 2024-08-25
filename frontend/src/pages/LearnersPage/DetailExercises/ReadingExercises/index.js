import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import demo_part2_1 from "../../../../assets/readingExercises/demo_part2_1.png";
import demo_part2_2 from "../../../../assets/readingExercises/demo_part2_2.png";
import ButtonCustom from "../../../../components/Button";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
const imgReadingArr = {
  demo_part2_1,
  demo_part2_2,
};
export default function ReadingExercises() {
  const { exerciseType, exerciseId } = useParams();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentResultPartIndex, setCurrentResultPartIndex] = useState(0);
  const [exercises, setExercises] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [userScore, setUserScore] = useState(-1);
  const [exerciseResults, setExerciseResults] = useState(null);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState({});
  useEffect(() => {
    fetch(
      `http://localhost:9999/exercises?exerciseType=${exerciseType}&id=${exerciseId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setExercises(data[0]);
        }
      })
      .catch((err) => console.error("error", err));
  }, [exerciseType, exerciseId]);

  const handleNextPart = () => {
    if (exercises && currentPartIndex < exercises.parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };

  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextResultPart = () => {
    if (
      exerciseResults &&
      currentResultPartIndex < exerciseResults.length - 1
    ) {
      setCurrentResultPartIndex(currentResultPartIndex + 1);
    }
  };

  const handlePreviousResultPart = () => {
    setCurrentResultPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSelectOptions = (questionId, optionId) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: optionId,
    });
  };

  const handleSubmit = () => {
    let score = 0;
    const results = exercises.parts.map((part) => {
      return {
        ...part,
        questions: part.questions.map((question) => {
          const userAnswer = userAnswers[question.id];
          const answerDetail = part.answers.find(
            (answer) => answer.id === question.id
          )?.answerDetail;
          const correctAnswer = part.answers.find(
            (answer) => answer.id === question.id
          )?.answer;
          const isCorrect = userAnswer === correctAnswer;
          if (isCorrect) {
            score++;
          }
          return {
            ...question,
            userAnswer,
            correctAnswer,
            isCorrect,
            answerDetail,
          };
        }),
      };
    });
    setExerciseResults(results);
    setUserScore(score);
  };

  const toggleButtonAnswerDetail = (questionId) => {
    console.log(toggleAnswerDetail);

    setToggleAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
    console.log("After toggle:", toggleAnswerDetail);
  };

  if (!exercises?.parts) {
    return <div>Loading...</div>;
  }

  const currentPart = exercises?.parts[currentPartIndex];
  const scoreResultCurrentPart = exerciseResults?.[currentResultPartIndex];
  const totalQuestions = exercises?.parts.reduce(
    (acc, part) => acc + part.questions.length,
    0
  );
  const mark = (userScore / totalQuestions) * 100;

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises.title}
      </TitleCustom>
      <div>
        {!exerciseResults ? (
          <div>
            <TextCustom style={{ color: "red", fontWeight: "bold" }}>
              {currentPart.partName}
            </TextCustom>
            {currentPart.questions.map((question, index) => (
              <div key={question.id}>
                <div style={{ textAlign: "center", paddingTop: "24px" }}>
                  {question.questionParagraph && (
                    <p>{question.questionParagraph}</p>
                  )}
                  {question.questionImage && (
                    <div>
                      {question.questionImage.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={imgReadingArr[img]}
                          style={{ width: "100px", marginRight: "10px" }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <TextCustom style={{ paddingTop: "12px" }}>
                  Câu {question.id}: {question.question}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      paddingTop: "12px",
                    }}
                  >
                    {question.options.map((option) => (
                      <ButtonCustom
                        key={option.id}
                        buttonType="primary"
                        onClick={() =>
                          handleSelectOptions(question.id, option.id)
                        }
                        style={{
                          backgroundColor:
                            userAnswers[question.id] === option.id
                              ? "#ff855d"
                              : "",
                        }}
                      >
                        {option.id}. {option.text}
                      </ButtonCustom>
                    ))}
                  </div>
                </TextCustom>
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
                disabled={currentPartIndex === exercises.parts.length - 1}
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
          // ket qua sau khi lam bai
          <>
            <div style={{ textAlign: "center" }}>
              <TextCustom style={{ textAlign: "center" }}>
                Điểm:&nbsp;
                <span style={{ color: "red" }}>
                  {userScore}/
                  {exercises.parts.reduce(
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
              {scoreResultCurrentPart.questions.map((question, index) => (
                <div key={question.id}>
                  <div style={{ textAlign: "center", paddingTop: "24px" }}>
                    {question.questionParagraph && (
                      <p>{question.questionParagraph}</p>
                    )}
                    {question.questionImage && (
                      <div>
                        {question.questionImage.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={imgReadingArr[img]}
                            style={{ width: "100px", marginRight: "10px" }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <TextCustom style={{ paddingTop: "12px" }}>
                    Câu {question.id}: {question.question}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        paddingTop: "12px",
                      }}
                    >
                      {question.options.map((option, index) => {
                        const isCorrectOption =
                          option.id === question.correctAnswer;
                        const isUserSelected =
                          option.id === question.userAnswer;
                        const backgroundColor = isCorrectOption
                          ? "#5FD855"
                          : isUserSelected && !question.isCorrect
                          ? "red"
                          : "";
                        return (
                          <ButtonCustom
                            style={{ backgroundColor }}
                            disabled
                            buttonType="primary"
                          >
                            {option.id}. {option.text}
                          </ButtonCustom>
                        );
                      })}
                    </div>
                  </TextCustom>
                  <ButtonCustom
                    buttonType="primary"
                    onClick={() => toggleButtonAnswerDetail(question.id)}
                  >
                    Đáp án chi tiết
                  </ButtonCustom>
                  <div style={{ paddingTop: "12px" }}>
                    {toggleAnswerDetail[question.id] && (
                      <TextCustom style={{ color: "blue" }}>
                        {question.answerDetail}
                      </TextCustom>
                    )}
                  </div>
                </div>
              ))}

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
                  disabled={
                    currentResultPartIndex === exercises.parts.length - 1
                  }
                >
                  Phần tiếp theo
                </ButtonCustom>
                <ButtonCustom
                  buttonType="secondary"
                  style={{ marginRight: "100px", padding: "23px" }}
                >
                  Làm lại bài tập
                </ButtonCustom>

                <ButtonCustom
                  buttonType="secondary"
                  style={{ padding: "23px" }}
                >
                  Chuyển sang phase tiếp theo
                </ButtonCustom>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
