import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { Col, Row, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane"; // Import TabPane for tabs functionality

// Import static images
import demo1_1 from "../../../../assets/listeningExercises/1_1.png";
import demo1_2 from "../../../../assets/listeningExercises/1_2.png";
import demo1_3 from "../../../../assets/listeningExercises/1_3.png";
import demo2_1 from "../../../../assets/listeningExercises/2_1.png";
import demo2_2 from "../../../../assets/listeningExercises/2_2.png";
import demo2_3 from "../../../../assets/listeningExercises/2_3.png";
import demo3_1 from "../../../../assets/listeningExercises/3_1.png";
import demo3_2 from "../../../../assets/listeningExercises/3_2.png";
import demo3_3 from "../../../../assets/listeningExercises/3_3.png";
import ButtonCustom from "../../../../components/Button"; // Import custom button component

export default function ListeningResults() {
  const [exerciseResults, setExerciseResults] = useState(null); // Holds the exercise result data
  const { exerciseType, submissionId } = useParams(); // Get exerciseType and submissionId from URL parameters
  const [currentPartIndex, setCurrentPartIndex] = useState(0); // Tracks the current part index
  const [isAnswerDetail, setIsAnswerDetail] = useState({}); // Tracks if detailed answers are shown for questions

  // Mapping of images for the exercises
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

  // Function to go to the next part in the exercise
  const handleNextPart = () => {
    if (
      exerciseResults &&
      currentPartIndex < exerciseResults.exercise.parts.length - 1
    ) {
      setCurrentPartIndex((prevIndex) => prevIndex + 1); // Increment the current part index
    }
  };

  // Function to go to the previous part in the exercise
  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Decrement the current part index, but not below 0
  };

  // Fetch exercise submission data
  useEffect(() => {
    const fetchListeningSubmissionData = async () => {
      const submissionsResponse = await fetch(
        `http://localhost:9999/listeningExercisesSubmission?id=${submissionId}&userId=1`
      ); // Fetch submission data based on submissionId and userId
      const exercisesResponse = await fetch(`http://localhost:9999/exercises`); // Fetch all exercises
      const submissions = await submissionsResponse.json();
      const exercises = await exercisesResponse.json();
      const joinedData = submissions.map((submission) => {
        const exercise = exercises.find(
          (exercise) => exercise.id === submission.exerciseId
        ); // Find the exercise related to the submission
        return { ...submission, exercise };
      });
      setExerciseResults(joinedData[0]); // Set the exercise result
    };
    fetchListeningSubmissionData();
  }, [submissionId]); // Effect depends on submissionId

  const currentPart = exerciseResults?.exercise?.parts[currentPartIndex]; // Get the current part of the exercise

  // Handle tab change
  const handleTabChange = (key) => {};

  // Toggle answer detail visibility for a specific question
  const handleToggleAnswerDetail = (questionId) => {
    setIsAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId], // Toggle the state of detailed answer visibility
    }));
  };

  return (
    <div style={{ padding: "25px" }}>
      {exerciseResults && (
        <div>
          {/* Title of the exercise */}
          <div>
            <TitleCustom level={2} style={{ fontWeight: "bold" }}>
              {exerciseResults.exercise.title}
            </TitleCustom>
          </div>

          <div>
            {/* Tabs for questions/answers and transcripts */}
            <Tabs defaultActiveKey="1" onChange={handleTabChange}>
              {/* Questions and Answers tab */}
              <TabPane tab="Questions and Answers" key={"questionsAnswers"}>
                {currentPart && (
                  <>
                    {/* Display score */}
                    <div style={{ textAlign: "center" }}>
                      <TextCustom style={{ textAlign: "center" }}>
                        Điểm: &nbsp;
                        <span style={{ color: "red" }}>
                          {exerciseResults.score}
                        </span>
                      </TextCustom>
                    </div>

                    {/* Display part name */}
                    <TextCustom style={{ color: "red", fontWeight: "bold" }}>
                      {currentPart.partName}
                    </TextCustom>

                    {/* Display each question */}
                    <div>
                      {currentPart.questions.map((question) => {
                        const userAnswer =
                          exerciseResults.submissionAnswers.find(
                            (ans) => ans.questionId === question.id
                          ); // Find the user's answer for the question
                        const correctAnswer = currentPart.answers.find(
                          (answer) => answer.id === question.id
                        ); // Find the correct answer
                        const isCorrect = userAnswer?.isCorrect; // Check if the user's answer is correct

                        return (
                          <div key={question.id}>
                            {/* Question text */}
                            <TextCustom style={{ paddingTop: "20px" }}>
                              Câu {question.id}: {question.question}
                            </TextCustom>

                            {/* Display question images */}
                            <div style={{ marginTop: "20px" }}>
                              <Row style={{ textAlign: "center" }}>
                                {question.questionImage &&
                                  question.questionImage.map((image, index) => (
                                    <Col key={index} span={8}>
                                      <img
                                        src={imagesArr[image]}
                                        width={"80%"}
                                        style={{
                                          marginBottom: "12px",
                                        }}
                                      />
                                    </Col>
                                  ))}
                              </Row>

                              {/* Display answer options */}
                              <Row
                                style={{
                                  textAlign: "center",
                                  marginTop: "10px",
                                }}
                              >
                                {question.options.map((option) => {
                                  const backgroundColor =
                                    userAnswer?.userAnswer === option.id
                                      ? isCorrect
                                        ? "#5FD855" // Green if correct
                                        : "#FF4D4F" // Red if incorrect
                                      : "transparent"; // Default background
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

                              {/* Button to toggle detailed answer */}
                              <Row
                                style={{
                                  marginTop: "20px",
                                  marginBottom: "20px",
                                }}
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

                              {/* Show detailed answer explanation if toggled */}
                              {isAnswerDetail[question.id] && correctAnswer && (
                                <div style={{ paddingLeft: "20px" }}>
                                  <TextCustom>
                                    Đáp án đúng: {userAnswer?.correctAnswer}
                                  </TextCustom>
                                  <div>
                                    <TextCustom>
                                      Lời giải:{" "}
                                      <span
                                        style={{
                                          color: "blue",
                                        }}
                                      >
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
                    </div>

                    {/* Buttons to navigate between parts */}
                    <div
                      style={{
                        textAlign: "center",
                        paddingTop: "50px",
                      }}
                    >
                      <ButtonCustom
                        buttonType="secondary"
                        style={{
                          marginRight: "100px",
                          padding: "23px",
                        }}
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

              {/* Transcripts tab */}
              <TabPane tab="Transcripts" key={"transcripts"}>
                {exerciseResults?.exercise?.transcript}
              </TabPane>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
