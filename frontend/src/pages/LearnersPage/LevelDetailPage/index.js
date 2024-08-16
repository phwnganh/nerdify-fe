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
import { ScrollablePhaseDiv } from "./styled";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../constants";
import ModalRequireToLogin from "../../GuestsPage/ModalRequireToLogin";
export default function ViewLevelDetail() {
  const navigate = useNavigate();
  const phases = [
    {
      name: "Phase 1",
      exercises: [
        {
          id: 1,
          title: "Bài tập nghe 1",
          exerciseType: "listening",
          exerciseImage: listening,
        },
        {
          id: 2,
          title: "Bài tập đọc 1",
          exerciseType: "reading",
          exerciseImage: reading,
        },
        {
          id: 3,
          title: "Bài tập từ vựng 1",
          exerciseType: "vocabulary",
          exerciseImage: vocabulary,
        },
        {
          id: 4,
          title: "Checkpoint Quiz",
          exerciseType: "quiz",
        },
      ],
    },
    {
      name: "Phase 2",
      exercises: [
        {
          id: 1,
          title: "Bài tập ngữ pháp 1",
          exerciseType: "grammar",
          exerciseImage: grammar,
        },
        {
          id: 2,
          title: "Bài tập từ vựng 1",
          exerciseType: "vocabulary",
          exerciseImage: vocabulary,
        },
        {
          id: 3,
          title: "Checkpoint Quiz",
          exerciseType: "quiz",
        },
      ],
    },
    {
      name: "Phase 3",
      exercises: [
        {
          id: 1,
          title: "Bài tập nghe 1",
          exerciseType: "listening",
          exerciseImage: listening,
        },
        {
          id: 2,
          title: "Bài tập ngữ pháp 1",
          exerciseType: "grammar",
          exerciseImage: grammar,
        },
        {
          id: 3,
          title: "Bài tập đọc 2",
          exerciseType: "reading",
          exerciseImage: reading,
        },
        {
          id: 4,
          title: "Checkpoint Quiz",
          exerciseType: "quiz",
        },
      ],
    },
    {
      name: "Phase 4",
      exercises: [
        {
          id: 1,
          title: "Bài tập nghe 1",
          exerciseType: "listening",
          exerciseImage: listening,
        },
        {
          id: 2,
          title: "Bài tập ngữ pháp 1",
          exerciseType: "grammar",
          exerciseImage: grammar,
        },
        {
          id: 3,
          title: "Bài tập đọc 1",
          exerciseType: "reading",
          exerciseImage: reading,
        },
        {
          id: 4,
          title: "Bài tập ngữ pháp 2",
          exerciseType: "grammar",
          exerciseImage: grammar,
        },
        {
          id: 5,
          title: "Bài tập đọc 2",
          exerciseType: "reading",
          exerciseImage: reading,
        },
        {
          id: 6,
          title: "Checkpoint Quiz",
          exerciseType: "quiz",
        },
      ],
    },
  ];
  const [activePhase, setActivePhase] = useState(phases[0].name);

  const [open, setOpen] = useState(false);

  const handlePhaseClick = (phase) => {
    setActivePhase(phase);
  };

  useEffect(() => {
    setOpen(open);
  }, [open]);
  console.log("open" + open);
  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <CardCustom bordered={false} style={{ maxWidth: 1000, margin: "auto" }}>
        <Row gutter={[16, 16]}>
          <Col md={12}>
            <img src={a1} alt="" srcset="" width={"50%"} />
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
              backgroundColor: activePhase === phase.name ? "ff855d" : "ffa751",
            }}
            onClick={() => handlePhaseClick(phase.name)}
          >
            {phase.name}
          </ButtonCustom>
        ))}
      </ScrollablePhaseDiv>
      <div style={{ marginTop: "16px" }}>
        {phases
          .find((phase) => phase.name === activePhase)
          .exercises.map((exercise, index) => (
            <CardCustom
              key={index}
              bordered={true}
              style={{ marginBottom: 20 }}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <Row gutter={[16, 16]}>
                <Col md={12}>
                  <img
                    src={exercise.exerciseImage}
                    alt=""
                    srcset=""
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
          ))}

        <ModalRequireToLogin open={open} />
      </div>
    </div>
  );
}
