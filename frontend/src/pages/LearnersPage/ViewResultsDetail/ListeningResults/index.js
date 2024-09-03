import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { Col, Row, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import demo1_1 from "../../../../assets/listeningExercises/1_1.png";
import demo1_2 from "../../../../assets/listeningExercises/1_2.png";
import demo1_3 from "../../../../assets/listeningExercises/1_3.png";
import demo2_1 from "../../../../assets/listeningExercises/2_1.png";
import demo2_2 from "../../../../assets/listeningExercises/2_2.png";
import demo2_3 from "../../../../assets/listeningExercises/2_3.png";
import demo3_1 from "../../../../assets/listeningExercises/3_1.png";
import demo3_2 from "../../../../assets/listeningExercises/3_2.png";
import demo3_3 from "../../../../assets/listeningExercises/3_3.png";
import ButtonCustom from "../../../../components/Button";

export default function ListeningResults() {
  const [exerciseResults, setExerciseResults] = useState(null);
  const { exerciseType, submissionId } = useParams();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [isAnswerDetail, setIsAnswerDetail] = useState({});

  const imagesArr = {
    demo1_1,
    demo1_2,
    demo1_3,
    demo2_1,
    demo2_2,
    demo2_3,
    demo3_1,
    demo3_2,
    demo3_3,
  };

  const handleNextPart = () => {
    if (
      exerciseResults &&
      currentPartIndex < exerciseResults.exercise.parts.length - 1
    ) {
      setCurrentPartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  useEffect(() => {
    const fetchListeningSubmissionData = async () => {
      const submissionsResponse = await fetch(
        `http://localhost:9999/listeningExercisesSubmission?id=${submissionId}&userId=1`
      );
      const exercisesResponse = await fetch(`http://localhost:9999/exercises`);

      const submissions = await submissionsResponse.json();
      const exercises = await exercisesResponse.json();

      const joinedData = submissions.map((submission) => {
        const exercise = exercises.find(
          (exercise) => exercise.id === submission.exerciseId
        );
        return {
          ...submission,
          exercise,
        };
      });
      setExerciseResults(joinedData[0]);
    };
    fetchListeningSubmissionData();
  }, [submissionId]);

  const currentPart = exerciseResults?.exercise?.parts[currentPartIndex];
  const handleTabChange = (key) => {};
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
          <Tabs defaultActiveKey="1" onChange={handleTabChange}>
            <TabPane tab="Questions and Answers" key={"questionsAnswers"}>
              {currentPart && (
                <>
                  <div style={{ textAlign: "center" }}>
                    <TextCustom style={{ textAlign: "center" }}>
                      Điểm: &nbsp;
                      <span style={{ color: "red" }}>
                        {exerciseResults.score}
                      </span>
                    </TextCustom>
                  </div>
                  <TextCustom style={{ color: "red", fontWeight: "bold" }}>
                    {currentPart.partName}
                  </TextCustom>
                  {currentPart.questions.map((question) => {
                    const userAnswer = exerciseResults.submissionAnswers.find(
                      (ans) => ans.questionId === question.id
                    );
                    const correctAnswer = currentPart.answers.find(
                      (answer) => answer.id === question.id
                    );
                    const isCorrect = userAnswer?.isCorrect;
                    return (
                      <div key={question.id}>
                        <TextCustom style={{ paddingTop: "20px" }}>
                          Câu {question.id}: {question.question}
                        </TextCustom>
                        <div style={{ marginTop: "20px" }}>
                          <Row style={{ textAlign: "center" }}>
                            {question.questionImage &&
                              question.questionImage.map((image, index) => (
                                <Col key={index} span={8}>
                                  <img
                                    src={imagesArr[image]}
                                    width={"80%"}
                                    style={{ marginBottom: "12px" }}
                                  />
                                </Col>
                              ))}
                          </Row>
                          <Row
                            style={{ textAlign: "center", marginTop: "10px" }}
                          >
                            {question.options.map((option) => {
                              const backgroundColor =
                                userAnswer?.userAnswer === option.id
                                  ? isCorrect
                                    ? "#5FD855"
                                    : "#FF4D4F"
                                  : "transparent";

                              return (
                                <Col key={option.id} span={8}>
                                  <ButtonCustom
                                    buttonType="primary"
                                    style={{ backgroundColor }}
                                    disabled
                                  >
                                    {option.id}. {option.text}
                                  </ButtonCustom>
                                </Col>
                              );
                            })}
                          </Row>
                          <Row
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                          >
                            <ButtonCustom
                              buttonType="primary"
                              onClick={() =>
                                handleToggleAnswerDetail(question.id)
                              }
                            >
                              Đáp án chi tiết
                            </ButtonCustom>
                          </Row>
                          {isAnswerDetail[question.id] && correctAnswer && (
                            <div style={{ paddingLeft: "20px" }}>
                              <TextCustom>
                                Đáp án đúng: {userAnswer?.correctAnswer}
                              </TextCustom>
                              <div>
                                {" "}
                                <TextCustom>
                                  Lời giải:{" "}
                                  <span style={{ color: "blue" }}>
                                    {correctAnswer?.answerDetail}
                                  </span>
                                </TextCustom>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
                      style={{
                        marginRight: "100px",
                        padding: "23px",
                        marginLeft: "23px",
                      }}
                      onClick={handleNextPart}
                      disabled={
                        currentPartIndex ===
                        exerciseResults.exercise.parts.length - 1
                      }
                    >
                      Phần sau
                    </ButtonCustom>
                  </div>
                </>
              )}
            </TabPane>
            <TabPane tab="Transcripts" key={"transcripts"}>
              {exerciseResults?.exercise?.transcript}
            </TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
}
