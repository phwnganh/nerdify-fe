import React, { useEffect, useState } from "react";
import { List } from "antd";
import CourseList from "./CourseList";

export default function CoursePage() {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/levels")
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
      })
      .catch((err) => console.error(err));
  }, []);

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
          DS Bài Tập
        </h2>
        <List
          grid={{
            gutter: 24, // Khoảng cách giữa các thẻ
            column: 3,
          }}
          dataSource={course}
          renderItem={(course) => (
            <List.Item
              style={{
                width: "400px", // Độ rộng cố định của thẻ card
                margin: "0 auto", // Đảm bảo card được căn giữa nếu có khoảng trống
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
