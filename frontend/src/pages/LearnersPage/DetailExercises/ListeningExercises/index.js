import { useState } from "react";
import demo_1 from "../../../../assets/listeningExercises/1_1.png";
import demo_2 from "../../../../assets/listeningExercises/1_2.png";
import demo_3 from "../../../../assets/listeningExercises/1_3.png";
import demo_2_1 from "../../../../assets/listeningExercises/2_1.png";
import demo_2_2 from "../../../../assets/listeningExercises/2_2.png";
import demo_2_3 from "../../../../assets/listeningExercises/2_3.png";
import demo_3_1 from "../../../../assets/listeningExercises/3_1.png";
import demo_3_2 from "../../../../assets/listeningExercises/3_2.png";
import demo_3_3 from "../../../../assets/listeningExercises/3_3.png";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";
import { Col, Row } from "antd";

export default function ListeningExercise() {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const listeningContent = [
    {
      id: 1,
      parts: [
        {
          id: 1,
          partName: `Phần 1: Was ist richtig? Kreuzen Sie an: a, b oder c.
Sie hören jeden Text zweimal.`,
          questions: [
            {
              id: 1,
              question: `Was kostet der Pullover?`,
              questionImage: [demo_1, demo_2, demo_3],
              options: [
                {
                  id: "A",
                  text: `Dreißig Euro.`,
                },
                {
                  id: "B",
                  text: `Fünfundneunzig Euro.`,
                },
                {
                  id: "C",
                  text: `
Neunzehn Euro
fünfundneunzig Cent.`,
                },
              ],
            },
            {
              id: 2,
              question: `Was kostet der Pullover?`,
              questionImage: [demo_2_1, demo_2_2, demo_2_3],
              options: [
                {
                  id: "A",
                  text: `Dreißig Euro.`,
                },
                {
                  id: "B",
                  text: `Fünfundneunzig Euro.`,
                },
                {
                  id: "C",
                  text: `
    Neunzehn Euro
    fünfundneunzig Cent.`,
                },
              ],
            },
            {
              id: 3,
              question: `Was kostet der Pullover?`,
              questionImage: [demo_3_1, demo_3_2, demo_3_3],
              options: [
                {
                  id: "A",
                  text: `Dreißig Euro.`,
                },
                {
                  id: "B",
                  text: `Fünfundneunzig Euro.`,
                },
                {
                  id: "C",
                  text: `
    Neunzehn Euro
    fünfundneunzig Cent.`,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          partName: `Phần 2: Kreuzen Sie an: Richtig oder Falsch.
Sie hören jeden Text einmal.`,
          questions: [
            {
              id: 4,
              question: `Die Kunden sollen die Weihnachtsfeier besuchen.`,
              options: [
                {
                  id: "A",
                  text: "Richtig",
                },
                {
                  id: "B",
                  text: "Falsch",
                },
              ],
            },
            {
              id: 5,
              question: `Die Kunden sollen die Weihnachtsfeier besuchen.`,
              options: [
                {
                  id: "A",
                  text: "Richtig",
                },
                {
                  id: "B",
                  text: "Falsch",
                },
              ],
            },
          ],
        },
        {
          id: 3,
          partName: `Phần 3:
Was ist richtig?
Kreuzen Sie an: a, b oder c. Sie hören jeden Text zweimal.`,
          questions: [
            {
              id: 6,
              question: `Die Nummer ist:`,
              options: [
                {
                  id: "A",
                  text: `11833`,
                },
                {
                  id: "B",
                  text: `11883`,
                },
                {
                  id: "C",
                  text: `12833`,
                },
              ],
            },
            {
              id: 7,
              question: `Wo genau treffen sich die Männer?`,
              options: [
                {
                  id: "A",
                  text: `20 Minuten`,
                },
                {
                  id: "B",
                  text: `2 Minuten`,
                },
                {
                  id: "C",
                  text: `10 Minuten`,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const handleNextPart = () => {
    if (currentPartIndex < listeningContent[0].parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };
  const handlePreviousPart = () => {
    setCurrentPartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        BÀI TẬP NGHE 1: ABC
      </TitleCustom>
      <TextCustom style={{ color: "red", fontWeight: "bold" }}>
        {listeningContent[0].parts[currentPartIndex].partName}
      </TextCustom>
      {listeningContent[0].parts[currentPartIndex].questions.map((question) => (
        <div key={question.id}>
          <TextCustom style={{ paddingTop: "100px" }}>
            Câu {question.id}: {question.question}
          </TextCustom>
          <div style={{ marginTop: "20px" }}>
            <Row style={{ textAlign: "center" }}>
              {question.questionImage &&
                question.questionImage.map((image, index) => (
                  <Col key={index} span={8}>
                    <img
                      src={image}
                      width={"80%"}
                      style={{ marginBottom: "12px" }}
                    />
                  </Col>
                ))}
            </Row>
            <Row style={{ textAlign: "center", marginTop: "10px" }}>
              {question.options.map((option) => (
                <Col key={option.id} span={8}>
                  <ButtonCustom buttonType="primary">
                    {option.id}. {option.text}
                  </ButtonCustom>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ))}
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
          style={{ marginRight: "100px", padding: "23px" }}
          onClick={handleNextPart}
          disabled={currentPartIndex === listeningContent[0].parts.length - 1}
        >
          Phần tiếp theo
        </ButtonCustom>
        <ButtonCustom buttonType="secondary" style={{ padding: "23px" }}>
          Nộp bài
        </ButtonCustom>
      </div>
    </div>
  );
}
