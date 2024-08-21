import CardCustom from "../../../../components/Card";
import sample from "../../../../assets/landingPage/sample.png";
import ButtonCustom from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../../constants";
import { ReadOutlined } from "@ant-design/icons";

export const Course = ({ course }) => {
  const navigate = useNavigate();
  return (
    <CardCustom
      cover={
        <img
          alt="example"
          src={sample}
          height={150}
          style={{ objectFit: "cover" }}
        />
      }
    >
      {/* <Meta style={{fontSize: "15px"}} title={course.title} /> */}
      <h4 style={{ margin: "0" }}>{course.title}</h4>
      <div style={{ margin: "10px 0px" }}>
        <div
          style={{ display: "flex", alignItems: "center", margin: "8px 0px" }}
        >
          <ReadOutlined style={{ fontSize: "25px" }} />
          <span style={{ marginLeft: "8px" }}>
            {course.phases.length} phase
          </span>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", margin: "8px 0px" }}
        >
          <ReadOutlined style={{ fontSize: "25px" }} />
          <span style={{ marginLeft: "8px" }}>
            {course.finalexams.length} final exam
          </span>
        </div>
      </div>
      <ButtonCustom
        buttonType="primary"
        style={{ width: "100%" }}
        onClick={() => navigate(`${CLIENT_URI.LEVEL_DETAIL}/${course.id}`)}
      >
        Bắt đầu
      </ButtonCustom>
    </CardCustom>
  );
};
