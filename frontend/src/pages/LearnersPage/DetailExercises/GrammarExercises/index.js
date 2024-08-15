import { Input } from "antd";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import InputCustom from "../../../../components/Input";
import { TextCustom, TitleCustom } from "../../../../components/Typography";

export default function GrammarExercises() {
  const grammarContents = [
    {
      id: 1,
      questions: [
        {
          id: 1,
          questionText: `Ergänzen Sie die Pronomen.`,
          questionDetail: [
            {
              id: 1,
              name: `___ sprechen Deutsch.`,
            },
            {
              id: 2,
              name: `Haben ___ Zeit?`,
            },
            {
              id: 3,
              name: `Hilfst ___ mir?`,
            },
            {
              id: 4,
              name: `___ ist Programmierer`,
            },
          ],
        },
        {
          id: 2,
          questionText: `Ergänzen Sie die Pronomen.`,
          questionDetail: [
            {
              id: 1,
              name: [
                ` Das ist Herr Gupta, ___ kommt aus Indien.`,
                `Das ist Frau Kioka , ___ kommt aus Japan.`,
                `Herr Gupta und Frau  sind in Berlin. ___ lernen Deutsch.`,
              ],
            },
            {
              id: 2,
              name: `Hallo, Anna, woher kommst ___ ? ___ komme aus New York.`,
            },
            {
              id: 3,
              name: `Marc und Dominic, wo wohnt ___ ? ___ wohnen in Frankfurt.`,
            },
            {
              id: 4,
              name: `Guten Tag, wie heißen ___ ? Guten Tag, ___  heiße Berger, Roland Berger.`,
            },
          ],
        },
        {
          id: 3,
          questionText: `Ergänzen sie die Pronomen.`,
          questionDetail: [
            {
              id: 1,
              name: `Frau Meier geht einkaufen. ___ kauft Gemüse und Obst.`,
            },
            {
              id: 2,
              name: `Peter und Paul gehen heute nicht zur Schule. Frau Meier, ___ haben Ferien.`,
            },
            {
              id: 3,
              name: `Frau Meier, wo arbeiten ___ ? ___ arbeite in einer Bank.`,
            },
            {
              id: 4,
              name: `Marie, kommst ___ bitte?     Nein, ___ habe keine Zeit.`,
            },
          ],
        },
      ],
    },
  ];

  const renderQuestionDetail = (questionDetail) => {
    return questionDetail.map((detail, index) => (
      <div key={index} style={{ margin: "10px 0" }}>
        {Array.isArray(detail.name)
          ? detail.name.map((quest, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                {quest.split("___").map((text, i) => (
                  <span key={i}>
                    {i > 0 && (
                      <InputCustom
                        style={{ width: "150px", marginRight: "8px" }}
                      />
                    )}
                    {text}
                  </span>
                ))}
              </div>
            ))
          : detail.name.split("___").map((text, i) => (
              <span key={i}>
                {i > 0 && (
                  <InputCustom style={{ width: "150px", marginRight: "8px" }} />
                )}
                {text}
              </span>
            ))}
      </div>
    ));
  };

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        BÀI TẬP NGỮ PHÁP 1: Bảng chữ cái, số từ 0 đến 100
      </TitleCustom>
      {grammarContents[0].questions.map((question, index) => (
        <div key={question.id}>
          <TextCustom style={{ paddingTop: "20px", fontWeight: 'bold' }}>
            {question.id}. {question.questionText}
          </TextCustom>
          <div style={{ marginTop: "20px", marginBottom: '40px' }}>
            {renderQuestionDetail(question.questionDetail)}
          </div>
        </div>
      ))}
    </div>
  );
}
