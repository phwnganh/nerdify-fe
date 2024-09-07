// 1. React and hooks
import React, { useEffect, useState } from "react";

// 2. Third-party libraries
import { Col, Row } from "antd";
import { BarChartOutlined, UserAddOutlined } from "@ant-design/icons";
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
import listening from "../../../assets/exercisesSkill/listening.png";
import reading from "../../../assets/exercisesSkill/reading.png";
import vocabulary from "../../../assets/exercisesSkill/vocabulary.jpg";
import writing from "../../../assets/exercisesSkill/writing.png";
import grammar from "../../../assets/exercisesSkill/grammar.png";

// 6. Constants
import { CLIENT_URI } from "../../../constants/uri.constants";

export default function ViewLevelDetail() {
  const [phases, setPhases] = useState([]);
  const [activePhase, setActivePhase] = useState("");
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  const imgLevelArr = { a1: a1, a2: a2 };

  useEffect(() => {
    fetch(`http://localhost:9999/levels/${courseId}`)
      .then((response) => response.json())
      .then((course) => {
        setCourse(course);
      })
      .catch((err) => console.error(err));
  }, [courseId]);

  useEffect(() => {
    fetch(`http://localhost:9999/phases?levelId=${courseId}`)
      .then((response) => response.json())
      .then((phases) => {
        const fetchExercises = phases.map((phase) =>
          fetch(`http://localhost:9999/exercises?phaseId=${phase.id}`)
            .then((res) => res.json())
            .then((exercises) => ({ ...phase, exercises })),
        );
        Promise.all(fetchExercises).then((phaseWithExercises) => {
          setPhases(phaseWithExercises);
          if (phaseWithExercises.length > 0) {
            setActivePhase(phaseWithExercises[0].name);
          }
        });
      })
      .catch((err) => console.error(err));
  }, [courseId]);

  const handlePhaseClick = (phase) => {
    setActivePhase(phase);
  };

  const handleExerciseClick = (exerciseType, exerciseId) => {
    navigate(`${CLIENT_URI.ONE_EXERCISE}/${exerciseType}/${exerciseId}`);
  };

  const renderContent = () => {
    const selectedPhase = phases.find((phase) => phase.name === activePhase);
    if (selectedPhase?.name === "Final Exam") {
      return (
        //Final Exam card here
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CardCustom
            bordered={true}
            style={{
              // width: "50%",
              marginTop: 20,
              marginBottom: 20,
              textAlign: "center",
              backgroundColor: "#EAA68D",
            }}
          >
            <ParagraphCustom style={{ color: "#FFFFFF" }}>Bạn cần hoàn thành final exam để được nhận cúp</ParagraphCustom>
            <ButtonToDoExam onClick={() => navigate(CLIENT_URI.FINAL_EXAM)}>Vào làm bài</ButtonToDoExam>
          </CardCustom>
        </div>
      );
    } else if (selectedPhase) {
      return selectedPhase.exercises.map((exercise, index) => (
        // CardCustom is a custom component của mỗi phase - chỉnh sửa style : width, margin, backgroundColor
        <CardCustom key={index} bordered={true} style={{ marginBottom: 20, cursor: "pointer", width: "800px" }} onClick={() => handleExerciseClick(exercise.exerciseType, exercise.id)}>
          <Row gutter={[16, 16]}>
            <Col md={12}>
              <img
                src={
                  exercise.exerciseType === "listening"
                    ? listening
                    : exercise.exerciseType === "reading"
                    ? reading
                    : exercise.exerciseType === "vocabulary"
                    ? vocabulary
                    : exercise.exerciseType === "grammar"
                    ? grammar
                    : writing
                }
                alt=""
                width={"50%"}
              />
            </Col>
            <Col md={12}>
              <TitleCustom level={4} style={{ textAlign: "center" }}>
                {exercise.title}
              </TitleCustom>
            </Col>
          </Row>
        </CardCustom>
      ));
    }
  };
  return (
    //top right bottom left
    <div style={{ padding: "50px 10px 20px 10px" }}>
      <div style={{ marginBottom: 16 }}>
        <BreadCrumbHome />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ maxWidth: 1000, margin: "auto" }}>
          <CardCustom bordered={false}>
            <Row gutter={[16, 16]}>
              <Col md={12}>
                <img src={imgLevelArr[course?.levelImage]} alt="" srcSet="" width={"50%"} height="auto" />
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
                  <UserAddOutlined style={{ marginRight: 8, color: "#9a9a9a" }}></UserAddOutlined>
                  <TextCustom>{course?.learners} người học</TextCustom>
                  <BarChartOutlined style={{ marginLeft: 70, marginRight: 8, color: "#9a9a9a" }}></BarChartOutlined>
                  <TextCustom>{course?.phasesNum} giai đoạn</TextCustom>
                </div>
                <ParagraphCustom>{course?.description}</ParagraphCustom>
              </Col>
            </Row>
          </CardCustom>
        </div>

        <div
          style={{
            width: "100%",
          }}
        >
          <ScrollablePhaseDiv>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {phases.map((phase, index) => (
                <ButtonPhase
                  key={index}
                  // buttonType="primary"
                  style={{
                    // display: "inline-block",
                    // width: "30%",
                    // height: 150,
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

        <div>{activePhase && <div style={{ marginTop: "16px" }}>{renderContent()}</div>}</div>
      </div>
    </div>
  );
}
