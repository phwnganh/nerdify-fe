import Sidebar from "../../../../components/Sidebar/learnerSideBar";
import { TitleCustom } from "../../../../components/Typography";
import { Card, Tag, Button } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { getAllSubmissions, getUserTrophy } from "../../../../services/LearnerService";
import moment from "moment";
import CardCustom from "../../../../components/Card";
import ButtonCustom from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../../constants";
import a1_trophy from "../../../../assets/trophy/a1_trophy.png";
import a2_trophy from "../../../../assets/trophy/a1_trophy.png";
import b1_trophy from "../../../../assets/trophy/a1_trophy.png";

export default function ViewResultsPractice() {
  const [practiceResults, setPracticeResults] = useState([]);
  const [userTrophy, setUserTrophy] = useState([]);
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

  const trophy = {
    a1_trophy,
    a2_trophy,
    b1_trophy,
  };

  useEffect(() => {
    try {
      getUserTrophy().then((res) => {
        console.log("trophy: ", res.data);

        setUserTrophy(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const results = practiceResults.length > 0 ? practiceResults : practiceResults;

  const handleClickResultDetail = (exerciseType, submissionId) => {
    navigate(CLIENT_URI.RESULT_DETAIL + "/" + exerciseType + "/" + submissionId);
  };
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <TitleCustom level={3}>KẾT QUẢ LUYỆN TẬP</TitleCustom>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {results.map((result) => (
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
          ))}
        </div>

        {/* <div style={{ marginTop: "24px" }}>
          <ButtonCustom buttonType="primary">Xem tất cả</ButtonCustom>
        </div> */}

        {/* Nhan cup */}
        <div style={{ marginTop: "32px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            Cúp hoàn thành tiến độ
          </h3>
            <div>
              {userTrophy.map((trophies) => (
                <span>
                  <img src={trophy[trophies?.trophy?.levelTrophy]} alt="" srcset="" width={"40%"} />
                </span>
              ))}
              {/* <TrophyOutlined
                style={{
                  fontSize: "128px",
                  color: "#ffd700",
                }}
              /> */}
              {/* <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                A1
              </span> */}
            </div>
        </div>
      </div>
    </div>
  );
}
