import { Col, Row } from "antd";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import InputCustom from "../../../../components/Input";
import demo_1_1 from "../../../../assets/vocabExercises/1_1.png";
import demo_1_2 from "../../../../assets/vocabExercises/1_2.png";
import demo_1_3 from "../../../../assets/vocabExercises/1_3.png";
import demo_2_1 from "../../../../assets/vocabExercises/2_1.png";
import demo_2_2 from "../../../../assets/vocabExercises/2_2.png";
import demo_2_3 from "../../../../assets/vocabExercises/2_3.png";
import { useState } from "react";
import ButtonCustom from "../../../../components/Button";

export default function VocabularyExercises() {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const vocabularyContents = [
    {
      id: 1,
      parts: [
        {
          id: 1,
          partName: `Phần 1: Điền nghĩa của các từ sau đây: `,
          questions: [
            {
              id: 1,
              question_1: `die Woche`,
              //answer_question_1:
              question_2: `der Frühling`,
              // answer_question_2:
            },
            {
              id: 2,
              question_1: `Montag`,
              question_2: `der Sommer`,
            },
            {
              id: 3,
              question_1: `Dienstag`,
              question_2: `der Herbst`,
            },
            {
              id: 4,
              question_1: `Mittwoch`,
              question_2: `der Winter`,
            },
            {
              id: 5,
              question_1: `Donnerstag,`,
              question_2: ` der Tag,`,
            },
            {
              id: 6,
              question_1: ` Freitag,`,
              question_2: `der Morgen,`,
            },
            {
              id: 7,
              question_1: `Samstag,`,
              question_2: `der Vormittag,`,
            },
            {
              id: 8,
              question_1: `Sonntag`,
              question_2: `der Mittag`,
            },
          ],
        },
        {
          id: 2,
          partName: `Phần 2: Các bài tập: `,
          questions: [
            {
              id: 1,
              questionTitle: `Was ist richtig? Kreuzen Sie an.`,
              questionDetail: [
                {
                  questionText: `Es ist gleich 14 Uhr.`,
                  options: [
                    {
                      id: "A",
                      optionImage: demo_1_1,
                    },
                    {
                      id: "B",
                      optionImage: demo_1_2,
                    },
                    {
                      id: "C",
                      optionImage: demo_1_3,
                    },
                  ],
                },
                {
                  questionText: `Es ist genau 14 Uhr.`,
                  options: [
                    {
                      id: "A",
                      optionImage: demo_2_1,
                    },
                    {
                      id: "B",
                      optionImage: demo_2_2,
                    },
                    {
                      id: "C",
                      optionImage: demo_2_3,
                    },
                  ],
                },
              ],
            },
            {
              id: 2,
              questionTitle: `Das Jahr: Schreiben Sie die Monatsnamen.`,
            },
          ],
        },
      ],
    },
  ];

  const handleNextPart = () => {
    if (currentPartIndex < vocabularyContents[0].parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };

  const handlePreviousPart = () => {
    if (currentPartIndex > 0) {
      setCurrentPartIndex(currentPartIndex - 1);
    }
  };

  const renderPart1 = () => {
    return (
      <Row gutter={[16, 16]} style={{ paddingTop: "25px" }}>
        <Col span={12}>
          {vocabularyContents[0].parts[0].questions.map((question) => (
            <Row key={question.id} align="middle">
              <Col
                span={12}
                style={{ paddingBottom: "24px", paddingLeft: "12px" }}
              >
                {question.question_1}
              </Col>
              <Col span={12} style={{ paddingBottom: "24px" }}>
                <InputCustom />
              </Col>
            </Row>
          ))}
        </Col>
        <Col span={12}>
          {vocabularyContents[0].parts[currentPartIndex].questions.map(
            (question) => (
              <Row key={question.id} align="middle">
                <Col
                  span={12}
                  style={{ paddingBottom: "24px", paddingLeft: "12px" }}
                >
                  {question.question_2}
                </Col>
                <Col span={12} style={{ paddingBottom: "24px" }}>
                  <InputCustom />
                </Col>
              </Row>
            )
          )}
        </Col>
      </Row>
    );
  };

  const renderPart2 = () => {
    return (
      <Row gutter={[16, 16]} style={{ paddingTop: "25px", paddingLeft: '40px', paddingRight: '40px' }}>
        {vocabularyContents[0].parts[1].questions.map((question) => {
          if (question.id === 2) {
            const month = Array(12).fill("");
            return (
              <Col
                span={24}
                key={question.id}
                style={{ paddingBottom: "24px" }}
              >
                <TextCustom style={{ fontWeight: "bold" }}>
                  {question.questionTitle}
                </TextCustom>
                <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                  {month.map((_, index) => (
                    <Col span={6} key={index} style={{ paddingBottom: "24px" }}>
                      {index === 0 ? (<InputCustom placeholder="Januar" readOnly style={{backgroundColor: "#D9D9D9"}}></InputCustom>) : index === 1 ? (<InputCustom placeholder="Feb..."></InputCustom>) : (<InputCustom></InputCustom>)}
                    </Col>
                  ))}
                </Row>
              </Col>
            );
          } else {
            return (
              <Col
                span={24}
                key={question.id}
                style={{ paddingBottom: "24px"}}
              >
                <TextCustom style={{ fontWeight: "bold" }}>
                  {question.questionTitle}
                </TextCustom>
                {question.questionDetail.map((detail, index) => (
                  <Row key={index} align="middle" style={{ marginTop: "20px" }}>
                    <Col span={24}>
                      <TextCustom>{index + 1}. {detail.questionText}</TextCustom>
                    </Col>
                    <Col span={24}>
                      <Row gutter={[16, 16]} justify="center">
                        {detail.options.map((option) => (
                          <Col
                            span={8}
                            key={option.id}
                            style={{ textAlign: "center" }}
                          >
                            <ButtonCustom buttonType="primary">{option.id}</ButtonCustom>
                            <img
                              src={option.optionImage}
                              alt={`Option ${option.id}`}
                              style={{ width: "50%" }}
                            />
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                ))}
              </Col>
            );
          }
        })}
      </Row>
    );
  };

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold",  paddingLeft: '40px'  }}>
        BÀI TẬP TỪ VỰNG CHỦ ĐỀ: THỜI GIAN
      </TitleCustom>
      <div>
        <TextCustom style={{ color: "red", fontWeight: "bold",  paddingLeft: '40px'  }}>
          {vocabularyContents[0].parts[currentPartIndex].partName}
        </TextCustom>
        {currentPartIndex === 0 ? renderPart1() : renderPart2()}
      </div>
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
          disabled={currentPartIndex === vocabularyContents[0].parts.length - 1}
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
