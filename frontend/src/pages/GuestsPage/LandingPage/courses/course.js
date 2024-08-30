import CardCustom from "../../../../components/Card";
import sample from "../../../../assets/landingPage/sample.png";
import ButtonCustom from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../../constants";
import { ReadOutlined } from "@ant-design/icons";
import a1 from "../../../../assets/levelImage/a1.png";
import a2 from "../../../../assets/levelImage/a2.png";
import { useState } from "react";
import ModalRequireToLogin from "../../ModalRequireToLogin";

export const Course = ({ course }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const levelImgArr = {
    a1: a1,
    a2: a2,
  };
  const navigate = useNavigate();
  return (
    <CardCustom
      cover={
        <img
          src={levelImgArr[course.levelImage]}
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
            {course.phases.length} Phase
          </span>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", margin: "8px 0px" }}
        >
          <ReadOutlined style={{ fontSize: "25px" }} />
          <span style={{ marginLeft: "8px" }}>1 Final Exam</span>
        </div>
      </div>
      <ButtonCustom
        buttonType="primary"
        style={{ width: "100%" }}
        onClick={() => setIsModalVisible(true)}
      >
        Bắt đầu
      </ButtonCustom>
      {isModalVisible && (<ModalRequireToLogin open={isModalVisible} onClose={handleCloseModal}/>)}
    </CardCustom>
  );
};
