import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Tabs } from "antd";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";
import { PART_TYPE } from "../../../../constants";

// Import images and audio files
import demo1_1 from "../../../../assets/listeningExercises/1_1.png";
import demo1_2 from "../../../../assets/listeningExercises/1_2.png";
import demo1_3 from "../../../../assets/listeningExercises/1_3.png";
import demo2_1 from "../../../../assets/listeningExercises/2_1.png";
import demo2_2 from "../../../../assets/listeningExercises/2_2.png";
import demo2_3 from "../../../../assets/listeningExercises/2_3.png";
import demo3_1 from "../../../../assets/listeningExercises/3_1.png";
import demo3_2 from "../../../../assets/listeningExercises/3_2.png";
import demo3_3 from "../../../../assets/listeningExercises/3_3.png";
import part1_ques1 from "../../../../assets/listeningExercises/teil 1-01.mp3";
import part1_ques2 from "../../../../assets/listeningExercises/teil 1-02.mp3";
import part1_ques3 from "../../../../assets/listeningExercises/teil 1-03.mp3";
import part2_ques7 from "../../../../assets/listeningExercises/teil 2-07.mp3";
import part2_ques8 from "../../../../assets/listeningExercises/teil 2-08.mp3";
import part2_ques9 from "../../../../assets/listeningExercises/teil 2-09.mp3";
import part3_ques11 from "../../../../assets/listeningExercises/teil 3-11.mp3";
import part3_ques12 from "../../../../assets/listeningExercises/teil 3-12.mp3";
import part3_ques13 from "../../../../assets/listeningExercises/teil 3-13.mp3";

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

const audioArr = {
  part1_ques1,
  part1_ques2,
  part1_ques3,
  part2_ques7,
  part2_ques8,
  part2_ques9,
  part3_ques11,
  part3_ques12,
  part3_ques13,
};

const { TabPane } = Tabs;

