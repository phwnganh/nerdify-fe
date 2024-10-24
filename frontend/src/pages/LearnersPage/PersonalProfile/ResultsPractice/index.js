import Sidebar from "../../../../components/Sidebar/learnerSideBar";
import { TitleCustom } from "../../../../components/Typography";
import { Card, Tag, Button } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

export default function ViewResultsPractice() {
  const [practiceResults, setPracticeResults] = useState([]);

  useEffect(() => {
    const fetchPracticeResults = async () => {
      try {
        const response = await fetch("your-api-endpoint");
        const data = await response.json();
        setPracticeResults(data);
      } catch (error) {
        console.error("Error fetching practice results:", error);
      }
    };

    fetchPracticeResults();
  }, []);

  const mockData = [
    {
      id: 1,
      title: "Bài tập nghe 1",
      type: "listening",
      level: "A1",
      lastPracticeDate: "29/08/2024",
      result: 50,
      backgroundColor: "white",
    },
    {
      id: 2,
      title: "Bài tập đọc 1",
      type: "reading",
      lastPracticeDate: "29/08/2024",
      result: 50,
      backgroundColor: "#f5f5f5",
    },
  ];

  const results = practiceResults.length > 0 ? practiceResults : mockData;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <TitleCustom level={3}>KẾT QUẢ LUYỆN TẬP</TitleCustom>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {results.map((result) => (
            <Card
              key={result.id}
              style={{
                width: 320,
                backgroundColor: result.backgroundColor,
              }}
              bodyStyle={{ padding: "20px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>{result.title}</h3>
              <div style={{ marginBottom: "12px" }}>
                <Tag color="gold" style={{ marginRight: "8px" }}>
                  {result.type}
                </Tag>
                {result.level && <Tag color="gold">{result.level}</Tag>}
              </div>
              <div style={{ fontSize: "14px", marginBottom: "12px" }}>
                <div>Ngày làm bài gần nhất: {result.lastPracticeDate}</div>
                <div>Kết quả: {result.result}%</div>
              </div>
              <Button type="primary" style={{ backgroundColor: "#f97316" }}>
                Xem chi tiết
              </Button>
            </Card>
          ))}
        </div>

        <div style={{ marginTop: "24px" }}>
          <Button type="primary" style={{ backgroundColor: "#f97316" }}>
            Xem tất cả
          </Button>
        </div>

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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "128px", height: "128px" }}>
              <TrophyOutlined
                style={{
                  fontSize: "128px",
                  color: "#ffd700",
                }}
              />
              <span
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
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
