// 1. React and hooks
import React, { useEffect, useState } from "react";

// 2. Third-party libraries
import { Col, Row } from "antd";
import { BarChartOutlined, UserAddOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

// 3. Custom components
import CardCustom from "../../../components/Card";
import { TitleCustom, TextCustom, ParagraphCustom } from "../../../components/Typography";
import ButtonCustom from "../../../components/Button";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";

// 4. Styled components
import { ButtonToDoExam, ScrollablePhaseDiv, ButtonPhase } from "./styled";

// 5. Static assets (images)
import a1 from "../../../assets/levelImage/a1.png";
import a2 from "../../../assets/levelImage/a2.png";
import b1 from "../../../assets/levelImage/b1.png";
import listening from "../../../assets/exercisesSkill/listening.png";
import reading from "../../../assets/exercisesSkill/reading.png";
import vocabulary from "../../../assets/exercisesSkill/vocabulary.jpg";
import writing from "../../../assets/exercisesSkill/writing.png";
import grammar from "../../../assets/exercisesSkill/grammar.png";
import quiz from "../../../assets/exercisesSkill/checkpointQuiz.jpg";

// Constants
import { CLIENT_URI } from "../../../constants/uri.constants";
import { ACCOUNT_TYPE, EXERCISE_TYPE } from "../../../constants/common.constant";
import { getFinalExamDetailByCourseId, getLevelDetail } from "../../../services/LearnerService";
import ModalCustom from "../../../components/Modal";
import { useAuth } from "../../../hooks";

export function StartQuizModal({ exerciseId, onClose }) {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    onClose();
    navigate(`${CLIENT_URI.ONE_EXERCISE}/${EXERCISE_TYPE.QUIZ}/${exerciseId}`);
  };

  return (
    <ModalCustom
      title="Bài kiểm tra Quiz"
      visible={true}
      onCancel={onClose}
      footer={[
        <ButtonCustom key="start" buttonType="primary" onClick={handleStartQuiz}>
          Bắt đầu làm bài
        </ButtonCustom>,
      ]}
    >
      <p>Bạn có 15 phút để hoàn thành bài kiểm tra này.</p>
    </ModalCustom>
  );
}

