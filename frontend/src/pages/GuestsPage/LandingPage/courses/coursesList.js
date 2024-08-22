import { List } from "antd";
import { Course } from "./course";
import { useEffect, useState } from "react";

export const Courses = () => {
  const [courses, setCourses] = useState([]);

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
