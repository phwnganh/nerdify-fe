import { Card, Col, Progress, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonCustom from "../../../../components/Button";
import { CLIENT_URI } from "../../../../constants/uri.constants";
import CardCustom from "../../../../components/Card";

export const TestFlashCard = () => {
  const navigate = useNavigate();
  const { flashcardId, numberOfCard } = useParams();
  const [flashcard, setFlashcard] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [userScore, setUserScore] = useState(-1);

  useEffect(() => {
    fetch(`http://localhost:9999/flashcard/${flashcardId}`)
      .then((response) => response.json())
      .then((data) => {
        const flashcardClone = JSON.parse(JSON.stringify(data));
        setFlashcard(flashcardClone);

        const questionArray = flashcardClone.cards
          .slice(0, numberOfCard)
          .map((questionCard) => {
            const remainingCards = flashcardClone.cards.filter(
              // not include correct definition
              (card) => card.id !== questionCard.id
            );
            const shuffledIncorrectCards = remainingCards // random 3 incorrect definitions in same flashcard
              .sort(() => Math.random() - 0.5)
              .slice(0, 3);
            const options = [
              {
                id: questionCard.id,
                definition: questionCard.definitions,
                isCorrect: true,
              },
              ...shuffledIncorrectCards.map((card) => ({
                id: card.id,
                definition: card.definitions,
                isCorrect: false,
              })),
            ].sort(() => Math.random() - 0.5);
            return {
              term: questionCard.terms,
              options,
            };
          });

        setQuestions(questionArray);
        console.log(questionArray);
      })
      .catch((err) => console.error(err));
  }, [flashcardId, numberOfCard]);

  const handleSelectOptions = (questionId, optionId) => {
    setUserAnswers((prevState) => ({
      ...prevState,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question, index) => {
      const userAnswer = question.options.find(
        (option) => option.id === userAnswers[index]
      );
      if (userAnswer && userAnswer.isCorrect) {
        score++;
      }
    });
    setUserScore(score);
  };

  const getAnswerStyle = (questionId, optionId, isCorrect) => {
    if (userScore === -1) {
      return userAnswers[questionId] === optionId
        ? { backgroundColor: "#A8703E", color: "#fff" }
        : {};
    } else {
      if (userAnswers[questionId] === optionId) {
        return isCorrect
          ? { backgroundColor: "#5FD855", color: "#fff" }
          : { backgroundColor: "#FA3232", color: "#fff" };
      } else if (isCorrect) {
        return { backgroundColor: "#5FD855", color: "#fff" };
      }
      return {};
    }
  };

  const totalQuestions = questions.length;
  const mark = (userScore / totalQuestions) * 100;

  const showFullText = (e) => {
    e.target.style = "";
    e.target.style.wordBreak = "keep-all";
  };

  const showShortText = (e) => {
    e.target.style =
      " overflow: hidden; text-overflow: ellipsis; white-space: nowrap;";
  };
  console.log(userAnswers);
  return (
    <div style={{ width: "70%" }}>
      <div
        className="title"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h1>{flashcard?.title}</h1>
        {userScore > -1 && (
          <div style={{ display: "flex" }}>
            <h2 style={{ width: "101%", padding: "10px" }}>
              Trả lời đúng: {userScore} / {questions.length}
            </h2>

            <Progress
              style={{ display: "flex", justifyContent: "end" }}
              percent={mark - Math.floor(mark) !== 0 ? mark.toFixed(2) : mark}
              percentPosition={{ align: "end", type: "inner" }}
              size={[200, 30]}
              strokeColor="#5FD855"
            />
          </div>
        )}
      </div>

      {questions.map((question, questionId) => (
        <CardCustom
          key={questionId}
          style={{ marginBottom: "30px", backgroundColor: "#DEDEDE" }}
        >
          <div className="card-body" style={{ paddingLeft: "50px" }}>
            <div
              className="question-header"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h2 style={{ marginTop: "0" }}>Câu {questionId + 1}:</h2>
              {userScore > -1 && (
                <text>
                  {userAnswers[questionId] &&
                  question.options.find(
                    (option) =>
                      option.isCorrect && option.id === userAnswers[questionId]
                  )
                    ? 1
                    : 0}
                  /1
                </text>
              )}
            </div>
            <div className="question">{question.term}</div>

            <div className="answer-header">
              <p
                style={{
                  fontSize: "16px",
                  whiteSpace: "pre-line",
                  fontWeight: "500",
                }}
              >
                Chọn đáp án đúng:
              </p>
            </div>
            <div className="answer" style={{ alignContent: "center" }}>
              <Row
                gutter={[8, 8]}
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                  height: "auto",
                }}
              >
                {question.options.map((option, index) => (
                  <Col
                    key={option.id}
                    span={11}
                    style={{
                      fontSize: "14px",
                      borderRadius: "10px",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      columnGap: "10px",
                      border: "1px solid #d9d9d9",
                      backgroundColor: "#fff",
                      cursor: userScore === -1 ? "pointer" : "default",
                      ...getAnswerStyle(
                        questionId,
                        option.id,
                        option.isCorrect
                      ),
                    }}
                    onClick={() => {
                      userScore > -1 ||
                        handleSelectOptions(questionId, option.id);
                    }}
                  >
                    <span
                      style={{
                        minWidth: "30px",
                        minHeight: "30px",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "rgb(236, 236, 236)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {index + 1}
                    </span>
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",

                        // height: "20px",
                      }}
                      onMouseOver={showFullText}
                      onMouseOut={showShortText}
                    >
                      {option.definition}
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </CardCustom>
      ))}
      {userScore > -1 || (
        <ButtonCustom
          buttonType="secondary"
          onClick={handleSubmit}
          style={{ display: "flex", padding: "23px", margin: "20px auto" }}
        >
          Nộp bài
        </ButtonCustom>
      )}
      {userScore > -1 && (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <ButtonCustom
            buttonType="secondary"
            style={{ display: "flex", padding: "23px", margin: "20px auto" }}
            onClick={() => navigate(`${CLIENT_URI.FLASH_CARD}/${flashcardId}`)}
          >
            Quay về flashcard
          </ButtonCustom>
          <ButtonCustom
            buttonType="secondary"
            style={{ display: "flex", padding: "23px", margin: "20px auto" }}
            onClick={() => {
              setUserScore(-1);
              setUserAnswers({});
            }}
          >
            Làm lại bài kiểm tra
          </ButtonCustom>
        </div>
      )}
    </div>
  );
};
