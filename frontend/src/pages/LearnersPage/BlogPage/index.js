// const dataSampleReal = {
//   data: [
//     {
//       _id: "6706d47e09b1c0b43cb240fc",
//       title: "Learning German 123",
//       description:
//         "This course is designed for learners aiming to achieve C1 level proficiency in German. It includes detailed lessons on grammar, vocabulary, and advanced communication skills. Additionally, the course offers numerous exercises to reinforce understanding and improve fluency. Each module of the course focuses on real-life scenarios to help learners apply what they’ve learned in practical settings.",
//       createdBy: "6706bd968b22c99d1f5ccfe5",
//       status: "Active",
//       views: 3,
//       createdAt: "2024-10-09T19:07:42.898Z",
//       updatedAt: "2024-10-09T19:09:04.972Z",
//       __v: 0,
//     },
//     {
//       _id: "6706d48209b1c0b43cb240fe",
//       title: "Learning German 456",
//       description:
//         "This course is designed for learners aiming to achieve C1 level proficiency in German. It includes detailed lessons on grammar, vocabulary, and advanced communication skills. Additionally, the course offers numerous exercises to reinforce understanding and improve fluency. Each module of the course focuses on real-life scenarios to help learners apply what they’ve learned in practical settings.",
//       createdBy: "6706bd968b22c99d1f5ccfe5",
//       status: "Active",
//       views: 0,
//       createdAt: "2024-10-09T19:07:46.699Z",
//       updatedAt: "2024-10-09T19:07:46.699Z",
//       __v: 0,
//     },
//   ],
//   success: true,
//   message: "Fetched all blogs",
// };

import React, { useState } from "react";
import { Pagination, Row, Col, Space } from "antd";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";

const dataSample = {
  data: [
    {
      _id: "6706d47e09b1c0b43cb240fc",
      title: "Learning German 123",
      description: "This course is designed for learners aiming to achieve C1 level proficiency in German. It includes detailed lessons on grammar, vocabulary, and advanced communication skills.",
      image: "https://via.placeholder.com/300",
      createdBy: "John Doe",
      views: 3,
      createdAt: "2024-10-09T19:07:42.898Z",
    },
    {
      _id: "6706d48209b1c0b43cb240fe",
      title: "Learning German 456",
      description: "Each module of the course focuses on real-life scenarios to help learners apply what they’ve learned in practical settings.",
      image: "https://via.placeholder.com/300",
      createdBy: "Jane Smith",
      views: 5,
      createdAt: "2024-10-10T14:15:42.898Z",
    },
    {
      _id: "6706d48209b1c0b43cb240ff",
      title: "Learning German 789",
      description: "Master advanced communication skills with this course.",
      image: "https://via.placeholder.com/300",
      createdBy: "Alice Johnson",
      views: 8,
      createdAt: "2024-10-11T17:00:42.898Z",
    },
  ],
};

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const pageSize = 3;

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = dataSample.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCardClick = (id) => {
    id = 1;
    navigate(`/blog/${id}`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>BLOG HỌC TẬP</h1>
      <BreadCrumbHome/>
      <Row gutter={[16, 16]}>
        {paginatedData.map((item) => (
          <Col key={item._id} xs={24} sm={12} md={8}>
            <div
              onMouseEnter={() => setHoveredCard(item._id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(item._id)}
              style={{
                border: hoveredCard === item._id ? "1px solid #FFAC1C" : "1px solid #e8e8e8",
                borderRadius: "4px",
                padding: "16px",
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                boxShadow: hoveredCard === item._id ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
                cursor: "pointer", // Change cursor on hover
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  marginBottom: "4px",
                  borderRadius: "4px",
                }}
              />
              <Space
                style={{
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: "4px",
                }}
              >
                <span>
                  <UserOutlined style={{ marginRight: "4px" }} />
                  {item.createdBy}
                </span>
                <span>
                  <EyeOutlined style={{ marginRight: "4px" }} />
                  {item.views}
                </span>
              </Space>
              <h3 style={{ marginBottom: "8px" }}>{item.title}</h3>
              <p
                style={{
                  marginBottom: "16px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 2,
                  whiteSpace: "normal",
                  lineHeight: "1.5em",
                  height: "3em",
                }}
              >
                {item.description}
              </p>
              <span style={{ fontSize: "12px", color: "#8c8c8c" }}>Ngày tạo: {new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </Col>
        ))}
      </Row>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Pagination current={currentPage} total={dataSample.data.length} pageSize={pageSize} onChange={onChangePage} style={{ marginTop: "20px", textAlign: "center" }} />
      </div>
    </div>
  );
};

export default BlogPage;
