import { useState, useEffect } from "react";
import { Card, Tag, Button, Alert, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Sidebar from "../../../../components/Sidebar/learnerSideBar";
import { TitleCustom } from "../../../../components/Typography";
import CardCustom from "../../../../components/Card";
import ButtonCustom from "../../../../components/Button";
import { getAllSubmissions, getUserTrophy } from "../../../../services/LearnerService";
import { CLIENT_URI } from "../../../../constants";
import a1_trophy from "../../../../assets/trophy/a1_trophy.png";
import a2_trophy from "../../../../assets/trophy/a1_trophy.png";
import b1_trophy from "../../../../assets/trophy/a1_trophy.png";

export default function ViewResultsPractice() {
  const [practiceResults, setPracticeResults] = useState([]);
  const [userTrophy, setUserTrophy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPracticeResults = async () => {
      try {
        const response = await getAllSubmissions();
        setPracticeResults(response.data);
      } catch (error) {
        console.error("Error fetching practice results:", error);
      }
    };

    fetchPracticeResults();
  }, []);

  useEffect(() => {
    try {
      getUserTrophy().then((res) => {
        setUserTrophy(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClickResultDetail = (exerciseType, submissionId) => {
    navigate(CLIENT_URI.RESULT_DETAIL + "/" + exerciseType + "/" + submissionId);
  };

  // Calculate the current items to display based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResults = practiceResults.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <TitleCustom level={3}>KẾT QUẢ LUYỆN TẬP</TitleCustom>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {currentResults.length === 0 ? (
            <Alert message="Bạn chưa hoàn thành bài tập nào!" type="info" showIcon style={{ marginTop: "20px" }} />
          ) : (
            currentResults.map((result) => (
              <CardCustom
                key={result.id}
                style={{
                  width: 320,
                  backgroundColor: result.backgroundColor,
                }}
                bodyStyle={{ padding: "20px" }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>{result?.exerciseId?.title}</h3>
                <div style={{ marginBottom: "12px" }}>
                  <Tag color="gold" style={{ marginRight: "8px" }}>
                    {result?.exerciseId?.exerciseType}
                  </Tag>
                </div>
                <div style={{ fontSize: "14px", marginBottom: "12px" }}>
                  <div>Ngày làm bài gần nhất: {moment(result.submissionDate).format("DD-MM-YYYY")}</div>
                  <div>Kết quả: {Math.round(result.score).toFixed(2)}%</div>
                </div>
                <ButtonCustom buttonType="primary" onClick={() => handleClickResultDetail(result?.exerciseId?.exerciseType, result?._id)}>
                  Xem chi tiết
                </ButtonCustom>
              </CardCustom>
            ))
          )}
        </div>

        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={practiceResults.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: "24px" }}
        />

        <div style={{ marginTop: "32px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", textTransform: "uppercase" }}>
            Cúp hoàn thành tiến độ
          </h3>
          <div>
            {userTrophy.length === 0 ? (
              <Alert message="Bạn chưa nhận được cúp nào!" type="info" showIcon style={{ marginTop: "20px" }} />
            ) : (
              userTrophy.map((trophies, index) => (
                <span key={index}>
                  <img src={trophies?.trophy?.levelTrophy} alt="" width={"40%"} />
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
