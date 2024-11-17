import { Alert, Carousel, Col, Progress, Row, Pagination } from "antd";
import { TextCustom, TitleCustom } from "../../../components/Typography/TypographyCustom";
import CardCustom from "../../../components/Card/CardCustom";
import { useEffect, useState } from "react";
import ButtonCustom from "../../../components/Button/ButtonCustom";
import { BASE_SERVER, CLIENT_URI } from "../../../constants";
import { learningProgress } from "../../../services/LearnerService";
import { useNavigate } from "react-router-dom";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";

export default function LearningProgress() {
  const [levelPhaseMap, setLevelPhaseMap] = useState({});
  const [allExercises, setAllExercises] = useState([]); // Store all exercises
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 2; // Items per page
  const navigate = useNavigate();

  useEffect(() => {
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

  const findExercisesByIds = (exerciseIds) => {
    if (!exerciseIds || !Array.isArray(exerciseIds)) return [];
    return allExercises.filter((exercise) => exerciseIds.includes(Number(exercise.id)));
  };

  const calculateProgressForIds = (exerciseIds) => {
    const exercisesToConsider = findExercisesByIds(exerciseIds);
    const totalExercises = exercisesToConsider.length || 0;
    const completedExercises = exercisesToConsider.filter((exercise) => exercise.isCompleted).length || 0;
    return totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
  };

  // Paginated data for the current page
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2}>Đang thực hiện</TitleCustom>
      <Row gutter={16}>
        {data.length === 0 ? (
          <Alert message="Bạn chưa làm bài tập nào!" type="info" showIcon style={{ marginTop: "20px" }} />
        ) : (
          <>
            {paginatedData.map((level, levelIndex) => (
              <Col span={24} key={levelIndex}>
                <Row gutter={16}>
                  {level.phases.map(
                    (phase, phaseIndex) =>
                      phase.completedExercises > 0 &&
                      phase.title !== "Final Exam" && (
                        <Col span={12} key={phaseIndex}>
                          <CardCustom title={`${level.title}`} bordered={true} style={{ marginBottom: 16, borderColor: "#ffa751" }}>
                            <div>
                              <TextCustom style={{ fontWeight: "bold" }}>{phase.title}</TextCustom>
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
                              <ButtonCustom buttonType="primary" onClick={() => navigate(`${CLIENT_URI.LEVEL_DETAIL}/${level._id}`)}>
                                Tiếp tục
                              </ButtonCustom>
                            </Row>
                          </CardCustom>
                        </Col>
                      ),
                  )}
                </Row>
              </Col>
            ))}
          </>
        )}
      </Row>

      {/* Ant Design Pagination */}
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={data.length}
        onChange={handlePageChange}
        style={{ textAlign: "center", marginTop: "20px" }}
      />
    </div>
  );
}
