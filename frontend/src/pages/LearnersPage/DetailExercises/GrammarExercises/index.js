import { Input } from "antd";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import InputCustom from "../../../../components/Input";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonCustom from "../../../../components/Button";

export default function GrammarExercises() {
  // const grammarContents = [
  //   {
  //     id: 1,
  //     questions: [
  //       {
  //         id: 1,
  //         questionText: `Ergänzen Sie die Pronomen.`,
  //         questionDetail: [
  //           {
  //             id: 1,
  //             name: `___ sprechen Deutsch.`,
  //           },
  //           {
  //             id: 2,
  //             name: `Haben ___ Zeit?`,
  //           },
  //           {
  //             id: 3,
  //             name: `Hilfst ___ mir?`,
  //           },
  //           {
  //             id: 4,
  //             name: `___ ist Programmierer`,
  //           },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         questionText: `Ergänzen Sie die Pronomen.`,
  //         questionDetail: [
  //           {
  //             id: 1,
  //             name: [
  //               ` Das ist Herr Gupta, ___ kommt aus Indien.`,
  //               `Das ist Frau Kioka , ___ kommt aus Japan.`,
  //               `Herr Gupta und Frau  sind in Berlin. ___ lernen Deutsch.`,
  //             ],
  //           },
  //           {
  //             id: 2,
  //             name: `Hallo, Anna, woher kommst ___ ? ___ komme aus New York.`,
  //           },
  //           {
  //             id: 3,
  //             name: `Marc und Dominic, wo wohnt ___ ? ___ wohnen in Frankfurt.`,
  //           },
  //           {
  //             id: 4,
  //             name: `Guten Tag, wie heißen ___ ? Guten Tag, ___  heiße Berger, Roland Berger.`,
  //           },
  //         ],
  //       },
  //       {
  //         id: 3,
  //         questionText: `Ergänzen sie die Pronomen.`,
  //         questionDetail: [
  //           {
  //             id: 1,
  //             name: `Frau Meier geht einkaufen. ___ kauft Gemüse und Obst.`,
  //           },
  //           {
  //             id: 2,
  //             name: `Peter und Paul gehen heute nicht zur Schule. Frau Meier, ___ haben Ferien.`,
  //           },
  //           {
  //             id: 3,
  //             name: `Frau Meier, wo arbeiten ___ ? ___ arbeite in einer Bank.`,
  //           },
  //           {
  //             id: 4,
  //             name: `Marie, kommst ___ bitte?     Nein, ___ habe keine Zeit.`,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

//   const renderQuestionDetail = (questionDetail) => {
//     return questionDetail.map((detail, index) => (
//       <div key={index} style={{ margin: "10px 0" }}>
//         {Array.isArray(detail.name)
//           ? detail.name.map((quest, idx) => (
//               <div key={idx} style={{ marginBottom: "10px" }}>
//                 {quest.split("___").map((text, i) => (
//                   <span key={i}>
//                     {i > 0 && (
//                       <InputCustom
//                         style={{ width: "150px", marginRight: "8px" }}
//                       />
//                     )}
//                     {text}
//                   </span>
//                 ))}
//               </div>
//             ))
//           : detail.name.split("___").map((text, i) => (
//               <span key={i}>
//                 {i > 0 && (
//                   <InputCustom style={{ width: "150px", marginRight: "8px" }} />
//                 )}
//                 {text}
//               </span>
//             ))}
//       </div>
//     ));
//   };

//   return (
//     <div style={{ padding: "24px" }}>
//       <BreadCrumbHome />
//       <TitleCustom level={2} style={{ fontWeight: "bold" }}>
//         BÀI TẬP NGỮ PHÁP 1: Bảng chữ cái, số từ 0 đến 100
//       </TitleCustom>
//       {grammarContents[0].questions.map((question, index) => (
//         <div key={question.id}>
//           <TextCustom style={{ paddingTop: "20px", fontWeight: 'bold' }}>
//             {question.id}. {question.questionText}
//           </TextCustom>
//           <div style={{ marginTop: "20px", marginBottom: '40px' }}>
//             {renderQuestionDetail(question.questionDetail)}
//           </div>
//         </div>
//       ))}
//     </div>
//   );

const [grammarContents, setGrammarContents] = useState({});
const [userAnswers, setUserAnswers] = useState({});
const [results, setResults] = useState(null);
const {exerciseType, exerciseId} = useParams();

useEffect(() => {
  fetch(`http://localhost:9999/exercises?id=${exerciseId}&exerciseType=${exerciseType}&_limit=1`)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.length === 0) return;
      setGrammarContents(data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
}, [exerciseId, exerciseType]);

const handleInputChange = (questionId, detailIndex, subIndex, value) => {
  const key = `${questionId}-${detailIndex}-${subIndex}`;
  setUserAnswers((prevAnswers) => ({
    ...prevAnswers,
    [key]: value,
  }));
};

const handleSubmit = () => {
  let score = 0;
  let totalQuestions = 0;
  const newResults = {};

  grammarContents.questions.forEach((question) => {
    question.questionDetail.forEach((detail, detailIndex) => {
      const correctAnswer = question.correctAnswers[detailIndex];

      if (Array.isArray(correctAnswer)) {
        const userAnswerArray = correctAnswer.map(
          (_, subIndex) =>
            userAnswers[`${question.id}-${detailIndex}-${subIndex}`]
        );
        const isCorrect = correctAnswer.every(
          (ans, subIndex) =>
            ans.toLowerCase() ===
            (userAnswerArray[subIndex] || "").toLowerCase()
        );
        if(isCorrect){
          score++;
        }
        newResults[`${question.id}-${detailIndex}`] = {
          isCorrect,
          correctAnswer,
        };
      } else {
        const userAnswer = userAnswers[`${question.id}-${detailIndex}-0`];
        const isCorrect =
          correctAnswer.toLowerCase() === (userAnswer || "").toLowerCase();
          if(isCorrect){
            score++;
          }
        newResults[`${question.id}-${detailIndex}`] = {
          isCorrect,
          correctAnswer,
        };
      }
    });
  });

  setResults(newResults);
};

const renderQuestionDetail = (questionDetail, questionId) => {
  return questionDetail.map((detail, detailIndex) => (
    <div key={detailIndex} style={{ margin: "10px 0" }}>
      {Array.isArray(detail.name)
        ? detail.name.map((quest, subIndex) => (
            <div key={subIndex} style={{ marginBottom: "10px" }}>
              {quest.split("___").map((text, i) => (
                <span key={i}>
                  {i > 0 && (
                    <InputCustom
                      style={{ width: "150px", marginRight: "8px" }}
                      value={
                        userAnswers[
                          `${questionId}-${detailIndex}-${subIndex}`
                        ] || ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          questionId,
                          detailIndex,
                          subIndex,
                          e.target.value
                        )
                      }
                      disabled={results !== null}
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
                <InputCustom
                  style={{ width: "150px", marginRight: "8px" }}
                  value={userAnswers[`${questionId}-${detailIndex}-0`] || ""}
                  onChange={(e) =>
                    handleInputChange(
                      questionId,
                      detailIndex,
                      0,
                      e.target.value
                    )
                  }
                  disabled={results !== null}
                />
              )}
              {text}
            </span>
          ))}
      {results && (
        <div
          style={{
            marginTop: "5px",
            color: results[`${questionId}-${detailIndex}`]?.isCorrect
              ? "#5FD855"
              : "red",
          }}
        >
          {results[`${questionId}-${detailIndex}`]?.isCorrect
            ? "Đúng"
            : `Đáp án chi tiết: ${
                Array.isArray(
                  results[`${questionId}-${detailIndex}`]?.correctAnswer
                )
                  ? results[
                      `${questionId}-${detailIndex}`
                    ]?.correctAnswer.join(", ")
                  : results[`${questionId}-${detailIndex}`]?.correctAnswer
              }`}
        </div>
      )}
    </div>
  ));
};

return (
  <div style={{ padding: "24px" }}>
    <BreadCrumbHome />
    <TitleCustom level={2} style={{ fontWeight: "bold" }}>
      {grammarContents.title}
    </TitleCustom>
    {grammarContents.questions?.map((question) => (
      <div key={question.id}>
        <TextCustom style={{ paddingTop: "20px", fontWeight: "bold" }}>
          {question.id}. {question.questionText}
        </TextCustom>
        <div style={{ marginTop: "20px", marginBottom: "40px" }}>
          {renderQuestionDetail(question.questionDetail, question.id)}
        </div>
      </div>
    ))}
    <ButtonCustom buttonType="secondary" onClick={handleSubmit} disabled={results !== null}>
      Nộp bài
    </ButtonCustom>
  </div>
);
}
