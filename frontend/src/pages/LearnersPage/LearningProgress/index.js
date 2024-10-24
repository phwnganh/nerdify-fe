import { Carousel, Col, Progress, Row } from "antd";
import { TextCustom, TitleCustom } from "../../../components/Typography";
import CardCustom from "../../../components/Card";
import { useEffect, useState } from "react";
import ButtonCustom from "../../../components/Button";
import { BASE_SERVER, CLIENT_URI } from "../../../constants";
import { learningProgress } from "../../../services/LearnerService";
import { useNavigate } from "react-router-dom";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
export default function LearningProgress() {
  const [levelPhaseMap, setLevelPhaseMap] = useState({});
  const [allExercises, setAllExercises] = useState([]); // Store all exercises
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     // Fetch phases, levels, and exercises in parallel
    //     const [phasesResponse, levelsResponse, exercisesResponse] =
    //       await Promise.all([
    //         fetch(`${BASE_SERVER}/phases`),
    //         fetch(`${BASE_SERVER}/levels`),
    //         fetch(`${BASE_SERVER}/exercises`), // Fetch exercises
    //       ]);

    //     const phases = await phasesResponse.json();
    //     const levels = await levelsResponse.json();

    //     const exercises = await exercisesResponse.json(); // Get all exercises

    //     setAllExercises(exercises); // Store the exercises for later use

    //     // Create a map to group phases by their corresponding level
    //     const results = {};

    //     // Loop through the phases and group them by their levelId
    //     phases.forEach((phase) => {
    //       // Initialize an array for the level if it doesn't exist
    //       if (!results[phase.levelId]) {
    //         const level = levels.find(
    //           (level) => level.id === phase.levelId.toString()
    //         );
    //         if (level) {
    //           results[phase.levelId] = {
    //             levelTitle: level.title,
    //             phases: [],
    //           };
    //         }
    //       }
    //       // Push the current phase to the respective level's phase list
    //       results[phase.levelId].phases.push({
    //         name: phase.name,
    //         isNew: phase.isNew,
    //         exercises: phase.exercises || [], // Store exercise IDs directly here
    //       });
    //     });
    //     setLevelPhaseMap(results);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();
    const fetchProgress = async () => {
      try {
        const res = await learningProgress();
        console.log("learning progress: ", res.data);
        setData(res.data); // Ensure you receive and set the data correctly
      } catch (error) {
        console.log(error);
      }
    };

    fetchProgress(); // Call the fetch function inside useEffect
  }, []);

  // Find exercise objects by their IDs
  const findExercisesByIds = (exerciseIds) => {
    if (!exerciseIds || !Array.isArray(exerciseIds)) return [];
    return allExercises.filter((exercise) =>
      exerciseIds.includes(Number(exercise.id))
    );
  };

  const calculateProgressForIds = (exerciseIds) => {
    const exercisesToConsider = findExercisesByIds(exerciseIds);

    const totalExercises = exercisesToConsider.length || 0;
    const completedExercises =
      exercisesToConsider.filter((exercise) => exercise.isCompleted).length ||
      0;

    return totalExercises > 0
      ? Math.round((completedExercises / totalExercises) * 100)
      : 0;
  };

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome/>
      <TitleCustom level={2}>Đang thực hiện</TitleCustom>
      <Row gutter={16}>
        {data.map((level, levelIndex) => (
          <Col span={24} key={levelIndex}>
            <Row gutter={16}>
              {level.phases.map(
                (phase, phaseIndex) =>
                  phase.completedExercises > 0 && phase.title !== "Final Exam" && (
                    <Col span={12} key={phaseIndex}>
                      <CardCustom
                        title={`${level.title}`}
                        bordered={true}
                        style={{ marginBottom: 16, borderColor: "#ffa751" }}
                      >
                        <div>
                          <TextCustom style={{ fontWeight: "bold" }}>
                            {phase.title}
                          </TextCustom>
                        </div>
                        <div>
                          <TextCustom>Tiến độ tổng thể</TextCustom>
                        </div>
                        <div>
                          <Progress
                            percent={Math.round(phase.progress).toFixed(2)} // Progress value from backend
                            size={"small"}
                          />
                        </div>
                        <Row justify={"end"} style={{ marginTop: "20px" }}>
                          <ButtonCustom buttonType="primary" onClick={() => navigate(-1)}>
                            Tiếp tục
                          </ButtonCustom>
                        </Row>
                      </CardCustom>
                    </Col>
                  )
              )}
            </Row>
          </Col>
        ))}
        <div>
          <a href="#">Xem tất cả</a>
        </div>
      </Row>

      {/* <TitleCustom level={2}>Các bài tập khác</TitleCustom>
      <Row gutter={16}>
        {data.map((level, levelIndex) => (
          <Col span={24} key={levelIndex}>
            <Row gutter={16}>
              {level.phases.map(
                (phase, phaseIndex) =>
                  phase.completedExercises === 0 && phase.title !== "Final Exam" && (
                    <Col span={12} key={phaseIndex}>
                      <CardCustom
                        title={`${level.title}`}
                        bordered={true}
                        style={{ marginBottom: 16, borderColor: "#ffa751" }}
                      >
                        <div>
                          <TextCustom style={{ fontWeight: "bold" }}>
                            {phase.title}
                          </TextCustom>
                        </div>
                        <Row justify={"end"}>
                          <ButtonCustom buttonType="primary">
                            Bắt đầu làm
                          </ButtonCustom>
                        </Row>
                      </CardCustom>
                    </Col>
                  )
              )}
            </Row>
          </Col>
        ))}
        <div>
          <a href="#">Xem tất cả</a>
        </div>
      </Row> */}
    </div>
  );
}
