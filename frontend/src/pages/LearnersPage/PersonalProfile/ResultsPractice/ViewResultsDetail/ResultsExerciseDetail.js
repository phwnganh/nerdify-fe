import { useParams } from "react-router-dom";
import ListeningResults from "./ListeningResults";
import ReadingResults from "./ReadingResults";
import WritingResults from "./WritingResults";
import GrammarResults from "./GrammarResults";
import { useEffect, useState } from "react";
import { getSubmissionDetail } from "../../../../../services/LearnerService";
import { EXERCISE_TYPE } from "../../../../../constants";
import VocabularyResults from "./VocabularyResults";

export default function ViewResultsDetail() {
  const {exerciseType, submissionId } = useParams();
  const [resultData, setResultData] = useState(null);
      
  useEffect(() => {
      getSubmissionDetail(submissionId)
        .then((res) => {
          console.log("result detail: ", res.data.exerciseId.exerciseType);
          
          setResultData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [submissionId]);
  const renderResultsType = () => {
    switch (exerciseType) {
      case EXERCISE_TYPE.LISTENING:
        return <ListeningResults exerciseResults={resultData} />;
      case EXERCISE_TYPE.READING:
        return <ReadingResults exerciseResults={resultData} />;
      case EXERCISE_TYPE.WRITING:
        return <WritingResults exerciseResults={resultData} />;
      case EXERCISE_TYPE.GRAMMAR:
        return <GrammarResults exerciseResults={resultData} />;
      case EXERCISE_TYPE.VOCABULARY:
        return <VocabularyResults exerciseResults={resultData}/>
    }
  };
  return <div>{renderResultsType()}</div>;
}
