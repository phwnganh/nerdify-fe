import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import demo_1 from "../../../../assets/readingExercises/demo_2.png";
import demo_1_1 from "../../../../assets/vocabExercises/1_1.png";
import demo_1_2 from "../../../../assets/vocabExercises/1_2.png";
import demo_1_3 from "../../../../assets/vocabExercises/1_3.png";
import demo_2_1 from "../../../../assets/vocabExercises/2_1.png";
import demo_2_2 from "../../../../assets/vocabExercises/2_2.png";
import demo_2_3 from "../../../../assets/vocabExercises/2_3.png";
import { Col, Row } from "antd";
import ButtonCustom from "../../../../components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckpointQuiz() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formattedTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  const quizContents = [
    {
      id: 1,
      parts: [
        {
          id: 1,
          partName: `Phần 1: Nghe`,
          questions: [
            {
              id: 1,
              question: `Die Kunden sollen die Weihnachtsfeier besuchen.`,
              options: [
                { id: "A", text: "Richtig" },
                { id: "B", text: "Falsch" },
              ],
            },
            {
              id: 2,
              question: `Die Kunden sollen die Weihnachtsfeier besuchen.`,
              options: [
                { id: "A", text: "Richtig" },
                { id: "B", text: "Falsch" },
              ],
            },
            {
              id: 3,
              question: `Die Kunden sollen die Weihnachtsfeier besuchen.`,
              options: [
                { id: "A", text: "Richtig" },
                { id: "B", text: "Falsch" },
              ],
            },
            {
              id: 4,
              question: `Die Kunden sollen die Weihnachtsfeier besuchen.`,
              options: [
                { id: "A", text: "Richtig" },
                { id: "B", text: "Falsch" },
              ],
            },
          ],
        },
        {
          id: 2,
          partName: `Phần 2: Đọc`,
          questions: [
            {
              id: 5,
              question: `Lis Zug kommt nach halb eins an.`,
              questionImage: demo_1,
              options: [
                { id: "A", text: "Richtig" },
                { id: "B", text: "Falsch" },
              ],
            },
            {
              id: 6,
              question: `Karin wartet den ganzen Vormittag vor der Auskunft.`,
              options: [
                { id: "A", text: "Richtig" },
                { id: "B", text: "Falsch" },
              ],
            },
          ],
        },
        {
          id: 3,
          partName: `Phần 3: Từ vựng`,
          questions: [
            {
              id: 7,
              question: `Was ist richtig? Kreuzen Sie an. Es ist gleich 14 Uhr.`,
              options: [
                { id: "A", image: demo_1_1 },
                { id: "B", image: demo_1_2 },
                { id: "C", image: demo_1_3 },
              ],
            },
            {
              id: 8,
              question: `Was ist richtig? Kreuzen Sie an. Es ist genau 14 Uhr.`,
              options: [
                { id: "A", image: demo_2_1 },
                { id: "B", image: demo_2_2 },
                { id: "C", image: demo_2_3 },
              ],
            },
          ],
        },
        {
          id: 4,
          partName: `Phần 4: Ngữ pháp`,
          questions: [
            {
              id: 9,
              question: `Ergänzen Sie die Pronomen. Haben ___ Zeit?`,
              options: [
                { id: "A", text: `Er` },
                { id: "B", text: `Sie` },
                { id: "C", text: `Es` },
              ],
            },
            {
              id: 10,
              question: `Hallo, Anna, woher kommst ___ ? ___ komme aus New York.`,
              options: [
                { id: "A", text: [`du`, `Ich`] },
                { id: "B", text: [`Sie`, `Ich`] },
                { id: "C", text: [`du`, `Sie`] },
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        QUIZ KẾT THÚC PHASE 1
      </TitleCustom>
      <div style={{textAlign: 'center'}}>
      <TextCustom>Thời gian làm bài: <span style={{color: 'red', fontWeight: 'bold'}}>{formattedTime(timeLeft)}</span></TextCustom>
      </div>
      
      {quizContents[0].parts.map((part) => (
        <div key={part.id}>
          <TextCustom
            style={{ paddingTop: "20px", fontWeight: "bold", color: "red" }}
          >
            {part.partName}
          </TextCustom>
          {part.questions.map((question) => (
            <div key={question.id}>
              <TextCustom style={{ paddingTop: "20px" }}>
                Câu {question.id}: {question.question}
              </TextCustom>
              {question.questionImage && (
                <img
                  src={question.questionImage}
                  alt={`Question ${question.id}`}
                  width={"50%"}
                  style={{ margin: "20px 0" }}
                />
              )}
              <div style={{ marginTop: "20px" }}>
                <Row gutter={[16, 16]} style={{ textAlign: "center" }}>
                  {question.options.map((option, index) => (
                    <Col key={index} span={8}>
                      <ButtonCustom buttonType="primary">
                        {option.image ? (
                          <span>{option.id}</span>
                        ) : (
                          <div>
                            <span>
                              {Array.isArray(option.text)
                                ? `${option.id}. ${option.text.join(" - ")}`
                                : `${option.id}. ${option.text}`}
                            </span>
                          </div>
                        )}
                      </ButtonCustom>
                    </Col>
                  ))}
                </Row>
                {/* Display images in a row if they exist */}
                {question.options.some((option) => option.image) && (
                  <Row
                    gutter={[16, 16]}
                    style={{ marginTop: "20px", textAlign: "center" }}
                  >
                    {question.options
                      .filter((option) => option.image)
                      .map((option, index) => (
                        <Col key={index} span={8}>
                          <img src={option.image} style={{ width: "50%" }} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
