import { useLocation } from "react-router-dom";
import { TitleCustom } from "../../../../components/Typography";
import a1_trophy from "../../../../assets/trophy/a1_trophy.png";
import a2_trophy from "../../../../assets/trophy/a2_trophy.png";
import b1_trophy from "../../../../assets/trophy/b1_trophy.png";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Col, Row } from "antd";
import ButtonCustom from "../../../../components/Button";
import { useEffect, useState } from "react";
import { getTrophyByPhaseId } from "../../../../services/LearnerService";
export default function TakeATrophy() {
  const location = useLocation();
  const { examId, title } = location.state || {};
  const [levelTrophy, setLevelTrophy] = useState(null);
  // console.log(trophy);
  const trophy = {
    a1_trophy,
    a2_trophy,
    b1_trophy,
  };

  useEffect(() => {
    if (examId) {
      getTrophyByPhaseId(examId)
        .then((resp) => {
          console.log(resp);
          setLevelTrophy(resp.data.trophy);
        })
        .catch((error) => {});
    }
  }, [examId]);

  const { width, height } = useWindowSize();
  return (
    <div style={{ padding: "20px" }}>
      <ReactConfetti width={width} height={height} />
      <Row justify="center" style={{ textAlign: "center", marginTop: "20px" }}>
        <Col span={24}>
          <TitleCustom level={2}>Chúc mừng bạn đã hoàn thành {title?.toLowerCase()}</TitleCustom>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col>{levelTrophy && <img src={trophy[levelTrophy]} alt="Trophy" style={{ width: "250px", height: "auto" }} />}</Col>
      </Row>
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <Col>
          <ButtonCustom buttonType="secondary" style={{ padding: "23px" }}>
            Chuyển sang bài tập tiếp theo
          </ButtonCustom>
        </Col>
      </Row>
    </div>
  );
}
