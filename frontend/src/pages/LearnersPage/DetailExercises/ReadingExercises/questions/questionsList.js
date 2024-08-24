import { TextCustom, TitleCustom } from "../../../../../components/Typography";
import { Question } from "./question";

export const QuestionsList = ({
  exercises,
  currentPart,
  timeLeft,
  onSelect,
  userAnswers,
  userScore,
  mark
}) => {


  return (
    <div>
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        {exercises.title}
      </TitleCustom>

      {userScore !== undefined && (
        <div style={{ textAlign: "center" }}>
          <TextCustom style={{ textAlign: "center" }}>
            Điểm:&nbsp;
            <span style={{ color: "red" }}>
              {userScore}/
              {exercises.parts.reduce(
                (acc, part) => acc + part.questions.length,
                0
              )}{" "}
              ({mark}%)
            </span>
          </TextCustom>
        </div>
      )}



      <div>
        <TextCustom style={{ color: "red", fontWeight: "bold" }}>
          {currentPart.partName}
        </TextCustom>
        {currentPart.questions.map((question, index) => (
          <Question
            key={index}
            answers={currentPart.answers}
            question={question}
            onSelect={onSelect}
            userAnswers={userAnswers}
          />
        ))}
      </div>
    </div>
  );
};
