import React, { useEffect, useState } from "react";
import { List } from "antd";
import CourseList from "./CourseList";
import { getCourseLevelList } from "../../../services/LearnerService";

export default function CoursePage() {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/levels")
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
      })
      .catch((err) => console.error(err));
    // const fetchCourseLevel = async () => {
    //   try {
    //     const response = await getCourseLevelList();
    //     console.log("course level list: ", response.data);

    //     setCourse(response.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchCourseLevel();
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