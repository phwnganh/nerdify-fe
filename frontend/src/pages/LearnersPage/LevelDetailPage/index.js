// 1. React and hooks
import React, { useEffect, useState } from "react";

// 2. Third-party libraries
import { Col, Row } from "antd";
import { BarChartOutlined, UserAddOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons"; // Cleaned up duplicate imports
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
import { CLIENT_URI } from "../../../constants/uri.constants"; // URI constants for navigation
import { EXERCISE_TYPE } from "../../../constants/common.constant"; // Exercise types for conditional rendering
import { getLevelDetail } from "../../../services/LearnerService";
import ModalCustom from "../../../components/Modal";


export function StartQuizModal({ exerciseId, onClose }) {
  const navigate = useNavigate();
  const handleStartQuiz = () => {
    onClose(); // Close the modal
    navigate(`${CLIENT_URI.ONE_EXERCISE}/${EXERCISE_TYPE.QUIZ}/${exerciseId}`); // Redirect to the quiz
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
  // State for storing phases, active phase, course, etc.
  const [phases, setPhases] = useState([]);
  const [activePhase, setActivePhase] = useState("");
  const { courseId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false); // State to handle modal visibility

  const [selectedExerciseId, setSelectedExerciseId] = useState(null); // Store the selected exercise id

  // console.log("courseId", courseId);
  
  const [course, setCourse] = useState(null);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const imgLevelArr = { a1: a1, a2: a2, b1: b1 }; // Mapping images for course levels

  // Fetch course details based on courseId
  useEffect(() => {
    fetch(`http://localhost:9999/levels/${courseId}`)
      .then((response) => response.json())
      .then((course) => {
        setCourse(course);
      })
      .catch((err) => console.error(err));
    // const retrieveCourseLevelDetail = async () => {
    //   try {
    //     const response = await getLevelDetail(courseId);
    //     setCourse(response?.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // retrieveCourseLevelDetail();
  }, [courseId]);

  // Fetch phases and their respective exercises
  useEffect(() => {
    fetch(`http://localhost:9999/phases?levelId=${courseId}`)
      .then((response) => response.json())
      .then((phases) => {
        // Fetch exercises for each phase
        const fetchExercises = phases.map((phase) =>
          fetch(`http://localhost:9999/exercises?phaseId=${phase.id}`)
            .then((res) => res.json())
            .then((exercises) => ({ ...phase, exercises })),
        );

        // Wait for all exercises to be fetched before setting the state
        Promise.all(fetchExercises).then((phaseWithExercises) => {
          setPhases(phaseWithExercises);
          if (phaseWithExercises.length > 0) {
            setActivePhase(phaseWithExercises[0].name); // Set default active phase
          }
        });
      })
      .catch((err) => console.error(err)); // Handle error for phases fetch
  }, [courseId]);

  // Handle when a user clicks on a phase
  const handlePhaseClick = (phase) => {
    setActivePhase(phase); // Set the clicked phase as the active phase
  };

  // Handle when a user clicks on an exercise
  const handleExerciseClick = (exerciseType, exerciseId) => {
    if(exerciseType === EXERCISE_TYPE.QUIZ){
      setSelectedExerciseId(exerciseId); // Set the quiz exercise ID
      setIsModalVisible(true); // Show the modal
    }
    navigate(`${CLIENT_URI.ONE_EXERCISE}/${exerciseType}/${exerciseId}`); // Navigate to the exercise page
    
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal
  };
  // Handle when a user clicks on the final exam
  const handleFinalExamClick = (examId) => {
    navigate(`${CLIENT_URI.FINAL_EXAM}/${examId}`); // Navigate to the final exam page
  };

  // Render the content for the selected phase
  const renderContent = () => {
    const selectedPhase = phases.find((phase) => phase.name === activePhase);

    // Check if the selected phase is the Final Exam
    if (selectedPhase?.name === "Final Exam") {
      const examId = selectedPhase?.examId;
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
            {/* Fixed: Pass the function, not invoke it */}
            <ButtonToDoExam onClick={() => handleFinalExamClick(examId)}>Vào làm bài</ButtonToDoExam>
          </CardCustom>
        </div>
      );
    } else if (selectedPhase) {
      // Render exercises for the selected phase
      return selectedPhase.exercises.map((exercise, index) => (
        <CardCustom key={index} bordered={true} style={{ marginBottom: 20, cursor: "pointer", width: "800px" }} onClick={() => handleExerciseClick(exercise.exerciseType, exercise.id)}>
          <Row gutter={[16, 16]}>
            <Col md={12}>
              {/* Conditional image based on exercise type */}
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
              ) : // Default case for non-quiz exercises (passed case only)
              exercise?.isCompleted ? (
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
      {isModalVisible && (
        <StartQuizModal exerciseId={selectedExerciseId} onClose={() => setIsModalVisible(false)} />
      )}
      <div style={{ marginBottom: 16 }}>
        <BreadCrumbHome />
      </div>

      {/* Main content area */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ maxWidth: 1000, margin: "auto" }}>
          <CardCustom bordered={false}>
            <Row gutter={[16, 16]}>
              <Col md={12}>
                <img src={imgLevelArr[course?.levelImage]} alt="" width={"50%"} height="auto" />
              </Col>
              <Col md={12}>
                <TitleCustom level={2}>{course?.title}</TitleCustom>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <UserAddOutlined style={{ marginRight: 8, color: "#9a9a9a" }} />
                  <TextCustom>{course?.learners} người học</TextCustom>
                  <BarChartOutlined style={{ marginLeft: 70, marginRight: 8, color: "#9a9a9a" }} />
                  <TextCustom>{course?.phases?.length} phase</TextCustom>
                </div>
                <ParagraphCustom>{course?.description}</ParagraphCustom>
              </Col>
            </Row>
          </CardCustom>
        </div>

        {/* Phase buttons */}
        <div style={{ width: "100%" }}>
          <ScrollablePhaseDiv>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {phases.map((phase, index) => (
                <ButtonPhase
                  key={index}
                  style={{
                    backgroundColor: activePhase === phase.name ? "#ff855d" : "#ffa751",
                  }}
                  onClick={() => handlePhaseClick(phase.name)}
                >
                  {phase.name}
                </ButtonPhase>
              ))}
            </div>
          </ScrollablePhaseDiv>
        </div>

        {/* Render content for the active phase */}
        <div>{activePhase && <div style={{ marginTop: "16px" }}>{renderContent()}</div>}</div>
      </div>
    </div>
  );
}
