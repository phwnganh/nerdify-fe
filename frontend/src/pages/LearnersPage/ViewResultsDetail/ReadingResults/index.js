import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { Col, Row } from "antd";
import demo_part2_1 from "../../../../assets/readingExercises/demo_part2_1.png";
import demo_part2_2 from "../../../../assets/readingExercises/demo_part2_2.png";
import ButtonCustom from "../../../../components/Button";
export default function ReadingResults() {
  const [exerciseResults, setExerciseResults] = useState(null);
  const { submissionId } = useParams();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [isAnswerDetail, setIsAnswerDetail] = useState({});
  const imgReadingArr = {
    demo_part2_1,
    demo_part2_2,
  };
  const handleNextPart = () => {
    if (exerciseResults && currentPartIndex < exerciseResults.exercise.parts.length - 1) {
      setCurrentPartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  useEffect(() => {
    const fetchReadingSubmissionData = async () => {
      const submissionsResponse = await fetch(`http://localhost:9999/readingExercisesSubmission?id=${submissionId}&userId=1`);
      const exercisesResponse = await fetch("http://localhost:9999/exercises");
      const submissions = await submissionsResponse.json();
      const exercises = await exercisesResponse.json();

      const joinedData = submissions.map((submission) => {
        const exercise = exercises.find((exercise) => exercise.id === submission.exerciseId);
        return {
          ...submission,
          exercise,
        };
      });
      console.log(joinedData[0]);
      setExerciseResults(joinedData[0]);
    };
    fetchReadingSubmissionData();
  }, [submissionId]);

  const currentPart = exerciseResults?.exercise?.parts[currentPartIndex];
  const handleToggleAnswerDetail = (questionId) => {
    setIsAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };
  return (
    <div style={{ padding: "24px" }}>
      {exerciseResults && (
        <div>
          <TitleCustom level={2} style={{ fontWeight: "bold" }}>
            {exerciseResults.exercise.title}
          </TitleCustom>
          {currentPart && (
            <>
              <div style={{ textAlign: "center" }}>
                <TextCustom style={{ textAlign: "center" }}>
                  Điểm: &nbsp;
                  <span style={{ color: "red" }}>{exerciseResults.score}</span>
                </TextCustom>
              </div>
              <TextCustom style={{ color: "red", fontWeight: "bold" }}>{currentPart.partName}</TextCustom>
              {currentPart.questions.map((question) => {
                const userAnswer = exerciseResults?.submissionAnswers?.find((ans) => ans.quesionId === question.id);
                const correctAnswer = currentPart.answers.find((ans) => ans.id === question.id);
                const isCorrect = userAnswer?.isCorrect;
                return (
                  <div key={question.id}>
                    <div style={{ marginTop: "20px" }}>
                      <Row style={{ textAlign: "center" }}>
                        {question.questionParagraph && <p>{question.questionParagraph}</p>}
                        {question.questionImage && (
                          <div>
                            {question.questionImage && (
                              <div>
                                {question.questionImage.map((img, imgIndex) => (
                                  <img
                                    key={imgIndex}
                                    src={imgReadingArr[img]}
                                    style={{
                                      width: "100px",
                                      marginRight: "10px",
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        <TextCustom style={{ paddingTop: "20px" }}>
                          Câu {question.id}: {question.question}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              paddingTop: "12px",
                            }}
                          >
                            {question.options.map((option, index) => {
                              const backgroundColor = userAnswer?.userAnswer === option.id ? (isCorrect ? "#5FD855" : "#FF4D4F") : "transparent";
                              console.log("userAnswer:", userAnswer, "option.id:", option.id, "backgroundColor:", backgroundColor);
                              return (
                                <Col key={option.id} span={8}>
                                  <ButtonCustom buttonType="primary" style={{ backgroundColor }} disabled>
                                    {option.id}. {option.text}
                                  </ButtonCustom>
                                </Col>
                              );
                            })}
                          </div>
                        </TextCustom>
                      </Row>
                      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <ButtonCustom buttonType="primary" onClick={() => handleToggleAnswerDetail(question.id)}>
                          Đáp án chi tiết
                        </ButtonCustom>
                      </Row>
                      {isAnswerDetail[question.id] && correctAnswer && (
                        <div style={{ paddingLeft: "20px" }}>
                          <TextCustom>Đáp án đúng: {userAnswer?.correctAnswer}</TextCustom>
                          <div>
                            {" "}
                            <TextCustom>
                              Lời giải: <span style={{ color: "blue" }}>{correctAnswer?.answerDetail}</span>
                            </TextCustom>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div style={{ textAlign: "center", paddingTop: "50px" }}>
                <ButtonCustom buttonType="secondary" style={{ marginRight: "100px", padding: "23px" }} onClick={handlePreviousPart} disabled={currentPartIndex === 0}>
                  Phần trước
                </ButtonCustom>
                <ButtonCustom
                  buttonType="secondary"
                  style={{
                    marginRight: "100px",
                    padding: "23px",
                    marginLeft: "23px",
                  }}
                  onClick={handleNextPart}
                  disabled={currentPartIndex === exerciseResults.exercise.parts.length - 1}
                >
                  Phần sau
                </ButtonCustom>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
