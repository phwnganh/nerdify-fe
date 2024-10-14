import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListeningExercise from "./ListeningExercises";
import ReadingExercises from "./ReadingExercises";
import WritingExercises from "./WritingExercises";
import VocabularyExercises from "./VocabularyExercises";
import GrammarExercises from "./GrammarExercises";
import CheckpointQuiz from "./CheckpointQuiz";
import { getExerciseDetail } from "../../../services/LearnerService";

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
      case "listening":
        return <ListeningExercise data={exerciseData} />;
      case "reading":
        return <ReadingExercises data={exerciseData} />;
      case "writing":
        return <WritingExercises data={exerciseData} />;
      case "vocabulary":
        return <VocabularyExercises data={exerciseData} />;
      case "grammar":
        return <GrammarExercises data={exerciseData} />;
      case "quiz":
        return <CheckpointQuiz data={exerciseData} />;
      default:
        return <div>Unknown exercise type</div>;
    }
  };

  return <div>{renderExercises()}</div>;
}
