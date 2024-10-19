import { useParams } from "react-router-dom";
import ListeningResults from "./ListeningResults";
import ReadingResults from "./ReadingResults";
import WritingResults from "./WritingResults";
import GrammarResults from "./GrammarResults";

export default function ViewResultsDetail() {
  const {exerciseType, submissionId} = useParams();

  const renderResultsType = () => {
      switch (exerciseType) {
            case "listening":
                  return <ListeningResults/>
            case "reading":
                  return <ReadingResults/>
            case "writing":
                  return <WritingResults/>
            case "grammar": 
                  return <GrammarResults/>
      }
  }
  return <div>{renderResultsType()}</div>;
}
