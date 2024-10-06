import { List } from "antd";
import { Course } from "./course";
import { useEffect, useState } from "react";
import { getCourseLevelList, getLevelDetail } from "../../../../services/LearnerService";

export const Courses = () => {
  const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   const fetchCourseLevel = async () => {
  //     try {
  //       const response = await getCourseLevelList();
  //       console.log("course level list: ", response.data);

  //       setCourses(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchCourseLevel();
  // }, []);
  useEffect(() => {
    fetch("http://localhost:9999/levels")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => console.error("error", err));
  }, []);
  return (
    <div>
      <List
        // style={{ display: "flex", justifyContent: "center" }}
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={courses}
        renderItem={(course) => (
          <List.Item>
            <Course course={course} />
          </List.Item>
        )}
      />
    </div>
  );
};
