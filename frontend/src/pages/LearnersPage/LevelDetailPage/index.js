import React, { useEffect, useState } from "react";
import CardCustom from "../../../components/Card";
import {
  TitleCustom,
  TextCustom,
  ParagraphCustom,
} from "../../../components/Typography";
import a1 from "../../../assets/levelImage/a1.png";
import listening from "../../../assets/exercisesSkill/listening.png";
import reading from "../../../assets/exercisesSkill/reading.png";
import vocabulary from "../../../assets/exercisesSkill/vocabulary.jpg";
import writing from "../../../assets/exercisesSkill/writing.png";
import grammar from "../../../assets/exercisesSkill/grammar.png";
import { Affix, Col, Row } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";
import { BarChartOutlined, UserAddOutlined } from "@ant-design/icons";
import ButtonCustom from "../../../components/Button";
import { ButtonToDoExam, ScrollablePhaseDiv } from "./styled";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
import { useNavigate } from "react-router-dom";
import {CLIENT_URI} from '../../../constants/uri.constants'
export default function ViewLevelDetail() {
  const [phases, setPhases] = useState([]);
  const [activePhase, setActivePhase] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:9999/phases")
      .then((response) => response.json())
      .then((phases) => {
        const fetchExercises = phases.map((phase) =>
          fetch(`http://localhost:9999/exercises?phaseId=${phase.id}`)
            .then((res) => res.json())
            .then((exercises) => ({ ...phase, exercises }))
        );
        Promise.all(fetchExercises).then((phaseWithExercises) => {
          setPhases(phaseWithExercises);
          console.log("result: ", phaseWithExercises);
          
          if (phaseWithExercises.length > 0) {
            setActivePhase(phaseWithExercises[0].name);
          }
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handlePhaseClick = (phase) => {
    setActivePhase(phase);
  };

  const handleExerciseClick = (exerciseType, exerciseId) => {
    navigate(`/one-exercise/${exerciseType}/${exerciseId}`);
  };

  const renderContent = () => {
    const selectedPhase = phases.find((phase) => phase.name === activePhase);
    if(selectedPhase?.name === "Final Exam"){
      return (
        <CardCustom bordered={true} style={{marginTop: 20, textAlign: 'center', backgroundColor: '#EAA68D'}}>
          <ParagraphCustom style={{color: '#FFFFFF'}}>Bạn cần hoàn thành final exam để được nhận cúp</ParagraphCustom>
          <ButtonToDoExam onClick={() => navigate(CLIENT_URI.FINAL_EXAM)}>Vào làm bài</ButtonToDoExam>
        </CardCustom>
      )
    }else if(selectedPhase){
      return selectedPhase.exercises.map((exercise, index) => (
        <CardCustom
                key={index}
                bordered={true}
                style={{ marginBottom: 20, cursor: "pointer" }}
                onClick={() => handleExerciseClick(exercise.exerciseType, exercise.id)}
              >
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
      ))
    }
  }
  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <CardCustom bordered={false} style={{ maxWidth: 1000, margin: "auto" }}>
        <Row gutter={[16, 16]}>
          <Col md={12}>
            <img src={a1} alt="" srcSet="" width={"50%"} />
          </Col>
          <Col md={12}>
            <TitleCustom level={2}>Bài tập trình độ A1</TitleCustom>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <UserAddOutlined style={{ marginRight: 8 }}></UserAddOutlined>
              <TextCustom>10 người học</TextCustom>
              <BarChartOutlined
                style={{ marginLeft: 70, marginRight: 8 }}
              ></BarChartOutlined>
              <TextCustom>10 phase</TextCustom>
            </div>
            <ParagraphCustom>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit,
              quas, illum voluptates hic impedit molestias velit labore ipsa
              unde nihil eius excepturi nesciunt sed voluptatem perferendis nisi
              numquam, dignissimos distinctio.
            </ParagraphCustom>
          </Col>
        </Row>
      </CardCustom>

      <ScrollablePhaseDiv>
        {phases.map((phase, index) => (
          <ButtonCustom
            key={index}
            buttonType="primary"
            style={{
              display: "inline-block",
              width: "100%",
              height: 50,
              marginRight: 16,
              backgroundColor:
                activePhase === phase.name ? "#ff855d" : "#ffa751",
            }}
            onClick={() => handlePhaseClick(phase.name)}
          >
            {phase.name}
          </ButtonCustom>
        ))}
      </ScrollablePhaseDiv>
      {activePhase && <div style={{marginTop: '16px'}}>{renderContent()}</div>}

      
    </div>
  );
}
