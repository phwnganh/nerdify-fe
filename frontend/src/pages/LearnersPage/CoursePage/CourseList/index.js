import CardCustom from "../../../../components/Card";
import ButtonCustom from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../../constants";
import { ReadOutlined } from "@ant-design/icons";
import a1 from "../../../../assets/levelImage/a1.png";
import a2 from "../../../../assets/levelImage/a2.png";

export default function CourseList({ course }) {
  const levelImgArr = { a1: a1, a2: a2 }; // Add more levels as needed
  const navigate = useNavigate();

  return (
    <CardCustom cover={<img src={levelImgArr[course.levelImage]} height={150} style={{ objectFit: "cover" }} alt="" />}>
      <h4 style={{ margin: "0" }}>{course.title}</h4>
      <div style={{ margin: "10px 0px" }}>
        <div style={{ display: "flex", alignItems: "center", margin: "8px 0px" }}>
          <ReadOutlined style={{ fontSize: "25px" }} />
          <span style={{ marginLeft: "8px" }}>{course.phases.length} Phase</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", margin: "8px 0px" }}>
          <ReadOutlined style={{ fontSize: "25px" }} />
          <span style={{ marginLeft: "8px" }}>1 Final Exam</span>
        </div>
      </div>
      <ButtonCustom
        buttonType="primary"
        style={{ width: "100%" }}
        onClick={() => {
          navigate(CLIENT_URI.LEVEL_DETAIL + `/${course.id}`);
        }}
      >
        Bắt đầu
      </ButtonCustom>
    </CardCustom>
  );
}