export default function ViewLevelDetail() {
  const [course, setCourse] = useState(null); // Single state for course and phases
  const [activePhase, setActivePhase] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [finalExamDetail, setFinalExamDetail] = useState(null);
  const { courseId } = useParams();
  const { user } = useAuth();
  console.log("check user type: ", user?.accountType?.type);
  const navigate = useNavigate();

  const imgLevelArr = { a1: a1, a2: a2, b1: b1 };

  useEffect(() => {
    if (courseId) {
      getLevelDetail(courseId)
        .then((resp) => {
          setCourse(resp.data);
          if (resp.data.phases.length > 0) setActivePhase(resp.data.phases[0].title);
        })
        .catch((error) => {
          console.error("Error fetching course details", error);
        });
    }
  }, [courseId]);

  useEffect(() => {
    if (activePhase === "Final Exam" && courseId) {
      getFinalExamDetailByCourseId(courseId)
        .then((res) => {
          console.log("final exam detail: ", res.data[0]);
          setFinalExamDetail(res.data[0]);
        })
        .catch((err) => {
          console.error("Error fetching final exam details", err);
        });
    }
  }, [activePhase, courseId]);

  const handlePhaseClick = (phaseTitle) => {
    if (user?.accountType?.type === ACCOUNT_TYPE.FREEMIUM) {
      // Find the current index of the clicked phase
      const currentIndex = course.phases.findIndex((phase) => phase.title === phaseTitle);
      // Find the index of the last completed phase for Freemium users
      const lastCompletedPhaseIndex = course.phases.findIndex((phase) => phase?.exercises.every((exercise) => exercise?.isCompleted));

      // Check if the clicked phase is allowed
      if (currentIndex > lastCompletedPhaseIndex + 1) return; // Do not allow clicking on locked phases
    }
    setActivePhase(phaseTitle);
  };

  const handleExerciseClick = (exerciseType, exerciseId) => {
    if (exerciseType === EXERCISE_TYPE.QUIZ) {
      setSelectedExerciseId(exerciseId);
      setIsModalVisible(true);
    } else {
      navigate(`${CLIENT_URI.ONE_EXERCISE}/${exerciseType}/${exerciseId}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleFinalExamClick = (examId) => {
    navigate(`${CLIENT_URI.FINAL_EXAM}/${examId}`);
  };

  const renderContent = () => {
    const selectedPhase = course?.phases.find((phase) => phase.title === activePhase);

    if (!selectedPhase) return null;
    if (selectedPhase.title === "Final Exam") {
      const examId = finalExamDetail?.exercises[0]?._id;
      console.log("examId: ", examId);
      return selectedPhase.exercises.map((exercise, index) => {
        const isLocked = user?.accountType?.type === ACCOUNT_TYPE.FREEMIUM && index > 1 && !exercise?.isCompleted;
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CardCustom
              bordered={true}
              style={{
                marginTop: 20,
                marginBottom: 20,
                textAlign: "center",
                backgroundColor: "#EAA68D",
              }}
            >
              <ParagraphCustom style={{ color: "#FFFFFF" }}>Bạn cần hoàn thành final exam để được nhận cúp</ParagraphCustom>
              <ButtonToDoExam onClick={() => handleFinalExamClick(selectedPhase?._id)}>Vào làm bài</ButtonToDoExam>
            </CardCustom>
          </div>
        );
      });
    } else {
      return selectedPhase.exercises.map((exercise, index) => (
        <CardCustom key={index} bordered={true} style={{ marginBottom: 20, cursor: "pointer", width: "800px" }} onClick={() => handleExerciseClick(exercise.exerciseType, exercise._id)}>
          <Row gutter={[16, 16]}>
            <Col md={12}>
              <img
                src={
                  exercise.exerciseType === EXERCISE_TYPE.LISTENING
                    ? listening
                    : exercise.exerciseType === EXERCISE_TYPE.READING
                    ? reading
                    : exercise.exerciseType === EXERCISE_TYPE.VOCABULARY
                    ? vocabulary
                    : exercise.exerciseType === EXERCISE_TYPE.GRAMMAR
                    ? grammar
                    : exercise.exerciseType === EXERCISE_TYPE.WRITING
                    ? writing
                    : quiz
                }
                alt=""
                width={"50%"}
              />
            </Col>
            <Col md={12}>
              {exercise?.exerciseType === EXERCISE_TYPE.QUIZ ? (
                exercise?.isCompleted ? (
                  exercise?.conditionStatus === "passed" ? (
                    <div style={{ textAlign: "center" }}>
                      <TitleCustom level={4}>{exercise?.title}</TitleCustom>
                      <CheckOutlined style={{ color: "green" }} /> &nbsp;
                      <TextCustom style={{ color: "green" }}>{exercise?.score}</TextCustom>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <TitleCustom level={4}>{exercise?.title}</TitleCustom>
                      <CloseOutlined style={{ color: "red" }} /> &nbsp;
                      <TextCustom style={{ color: "red" }}>{exercise?.score}</TextCustom>
                    </div>
                  )
                ) : (
                  <TitleCustom level={4} style={{ textAlign: "center" }}>
                    {exercise?.title}
                  </TitleCustom>
                )
              ) : exercise?.isCompleted ? (
                <div style={{ textAlign: "center" }}>
                  <TitleCustom level={4}>{exercise?.title}</TitleCustom>
                  <CheckOutlined style={{ color: "green" }} /> &nbsp;
                  <TextCustom style={{ color: "green" }}>{exercise?.score}</TextCustom>
                </div>
              ) : (
                <TitleCustom level={4} style={{ textAlign: "center" }}>
                  {exercise?.title}
                </TitleCustom>
              )}
            </Col>
          </Row>
        </CardCustom>
      ));
    }
  };

  return (
    <div style={{ padding: "50px 10px 20px 10px" }}>
      {isModalVisible && <StartQuizModal exerciseId={selectedExerciseId} onClose={handleCloseModal} />}
      <div style={{ marginBottom: 16 }}>
        <BreadCrumbHome />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ maxWidth: 1000, margin: "auto" }}>
          <CardCustom bordered={false}>
            <Row gutter={[16, 16]}>
              <Col md={12}>
                <img src={imgLevelArr[course?.levelImage]} alt="" width={"50%"} height="auto" />
              </Col>
              <Col md={12}>
                <TitleCustom level={2}>{course?.title}</TitleCustom>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                  <UserAddOutlined style={{ marginRight: 8, color: "#9a9a9a" }} />
                  <TextCustom>{course?.learners} người học</TextCustom>
                  <BarChartOutlined style={{ marginLeft: 70, marginRight: 8, color: "#9a9a9a" }} />
                  <TextCustom>{course?.phases?.length} phases</TextCustom>
                </div>
                <ParagraphCustom>{course?.description}</ParagraphCustom>
              </Col>
            </Row>
          </CardCustom>
        </div>

        <div style={{ width: "100%" }}>
          {/* <ScrollablePhaseDiv>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {course?.phases?.map((phase, index) => (
                <ButtonPhase
                  key={index}
                  style={{
                    backgroundColor: activePhase === phase.title ? "#FFA26B" : "#F0F0F0",
                    color: activePhase === phase.title ? "#FFFFFF" : "#000000",
                  }}
                  onClick={() => handlePhaseClick(phase.title)}
                >
                  {phase.title}
                </ButtonPhase>
              ))}
            </div>
          </ScrollablePhaseDiv> */}
          <ScrollablePhaseDiv>
            {course?.phases?.map((phase, index) => {
              const isPhaseLocked =
                user?.accountType?.type === ACCOUNT_TYPE.FREEMIUM && index > 0 && !course.phases.slice(0, index).every((prevPhase) => prevPhase.exercises.every((exercise) => exercise?.isCompleted));
              return (
                <ButtonPhase
                  key={index}
                  style={{
                    backgroundColor: activePhase === phase.title ? "#ff855d" : "#ffa751",
                    cursor: isPhaseLocked ? "not-allowed" : "pointer",
                    opacity: isPhaseLocked ? 0.5 : 1,
                  }}
                  onClick={() => !isPhaseLocked && handlePhaseClick(phase.title)}
                >
                  {phase.title}
                </ButtonPhase>
              );
            })}
          </ScrollablePhaseDiv>
        </div>

        <div>{activePhase && <div style={{ marginTop: "16px" }}>{renderContent()}</div>}</div>
      </div>
    </div>
  );
}
