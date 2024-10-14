import React, { useEffect, useState } from "react";
import { List, Spin, Alert } from "antd";
import CourseList from "./CourseList";
import { getCourseLevelList } from "../../../services/LearnerService";

export default function CoursePage() {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCourseLevelList()
      .then((resp) => {
        setCourse(resp.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Không thể tải dữ liệu khóa học. Vui lòng thử lại sau.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
        <p>Đang tải dữ liệu, vui lòng đợi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  if (course.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Alert message="Hiện tại không có khóa học nào." type="info" showIcon />
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          maxWidth: "calc(100vw - 40px)",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <h2
          style={{
            fontSize: "40px",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          CÁC BÀI TẬP THEO TRÌNH ĐỘ
        </h2>
        <List
          grid={{
            gutter: 24,
            column: 3,
          }}
          dataSource={course}
          renderItem={(course) => (
            <List.Item
              style={{
                width: "400px",
                margin: "0 auto",
              }}
            >
              <CourseList course={course} />
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
