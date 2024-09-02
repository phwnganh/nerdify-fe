import { Button, Card, Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const TestFlashCard = () => {
  const { flashcardId } = useParams();
  const [flashcard, setFlashcard] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(-1);

  useEffect(() => {
    fetch(`http://localhost:9999/flashcard/${flashcardId}`)
      .then((response) => response.json())
      .then((data) => {
        const flashcardClone = JSON.parse(JSON.stringify(data));
        setFlashcard(flashcardClone);

        const questionArray = flashcardClone.cards.map((questionCard) => {
          const remainingCards = flashcardClone.cards.filter(
            (card) => card.id !== questionCard.id
          );
          const shuffledIncorrectCards = remainingCards
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
      })
      .catch((err) => console.error(err));
  }, [flashcardId]);

  const handleAnswerChange = (questionIndex, answerId) => {
    if (score === -1) {
      setSelectedAnswers((prevState) => ({
        ...prevState,
        [questionIndex]: answerId,
      }));
    }
  };

  const checkAnswers = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      const selectedOption = question.options.find(
        (option) => option.id === selectedAnswers[index]
      );
      if (selectedOption && selectedOption.isCorrect) {
        correctCount++;
      }
    });

    setScore(correctCount);
    message.success(`You scored ${correctCount} out of ${questions.length}`);
  };

  const getAnswerStyle = (questionIndex, optionId, isCorrect) => {
    if (score === -1) {
      return selectedAnswers[questionIndex] === optionId
        ? { backgroundColor: "#327BFA", color: "#fff" }
        : {};
    } else {
      if (selectedAnswers[questionIndex] === optionId) {
        return isCorrect
          ? { backgroundColor: "#327BFA", color: "#fff" }
          : { backgroundColor: "#FA3232", color: "#fff" };
      } else if (isCorrect) {
        return { backgroundColor: "#327BFA", color: "#fff" };
      }
      return {};
    }
  };

  return (
    <div style={{ width: "80%" }}>
      <h1>{flashcard?.title}</h1>
      {questions.map((question, questionIndex) => (
        <Card key={questionIndex} style={{ marginBottom: "20px" }}>
          <div className="card-body">
            <div className="question-header">
              <h2>Câu {questionIndex + 1}:</h2>
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
                      cursor: score === -1 ? "pointer" : "default",
                      ...getAnswerStyle(
                        questionIndex,
                        option.id,
                        option.isCorrect
                      ),
                    }}
                    onClick={() => handleAnswerChange(questionIndex, option.id)}
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
                      }}
                    >
                      {option.definition}
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Card>
      ))}
      <Button
        type="primary"
        onClick={checkAnswers}
        style={{ display: "block", margin: "20px auto" }}
      >
        Nộp bài
      </Button>
      {score > -1 && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            Điểm: {score} / {questions.length}
          </h2>
        </div>
      )}
    </div>
  );
};
