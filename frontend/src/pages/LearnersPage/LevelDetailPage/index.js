import React, { useState } from "react";
import CardCustom from "../../../components/Card";
import {
  TitleCustom,
  TextCustom,
  ParagraphCustom,
} from "../../../components/Typography";
import logo from "../../../assets/logo.png";
import listening from "../../../assets/listening.png";
import { Affix, Col, Row } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";
import { BarChartOutlined, UserAddOutlined } from "@ant-design/icons";
import ButtonCustom from "../../../components/Button";
import { ScrollablePhaseDiv } from "./styled";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
export default function ViewLevelDetail() {
  const phases = [
    {
      name: "Phase 1",
      exercises: ["Bài tập nghe 1", "Bài tập đọc 1", "Checkpoint Quiz"],
    },
    {
      name: "Phase 2",
      exercises: ["Bài tập ngữ pháp 1", "Bài tập từ vựng 1", "Checkpoint Quiz"],
    },
    {
      name: "Phase 3",
      exercises: [
        "Bài tập nghe 1",
        "Bài tập ngữ pháp 1",
        "Bài tập đọc 2",
        "Checkpoint Quiz",
      ],
    },
    {
      name: "Phase 4",
      exercises: [
        "Bài tập nghe 1",
        "Bài tập đọc 1",
        "Bài tập ngữ pháp 1",
        "Bài tập đọc 2",
        "Bài tập từ vựng 2",
        "Checkpoint Quiz",
      ],
    },
  ];
  const [activePhase, setActivePhase] = useState(phases[0].name);
  const handlePhaseClick = (phase) => {
    setActivePhase(phase);
  };
  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome/>
      <CardCustom bordered={false} style={{ maxWidth: 1000, margin: "auto" }}>
        <Row gutter={[16, 16]}>
          <Col md={12}>
            <img src={logo} alt="" srcset="" maxWidth={100} />
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
            >
              <Row gutter={[16, 16]}>
                <Col md={12}>
                  <img src={listening} alt="" srcset="" width={"50%"} />
                </Col>
                <Col md={12}>
                  <TitleCustom level={4} style={{ textAlign: "center" }}>
                    {exercise}
                  </TitleCustom>
                </Col>
              </Row>
            </CardCustom>
          ))}
      </div>
    </div>
  );
}
