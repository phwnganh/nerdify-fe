import { TextCustom, TitleCustom } from "../../../../../components/Typography";
import { Question } from "./question";

export const QuestionsList = ({
  exercises,
  currentPart,
  timeLeft,
  onSelect,
  userAnswers,
  userScore,
}) => {
  const formattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

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
              )}
            </span>
          </TextCustom>
        </div>
      )}

      <div style={{ textAlign: "center" }}>
        <TextCustom>
          Thời gian làm bài:{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {formattedTime(timeLeft)}
          </span>
        </TextCustom>
      </div>

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
