import { useParams } from "react-router-dom";
import ListeningExercise from "./ListeningExercises";
import ReadingExercises from "./ReadingExercises";
import WritingExercises from "./WritingExercises";
import VocabularyExercises from "./VocabularyExercises";
import GrammarExercises from "./GrammarExercises";
import CheckpointQuiz from "./CheckpointQuiz";
import { EXERCISE_TYPE } from "../../../constants";
export default function ExerciseDetail() {
  const { exerciseType, exerciseId } = useParams();

  const renderExercises = () => {
    switch (exerciseType) {
      case EXERCISE_TYPE.LISTENING:
        return <ListeningExercise />;
      case EXERCISE_TYPE.READING:
        return <ReadingExercises />;
      case EXERCISE_TYPE.WRITING:
        return <WritingExercises />;
      case EXERCISE_TYPE.VOCABULARY:
        return <VocabularyExercises />;
      case EXERCISE_TYPE.GRAMMAR:
        return <GrammarExercises />;
      case EXERCISE_TYPE.QUIZ:
        return <CheckpointQuiz />;
    }
  };
  return <div>{renderExercises()}</div>;
}
