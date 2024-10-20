import CardCustom from "../../../../components/Card";
import ButtonCustom from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../../constants";
import { ReadOutlined } from "@ant-design/icons";
import a1 from "../../../../assets/levelImage/a1.png";
import a2 from "../../../../assets/levelImage/a2.png";
import b1 from "../../../../assets/levelImage/b1.png";
import { getEnrollLearnerByCourseId } from "../../../../services/LearnerService";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks";

export default function CourseList({ course }) {
  const levelImgArr = { a1: a1, a2: a2, b1: b1 };
  const levelImage = levelImgArr[course.levelType?.toLowerCase()] || a1;
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id;

  // Check if the user is already enrolled when the component mounts
  useEffect(() => {
    if (course?.enrolledUsers?.includes(userId)) {
      setIsEnrolled(true);
    }
  }, [course, userId]);

  const handleClickButtonStart = () => {
    if (isEnrolled) {
      // If the user is already enrolled, navigate to the course
      navigate(CLIENT_URI.LEVEL_DETAIL + `/${course._id}`);
    } else {
      // If the user is not enrolled, enroll them and then navigate
      getEnrollLearnerByCourseId(course?._id)
        .then((res) => {
          console.log(res);
          setIsEnrolled(true); // Set the enrolled state to true after enrolling
          navigate(CLIENT_URI.LEVEL_DETAIL + `/${course._id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <CardCustom
      cover={<img src={levelImage} height={150} style={{ objectFit: "cover" }} alt="" />}
    >
      <h4 style={{ margin: "0" }}>{course.title}</h4>
      <div style={{ margin: "10px 0px" }}>
        <div style={{ display: "flex", alignItems: "center", margin: "8px 0px" }}>
          <ReadOutlined style={{ fontSize: "25px" }} />
          <span style={{ marginLeft: "8px" }}>{course?.phases?.length || 0} Phase(s)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", margin: "8px 0px" }}>
          <ReadOutlined style={{ fontSize: "25px" }} />
          <span style={{ marginLeft: "8px" }}>1 Final Exam</span>
        </div>
      </div>
      <ButtonCustom
        buttonType="primary"
        style={{ width: "100%" }}
        onClick={handleClickButtonStart}
      >
        {isEnrolled ? "Tiếp tục" : "Bắt đầu"}
      </ButtonCustom>
    </CardCustom>
  );
}
