import { useLocation } from "react-router-dom";
import { TitleCustom } from "../../../components/Typography/TypographyCustom";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Col, Row } from "antd";
import ButtonCustom from "../../../components/Button/ButtonCustom";
import { useEffect, useState } from "react";
import { getTrophyByPhaseId } from "../../../services/LearnerService";
export default function TakeATrophy() {
  const location = useLocation();
  const { examId, title } = location.state || {};
  const [levelTrophy, setLevelTrophy] = useState(null);
  // console.log(trophy);

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
        <Col>{levelTrophy && <img src={levelTrophy} alt="Trophy" style={{ width: "250px", height: "auto" }} />}</Col>
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
