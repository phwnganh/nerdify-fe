import { Input } from "antd";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import InputCustom from "../../../../components/Input";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonCustom from "../../../../components/Button";

export default function GrammarExercises() {
  const [grammarContents, setGrammarContents] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const { exerciseType, exerciseId } = useParams();
  const [userScore, setUserScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [mark, setMark] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:9999/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length === 0) return;
        setGrammarContents(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [exerciseId, exerciseType]);

  const handleInputChange = (questionId, detailIndex, subIndex, value) => {
    const key = `${questionId}-${detailIndex}-${subIndex}`;
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    let totalQuestions = 0;
    const newResults = {};
    const submissionAnswers = [];

    grammarContents.questions.forEach((question) => {
      question.questionDetail.forEach((detail, detailIndex) => {
        const correctAnswer = question.correctAnswers[detailIndex];
        totalQuestions++;
        if (Array.isArray(correctAnswer)) {
          const userAnswerArray = correctAnswer.map(
            (_, subIndex) =>
              userAnswers[`${question.id}-${detailIndex}-${subIndex}`]
          );
          const isCorrect = correctAnswer.every(
            (ans, subIndex) =>
              ans.toLowerCase() ===
              (userAnswerArray[subIndex] || "").toLowerCase()
          );
          if (isCorrect) {
            score++;
          }
          newResults[`${question.id}-${detailIndex}`] = {
            isCorrect,
            correctAnswer,
          };

          submissionAnswers.push({
            questionId: question.id,
            userAnswer: userAnswerArray,
            correctAnswer: correctAnswer,
            isCorrect: isCorrect,
          });
        } else {
          const userAnswer = userAnswers[`${question.id}-${detailIndex}-0`];
          const isCorrect =
            correctAnswer.toLowerCase() === (userAnswer || "").toLowerCase();
          if (isCorrect) {
            score++;
          }
          newResults[`${question.id}-${detailIndex}`] = {
            isCorrect,
            correctAnswer,
          };
          submissionAnswers.push({
            questionId: question.id,
            userAnswer: [userAnswer],
            correctAnswer: [correctAnswer],
            isCorrect: isCorrect,
          });
        }
      });
    });
    const mark = ((score / totalQuestions) * 100).toFixed(2);
    setResults(newResults);
    setUserScore(score);
    setTotalQuestions(totalQuestions);
    setMark(mark);

    const submissionData = {
      submissionDate: new Date().toISOString(),
      score: score,
      submissionAnswers: submissionAnswers,
      exerciseId: exerciseId,
    };

    fetch("http://localhost:9999/exercisesSubmission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });
  };

  const renderQuestionDetail = (questionDetail, questionId) => {
    return questionDetail.map((detail, detailIndex) => (
      <div key={detailIndex} style={{ margin: "10px 0" }}>
        {Array.isArray(detail.name)
          ? detail.name.map((quest, subIndex) => (
              <div key={subIndex} style={{ marginBottom: "10px" }}>
                {quest.split("___").map((text, i) => (
                  <span key={i}>
                    {i > 0 && (
                      <InputCustom
                        style={{ width: "150px", marginRight: "8px" }}
                        value={
                          userAnswers[
                            `${questionId}-${detailIndex}-${subIndex}`
                          ] || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            questionId,
                            detailIndex,
                            subIndex,
                            e.target.value
                          )
                        }
                        disabled={results !== null}
                      />
                    )}
                    {text}
                  </span>
                ))}
              </div>
            ))
          : detail.name.split("___").map((text, i) => (
              <span key={i}>
                {i > 0 && (
                  <InputCustom
                    style={{ width: "150px", marginRight: "8px" }}
                    value={userAnswers[`${questionId}-${detailIndex}-0`] || ""}
                    onChange={(e) =>
                      handleInputChange(
                        questionId,
                        detailIndex,
                        0,
                        e.target.value
                      )
                    }
                    disabled={results !== null}
                  />
                )}
                {text}
              </span>
            ))}
        {results && (
          <div
            style={{
              marginTop: "5px",
              color: results[`${questionId}-${detailIndex}`]?.isCorrect
                ? "#5FD855"
                : "red",
            }}
          >
            {results[`${questionId}-${detailIndex}`]?.isCorrect
              ? "Đúng"
              : `Đáp án chi tiết: ${
                  Array.isArray(
                    results[`${questionId}-${detailIndex}`]?.correctAnswer
                  )
                    ? results[
                        `${questionId}-${detailIndex}`
                      ]?.correctAnswer.join(", ")
                    : results[`${questionId}-${detailIndex}`]?.correctAnswer
                }`}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {grammarContents.title}
      </TitleCustom>
      {results && (
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
      {grammarContents.questions?.map((question) => (
        <div key={question.id}>
          <TextCustom style={{ paddingTop: "20px", fontWeight: "bold" }}>
            {question.id}. {question.questionText}
          </TextCustom>
          <div style={{ marginTop: "20px", marginBottom: "40px" }}>
            {renderQuestionDetail(question.questionDetail, question.id)}
          </div>
        </div>
      ))}
      {!results ? (
        <ButtonCustom
          buttonType="secondary"
          style={{ padding: "23px" }}
          onClick={handleSubmit}
        >
          Nộp bài
        </ButtonCustom>
      ) : (
        <>
          <ButtonCustom buttonType="secondary" style={{ padding: "23px" }}>
            Làm lại bài tập
          </ButtonCustom>
          <ButtonCustom
            buttonType="secondary"
            style={{ padding: "23px", marginLeft: "100px" }}
          >
            Chuyển sang bài tập tiếp theo
          </ButtonCustom>
        </>
      )}
    </div>
  );
}
