import { Avatar, Col, Row } from "antd";
import ButtonCustom from "../../../components/Button";
import CardCustom from "../../../components/Card";
import Meta from "antd/es/card/Meta";
import { TrophyOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { CLIENT_URI } from "../../../constants";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../services/GuestService";
import moment from "moment";
import { TextCustom, TitleCustom } from "../../../components/Typography";
export default function ViewPersonalProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [latestReadingSubmission, setLatestReadingSubmission] = useState(null);
  const [latestListeningSubmission, setLatestListeningSubmission] =
    useState(null);
  useEffect(() => {
    // fetch(`http://localhost:9999/users/1`).then(res => res.json()).then(res => setUser(res));
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentUser();
        console.log("result: ", res?.data?.user);

        setUser(res?.data?.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchReadingSubmissionData = async () => {
      const submissionsResponse = await fetch(
        "http://localhost:9999/readingExercisesSubmission?userId=1"
      );
      const exercisesResponse = await fetch("http://localhost:9999/exercises");

      const submissions = await submissionsResponse.json();
      const exercises = await exercisesResponse.json();

      const joinedData = submissions.map((submission) => {
        const exercise = exercises.find(
          (exercise) => exercise.id === submission.exerciseId
        );
        return {
          ...submission,
          exerciseType: exercise?.exerciseType,
          title: exercise?.title,
        };
      });

      const latestSubmission = joinedData.reduce((latest, current) => {
        return new Date(current.submissionDate) >
          new Date(latest.submissionDate)
          ? current
          : latest;
      }, joinedData[0]);

      setLatestReadingSubmission(latestSubmission);
    };

    const fetchListeningSubmissionData = async () => {
      const submissionsResponse = await fetch(
        "http://localhost:9999/listeningExercisesSubmission?userId=1"
      );
      const exercisesResponse = await fetch("http://localhost:9999/exercises");
      const submissions = await submissionsResponse.json();
      const exercises = await exercisesResponse.json();
      const joinedData = submissions?.map((submission) => {
        const exercise = exercises.find(
          (exercise) => exercise.id === submission.exerciseId
        );
        return {
          ...submission,
          exerciseType: exercise?.exerciseType,
          title: exercise?.title,
        };
      });
      const latestSubmission = joinedData.reduce((latest, current) => {
        return new Date(current.submissionDate) >
          new Date(latest.submissionDate)
          ? latest
          : current;
      }, joinedData[0]);

      setLatestListeningSubmission(latestSubmission);
    };
    fetchReadingSubmissionData();
    fetchListeningSubmissionData();
  }, []);

  const displayExerciseType = (exerciseType) => {
    switch (exerciseType) {
      case "reading":
        return "Kỹ năng đọc";
      case "listening":
        return "Kỹ năng nghe";
      // Add more cases if needed
      default:
        return exerciseType;
    }
  };

  const handleClickResultDetail = (exerciseType, submissionId) => {
    navigate(`${CLIENT_URI.RESULT_DETAIL}/${exerciseType}/${submissionId}`)
  }

  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
          backgroundColor: "#e0e0e0",
          height: "100px",
          position: "relative",
        }}
      >
        <Avatar
          size={80}
          style={{ position: "absolute", bottom: "-40px", left: "20px" }}
        ></Avatar>
      </div>
      <div style={{ padding: "50px 20px 20px" }}>
        <TitleCustom level={2}>{user?.fullName}</TitleCustom>
        <ButtonCustom
          buttonType="primary"
          onClick={() => navigate(CLIENT_URI.EDIT_PROFILE)}
        >
          Chỉnh sửa trang cá nhân
        </ButtonCustom>
      </div>
      <div style={{ padding: "20px" }}>
        <TitleCustom level={3}>Kết quả luyện tập</TitleCustom>
        <Row gutter={16}>
          <Col span={12}>
            <CardCustom hoverable style={{ marginBottom: "16px" }}>
              <Meta
                title={latestListeningSubmission?.title}
                description={
                  <>
                    <TextCustom style={{ color: "red" }}>
                      {displayExerciseType(
                        latestListeningSubmission?.exerciseType
                      )}
                    </TextCustom>
                    <p>
                      Ngày làm bài gần nhất:{" "}
                      {moment(latestListeningSubmission?.submissionDate).format(
                        "DD-MM-YYYY"
                      )}
                    </p>
                    <p>Kết quả: {latestListeningSubmission?.score}</p>
                    <ButtonCustom buttonType="primary" onClick={() => handleClickResultDetail(latestListeningSubmission?.exerciseType ,latestListeningSubmission?.id)}>
                      Xem chi tiết
                    </ButtonCustom>
                  </>
                }
              />
            </CardCustom>
          </Col>
          {latestReadingSubmission && (
            <Col span={12}>
              <CardCustom hoverable style={{ marginBottom: "16px" }}>
                <Meta
                  title={latestReadingSubmission?.title}
                  description={
                    <>
                      <p style={{ color: "red" }}>
                        {displayExerciseType(
                          latestReadingSubmission?.exerciseType
                        )}
                      </p>
                      <p>
                        Ngày làm bài gần nhất:{" "}
                        {moment(latestReadingSubmission?.submissionDate).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                      <p>Kết quả: {latestReadingSubmission?.score}</p>
                      <ButtonCustom buttonType="primary" onClick={() => handleClickResultDetail(latestReadingSubmission?.exerciseType, latestReadingSubmission?.id)}>
                        Xem chi tiết
                      </ButtonCustom>
                    </>
                  }
                />
              </CardCustom>
            </Col>
          )}
        </Row>
      </div>
      <div style={{ padding: "20px" }}>
        <h3>Các chứng chỉ</h3>
        <TrophyOutlined style={{ fontSize: "48px", color: "#faad14" }} />
      </div>
    </div>
  );
}