export default function ListeningExercise() {
  const { exerciseType, exerciseId } = useParams();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [exercises, setExercises] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [toggleAnswerDetail, setToggleAnswerDetail] = useState({});

  useEffect(() => {
    fetch(`http://localhost:9999/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setExercises(data[0]);
        }
      })
      .catch((err) => console.error("Error fetching exercise data", err));
  }, [exerciseType, exerciseId]);

  const handleSelectOptions = useCallback(
    (questionId, optionId) => {
      if (!isSubmitted) {
        setUserAnswers((prev) => ({
          ...prev,
          [questionId]: optionId,
        }));
      }
    },
    [isSubmitted],
  );

  const handleToggleAnswerDetail = useCallback((questionId) => {
    setToggleAnswerDetail((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  }, []);

  const totalQuestions = useMemo(() => exercises?.parts.reduce((acc, part) => acc + part.questions.length, 0), [exercises]);

  const handleSubmit = useCallback(() => {
    let correctAnswers = 0;
    const submissionAnswers = [];

    exercises.parts.forEach((part) => {
      part.questions.forEach((question) => {
        const userAnswer = userAnswers[question.id];
        const isCorrect = userAnswer === question.answer;
        if (isCorrect) {
          correctAnswers++;
        }
        submissionAnswers.push({
          questionId: question.id,
          userAnswer,
          correctAnswer: question.answer,
          isCorrect,
        });
      });
    });

    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);

    // Save submission to server
    const submissionData = {
      submissionDate: new Date().toISOString(),
      score: `${calculatedScore}%`,
      submissionAnswers,
      exerciseId: exercises.id,
      isCompleted: true,
    };

    fetch("http://localhost:9999/exercisesSubmission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
      .then((res) => res.json())
      .then((data) => console.log("Submission saved:", data))
      .catch((err) => console.error("Error saving submission:", err));

    // Update exercise completion status
    fetch(`http://localhost:9999/exercises/${exercises.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: true,
        score: `${calculatedScore}%`,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Exercise updated:", data))
      .catch((err) => console.error("Error updating exercise:", err));
  }, [exercises, userAnswers, totalQuestions]);

  const handleRetry = useCallback(() => {
    setUserAnswers({});
    setScore(0);
    setIsSubmitted(false);
    setCurrentPartIndex(0);
  }, []);

  const renderPart = (currentPart) => {
    return (
      <>
        {currentPart.questions.map((question) => (
          <div key={question.id}>
            <TextCustom style={{ paddingTop: "100px", fontWeight: "bold" }}>
              Câu {question.id}: {question.question}
            </TextCustom>
            <audio controls style={{ marginTop: "20px", width: "100%" }}>
              <source src={audioArr[question.audioUrl]} type="audio/mp3" />
              Trình duyệt của bạn không hỗ trợ phần tử audio.
            </audio>
            <div style={{ marginTop: "20px" }}>
              <Row style={{ textAlign: "center" }}>
                {question.questionImage &&
                  question.questionImage.map((image, index) => (
                    <Col key={index} span={8}>
                      <img src={imagesArr[image]} width={"80%"} style={{ marginBottom: "12px" }} alt={`Question ${question.id}`} />
                    </Col>
                  ))}
              </Row>
              <Row style={{ textAlign: "center", marginTop: "10px" }}>
                {question.options.map((option) => {
                  const isUserSelected = option.id === userAnswers[question.id];
                  const isCorrectAnswer = option.id === question.answer;
                  let backgroundColor = isUserSelected ? "#A8703E" : "";

                  if (isSubmitted) {
                    if (isCorrectAnswer) {
                      backgroundColor = "#5FD855";
                    } else if (isUserSelected && !isCorrectAnswer) {
                      backgroundColor = "red";
                    }
                  }

                  return (
                    <Col key={option.id} span={8}>
                      <ButtonCustom buttonType="primary" onClick={() => handleSelectOptions(question.id, option.id)} style={{ backgroundColor }} disabled={isSubmitted}>
                        {option.id}. {option.text}
                      </ButtonCustom>
                    </Col>
                  );
                })}
              </Row>
            </div>
            {isSubmitted && (
              <>
                <ButtonCustom buttonType="primary" onClick={() => handleToggleAnswerDetail(question.id)}>
                  Đáp án chi tiết
                </ButtonCustom>
                {toggleAnswerDetail[question.id] && <TextCustom style={{ color: "blue" }}>{question.answerDetail}</TextCustom>}
              </>
            )}
          </div>
        ))}
      </>
    );
  };

  const handleTabChange = (key) => {
    console.log("Tab changed to:", key);
  };

  if (!exercises?.parts) {
    return <div>Loading...</div>;
  }

  const currentPart = exercises.parts[currentPartIndex];

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises.title}
      </TitleCustom>

      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="Questions and Answers" key="questionsAnswers">
          {isSubmitted && (
            <div style={{ textAlign: "center" }}>
              <TextCustom>
                Điểm: <span style={{ color: "red" }}>{score}%</span>
              </TextCustom>
            </div>
          )}
          <TextCustom style={{ color: "red", fontWeight: "bold" }}>{currentPart.partName}</TextCustom>
          {currentPart.partType === PART_TYPE.MULTIPLE_CHOICE && renderPart(currentPart)}
          <div style={{ textAlign: "center", paddingTop: "50px" }}>
            <ButtonCustom buttonType="secondary" style={{ padding: "23px" }} onClick={() => setCurrentPartIndex((prev) => Math.max(prev - 1, 0))} disabled={currentPartIndex === 0}>
              Phần trước
            </ButtonCustom>
            <ButtonCustom
              buttonType="secondary"
              style={{ padding: "23px", marginLeft: "30px" }}
              onClick={() => setCurrentPartIndex((prev) => Math.min(prev + 1, exercises.parts.length - 1))}
              disabled={currentPartIndex === exercises.parts.length - 1}
            >
              Phần tiếp theo
            </ButtonCustom>
            {isSubmitted ? (
              <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleRetry}>
                Làm lại bài tập này
              </ButtonCustom>
            ) : (
              <ButtonCustom buttonType="secondary" style={{ padding: "23px", marginLeft: "30px" }} onClick={handleSubmit} disabled={currentPartIndex !== exercises.parts.length - 1}>
                Nộp bài
              </ButtonCustom>
            )}
          </div>
        </TabPane>
        <TabPane tab="Transcripts" key="transcripts">
          {isSubmitted ? (
            exercises?.parts?.map((part, index) => (
              <React.Fragment key={index}>
                <TextCustom>{part?.partName}</TextCustom>
                <TextCustom>{part?.transcript}</TextCustom>
              </React.Fragment>
            ))
          ) : (
            <div>Bạn phải hoàn thành bài tập này</div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}
