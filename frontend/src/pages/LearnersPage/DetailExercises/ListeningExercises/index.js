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
import demo4_1 from "../../../../assets/listeningExercises/4_1.png";
import demo4_2 from "../../../../assets/listeningExercises/4_2.png";
import demo4_3 from "../../../../assets/listeningExercises/4_3.png";
import demo5_1 from "../../../../assets/listeningExercises/5_1.png";
import demo5_2 from "../../../../assets/listeningExercises/5_2.png";
import demo5_3 from "../../../../assets/listeningExercises/5_3.png";
import demo02_1_1 from "../../../../assets/listeningExercises/2_1_1.png";
import demo02_1_2 from "../../../../assets/listeningExercises/2_1_2.png";
import demo02_1_3 from "../../../../assets/listeningExercises/2_1_3.png";
import demo02_2_1 from "../../../../assets/listeningExercises/2_2_1.png";
import demo02_2_2 from "../../../../assets/listeningExercises/2_2_2.png";
import demo02_2_3 from "../../../../assets/listeningExercises/2_2_3.png";
import demo02_3_1 from "../../../../assets/listeningExercises/2_3_1.png";
import demo02_3_2 from "../../../../assets/listeningExercises/2_3_2.png";
import demo02_3_3 from "../../../../assets/listeningExercises/2_3_3.png";
import demo02_4_1 from "../../../../assets/listeningExercises/2_4_1.png";
import demo02_4_2 from "../../../../assets/listeningExercises/2_4_2.png";
import demo02_4_3 from "../../../../assets/listeningExercises/2_4_3.png";
import demo02_5_1 from "../../../../assets/listeningExercises/2_5_1.png";
import demo02_5_2 from "../../../../assets/listeningExercises/2_5_2.png";
import demo02_5_3 from "../../../../assets/listeningExercises/2_5_3.png";
import demo02_6_1 from "../../../../assets/listeningExercises/2_6_1.png";
import demo02_6_2 from "../../../../assets/listeningExercises/2_6_2.png";
import demo02_6_3 from "../../../../assets/listeningExercises/2_6_3.png";

// images of a2-phase 1
import part2_ques6_1_A2 from "../../../../assets/listeningExercises/a2-teil2-6_1.png";
import part2_ques6_2_A2 from "../../../../assets/listeningExercises/a2-teil2-6_2.png";
import part2_ques6_3_A2 from "../../../../assets/listeningExercises/a2-teil2-6_3.png";
import part2_ques7_1_A2 from "../../../../assets/listeningExercises/a2-teil2-7_1.png";
import part2_ques7_2_A2 from "../../../../assets/listeningExercises/a2-teil2-7_2.png";
import part2_ques7_3_A2 from "../../../../assets/listeningExercises/a2-teil2-7_3.png";
import part2_ques8_1_A2 from "../../../../assets/listeningExercises/a2-teil2-8_1.png";
import part2_ques8_2_A2 from "../../../../assets/listeningExercises/a2-teil2-8_2.png";
import part2_ques8_3_A2 from "../../../../assets/listeningExercises/a2-teil2_8_3.png";
import part2_ques9_1_A2 from "../../../../assets/listeningExercises/a2-teil2-9_1.png";
import part2_ques9_2_A2 from "../../../../assets/listeningExercises/a2-teil2-9_2.png";
import part2_ques9_3_A2 from "../../../../assets/listeningExercises/a2-teil2-9_3.png";
import part2_ques10_1_A2 from "../../../../assets/listeningExercises/a2-teil2-10_1.png";
import part2_ques10_2_A2 from "../../../../assets/listeningExercises/a2-teil2-10_2.png";
import part2_ques10_3_A2 from "../../../../assets/listeningExercises/a2-teil2-10_3.png";

import part1_ques1 from "../../../../assets/listeningExercises/teil 1-01.mp3";
import part1_ques2 from "../../../../assets/listeningExercises/teil 1-02.mp3";
import part1_ques3 from "../../../../assets/listeningExercises/teil 1-03.mp3";
import part1_ques4 from "../../../../assets/listeningExercises/teil 1-04.mp3";
import part1_ques5 from "../../../../assets/listeningExercises/teil 1-05.mp3";
import part2_ques7 from "../../../../assets/listeningExercises/teil 2-07.mp3";
import part2_ques8 from "../../../../assets/listeningExercises/teil 2-08.mp3";
import part2_ques9 from "../../../../assets/listeningExercises/teil 2-09.mp3";
import part2_ques10 from "../../../../assets/listeningExercises/teil 2-10.mp3";
import part3_ques11 from "../../../../assets/listeningExercises/teil 3-11.mp3";
import part3_ques12 from "../../../../assets/listeningExercises/teil 3-12.mp3";
import part3_ques13 from "../../../../assets/listeningExercises/teil 3-13.mp3";
import part3_ques14 from "../../../../assets/listeningExercises/teil 3-14.mp3";
import part3_ques15 from "../../../../assets/listeningExercises/teil 3-15.mp3";

