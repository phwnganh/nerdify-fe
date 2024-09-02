import CardCustom from "../../../../components/Card";
import ButtonCustom from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../../constants";
import { ReadOutlined } from "@ant-design/icons";
import a1 from '../../../../assets/levelImage/a1.png';
import a2 from '../../../../assets/levelImage/a2.png';

export default function CourseList({ course }) {
  const levelImgArr = {
    a1: a1,
    a2: a2,
    // Add more levels as needed
  };

  const navigate = useNavigate();

  return (
    <CardCustom
      cover={
        <img
          src={levelImgArr[course.levelImage]}
          alt={course.title}
          style={{ width: "100%", height: "150px", objectFit: "contain" }}
        />
      }
      style={{ borderRadius: "12px", }}
    >
      <h4 style={{ margin: "20px", fontSize: "16px", textAlign: "center" }}>
        {course.title}
      </h4>
      <div style={{ margin: "10px 0px" }}>
        <div
          style={{ display: "flex", alignItems: "center", margin: "8px 0px", justifyContent: "center" }}
        >
          <ReadOutlined style={{ fontSize: "20px" }} />
          <span style={{ marginLeft: "8px" }}>{course?.phases?.length} Phase</span>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", margin: "8px 0px", justifyContent: "center" }}
        >
          <ReadOutlined style={{ fontSize: "20px" }} />
          <span style={{ marginLeft: "8px" }}>1 Final Exam</span>
        </div>
      </div>
      <ButtonCustom
        buttonType="primary"
        style={{ width: "100%", borderRadius: "8px" }}
        onClick={() => navigate(`${CLIENT_URI.LEVEL_DETAIL}/${course.id}`)}
      >
        Bắt đầu
      </ButtonCustom>
    </CardCustom>
  );
}
