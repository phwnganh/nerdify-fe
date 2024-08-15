import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import demo_1 from "../../../../assets/readingExercises/demo_2.png";
import demo_3 from "../../../../assets/readingExercises/demo_3.png";
import demo_part2_1 from "../../../../assets/readingExercises/demo_part2_1.png";
import demo_part2_2 from "../../../../assets/readingExercises/demo_part2_2.png";
import { Col, Row } from "antd";
import ButtonCustom from "../../../../components/Button";
import { useState } from "react";
export default function ReadingExercises() {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  const readingContent = [
    {
      id: 1,
      parts: [
        {
          id: 1,
          partName: `Phần 1: Lesen Sie die beiden Texte und di Aufgaben 1 bis 5. Kreuzen Sie
        an: Richtig oder Falsch`,
          questions: [
            {
              id: 1,
              question: `
Lis Zug kommt nach halb eins an.`,
              questionImage: demo_1,
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
              id: 2,
              question: `
Karin wartet den ganzen Vormittag vor der Auskunft.`,
              //   questionImage: demo_1,
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
              id: 3,
              question: `
Ralf hatte am letzten Wochenende Geburtstag.`,
              questionImage: demo_3,
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
              id: 4,
              question: `
            Ralf hat nur zwei oder drei Leute eingeladen..`,
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
              question: `
    
    Die Party findet draußen statt.`,
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
          id: 2,
          partName: `Phần 2: Lesen Sie die Texte und die Aufgaben 6 bis 10.
Wo finden Sie Informationen? Kreuzen Sie an: a, b oder c`,
          questions: [
            {
              id: 6,
              questionImage: [demo_part2_1, demo_part2_2],
              options: [
                  {
                        id: "A",
                        text: "www.openair.de"
                  },
                  {
                        id: "B",
                        text: "www.dwd.de"
                  }
              ]
            },
          ],
        },
      ],
    },
  ];

  const handleNextPart = () => {
    setCurrentPartIndex((nextIndex) =>
      Math.min(nextIndex + 1, readingContent[0].parts.length - 1)
    );
  };

  const handlePreviousPart = () => {
      setCurrentPartIndex((prevIndex) => Math.max(prevIndex -1, 0))
  }
  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        BÀI TẬP ĐỌC 1: abc
      </TitleCustom>
      <div>
        <TextCustom style={{ color: "red", fontWeight: "bold" }}>
          {readingContent[0].parts[currentPartIndex].partName}
        </TextCustom>
        {readingContent[0].parts[currentPartIndex].questions.map(
          (question, index) => (
            <div key={question.id}>
              <div style={{ textAlign: "center", paddingTop: "24px" }}>
              {Array.isArray(question.questionImage) ? (
                  question.questionImage.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      width={"50%"}
                      style={{ marginBottom: "12px" }}
                    />
                  ))
                ) : (
                  <img
                    src={question.questionImage}
                    width={"50%"}
                    style={{ marginBottom: "12px" }}
                  />
                )}
              </div>
              <TextCustom style={{ paddingTop: "12px" }}>
                Câu {question.id}: {question.question}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    paddingTop: "12px",
                  }}
                >
                  {question.options.map((option) => (
                    <ButtonCustom key={option.id} buttonType="primary">
                      {option.id}. {option.text}
                    </ButtonCustom>
                  ))}
                </div>
              </TextCustom>
            </div>
          )
        )}
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
          disabled={currentPartIndex === readingContent[0].parts.length-1}
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