// phase 2
import part1_ques1_2 from "../../../../assets/listeningExercises/02- teil 1-01.mp3";
import part1_ques2_2 from "../../../../assets/listeningExercises/02- teil 1-02.mp3";
import part1_ques3_2 from "../../../../assets/listeningExercises/02- teil 1-03.mp3";
import part1_ques4_2 from "../../../../assets/listeningExercises/02- teil 1-04.mp3";
import part1_ques5_2 from "../../../../assets/listeningExercises/02- teil 1-05.mp3";
import part1_ques6_2 from "../../../../assets/listeningExercises/02- teil 1-06.mp3";
import part2_ques7_2 from "../../../../assets/listeningExercises/02- teil 2-07.mp3";
import part2_ques8_2 from "../../../../assets/listeningExercises/02- teil 2-08.mp3";
import part2_ques9_2 from "../../../../assets/listeningExercises/02- teil 2-09.mp3";
import part2_ques10_2 from "../../../../assets/listeningExercises/02- teil 2-10.mp3";
import part3_ques11_2 from "../../../../assets/listeningExercises/02- teil 3-11.mp3";
import part3_ques12_2 from "../../../../assets/listeningExercises/02- teil 3-12.mp3";
import part3_ques13_2 from "../../../../assets/listeningExercises/02- teil 3-13.mp3";
import part3_ques14_2 from "../../../../assets/listeningExercises/02- teil 3-14.mp3";
import part3_ques15_2 from "../../../../assets/listeningExercises/02- teil 3-15.mp3";

//phase 1 - a2
import part1_ques1_A2 from "../../../../assets/listeningExercises/a2-teil1-01.mp3";
import part1_ques2_A2 from "../../../../assets/listeningExercises/a2-teil1-02.mp3";
import part1_ques3_A2 from "../../../../assets/listeningExercises/02- teil 1-03.mp3";
import part1_ques4_A2 from "../../../../assets/listeningExercises/02- teil 1-04.mp3";
import part1_ques5_A2 from "../../../../assets/listeningExercises/02- teil 1-05.mp3";
import part2_ques6_A2 from "../../../../assets/listeningExercises/a2-teil2-6.mp3";
import part2_ques7_A2 from "../../../../assets/listeningExercises/a2-teil2-7.mp3";
import part2_ques8_A2 from "../../../../assets/listeningExercises/a2-teil2-8.mp3";
import part2_ques9_A2 from "../../../../assets/listeningExercises/a2-teil2-9.mp3";
import part2_ques10_A2 from "../../../../assets/listeningExercises/a2-teil2-10.mp3";
import part3_A2 from '../../../../assets/listeningExercises/part3_A2.mp3';

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
  demo4_1,
  demo4_2,
  demo4_3,
  demo5_1,
  demo5_2,
  demo5_3,
  demo02_1_1,
  demo02_1_2,
  demo02_1_3,
  demo02_2_1,
  demo02_2_2,
  demo02_2_3,
  demo02_3_1,
  demo02_3_2,
  demo02_3_3,
  demo02_4_1,
  demo02_4_2,
  demo02_4_3,
  demo02_5_1,
  demo02_5_2,
  demo02_5_3,
  demo02_6_1,
  demo02_6_2,
  demo02_6_3,
  part2_ques6_1_A2,
  part2_ques6_2_A2,
  part2_ques6_3_A2,
  part2_ques7_1_A2,
  part2_ques7_2_A2,
  part2_ques7_3_A2,
  part2_ques8_1_A2,
  part2_ques8_2_A2,
  part2_ques8_3_A2,
  part2_ques9_1_A2,
  part2_ques9_2_A2,
  part2_ques9_3_A2,
  part2_ques10_1_A2,
  part2_ques10_2_A2,
  part2_ques10_3_A2,
};

const audioArr = {
  part1_ques1,
  part1_ques2,
  part1_ques3,
  part1_ques4,
  part1_ques5,
  part2_ques7,
  part2_ques8,
  part2_ques9,
  part2_ques10,
  part3_ques11,
  part3_ques12,
  part3_ques13,
  part3_ques14,
  part3_ques15,
  part1_ques1_2,
  part1_ques2_2,
  part1_ques3_2,
  part1_ques4_2,
  part1_ques5_2,
  part1_ques6_2,
  part2_ques7_2,
  part2_ques8_2,
  part2_ques9_2,
  part2_ques10_2,
  part3_ques11_2,
  part3_ques12_2,
  part3_ques13_2,
  part3_ques14_2,
  part3_ques15_2,
  part1_ques1_A2,
  part1_ques2_A2,
  part1_ques3_A2,
  part1_ques4_A2,
  part1_ques5_A2,
  part2_ques6_A2,
  part2_ques7_A2,
  part2_ques8_A2,
  part2_ques9_A2,
  part2_ques10_A2,
  part3_A2
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
            {question.audioUrl && (
              <audio controls style={{ marginTop: "20px", width: "100%" }}>
                <source src={audioArr[question.audioUrl]} type="audio/mp3" />
                Trình duyệt của bạn không hỗ trợ phần tử audio.
              </audio>
            )}

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
              <div style={{ padding: "20px" }}>
                <ButtonCustom buttonType="primary" onClick={() => handleToggleAnswerDetail(question.id)}>
                  Đáp án chi tiết
                </ButtonCustom>
                {toggleAnswerDetail[question.id] && (
                  <div>
                    <TextCustom style={{ color: "blue" }}>
                      {question?.answerDetail.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </TextCustom>
                  </div>
                )}
              </div>
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
          {currentPart.audioUrl && (
            <audio controls style={{ marginTop: "20px", width: "100%" }}>
              <source src={audioArr[currentPart?.audioUrl]} type="audio/mp3" />
              Trình duyệt của bạn không hỗ trợ phần tử audio.
            </audio>
          )}
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
                <div>
                  <TextCustom style={{ fontWeight: "bold" }}>{part?.partName}</TextCustom>
                </div>
                <div>
                  <TextCustom>
                    {part?.transcript.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </TextCustom>
                </div>
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
