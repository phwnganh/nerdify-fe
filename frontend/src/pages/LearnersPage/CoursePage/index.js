import React, { useEffect, useState } from "react";
import { Col, Row, List } from "antd";
import CourseList from "./CourseList";

export const CoursePage = () => {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/levels")
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
      })
      .catch((err) => console.err(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2
        style={{
          fontSize: "40px",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        KHÓA HỌC
      </h2>
      <List
        grid={{
          gutter: 24,
          column: 3,
        }}
        dataSource={course}
        renderItem={(course) => (
          <List.Item>
            <CourseList course={course} />
          </List.Item>
        )}
      />
    </div>
  );
};
