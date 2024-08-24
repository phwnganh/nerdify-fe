import demo_part2_1 from "../../../../../assets/readingExercises/demo_part2_1.png";
import demo_part2_2 from "../../../../../assets/readingExercises/demo_part2_2.png";
import { TextCustom } from "../../../../../components/Typography";
import ButtonCustom from "../../../../../components/Button";

export const Question = ({ question, onSelect, userAnswers, answers }) => {
  const imgArr = {
    demo_part2_1,
    demo_part2_2,
  };
  // console.log(answers);
  // console.log(question);
  return (
    <div key={question.id}>
      <div style={{ paddingTop: "24px" }}>
        {question.questionParagraph && <p>{question.questionParagraph}</p>}
        {question.questionImage && (
          <div>
            {question.questionImage.map((img, imgIndex) => (
              <img
                key={imgIndex}
                src={imgArr[img]}
                style={{ width: "100px", marginRight: "10px" }}
                alt=""
              />
            ))}
          </div>
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
          {onSelect ? (
            <>
              {" "}
              {question.options.map((option) => (
                <ButtonCustom
                  key={option.id}
                  buttonType="primary"
                  onClick={() => onSelect(question.id, option.id)}
                  style={{
                    backgroundColor:
                      userAnswers[question.id] === option.id
                        ? "rgb(255 63 0)"
                        : "",
                  }}
                >
                  {option.id}. {option.text}
                </ButtonCustom>
              ))}
            </>
          ) : (
            <>
              {question.options.map((option) => {
                const isCorrectOption =
                  option.id ===
                  answers.find((answer) => answer.id === question.id)?.answer;
                const isUserSelected = option.id === userAnswers[question.id];
                const backgroundColor = isCorrectOption
                  ? "#5FD855"
                  : isUserSelected && !question.isCorrect
                  ? "red"
                  : "";
                return (
                  <ButtonCustom
                    key={option.id}
                    buttonType="primary"
                    disabled
                    style={{
                      backgroundColor,
                    }}
                  >
                    {option.id}. {option.text}
                  </ButtonCustom>
                );
              })}
            </>
          )}
        </div>
      </TextCustom>
    </div>
  );
};
