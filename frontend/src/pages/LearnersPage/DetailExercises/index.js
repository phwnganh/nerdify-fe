import { useParams } from "react-router-dom";
import ListeningExercise from "./ListeningExercises";
import ReadingExercises from "./ReadingExercises";
import WritingExercises from './WritingExercises';
import VocabularyExercises from './VocabularyExercises';
import GrammarExercises from './GrammarExercises'
import CheckpointQuiz from "./CheckpointQuiz";
export default function ExerciseDetail(){
      const {exerciseType, exerciseId} = useParams();
      console.log("Exercise Type:", exerciseType);
      console.log("exercise id: ", exerciseId);
      
      const renderExercises = () => {
            switch (exerciseType) {
                  case "listening":
                        return <ListeningExercise/>
                  case "reading":
                        return <ReadingExercises/>
                  case "writing":
                        return <WritingExercises/>
                  case "vocabulary":
                        return <VocabularyExercises/>
                  case "grammar":
                        return <GrammarExercises/>
                  case "quiz":
                        return <CheckpointQuiz/>
            }
      }
      return <div>{renderExercises()}</div>
}