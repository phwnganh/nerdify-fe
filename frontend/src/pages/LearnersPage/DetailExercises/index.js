import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListeningExercise from "./ListeningExercises";
import ReadingExercises from "./ReadingExercises";
import WritingExercises from "./WritingExercises";
import VocabularyExercises from "./VocabularyExercises";
import GrammarExercises from "./GrammarExercises";
import CheckpointQuiz from "./CheckpointQuiz";
import { getExerciseDetail } from "../../../services/LearnerService";
import { EXERCISE_TYPE } from "../../../constants";

export default function ExerciseDetail() {
  const { exerciseType, exerciseId } = useParams();
  const [exerciseData, setExerciseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (exerciseId) {
      setLoading(true);
      getExerciseDetail(exerciseId)
        .then((resp) => {
          setExerciseData(resp.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to fetch exercise data.");
          setLoading(false);
        });
    }
  }, [exerciseId]);

  const renderExercises = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    if (!exerciseData) {
      return <div>No exercise data available</div>;
    }
    switch (exerciseType) {
      case EXERCISE_TYPE.LISTENING:
        return <ListeningExercise exercises={exerciseData} />;
      case EXERCISE_TYPE.READING:
        return <ReadingExercises exercises={exerciseData} />;
      case EXERCISE_TYPE.WRITING:
        return <WritingExercises exercises={exerciseData} />;
      case EXERCISE_TYPE.VOCABULARY:
        return <VocabularyExercises exercises={exerciseData} />;
      case EXERCISE_TYPE.GRAMMAR:
        return <GrammarExercises exercises={exerciseData} />;
      case EXERCISE_TYPE.QUIZ:
        return <CheckpointQuiz exercises={exerciseData} />;
      default:
        return <div>Unknown exercise type</div>;
    }
  };

  return <div>{renderExercises()}</div>;
}
