import { List } from "antd";
import { Course } from "./CourseCustom";
import { useEffect, useState } from "react";
import { getCourseLevelList, getLevelDetail } from "../../../../services/LearnerService";
import { BASE_SERVER } from "../../../../constants";

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCourseLevelList()
      .then((data) => {
        setCourses(data.data);
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
