import { useState } from "react";
import StartExamModal from "./ModalBeforeDoingExam";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
import { TextCustom, TitleCustom } from "../../../components/Typography";

export default function FinalExam(){
      const [hasStarted, setHasStarted] = useState(false);
      const handleStart = () => {
            setHasStarted(true);
      }
      return (
            <div>
                  {!hasStarted && <StartExamModal onStart={handleStart}></StartExamModal>}
                  {hasStarted && (
                        <div style={{padding: '24px'}}>
                              <BreadCrumbHome/>
                              <TitleCustom level={2} style={{fontWeight: 'bold'}}>
                                    Final Exam
                              </TitleCustom>
                              <div style={{textAlign: 'center'}}>
                                    <TextCustom>Thời gian làm bài: </TextCustom>
                              </div>
                              
                        </div>
                  )}
            </div>
      )
}